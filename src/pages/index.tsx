import { Box, Card, Typography } from "@mui/material"

import AuthLayout from "@/layouts/AuthLayout"

const Home = () => {
  return (
    <AuthLayout>
      <Box sx={{ p: 5 }}>
        <Typography>Home</Typography>
      </Box>
    </AuthLayout>
  )
}
export default Home
