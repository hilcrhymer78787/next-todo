import { Table, TableBody, TableCell, TableRow } from "@mui/material"

import ErrTxt from "@/components/common/ErrTxt"
import Loading from "@/components/common/Loading"
import { useEffect } from "react"
import { useReadTask } from "@/data/task/useReadTask"
import { useRouter } from "next/router"

const TaskReadContent = () => {
  const router = useRouter()
  const { task, readTask, readTaskError, readTaskLoading } = useReadTask()
  useEffect(() => {
    const { taskId } = router.query
    if (!taskId) return
    if (Array.isArray(taskId)) return
    readTask(taskId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (readTaskLoading) return <Loading />
  if (readTaskError) return <ErrTxt txt={readTaskError} />
  if (!task) return <></>
  const { id, name, isDone } = task
  const isDoneTxt = isDone ? "済" : "未"

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell align="right">{id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>name</TableCell>
          <TableCell align="right">{name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>isDone</TableCell>
          <TableCell align="right">{isDoneTxt}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
export default TaskReadContent
