// This is a Vercel Serverless Function
export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://cardano-mainnet.blockfrost.io/api/v0/epochs/latest/parameters",
      {
        headers: { "project_id": process.env.BLOCKFROST_KEY },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
