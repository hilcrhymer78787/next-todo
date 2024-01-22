import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

import { Task } from "@/data/task/useReadTasks"
import { useRouter } from "next/router"

type Props = {
  task: Task
  i: number
}
const TaskItem = ({ task, i }: Props) => {
  const router = useRouter()
  const isDone = task.isDone ? "済" : "未"
  const { id, name } = task
  const onClickTask = () => {
    router.push(`/task/read?taskId=${id}`)
  }
  return (
    <TableRow
      data-testid={`TaskItem-${i}`}
      onClick={onClickTask}
      sx={{
        ":hover": { backgroundColor: "grey.200" },
        cursor: "pointer"
      }}
    >
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{isDone}</TableCell>
    </TableRow>
  )
}

export default TaskItem
