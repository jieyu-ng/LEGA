import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MODEL_ID = "grafilab/qwen3-vl-flash";

export async function POST(request: Request) {
  const apiKey = process.env.GRAFILAB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GRAFILAB_API_KEY in frontend/.env.local." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const applianceType = String(formData.get("applianceType") ?? "appliance");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No appliance image uploaded." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image uploads are supported for appliance labels." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;

  const response = await fetch("https://console-api.grafilab.ai/api/oai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL_ID,
      messages: [
        {
          role: "system",
          content: "You extract appliance label details from images. Return strict JSON only.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Read this ${applianceType} label image and return only valid JSON:
{
  "applianceType": string,
  "brand": string | null,
  "model": string | null,
  "energyRating": string | null,
  "estimatedPower": string | null,
  "summary": string,
  "confidence": number
}

Rules:
- Keep applianceType equal to "${applianceType}".
- brand is the visible brand if readable.
- model is the visible model number if readable.
- energyRating is the visible star rating / efficiency rating if present.
- estimatedPower is the visible wattage, horsepower, or capacity if present.
- summary should be one short sentence in plain English for a product demo.
- confidence must be between 0 and 1.
- If a field is not visible, return null.
- Do not include markdown fences or extra text.`,
            },
            {
              type: "image_url",
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
      temperature: 0.1,
      top_p: 0.9,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return NextResponse.json({ error: `Appliance extraction failed: ${errorText}` }, { status: 502 });
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    return NextResponse.json({ error: "Grafilab returned an empty appliance extraction response." }, { status: 502 });
  }

  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Appliance extraction returned invalid JSON." }, { status: 502 });
  }
}
