import type { NextApiRequest, NextApiResponse } from "next";
import { getOpenAIResponse } from "@/app/lib/openai";
import { getSession } from "next-auth/react";

interface ChatRequest extends NextApiRequest {
  body: {
    message: string;
  };
}

interface ChatResponse {
  response: string;
}

export default async function handler(
  req: ChatRequest,
  res: NextApiResponse<ChatResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getSession({ req });
    console.log("Session:", session); // Log the session object

    // if (!session) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await getOpenAIResponse(message);
    res.status(200).json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
