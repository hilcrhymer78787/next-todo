import "@/styles/globals.scss"

import type { AppProps } from "next/app"
import CssBaseline from "@mui/material/CssBaseline"
import { RecoilRoot } from "recoil"
import { ThemeProvider } from "@mui/material/styles"
import theme from "@/plugins/theme"
import { useRouter } from "next/router"

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )
}
export default App
