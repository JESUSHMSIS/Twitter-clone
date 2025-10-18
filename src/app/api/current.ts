import type { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
export default async function handler(
  res: NextApiResponse,
  req: NextApiRequest,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);
    return res.status(200).json(currentUser);
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}
