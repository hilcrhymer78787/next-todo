import type { NextApiRequest, NextApiResponse } from "next"

import { mockTasks } from "@/pages/api/task/readall"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json(null)
  return res.status(200).json(req.body)
}
