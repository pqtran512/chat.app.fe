import {
  Stack,
  Divider,
  Typography,
  Box,
  Link,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface TimeLineBreakProps {
  type?: string;
  text?: string;
}

const TimeLineBreak: FC<TimeLineBreakProps> = (Props) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Divider sx={{ width: "45%" }} />
      <Typography>{Props.text}</Typography>
      <Divider sx={{ width: "45%" }} />
    </Stack>
  );
};

interface TextMsgProps {
  type?: string;
  message?: string;
  incoming?: boolean;
  outgoing?: boolean;
}

const TextMsg: FC<TextMsgProps> = (props) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={props.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: props.incoming
            ? theme.palette.grey[300]
            : theme.palette.primary.light,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Typography>{props.message}</Typography>
      </Box>
      <MessageOption />
    </Stack>
  );
};

interface ImgMsgProps {
  type?: string;
  subtype?: string;
  message?: string;
  img?: string;
  incoming?: boolean;
  outgoing?: boolean;
}

const ImgMSg: FC<ImgMsgProps> = (props) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={props.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: props.incoming
            ? theme.palette.grey[300]
            : theme.palette.primary.light,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack>
          <img
            src={props.img}
            alt={props.message}
            style={{ maxHeight: 210, borderRadius: 1 }}
          ></img>
          <Typography>{props.message}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

interface ReplyMsgProps {
  type?: string;
  subtype?: string;
  reply?: string;
  message?: string;
  incoming?: boolean;
  outgoing?: boolean;
}

const ReplyMsg: FC<ReplyMsgProps> = (props) => {
  const theme = useTheme();

  return (
    <Stack direction={"row"} justifyContent={props.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: props.incoming
            ? theme.palette.grey[300]
            : theme.palette.primary.light,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack>
          <Box
            p={1}
            borderRadius={0.5}
            sx={{
              backgroundColor: props.incoming
                ? theme.palette.grey[400]
                : theme.palette.primary.dark,
            }}
          >
            <Typography>{props.message}</Typography>
          </Box>
          <Typography>{props.reply}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

interface LinkMsgProps {
  type?: string;
  subtype?: string;
  name?: string;
  url?: string;
  preview?: string;
  message?: string;
  incoming?: boolean;
  outgoing?: boolean;
}

const LinkMsg: FC<LinkMsgProps> = (props) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={props.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: props.incoming
            ? theme.palette.grey[300]
            : theme.palette.primary.light,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack>
          <Link href={props.url}>{props.url}</Link>
          <img
            src={props.preview}
            alt="preview"
            style={{ maxHeight: 100, borderRadius: 3 }}
          ></img>
          <Typography variant="caption">{props.name}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

interface DocMsgProps {
  type?: string;
  subtype?: string;
  name?: string;
  message?: string;
  incoming?: boolean;
  outgoing?: boolean;
}

const DocMsg: FC<DocMsgProps> = (props) => {
  const theme = useTheme();
  return (
    <Stack direction={"row"} justifyContent={props.incoming ? "start" : "end"}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: props.incoming
            ? theme.palette.grey[300]
            : theme.palette.primary.light,
          borderRadius: 1,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            borderRadius={0.5}
            sx={{
              backgroundColor: props.incoming
                ? theme.palette.grey[400]
                : theme.palette.primary.dark,
            }}
          >
            <InsertDriveFileIcon />
            <Typography variant="h4">{props.name}</Typography>
            <IconButton>
              <FileDownloadIcon />
            </IconButton>
          </Stack>
          <Typography>{props.message}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

interface MessageOptionsProps {}
function MessageOption() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Copy message</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
}

export { TimeLineBreak, TextMsg, ImgMSg, ReplyMsg, LinkMsg, DocMsg };
