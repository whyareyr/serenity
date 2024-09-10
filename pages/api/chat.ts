import getOpenAIResponse from "@/app/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const openAIResponse = await getOpenAIResponse(message);

    res
      .status(200)
      .json({ response: openAIResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
