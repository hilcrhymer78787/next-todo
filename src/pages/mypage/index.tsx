import {
  Card,
  Box,
  Button,
  CardContent,
  CardActions,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material"

import AuthLayout from "@/layouts/AuthLayout"
import { useReadUser } from "@/data/user/useReadUser"

const Mypage = () => {
  const { user, logout } = useReadUser()
  const onClickLogout = () => {
    if (!confirm("ログアウトしますか？")) return
    logout()
  }
  return (
    <AuthLayout>
      <Card data-testid="Mypage">
        <CardHeader title="マイページ" />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell align="right" data-testid="MypageName">
                  {user?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>email</TableCell>
                <TableCell align="right" data-testid="MypageEmail">
                  {user?.email}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardActions>
          <Box></Box>
          <Button color="error" onClick={onClickLogout} data-testid="loginToNewUser">
            ログアウト
          </Button>
        </CardActions>
      </Card>
    </AuthLayout>
  )
}
export default Mypage
