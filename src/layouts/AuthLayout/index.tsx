import { CardHeader, Container, Typography } from "@mui/material"
// import Header from "@/components/common/Header/Header"
import { ReactNode, useEffect } from "react"

import Auth from "@/components/AuthLayout/Auth"
import Dashboard from "@/layouts/Dashboard"
import { useReadUser } from "@/data/user/useReadUser"

type Props = {
  children: ReactNode
}
const AuthLayout = ({ children }: Props) => {
  const { user, readUser, readUserLoading } = useReadUser()
  useEffect(() => {
    if (!!user) return
    readUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (user === undefined) return <></>
  if (readUserLoading) return <></>
  if (!!user) return <Dashboard>{children}</Dashboard>
  return <Auth />
}
export default AuthLayout
