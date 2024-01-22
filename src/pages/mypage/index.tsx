import { Card, CardContent, CardHeader, Divider, Table, TableBody, TableCell, TableRow } from "@mui/material"

import AuthLayout from "@/layouts/AuthLayout"
import IconButton from "@mui/material/IconButton"
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import { useReadUser } from "@/data/user/useReadUser"
import { useRouter } from "next/router"

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
              <TableCell align="right">{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>email</TableCell>
              <TableCell align="right">{user?.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </AuthLayout>
  )
}
export default Mypage
