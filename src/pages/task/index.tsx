import { Card, CardContent, CardHeader, Divider } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import TasksContent from "@/components/task/TasksContent"
import AuthLayout from "@/layouts/AuthLayout"
import { useRouter } from "next/router"

const Tasks = () => {
  const router = useRouter()
  const onClickAdd =() => {
    router.push("/task/create")
  }
  return (
    <AuthLayout>
      <Card data-testid="Tasks">
        <CardHeader
          title="タスク"
          action={
            <IconButton onClick={onClickAdd}>
              <AddIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent sx={{ p: "0 !important" }}>
          <TasksContent />
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
export default Tasks
