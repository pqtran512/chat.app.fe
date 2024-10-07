import { Container, Grid } from "@mui/material";
import { useEffect, useState, FC } from "react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={1}
        >
          <Grid item xs={2}>
            <p>abc</p>
          </Grid>
          <Grid item xs={10}>
            <p>abc</p>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
