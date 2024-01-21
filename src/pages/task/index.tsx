import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material"

import Loading from "@/components/common/Loading"
import ErrTxt from "@/components/common/ErrTxt"
import NoData from "@/components/common/NoData"
import { useReadTasks } from "@/data/task/useReadTasks"
import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import { useEffect } from "react"

const Tasks = () => {
  return (
    <Card sx={{ m: 5 }} data-testid="Tasks">
      <CardHeader
        title="タスク"
        action={
          <IconButton onClick={() => { }}>
            <AddIcon />
          </IconButton>
        }
      />
      <Divider />
      <CardContent sx={{ p: "0 !important" }}>
        <TasksContent />
      </CardContent>
    </Card>
  )
}

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
        {tasks.map((task) => (
          <TableRow
            key={task.id}
            onClick={() => {
              // navigate(`/task/read?taskId=${task.task_id}`);
            }}
            sx={{
              ":hover": { backgroundColor: "grey.200" },
              cursor: "pointer"
            }}
          >
            <TableCell>{task.id}</TableCell>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.isDone ? "済" : "未"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default Tasks
