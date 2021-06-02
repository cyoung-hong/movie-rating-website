import React, { useState } from "react";
import moment from "moment";

import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
  Fade,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 100,
    height: "100%",
  },
  actionArea: {
    height: "100%",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  titleCntnr: {
    justifyContent: "center",
  },
  title: {
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  hiddenOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#ffffffcc",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(1),
  },
}));

const CustomTile = ({ rec }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const hours = Math.floor(rec.movie.runtime / 60);
  const mins = rec.movie.runtime % 60;

  const runtime = hours > 0 ? `${hours} hrs ${mins} mins` : `${mins} mins`;

  const onEnter = () => {
    setShow(true);
  };

  const onExit = () => {
    setShow(false);
  };

  return (
    <Card className={classes.card} square>
      <CardActionArea
        className={classes.actionArea}
        onMouseEnter={onEnter}
        onMouseLeave={onExit}
      >
        <CardMedia
          component="img"
          className={classes.media}
          image={`https://image.tmdb.org/t/p/w300${rec.movie.posterUrl}`}
        />
        <Fade in={show}>
          <Grid className={classes.hiddenOverlay} container>
            <Grid className={classes.title} item>
              <Typography>{rec.movie.title}</Typography>
            </Grid>

            {rec.movie.year !== "" && (
              <Grid className={classes.subtitle} item>
                <Typography>
                  ({moment(rec.movie.year).format("YYYY")})
                </Typography>
              </Grid>
            )}

            {rec.movie.runtime !== undefined && (
              <Grid className={classes.subtitle} item>
                <Typography>{runtime}</Typography>
              </Grid>
            )}
          </Grid>
        </Fade>
      </CardActionArea>
    </Card>
  );
};

export default CustomTile;
