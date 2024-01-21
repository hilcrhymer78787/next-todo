import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableRow, TableCell } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import TasksContent from "@/components/task/TasksContent"
import AuthLayout from "@/layouts/AuthLayout"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useReadTask } from "@/data/task/useReadTask"
import TaskDetailContent from "@/components/task/TaskDetailContent"

const TaskRead = () => {
  const router = useRouter()
  const onClickReturn = () => {
    router.push("/task")
  }
  return (
    <AuthLayout>
      <Card data-testid="TaskRead">
        <CardHeader
          title="タスクの詳細"
          action={
            <IconButton onClick={onClickReturn} data-testid="TaskReadReturnBtn">
              <KeyboardReturnIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent sx={{ p: "0 !important" }}>
          <TaskDetailContent />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
export default TaskRead
