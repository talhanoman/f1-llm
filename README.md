
# **F1 AI Copilot**  
_Your AI-powered assistant for all things Formula 1._

F1 AI Copilot is an intelligent and context-aware assistant designed to provide detailed insights into the world of Formula 1. Whether you're a fan, an analyst, or simply curious, this AI-driven application offers meaningful answers and relevant information.

---

## **Features**
- **OpenAI GPT-4**: Provides intelligent and natural language responses.  
- **Semantic Search**: Powered by OpenAI embeddings and Astra DB for context-aware retrieval.  
- **Responsive UI**: Built with Tailwind CSS for a modern and sleek interface.  
- **RAG Architecture**: Retrieval-Augmented Generation for enhanced accuracy and context.

---

## **Setup Instructions**

### Prerequisites
1. **OpenAI API Key**: Sign up at [OpenAI](https://platform.openai.com/signup/) to obtain your API key.  
2. **DataStax Astra DB Credentials**:
   - Create a free Astra DB account at [DataStax Astra](https://www.datastax.com/astra).
   - Set up a database and enable the vector search feature.  

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/f1-ai-copilot.git
   cd f1-ai-copilot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the provided `.env.sample`:
   ```bash
   cp .env.sample .env
   ```

4. Fill in the `.env` file with your credentials:
   - `OPEN_API_KEY`: Your OpenAI API key.  
   - `ASTRA_DB_API_ENDPOINT`: URL for your Astra DB instance.  
   - `ASTRA_DB_NAMESPACE`: Your Astra DB namespace.  
   - `ASTRA_DB_APPLICATION_TOKEN`: Your Astra DB application token.  
   - `ASTRA_DB_COLLECTION`: The collection name for storing embeddings.

5. Run the application:
   ```bash
   npm run dev
   ```

---

## **Environment Variables**
The following environment variables are required to run this application. A `.env.sample` file is provided for reference:

```env
OPEN_API_KEY=your-openai-api-key
ASTRA_DB_API_ENDPOINT=https://your-astra-db-endpoint
ASTRA_DB_NAMESPACE=your-namespace
ASTRA_DB_APPLICATION_TOKEN=your-application-token
ASTRA_DB_COLLECTION=your-collection-name
```

---

## **Usage**
-Seed the database locally by running `npm run seed`.
- Start the app locally by running `npm run dev`.  
- Interact with the F1 AI Copilot via the web interface.  
- Ask any Formula 1-related question and receive contextually enriched answers.

---

## **Technologies Used**
- **OpenAI GPT-4**: For conversational AI responses.  
- **OpenAI Embeddings**: To generate and store semantic vectors.  
- **Astra DB**: Vector database for fast and accurate retrieval.  
- **Tailwind CSS**: Responsive and modern design.

---

## **Contributing**
Contributions are welcome! To contribute:  
1. Fork the repo.  
2. Create a new branch for your feature/fix.  
3. Submit a pull request describing your changes.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Support**
If you encounter any issues or have suggestions, feel free to open an issue or contact us.
