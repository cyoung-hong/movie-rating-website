// eslint-disable-next-line
export default {
  palette: {
    primary: {
      main: "#7CF7FB",
      light: "#7DCFB6",
      dark: "#1D4E89",
      contrast: "#fff",
    },
    secondary: {
      main: "#ff0008",
      light: "#FBD1A2",
      dark: "#F79256",
      contrastText: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
    },
  },
  props: {
    MuiAppBar: {
      elevation: 0,
      width: "50%",
    },
  },
  typography: {
    h6: {
      fontSize: '0.8rem',
      fontWeight: 400,
      '@media (max-width:720px)': {
        fontSize: '0.6rem',
        fontWeight: 400,
      },
      '@media (max-width:600px)': {
        fontSize: '0.5rem',
        fontWeight: 400,
      },
    },
    body1: {
      fontSize: "0.8em",
    },
    footer1: {
      fontSize: "0.6rem",
    },
  }
};
