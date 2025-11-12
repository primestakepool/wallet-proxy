import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Allow CORS from your frontend
    res.setHeader("Access-Control-Allow-Origin", "https://primestakepool.github.io");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end(); // Preflight request
    }

    // Fetch protocol parameters from Blockfrost (or your backend source)
    // Replace YOUR_BLOCKFROST_KEY with a secure environment variable
    const response = await fetch(
      "https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest/parameters",
      {
        headers: {
          project_id: process.env.BLOCKFROST_API_KEY,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch protocol parameters" });
  }
}
