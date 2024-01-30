import { Card, CardHeader } from "@mui/material"

import AuthLayout from "@/layouts/AuthLayout"
import IconButton from "@mui/material/IconButton"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import TaskEdit from "@/components/task/TaskEdit"
import { useRouter } from "next/router"

const TaskCreate = () => {
  const router = useRouter()
  const onClickReturn = () => {
    router.push("/task")
  }
  return (
    <AuthLayout>
      <Card data-testid="TaskCreate">
        <CardHeader
          title="タスクの追加"
          action={
            <IconButton onClick={onClickReturn} data-testid="TaskCreateReturnBtn">
              <KeyboardReturnIcon />
            </IconButton>
          }
        />
        <TaskEdit />
      </Card>
    </AuthLayout>
  )
}
export default TaskCreate
