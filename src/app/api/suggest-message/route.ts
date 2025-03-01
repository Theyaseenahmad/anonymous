import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
// export const runtime = "edge"   maybe or maybe not in the updated version

export async function POST(req: Request) {
  try {
    const prompt =
      "send me a list of 3 common to-dos for a fan as a single string separated  by ||";

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      prompt,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof ApiError) {    // see??
      
      return NextResponse.json({
        success: false,
        message: error.message,
      });
    } else {
      throw error;
    }
  }
}
