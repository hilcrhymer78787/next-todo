import { Card, CardContent, CardHeader, CardActions, Button, TableCell, TableRow } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

import AuthLayout from "@/layouts/AuthLayout"
import IconButton from "@mui/material/IconButton"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import TaskReadContent from "@/components/task/TaskReadContent"
import { useRouter } from "next/router"

const TaskRead = () => {
  const router = useRouter()
  const onClickReturn = () => {
    router.push("/task")
  }
  return (
    <AuthLayout>
      <Card data-testid="TaskRead">
        <CardHeader title="タスクの詳細"/>
        <CardContent>
          <TaskReadContent />
        </CardContent>
        <CardActions>
          <Button onClick={onClickReturn} data-testid="TaskReadReturnBtn">
            タスク一覧へ戻る
          </Button>
          <Button color="secondary" variant="contained">
            編集
          </Button>
        </CardActions>
      </Card>
    </AuthLayout>
  )
}
export default TaskRead
