import { Typography } from "@mui/material"
type Props = {
  txt: string
  testId?: string
}
const ErrTxt = ({ txt, testId = "ErrTxt" }: Props) => {
  if (!txt) return <></>
  return (
    <Typography color="error" data-testid={testId} sx={{ p: 5 }}>
      {txt}
    </Typography>
  )
}
export default ErrTxt
