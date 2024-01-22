import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import { Nav } from "@/layouts/Dashboard"
import { useRouter } from "next/router"

type Props = {
  nav: Nav
}
const NavItem = ({ nav }: Props) => {
  const { ttl, icon, path } = nav
  const router = useRouter()
  const onClickNav = () => {
    router.push(path)
  }
  return (
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={ttl} onClick={onClickNav} />
    </ListItemButton>
  )
}
export default NavItem
