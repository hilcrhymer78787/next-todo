import { grey, orange, red, teal } from "@mui/material/colors"

import { createTheme } from "@mui/material/styles"

const PRIMARY = teal[400]
const SECONDARY = orange[300]
const ERROR = red[400]
const BORDER = "rgba(0, 0, 0, 0.12)"
const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY
    },
    secondary: {
      main: SECONDARY
    },
    error: {
      main: ERROR
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          color: 'white',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: PRIMARY,
          borderBottom:`1px solid ${BORDER}`,
          color: "white",
          fontSize: "18px",
          "& .MuiSvgIcon-root": {
            color: "white"
          }
        }
      }
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          borderTop:`1px solid ${BORDER}`,
          justifyContent: "space-between"
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: BORDER
        }
      }
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 600
        }
      }
    },
  }
})
export default theme
