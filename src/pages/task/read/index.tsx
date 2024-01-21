import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableRow, TableCell } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import AuthLayout from "@/layouts/AuthLayout"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { useRouter } from "next/router"
import TaskReadContent from "@/components/task/TaskReadContent"

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
          <TaskReadContent />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
export default TaskRead
