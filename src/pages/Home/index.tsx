import {
  Box,
  Stack,
} from "@mui/material";
import { useState, FC } from "react";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";
import ChatInformaion from "src/components/ChatInfomation";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  
  const [openChatInfo, setOpenChatInfo] = useState(false);

  return (
    <Box>
    <Stack direction={"row"}>
      {/* Chat List */}
      <ChatList />

      {/* Chat Detail */}
      <ChatDetail {...{openChatInfo, setOpenChatInfo} }/>

      {/* Chat Information */}
      <ChatInformaion {...{openChatInfo}}/>
    </Stack>
    </Box>
  );
};

export default HomePage;
