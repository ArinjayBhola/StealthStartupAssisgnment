import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { products } from "@/data/products";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Server misconfiguration: missing LLM API key." }, { status: 503 });
  }

  let body: { query?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const query = body.query?.trim();
  if (!query) {
    return NextResponse.json({ error: "A non-empty 'query' field is required." }, { status: 400 });
  }

  const catalog = products
    .map((p) => `ID:${p.id} | ${p.name} | ${p.category} | $${p.price} | ${p.description} | tags: ${p.tags.join(", ")}`)
    .join("\n");

  const prompt = `You are a helpful product discovery assistant. A customer asked: "${query}"

Here is the full product catalog:
${catalog}

Based on the customer's query, select the most relevant products and provide a short summary explaining why they match.

You MUST respond with valid JSON only, no markdown, no code fences. Use this exact schema:
{
  "productIds": [<list of matching product id numbers>],
  "summary": "<a brief 1-3 sentence explanation for the customer>"
}

If no products match, return an empty productIds array and explain in the summary.`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let parsed: { productIds: number[]; summary: string };
    try {
      parsed = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("LLM returned non-JSON response.");
      }
    }

    const matchedProducts = products.filter((p) => parsed.productIds.includes(p.id));

    return NextResponse.json({
      productIds: parsed.productIds,
      summary: parsed.summary,
      products: matchedProducts,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error from LLM.";
    console.error("LLM call failed:", message);
    return NextResponse.json({ error: "AI service is temporarily unavailable. Please try again." }, { status: 502 });
  }
}
