import { useState, FC, useEffect } from "react";
import { Box, IconButton, Stack, useMediaQuery } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";
import { useChat } from "src/contexts/ChatContext";
import { GroupMemberProvider } from "src/contexts/GroupMemberContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ChatDetailProps {
  openChatInfo: boolean;
  setOpenChatInfo: React.Dispatch<React.SetStateAction<boolean>>;
  onBack?: () => void;
}

const ChatDetail: FC<ChatDetailProps> = (props) => {
  const { openChatInfo, setOpenChatInfo, onBack } = props;
  const { chatboxId, chatProfile } = useChat();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  
  return (
    <GroupMemberProvider>
      <Stack
        onClick={() => {
          // console.log("chat box", chatboxId);
          // console.log("new message", chatProfile.newMessage);
        }}
        maxHeight={"100vh"}
        width={"100%"}
      >
         {isMobile && onBack && (
          <IconButton
            sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {/* maxHeight={"100vh"} */}
        {/* header */}
        <Header {...props} />

        {/* body */}
        <Messages />

        {/* footer */}
        <Footer />
      </Stack>
    </GroupMemberProvider>
  );
};

export default ChatDetail;
