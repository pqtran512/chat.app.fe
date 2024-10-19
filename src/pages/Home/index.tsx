import {
  Container,
  Grid,
  Button,
  Box,
  ThemeProvider,
  Grid2,
  Stack,
} from "@mui/material";
import { useEffect, useState, FC } from "react";
import { styled } from "@mui/material/styles";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";

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
  };
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chat List */}
      <ChatList />
      {/* Chat Detail */}
      <Box sx={{ width: "100%" }}>
        <ChatDetail />
      </Box>
    </Stack>
  );
};

export default HomePage;
