import type { NextApiRequest, NextApiResponse } from "next"
export const mockTasks = [
  {
    id: 1,
    name: "掃除",
    isDone: true
  },
  {
    id: 2,
    name: "洗い物",
    isDone: true
  },
  {
    id: 3,
    name: "洗濯",
    isDone: false
  },
  {
    id: 4,
    name: "料理",
    isDone: false
  },
  {
    id: 5,
    name: "買い物",
    isDone: false
  }
]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json(null)

  return res.status(200).json(mockTasks)
}
