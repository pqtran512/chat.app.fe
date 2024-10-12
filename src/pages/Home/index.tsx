import { Container, Grid , Button, Box, ThemeProvider, Grid2} from "@mui/material";
import { useEffect, useState, FC } from "react";
import { styled } from '@mui/material/styles'
import ChatList from "src/components/ChatList"
import ChatDetail from "src/components/ChatDetail"

interface HomePageProps {}

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));

const HomePage: FC<HomePageProps> = ({}) => {
  const onAlert = () => {
    alert("Hello world, this MUI!!");
  }
  return (
    <>
      {/* <Container maxWidth="xl">
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
      </Container> */}
      {/* <Button 
        variant="outlined"
        onClick={onAlert}>Hello world
      </Button> */}
        <Container maxWidth="xl" sx={{padding: "0px 0px 0px 0px"}}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <ChatList />
            </Grid>
            <Grid item xs={9}>
              <ChatDetail />
            </Grid>
          </Grid>
        </Container>
    </>
  );
};

export default HomePage;
