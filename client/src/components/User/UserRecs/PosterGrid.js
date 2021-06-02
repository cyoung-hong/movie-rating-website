import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Fade,
  useMediaQuery,
} from "@material-ui/core";
import moment from "moment";

import { useSelector } from "react-redux";
import CustomTile from "./CustomTile.js";

const useStyles = makeStyles((theme) => ({
  gridList: {
    cols: 4,
  },
  image: {
    objectFit: "cover",
  },
  tileBar: {
    transition: "width 2s, height 4s",
  },
}));

const PosterGrid = () => {
  const classes = useStyles();
  const recList = useSelector((state) => state.recReducer.myRecs);

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();

  const onEnter = (index) => {
    //setSelected(index);
    console.log(selected);
    //setShow(true);
  };

  const onExit = (index) => {
    // console.log(index);
    //setShow(false);
  };

  const md = useMediaQuery((theme) => theme.breakpoints.up("md"))
    ? true
    : false;
  const columns = md ? 15 : 10;

  return (
    <GridList className={classes.gridList} cols={columns} cellHeight={150}>
      {recList.map((rec, index) => (
        <GridListTile
          component="div"
          className={classes.tile}
          key={`${index}${rec.id}`}
          style={{ imgFullHeight: true }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${rec.movie.posterUrl}`}
            alt={rec.movie.title}
            onMouseEnter={onEnter(index)}
            onMouseLeave={onExit()}
          />
          <GridListTileBar
            title={rec.movie.title}
            subtitle={moment(rec.year).format("YYYY")}
            style= {{height: 30, subtitle: {
              fontSize: '0.2rem'}
            }}
          />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default PosterGrid;
