import { Typography } from "@mui/material"
type Props = {
  txt: string
}
const ErrTxt = ({ txt }: Props) => {
  if(!txt) return <></>
  return (
    <Typography color="error" data-testid="ErrTxt" sx={{ p: 5 }}>
      {txt}
    </Typography>
  )
}
export default ErrTxt
