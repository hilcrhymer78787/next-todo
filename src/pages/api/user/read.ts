import type { NextApiRequest, NextApiResponse } from "next"

export const mockUser = { name: "Yamada Tetsuto", email: "test@gmail.com" }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json(null)

  if (req.headers.authorization !== "Bearer token123token123token123token123") {
    return res.status(401).json({ errorMessage: "トークンが有効ではありません" })
  }
  return res.status(200).json(mockUser)
}
