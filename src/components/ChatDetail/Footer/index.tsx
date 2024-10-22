import { FC } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Divider, IconButton, InputAdornment, Stack, TextField } from "@mui/material";
import styled from "@emotion/styled";

const StyleInput = styled(TextField)(({ theme }) => ({
    "& .MuiBadge-badge": {
      paddingTop: "12px",
      paddingBottom: "12px",
    },
  }));

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
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
              <IconButton>
                <PhotoCameraBackIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <IconButton>
                <ContactMailIcon />
              </IconButton>
              <IconButton>
                <FormatShapesIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Stack>
          </Box>
          <Divider />
          <Box>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
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
    )
}

export default Footer;