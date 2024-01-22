import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { Nav } from "@/layouts/Dashboard"
import { useRouter } from "next/router"

type Props = {
  nav: Nav
  i: number
}
const NavItem = ({ nav, i }: Props) => {
  const router = useRouter()
  const { ttl, icon, path } = nav
  const onClickNav = () => {
    router.push(path)
  }
  return (
    <ListItemButton onClick={onClickNav} data-testid={`NavItem-${i}`}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={ttl} />
    </ListItemButton>
  )
}
export default NavItem
