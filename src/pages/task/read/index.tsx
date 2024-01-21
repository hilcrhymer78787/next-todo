import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableRow, TableCell } from "@mui/material"

import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import TasksContent from "@/components/task/TasksContent"
import AuthLayout from "@/layouts/AuthLayout"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
const TaskRead = () => {
  return (
    <AuthLayout>
      <Card data-testid="TaskRead">
        <CardHeader
          title="タスクの詳細"
          action={
            <IconButton onClick={() => {}}>
              <KeyboardReturnIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent sx={{ p: "0 !important" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">ididid</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>hoge</TableCell>
                <TableCell align="right">hogehogehoge</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
export default TaskRead
