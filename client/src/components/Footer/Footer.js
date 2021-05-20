import React from "react";

import { Container, Typography } from "@material-ui/core";

const Footer = () => {
  return (
    <Container position="relative">
      <Typography>
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </Typography>
    </Container>
  );
};

export default Footer;
