// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  if (email !== "test@gmail.com")
    return res.status(500).json({ errorMessage: "このメールアドレスは登録されていません" })
  if (password !== "password") return res.status(500).json({ errorMessage: "パスワードが違います" })
  return res.status(200).json({ token: "token123token123token123token123" })
}
