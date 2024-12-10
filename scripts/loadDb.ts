import { DataAPIClient } from "@datastax/astra-db-ts";
import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import OpenAI from "openai";
import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";

const {
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_NAMESPACE,
    ASTRA_DB_APPLICATION_TOKEN,
    ASTRA_DB_COLLECTION,
    OPENAI_API_KEY
} = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const f1Data = [
    "https://en.wikipedia.org/wiki/Formula_One",
    "https://en.wikipedia.org/wiki/List_of_Formula_One_driver_records"
]


const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace : ASTRA_DB_NAMESPACE});

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize : 512,
    chunkOverlap : 100
})

type SimilarityMetric = "dot_product" | "cosine" | "euclidean" 
const createCollection = async (similarity_metric : SimilarityMetric = "dot_product")=> {
    const res = db.createCollection(ASTRA_DB_COLLECTION, {
        vector : {
            dimension : 1536,
            metric : similarity_metric
        }
    })
    console.log(res);
}

const loadSampleData = async ()=> {
    const collection = await db.collection(ASTRA_DB_COLLECTION);
    for await (const url of f1Data)
    {
        const content = await scrapePage(url);
        const chunks = await splitter.splitText(content);
        for await (const chunk of chunks)
        {
            const embedding = await openai.embeddings.create({
                model : "text-embedding-3-small",
                input : chunk,
                encoding_format : "float"
            })

            const vector = embedding.data[0].embedding;

            await collection.insertOne({
                $vector : vector,
                text : chunk
            })
        }
    }
}

const scrapePage = async (url:string) =>{
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions : {
            headless : true
        },
        gotoOptions : {
            waitUntil : "domcontentloaded"
        },
        evaluate: async (page, browser) => {
            const result = await page.evaluate(()=> document.body.innerHTML);
            await browser.close();
            return result;
        }
    })

    return (await loader.scrape())?.replace(/<[^>]*>?/gm, '')
}

createCollection().then(()=> loadSampleData());
