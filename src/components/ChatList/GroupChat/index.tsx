import { FC } from "react";
import { Box, Avatar, styled, Badge, Stack, Typography } from "@mui/material";
import { useChat } from "src/contexts/ChatContext";
import { useMutation, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { enqueueSnackbar } from "notistack";
import { connectChatSocket, disconnectChatSocket } from "src/utils/ws/clients/chat";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface GroupChatProps {
  id?: string;
  chatboxId?: string;
  group?: boolean;
  img?: string;
  name?: string;
  msg?: string;
  time?: string;
  unread?: number;
  online?: boolean;
  memberCount?: number;
  newMessage?: boolean;
  ownerId?: string;
  seen?: boolean;
  latest_message_sender_name?: string;
  onClick?: () => void;
}

const GroupChat: FC<GroupChatProps> = (props) => {
  const { toGroupId, setToUserId, setToGroupId, setChatProfile } =
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
    disconnectChatSocket()
    connectChatSocket(props.chatboxId);

    setToUserId("");
    setToGroupId(props.id);
    // setChatboxId(props.chatboxId);
    setChatProfile({
      id: props.id,
      name: props.name,
      isGroupChat: true,
      avatar: props.img,
      memberCount: props.memberCount,
      groupOwnerId: props.ownerId,
    });

    if (props.newMessage) {
      setSeen.mutate(props.chatboxId);
    }

    if (props.onClick) {
      props.onClick(); // Gọi `onClick` nếu được truyền từ `ChatList`
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: toGroupId === props?.id ? "#e5efff" : "#fff",
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
          alignItems="start"
          justifyContent={"space-between"}
          p={0.6}
          width={"100%"}
        >
          <Stack direction={"row"} spacing={1} alignItems={"flex-start"}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  alt="Remy Sharp"
                  src={props.img && `${props.img}`}
                />
              }
            >
              <Avatar
                alt="Travis Howard"
                src={props.img}
              >{props.name && props.name[0]}</Avatar>
            </Badge>

            <Stack direction={"column"} alignItems="flex-start" justifyContent="center">
              <Typography variant="subtitle2">{props.name}</Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontStyle: props.msg ? "normal" : "italic" }}
              >{props.msg ? props.latest_message_sender_name + ": " + props.msg : "Chưa có tin nhắn"}
              </Typography>
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

export default GroupChat;
