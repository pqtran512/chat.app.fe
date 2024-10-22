import { Avatar, Box, IconButton, Stack, Typography } from "@mui/material";
import { FC } from "react";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import PushPinIcon from "@mui/icons-material/PushPin";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

interface ChatInformationProps {
  openChatInfo: boolean;
}

const ChatInformaion: FC<ChatInformationProps> = (props) => {
  return (
    <Box sx={{ width: 500 }} display={props.openChatInfo ? "inline" : "none"}>
      <Stack>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            height: 60,
            width: "100%",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Typography variant="h4">Chat Information</Typography>
        </Box>

        <Box
          sx={{
            padding: 2,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
            alignContent: "center",
            justifyItems: "center",
          }}
        >
          <Stack spacing={2} alignI={"center"}>
            <Avatar
              sx={{ width: 60, height: 60 }}
              src="https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2024/03/21/ffa5b5dc-3fbf-41db-8b5f-d33280f96dee_1d2a602f.jpg?itok=Fpbj3u6T&v=1711010288"
            ></Avatar>
            <Typography variant="h4">Beckham</Typography>
            <Stack direction={"row"}>
              <IconButton>
                <NotificationsOffIcon />
              </IconButton>
              <IconButton>
                <PushPinIcon />
              </IconButton>
              <IconButton>
                <GroupAddIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatInformaion;
