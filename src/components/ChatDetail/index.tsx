import { useState, FC } from "react";
import { Box, Stack } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";
import { useChat } from "src/contexts/ChatContext";

interface ChatDetailProps {
  openChatInfo: boolean;
  setOpenChatInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatDetail: FC<ChatDetailProps> = (props) => {
  const { chatboxId, chatProfile } = useChat();
  return (
    <Stack
      onClick={() => {
        console.log("chat box", chatboxId);
        console.log("new message", chatProfile.newMessage);
      }}
      maxHeight={"100vh"}
      width={"100%"}
    >
      {/* maxHeight={"100vh"} */}
      {/* header */}
      <Header {...props} />

      {/* body */}
      <Messages />

      {/* footer */}
      <Footer />
    </Stack>
  );
};

export default ChatDetail;
