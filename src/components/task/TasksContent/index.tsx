import { Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material"

import Loading from "@/components/common/Loading"
import ErrTxt from "@/components/common/ErrTxt"
import NoData from "@/components/common/NoData"
import { useReadTasks } from "@/data/task/useReadTasks"
import { useEffect } from "react"
import TaskItem from "@/components/task/TaskItem"

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
          <TableCell></TableCell>
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
