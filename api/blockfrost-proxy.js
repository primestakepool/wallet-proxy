// /api/blockfrost-proxy.js
export default async function handler(req, res) {
  // Allow CORS from anywhere
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    // Optional: allow custom path, default to epoch params
    const path = req.query.path || "epochs/latest/parameters";

    // Fetch from Blockfrost (server-side, API key hidden)
    const response = await fetch(
      `https://cardano-mainnet.blockfrost.io/api/v0/${path}`,
      {
        headers: { project_id: process.env.BLOCKFROST_API_KEY },
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: error.message });
  }
}
