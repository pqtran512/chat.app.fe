import { useState, FC } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Stack,
  styled,
  Badge,
  Typography,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InfoIcon from "@mui/icons-material/Info";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Height, Padding } from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyleInput = styled(TextField)(({ theme }) => ({
  "& .MuiBadge-badge": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

interface ChatDetailProps {}

const ChatDetail: FC<ChatDetailProps> = () => {
  return (
    <Stack height={"100%"} width={"auto"}>
      {/* maxHeight={"100vh"} */}
      {/* header */}
      <Box
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
        alignItems={"center"}
      >
        <Stack
          direction={"row"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
        >
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              {true ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    src={
                      "https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2024/03/21/ffa5b5dc-3fbf-41db-8b5f-d33280f96dee_1d2a602f.jpg?itok=Fpbj3u6T&v=1711010288"
                    }
                  />
                </StyledBadge>
              ) : (
                <Avatar
                  src={
                    "https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2024/03/21/ffa5b5dc-3fbf-41db-8b5f-d33280f96dee_1d2a602f.jpg?itok=Fpbj3u6T&v=1711010288"
                  }
                />
              )}

              <Stack direction={"column"}>
                <Typography variant="h4">{"Beckham"}</Typography>
                <Typography variant="subtitle2">{"Online"}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box>
            <Stack direction={"row"}>
              <IconButton>
                <PersonAddAltIcon />
              </IconButton>
              <IconButton>
                <SearchIcon />
              </IconButton>
              <IconButton>
                <CallIcon />
              </IconButton>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* body */}
      <Box sx={{ flexGrow: 1 }} width={"100%"}></Box>
      {/* footer */}
      <Box
        sx={{
          height: 100,
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack height={"100%"}>
          <Box height={"40%"}>
            <Stack></Stack>
          </Box>
          <Divider />
          <Box height={"60%"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StyleInput
                size="small"
                multiline
                margin="none"
                fullWidth
                variant="filled"
                placeholder="Nhập tin nhắn ..."
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton>
                          <ThumbUpIcon />
                        </IconButton>
                        <IconButton>
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ChatDetail;
