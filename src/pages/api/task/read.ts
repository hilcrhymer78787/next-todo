import type { NextApiRequest, NextApiResponse } from "next"
import { mockTasks } from "@/pages/api/task/readall"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const task = mockTasks.find((task) => task.id === Number(id))
  if (!!task) return res.status(200).json(task)
  return res.status(404).json({ errorMessage: "タスクが見つかりませんでした" })
}
