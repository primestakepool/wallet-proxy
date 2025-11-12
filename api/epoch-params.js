export default async function handler(req, res) {
  // --- CORS headers ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch(
      "https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest/parameters",
      {
        headers: { project_id: process.env.BLOCKFROST_API_KEY },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch Blockfrost data");

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: error.message });
  }
}
