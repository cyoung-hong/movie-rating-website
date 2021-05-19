import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../../images/pexels-dmitry-demidov-3921000.jpg";

export default makeStyles((theme) => ({
    theatre: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundImage: `url(${bgImage})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      backdrop: {
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        zIndex: 1,
      },
      overlay: {
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        margin: 0,
        backgroundColor: "#000",
        opacity: "0.7",
      },
      content: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: "100vh",
        justifyContent: "center",
        alignContent: "center",
      },
      textContent: {
        textAlign: "center",
        alignSelf: "center",
        width: "100%",
      },
      ugh: {
        color: "#fc0303",
      },
}));
