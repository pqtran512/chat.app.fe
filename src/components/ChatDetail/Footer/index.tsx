import { FC, useState, useContext } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@mui/material/styles";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useChat } from "src/contexts/ChatContext";
import { useMutation, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { enqueueSnackbar } from "notistack";
import { ChatLogContentTypeCode } from "src/utils/enums";
import { LanguageContext } from "src/language/LanguageProvider";

const StyleInput = styled(TextField)(({ theme }) => ({
  "& .MuiBadge-badge": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

interface FooterProps { }

const Footer: FC<FooterProps> = () => {
  const theme = useTheme();
    const { t } = useContext(LanguageContext);
  const [openPicker, setOpenPicker] = useState(false);
  const { toUserId, toGroupId, chatboxId, chatProfile } = useChat();
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const insertChatLog = useMutation(chatAPI.insertChatlog, {
    onSuccess: (response) => {
      const { id, content, owner_id, to_user, to_group, content_type } =
        response.data;

      if (id) {
        setText('');
        queryClient.invalidateQueries(["GetChatBoxListByUser"]);
        queryClient.invalidateQueries([
          "ChatDetail",
          chatboxId,
          toGroupId,
          toUserId,
        ]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, {
        variant: "error",
      });
    },
  });

  const handleSendMessage = () => {
    if (!toUserId && !toGroupId) {
      return;
    }
    const newDate = new Date();
    insertChatLog.mutate({
      content: text,
      content_type_code: ChatLogContentTypeCode.TEXT,
      created_date: newDate,
      is_group_chat: chatProfile.isGroupChat ? true : false,
      to_id: chatProfile.isGroupChat ? toGroupId : toUserId,
    });
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      handleSendMessage();
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack height={"100%"}>
        <Box>
          <Stack direction={"row"}>
            <IconButton title="Image">
              <PhotoCameraBackIcon sx={{ color: theme.palette.mode === 'light' ? '#575757' : '#fff' }} />
            </IconButton>
            <IconButton title="File">
              <AttachFileIcon sx={{ color: theme.palette.mode === 'light' ? '#575757' : '#fff' }} />
            </IconButton>
            <IconButton title="Send profile">
              <ContactMailIcon sx={{ color: theme.palette.mode === 'light' ? '#575757' : '#fff' }} />
            </IconButton>
            <IconButton title="Format">
              <FormatShapesIcon sx={{ color: theme.palette.mode === 'light' ? '#575757' : '#fff' }} />
            </IconButton>
            <IconButton title="more">
              <MoreHorizIcon sx={{ color: theme.palette.mode === 'light' ? '#575757' : '#fff' }} />
            </IconButton>
          </Stack>
        </Box>
        <Divider />
        <Box>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Stack sx={{ width: "100%" }}>
              <Box
                zIndex={10}
                position={"fixed"}
                bottom={50}
                right={110}
                sx={{ display: openPicker ? "inline" : "none" }}
              >
                <Picker
                  data={data}
                  onEmojiSelect={console.log}
                  theme={theme.palette.mode}
                />
              </Box>
              <StyleInput
                size="medium"
                multiline={true}
                maxRows={4}
                margin="none"
                fullWidth
                variant="outlined"
                placeholder={t.enter_msg}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                onKeyDown={keyPress}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          title="Icon Picker"
                          onClick={() => setOpenPicker((prev) => !prev)}
                        >
                          <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton title="Send like icon">
                          <ThumbUpIcon />
                        </IconButton>
                        <IconButton
                          onClick={handleSendMessage}
                          title="Send Message"
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
