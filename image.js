import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { prompt } = req.body;
    try {
      const response = await openai.images.generate({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024",
      });
      res.status(200).json({ url: response.data[0].url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
