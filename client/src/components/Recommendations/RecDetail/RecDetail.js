import React from "react";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import moment from "moment";


import { makeStyles } from "@material-ui/core/styles";

const RecDetail = ({ rec }) => {
  console.log(rec.movie);
  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item>{rec.movie.title}</Grid>
          <Grid item>
            <Typography variant="body1">
              {moment(rec.movie.year).format("MMMM D, YYYY")}
            </Typography>
          </Grid>
          <Grid item>
              {rec.movie.recommender}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RecDetail;
