import { CardHeader, Container, Typography } from "@mui/material"

import Auth from "@/components/AuthLayout/Auth"
// import Header from "@/components/common/Header/Header"
import React from "react"

// import { useReadUser } from "@/data/user/useReadUser"

type Props = {
  children: React.ReactNode
}
const AuthLayout = ({ children }: Props) => {
  // const { user } = useReadUser()
  const user = null
  return (
    <>
      <Container>
        {!!user && (
          <>
            {/* <Header /> */}
            {children}
          </>
        )}
        {!user && <Auth />}
      </Container>
    </>
  )
}
export default AuthLayout
