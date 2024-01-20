import { Typography } from "@mui/material"
type Props = {
    txt: string
}
const ErrTxt = ({ txt }: Props) => {
    return (
        <Typography
            color="error"
            data-testid="ErrTxt"
            sx={{
                p: 5,
                m: 5,
                display: "flex",
                justifyContent: "center"
            }}>
            {txt}
        </Typography>
    )
}
export default ErrTxt
