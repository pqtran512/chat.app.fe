import { Box, Stack } from "@mui/material";
import { useState, FC } from "react";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";
import ChatInformaion from "src/components/ChatInfomation";
import { FriendListProvider } from "src/contexts/FriendContext";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const [openChatInfo, setOpenChatInfo] = useState(false);

  return (
    <FriendListProvider>
      <Box>
        <Stack direction={"row"}>
          {/* Chat List */}
          <ChatList />

          {/* Chat Detail */}
          <ChatDetail {...{ openChatInfo, setOpenChatInfo }} />

          {/* Chat Information */}
          <ChatInformaion {...{ openChatInfo }} />
        </Stack>
      </Box>
    </FriendListProvider>
  );
};

export default HomePage;
