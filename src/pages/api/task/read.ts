import type { NextApiRequest, NextApiResponse } from "next"
import { mockTasks } from "@/pages/api/task/readall"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json(null)

  const { id } = req.query
  const task = mockTasks.find((task) => task.id === Number(id))
  if (!task) return res.status(404).json({ errorMessage: "タスクが見つかりませんでした" })

  return res.status(200).json(task)
}
