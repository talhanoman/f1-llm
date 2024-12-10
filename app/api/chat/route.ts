import OpenAI from "openai";
import { streamText } from "ai";
import { DataAPIClient } from "@datastax/astra-db-ts";
import { openai } from "@ai-sdk/openai";

const {
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_APPLICATION_TOKEN,
  ASTRA_DB_COLLECTION,
  OPENAI_API_KEY,
} = process.env;

// Initialize OpenAI
const OpenAi = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Initialize Astra DB Client
const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN!);
const db = client.db(ASTRA_DB_API_ENDPOINT, {
  namespace: ASTRA_DB_NAMESPACE,
});

// Helper: Convert stream to string
async function streamToString(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  let result = "";
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    if (value) {
      result += new TextDecoder().decode(value);
    }
  }
  return result;
}

// Main POST Handler
export async function POST(req: Request): Promise<Response> {
  try {
    // Parse the incoming request
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;
    let docContext = "";

    // Generate embedding for the user's message
    const embeddingResponse = await OpenAi.embeddings.create({
      model: "text-embedding-3-small",
      input: latestMessage,
      encoding_format: "float",
    });

    const embedding = embeddingResponse.data[0].embedding;

    // Perform vector search on Astra DB
    try {
      const collection = await db.collection(ASTRA_DB_COLLECTION);
      const cursor = await collection.find(null, {
        sort : {
            $vector  : embedding
        },
        limit : 10
      });

      const documents = await cursor.toArray();
      const docsMap = documents?.map((doc: { text: string }) => doc?.text);

      docContext = JSON.stringify(docsMap);
    } catch (err) {
      console.error("Error during Astra DB query:", err);
      return new Response(
        JSON.stringify({ error: "Error during database query", details: err }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Prepare the system message template
    const template = {
      role: "system",
      content: `
        You are an AI assistant who knows everything about Formula One.
        Use the context below to augment what you know about Formula One racing.
        The context provides recent data from Wikipedia, the official F1 website, and others.
        If the context doesn't include the required information, answer based on your existing knowledge.
        Avoid mentioning the sources or limitations of the context.
        Format responses using markdown where applicable, and do not return images.

        START CONTEXT
        ${docContext}
        END CONTEXT

        -------------------------
        QUESTION: ${latestMessage}
        -------------------------
      `,
    };

     const response = await OpenAi.chat.completions.create({
      model: "gpt-4",
      stream: true, 
      messages: [template, ...messages],
    });
    const responseStream = response.toReadableStream();
    const responseString = await streamToString(responseStream);
    const result = streamText({
        model: openai('gpt-4o'),
        prompt : responseString,
      });
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
