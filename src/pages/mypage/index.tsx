import { Card, CardHeader, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material"

import AuthLayout from "@/layouts/AuthLayout"
import { useReadUser } from "@/data/user/useReadUser"

const Mypage = () => {
  const { user } = useReadUser()
  return (
    <AuthLayout>
      <Card data-testid="Mypage">
        <CardHeader title="マイページ" />
        <Divider />
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
      </Card>
    </AuthLayout>
  )
}
export default Mypage
