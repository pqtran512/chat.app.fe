import { FC, useState } from "react";

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
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const StyleInput = styled(TextField)(({ theme }) => ({
  "& .MuiBadge-badge": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

interface FooterProps {}

const Footer: FC<FooterProps> = () => {

  const [openPicker, setOpenPicker] = useState(false);
  
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack height={"100%"}>
        <Box>
          <Stack direction={"row"}>
            <IconButton title="Image">
              <PhotoCameraBackIcon />
            </IconButton>
            <IconButton title="File">
              <AttachFileIcon />
            </IconButton>
            <IconButton title="Send profile">
              <ContactMailIcon />
            </IconButton>
            <IconButton title="Format">
              <FormatShapesIcon />
            </IconButton>
            <IconButton title="more">
              <MoreHorizIcon />
            </IconButton>
          </Stack>
        </Box>
        <Divider />
        <Box>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Stack sx={{width: "100%"}}>
              <Box zIndex={10} position={"fixed"} bottom={50} right={110}
              sx={{display: openPicker ? "inline" : "none"}}>
                <Picker
                  data={data}
                  onEmojiSelect={console.log}
                  theme={"light"}
                />
              </Box>
              <StyleInput
                size="small"
                multiline
                margin="none"
                fullWidth
                variant="outlined"
                placeholder="Nhập tin nhắn ..."
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton title="Icon Picker" onClick={() => setOpenPicker((prev) => !prev)}>
                          <InsertEmoticonIcon/>
                        </IconButton>
                        <IconButton title="Send like icon">
                          <ThumbUpIcon />
                        </IconButton>
                        <IconButton title="Send Message">
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
