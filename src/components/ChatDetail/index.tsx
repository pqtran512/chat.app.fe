import { useState, FC } from "react";
import {
  Box,
  Stack,
} from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";

interface ChatDetailProps {}

const ChatDetail: FC<ChatDetailProps> = () => {
  return (
    <Stack height={"100%"} width={"auto"}>
      {/* maxHeight={"100vh"} */}
      {/* header */}
      <Header/>

      {/* body */}
      <Box sx={{ flexGrow: 1 }} width={"100%"}></Box>

      {/* footer */}
      <Footer/>
    </Stack>
  );
};

export default ChatDetail;
