import { Card, CardHeader } from "@mui/material"
import AuthLayout from "@/layouts/AuthLayout"
import TaskCreateContent from "@/components/task/TaskCreateContent"

const TaskCreate = () => {
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
