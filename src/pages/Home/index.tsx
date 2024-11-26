import { Box, Stack } from "@mui/material";
import { useState, FC } from "react";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";
import ChatInformaion from "src/components/ChatInfomation";
import ContactBar from "src/components/Contactbar";
import { useTabs } from "src/contexts/TabsContext";
import ContactInfo from "src/components/ContactInfo";
import { enqueueSnackbar } from "notistack";
import { useFriendList } from "src/contexts/FriendContext";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { showChatBoxList, showChatDetail, showContactInfo, showContactList } =
    useTabs();

  const [chosen, setChosen] = useState(0);
  const [openChatInfo, setOpenChatInfo] = useState(false);

  return (
    <Box>
      <Stack direction={"row"}>
        {showChatBoxList && <ChatList />}
        {showContactList && (
          <ContactBar chosen={chosen} setChosen={setChosen} />
        )}
        {showChatDetail && (
          <ChatDetail {...{ openChatInfo, setOpenChatInfo }} />
        )}
        {showContactInfo && <ContactInfo chosen={chosen} />}
      </Stack>
    </Box>
  );
};

export default HomePage;
