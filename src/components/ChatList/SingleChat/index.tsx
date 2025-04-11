import { FC } from "react";
import { Box, Avatar, styled, Badge, Stack, Typography } from "@mui/material";
import { useChat } from "src/contexts/ChatContext";
import { useMutation, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { enqueueSnackbar } from "notistack";

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

interface SingleChatProps {
  id?: string;
  chatboxId?: string;
  group?: boolean;
  img?: string;
  name?: string;
  msg?: string;
  time?: string;
  unread?: number;
  online?: boolean;
  newMessage?: boolean;
  onSetSeen?: (chatboxId: string, seen: boolean) => void;
  onClick?: () => void;
}

const SingleChat: FC<SingleChatProps> = (props) => {
  const { toUserId, setToUserId, setToGroupId, setChatProfile } =
    useChat();
  const queryClient = useQueryClient();

  const setSeen = useMutation(chatAPI.setChatboxSeen, {
    onSuccess: (res) => {
      if (res.data) {
        queryClient.invalidateQueries(["GetChatBoxListByUser"]);
      }
    },
    onError: (err: any) => {
      enqueueSnackbar(err, { variant: "error" });
    },
  });

  const handleClick = () => {
    setToUserId(props.id);
    setToGroupId("");
    // setChatboxId(props.chatboxId);
    setChatProfile({
      id: props.id,
      name: props.name,
      isGroupChat: false,
      avatar: props.img,
      groupOwnerId: "",
    });

    if (props.newMessage) {
      setSeen.mutate(props.chatboxId);
    }

    if (props.onClick) {
      props.onClick();  // Gọi `onClick` nếu được truyền từ `ChatList`
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: toUserId === props?.id ? "#e5efff" : "#fff",
        cursor: "pointer",
        ":hover": { backgroundColor: "#f0f0f5" },
      }}
      p={1}
      onClick={handleClick}
    >
      <Stack direction="row">
        <Stack
          direction={"row"}
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          p={0.6}
          width={"100%"}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            {/* {props.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={props.img} />
              </StyledBadge>
            ) : (
              <Avatar src={props.img} />
            )} */}
            <Avatar src={props.img && `data:image/png;base64, ${props.img}`} />

            <Stack direction={"column"}>
              <Typography variant="subtitle2">{props.name}</Typography>
              <Typography variant="subtitle1">{props.msg}</Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} alignItems="center">
            <Typography sx={{ fontWeight: 300 }}>{props.time}</Typography>
            {props.newMessage && (
              <Badge color="primary" badgeContent=""></Badge>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SingleChat;
