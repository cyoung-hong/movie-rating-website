import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "50%",
  },
  menuContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbar: {
    width: "90%",
    alignSelf: "center",
  },
  searchWrapper: {
    justifyContent: "flex-start",
  },
  subMenu: {
    display: "flex",
    width: "auto",
  },
  homeLink: {
    textDecoration: 'none',
  }
}));
