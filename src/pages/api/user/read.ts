import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.headers.authorization === "Bearer token123token123token123token123") {
    return res.status(200).json({ name: "Yamada Tetsuto", email: "test@gmail.com" })
  }
  return res.status(401).json({ errorMessage: "トークンが有効ではありません" })
}
