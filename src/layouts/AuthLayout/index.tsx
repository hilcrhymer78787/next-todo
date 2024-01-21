import { CardHeader, Container, Typography } from "@mui/material"
// import Header from "@/components/common/Header/Header"
import { ReactNode, useEffect } from "react"

import Auth from "@/components/AuthLayout/Auth"
import { useReadUser } from "@/data/user/useReadUser"

type Props = {
  children: ReactNode
}
const AuthLayout = ({ children }: Props) => {
  const { user, readUser, readUserLoading } = useReadUser()
  useEffect(() => {
    readUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (user === undefined) return <></>
  if (readUserLoading) return <></>
  return (
    <Container sx={{ p: 5 }}>
      {!!user && (
        <>
          {/* <Header /> */}
          {children}
        </>
      )}
      {!user && <Auth />}
    </Container>
  )
}
export default AuthLayout
