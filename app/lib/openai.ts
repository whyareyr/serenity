// app/lib/openai.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure to set your API key
});

export async function getOpenAIResponse(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // or 'gpt-3.5-turbo' if using GPT-3.5
      messages: [
        {
          role: "user",
          content: `You are Serenity, a compassionate mental health assistant. Your goal is to provide supportive and empathetic responses. Please respond to the following message with understanding and kindness: ${message}`,
        },
      ],
    });

    // Extract and return the content of the response
    const completionText = completion.choices[0].message.content.trim();
    return completionText;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Failed to get response from OpenAI");
  }
}
