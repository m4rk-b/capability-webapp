//https://the-biggest-loser-v2.onrender.com/api/revalidate?path=/&secret=6d395f067909a0a063a407ce22d9d477
//Dev http://localhost:3000/api/revalidate?path=/home&secret=6d395f067909a0a063a407ce22d9d477

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.query.secret !== process.env.My_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        const path = req.query.path as string;
        await res.revalidate(path);
        return res.json({ revalidated: true });
    } catch(err) {
        console.log(err);
    }
}