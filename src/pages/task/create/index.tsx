import { Card, CardContent, CardHeader, Divider } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import AuthLayout from "@/layouts/AuthLayout"
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
            <IconButton onClick={onClickReturn}>
              <KeyboardReturnIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>add icon</CardContent>
      </Card>
    </AuthLayout>
  )
}
export default TaskCreate
