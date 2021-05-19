import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  dialog: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    backgroundImage: props => `url(${props.posterPath})`,
    minHeight: 300,
    display: "flex",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize:"contain",
  },  
  info:{
    display: "block",
    marginBottom: theme.spacing(2),
  },
}));
