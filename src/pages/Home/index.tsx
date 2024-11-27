import { Box, Stack } from "@mui/material";
import { useState, FC, useEffect } from "react";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";
import ContactBar from "src/components/Contactbar";
import { useTabs } from "src/contexts/TabsContext";
import ContactInfo from "src/components/ContactInfo";
import { onReceiveChat } from "src/utils/ws/clients/chat.";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";
import { useQueryClient } from "react-query";
import { useChat } from "src/contexts/ChatContext";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { showChatBoxList, showChatDetail, showContactInfo, showContactList } =
    useTabs();

  const [chosen, setChosen] = useState(0);
  const [openChatInfo, setOpenChatInfo] = useState(false);
  const queryClient = useQueryClient();
  const { toUserId, toGroupId, chatboxId } =
    useChat();

  useEffect(() => {
    onReceiveChat((data: ReceiveMessageDto) => {
      console.log(data)
      if (data.payloadId) {
        queryClient.invalidateQueries(["GetChatBoxListByUser"]);
        queryClient.invalidateQueries(["ChatDetail"]);
      }
    });
  }, []);
  

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
