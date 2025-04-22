import { Box, Stack, Theme, useMediaQuery } from "@mui/material";
import { useState, FC, useEffect } from "react";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";
import ContactBar from "src/components/Contactbar";
import { useTabs } from "src/contexts/TabsContext";
import ContactInfo from "src/components/ContactInfo";
import { connectChatSocket, onReceiveChat } from "src/utils/ws/clients/chat";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";
import { useQuery, useQueryClient } from "react-query";
import { friendAPI } from "src/api";
import { useChat } from "src/contexts/ChatContext";

interface HomePageProps { }

const HomePage: FC<HomePageProps> = (props) => {
  const { showChatBoxList, showChatDetail, showContactInfo, showContactList } = useTabs();
  const { setChatboxId } = useChat();
  const [chosen, setChosen] = useState(0);
  const [openChatInfo, setOpenChatInfo] = useState(false);
  const queryClient = useQueryClient();

  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<boolean>(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    // connectChatSocket();
    onReceiveChat((data: ReceiveMessageDto) => {
      if (data.conversationId) {
        queryClient.invalidateQueries(["GetChatBoxListByUser"]);
        queryClient.invalidateQueries(["ChatDetail"]);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedChat) {
      setChatboxId(selectedChat);
    }
  }, [selectedChat]);

  return (
    <Box>
      {isMobile ? (
        // Giao diện cho Mobile/Tablet
        <>
          {showChatBoxList && !selectedChat && <ChatList onSelectChat={setSelectedChat} />}
          {showChatDetail && selectedChat !== null && (
            <ChatDetail {...{ openChatInfo, setOpenChatInfo }} onBack={() => setSelectedChat(null)} />
          )}
          {showContactList && !selectedContact && <ContactBar chosen={chosen} setChosen={setChosen} onSelectContact={() => setSelectedContact(true)} />}
          {showContactInfo && selectedContact && <ContactInfo chosen={chosen} onBack={() => setSelectedContact(false)} />}
        </>
      ) : (
        <Stack direction={"row"}>
          {showChatBoxList && <ChatList onSelectChat={setSelectedChat} />}
          {showContactList && (
            <ContactBar chosen={chosen} setChosen={setChosen} />
          )}
          {showChatDetail && (
            <ChatDetail {...{ openChatInfo, setOpenChatInfo }} />
          )}
          {showContactInfo && <ContactInfo chosen={chosen} />}
        </Stack>
      )}
    </Box>
  );
};

export default HomePage;
