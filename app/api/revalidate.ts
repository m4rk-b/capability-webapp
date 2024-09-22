import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.My_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const path = req.query.path as string;

    // Debug logging to check the path being revalidated
    console.log("Revalidating path:", path);

    if (!path) {
      return res.status(400).json({ message: 'Path is required' });
    }

    // Attempt to revalidate the given path
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidation error:", err);
    return res.status(500).json({ message: 'Error revalidating'});
  }
}
