import { Card, CardHeader } from "@mui/material"
import AuthLayout from "@/layouts/AuthLayout"
import TaskCreateContent from "@/components/task/TaskCreateContent"
import { useRouter } from "next/router"

const TaskCreate = () => {
  const router = useRouter()
  return (
    <AuthLayout>
      <Card data-testid="TaskCreate">
        <CardHeader title="タスクの追加" />
        <TaskCreateContent />
      </Card>
    </AuthLayout>
  )
}
export default TaskCreate
