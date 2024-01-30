import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"

import ErrTxt from "@/components/common/ErrTxt"
import Loading from "@/components/common/Loading"
import NoData from "@/components/common/NoData"
import TaskItem from "@/components/task/TaskItem"
import { useEffect } from "react"
import { useReadTasks } from "@/data/task/useReadTasks"

const TasksContent = () => {
  const { tasks, readTasks, readTasksLoading, readTasksError } = useReadTasks()
  useEffect(() => {
    readTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (readTasksLoading) return <Loading />
  if (readTasksError) return <ErrTxt txt={readTasksError} />
  if (!tasks) return <></>
  if (!tasks.length) return <NoData txt="まだタスクはありません" />
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>タスク名</TableCell>
          <TableCell>状態</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task, i) => (
          <TaskItem task={task} i={i} key={task.id} />
        ))}
      </TableBody>
    </Table>
  )
}
export default TasksContent
