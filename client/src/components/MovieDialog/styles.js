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
  wrapper:{
    padding: theme.spacing(1),
  },
  buttonWrapper: {
    width:"100%",
    alignSelf: "flex-end",
  },
  buttonContainer: {
    justifyContent: "flex-end",
  },
  info: {
    display:"block",
  },
  infoDetails: {
    marginBottom: theme.spacing(1),
  }
}));
