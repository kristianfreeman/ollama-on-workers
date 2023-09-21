import { Hono } from 'hono'
import { OllamaEmbeddings } from "langchain/embeddings/ollama";

type Bindings = {
	TUNNEL: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.post("/", async c => {
  const { embedDocuments } = new OllamaEmbeddings({
    baseUrl: c.env.TUNNEL
  })

	const documents = await c.req.json()
	const documentEmbeddings = await embedDocuments(documents)
	return c.json(documentEmbeddings)
})

app.onError((err, c) => {
	return c.text(err.toString(), 500)
})

export default app
