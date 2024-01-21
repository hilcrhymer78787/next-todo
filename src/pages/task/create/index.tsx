import { Card, CardContent, CardHeader, Divider } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import AuthLayout from "@/layouts/AuthLayout"
import { useRouter } from "next/router"
const TaskCreate = () => {
  const router = useRouter()
  return (
    <AuthLayout>
      <Card data-testid="TaskCreate">
        <CardHeader
          title="タスクの追加"
          action={
            <IconButton
              onClick={() => {
                router.push("/task")
              }}
            >
              <AddIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent sx={{ p: "0 !important" }}>add icon</CardContent>
      </Card>
    </AuthLayout>
  )
}
export default TaskCreate
