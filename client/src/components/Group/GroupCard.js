import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(0.5),
  },
}));

const GroupCard = ({ group }) => {
  const classes = useStyles();
  const {groupName, groupPhoto} = group;

  return (
    <Card className={classes.card} square>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          component="img"
          className={classes.media}
          image={`${groupPhoto}`}
          alt="Group Pic"
        />

        <Grid className={classes.title} item>
          <Typography>{groupName}</Typography>
        </Grid>
        
      </CardActionArea>
    </Card>
  );
};

export default GroupCard;
