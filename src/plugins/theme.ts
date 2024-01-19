import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange, red } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    mode: "light",
    // primary: {
    //   main: '#0097a7',
    // },
    // secondary: {
    //   main: '#19857b',
    // },
    // error: {
    //   main: red[400],
    // },
  },
  components: {
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#0097a7",
          color: "white",
          fontSize: "18px",
          "& .MuiSvgIcon-root": {
            color: "white",
            backgroundColor: "#0097a7",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          backgroundColor: "orange",
          color: "white",
          padding: "8px 12px",
          opacity: 1.0,
          boxShadow:
            "0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%)",
          "&:hover": {
            backgroundColor: "orange",
            opacity: 0.9,
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "#0097a7",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          marginRight: "15px",
        },
      },
    },

    // MuiCard: {
    //   styleOverrides: {
    //     root: {
    //       minWidth: 275,
    //       border: '1px solid rgba(255, 255, 255, 0.23)',
    //     },
    //   },
    // },
    // MuiDialog: {
    //   defaultProps: {
    //     fullWidth: true,
    //     maxWidth: "sm",
    //   },
    // },
    // MuiDialogContent: {
    //   defaultProps: {
    //     dividers: true,
    //   },
    // },
  },
});
export default theme