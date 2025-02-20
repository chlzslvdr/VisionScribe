import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  let { image } = req.body;

  if (!image) {
    console.error("❌ No image provided");
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    image = image.replace(/^data:image\/\w+;base64,/, "");

    console.info("📡 Sending cleaned Base64 image to Hugging Face API...");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", errorText);
      throw new Error(errorText);
    }

    const data = await response.json();

    res
      .status(200)
      .json({ caption: data[0]?.generated_text || "No caption generated" });
  } catch (error: any) {
    console.error("❌ Server Error:", error.message);
    res.status(500).json({ error: "Error processing image" });
  }
}
