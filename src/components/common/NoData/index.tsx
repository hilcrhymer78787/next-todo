import { Typography } from "@mui/material"
type Props = {
  txt: string
}
const NoData = ({ txt }: Props) => {
  return (
    <Typography data-testid="NoData" sx={{ p: 5 }}>
      {txt}
    </Typography>
  )
}
export default NoData
