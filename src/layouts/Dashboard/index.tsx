import { Box, Container, Divider, Drawer, List, Toolbar } from "@mui/material"

import NavItem from "@/layouts/Dashboard/NavItem"
import PersonIcon from "@mui/icons-material/Person"
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck"
import { ReactNode } from "react"
import { useReadUser } from "@/data/user/useReadUser"

export type Nav = {
  ttl: string
  path: string
  icon: ReactNode
}
const navs: Nav[] = [
  {
    ttl: "タスク",
    path: "/task",
    icon: <PlaylistAddCheckIcon />
  },
  {
    ttl: "マイページ",
    path: "/mypage",
    icon: <PersonIcon />
  }
]

type Props = {
  children: ReactNode
}
const Dashboard = ({ children }: Props) => {
  const { user } = useReadUser()
  if (!user) return <></>
  const { name } = user
  return (
    <Box sx={{ display: "flex" }} data-testid="Dashboard">
      <Drawer
        variant="permanent"
      >
        <Toolbar>{name}</Toolbar>
        <Divider />
        <List component="nav">
          {navs.map((nav, i) => (
            <NavItem nav={nav} i={i} key={i} />
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
          paddingLeft: "170px"
        }}
      >
        <Container maxWidth="lg" sx={{ my: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
export default Dashboard
