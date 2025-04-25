import { FC } from "react";
import { Box, Avatar, styled, Badge, Stack, Typography, useTheme } from "@mui/material";
import { useChat } from "src/contexts/ChatContext";
import { useMutation, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { enqueueSnackbar } from "notistack";
import { connectChatSocket, disconnectChatSocket } from "src/utils/ws/clients/chat";
import { User } from "src/types/entities";

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
  participants?: User[];
  latest_message_sender_name?: string;
  onClick?: () => void;
}

const GroupChat: FC<GroupChatProps> = (props) => {
  const theme = useTheme();
  const { toGroupId, setToUserId, setToGroupId, setChatProfile } = useChat();
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
      participants: props?.participants
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
        backgroundColor: theme.palette.mode === 'light'
          ? toGroupId === props?.id ? "#e5efff" : "#fff"
          : toGroupId === props?.id ? "#003181" : "#303030",
        cursor: "pointer",
        borderTop: "1px solid #dddddd",
        ":hover": {
          backgroundColor: theme.palette.mode === 'light'
            ? "#f0f0f5"
            : "#666698",
          opacity: 0.9
        },
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
                  sx={{ backgroundColor: theme.palette.mode === 'dark' && "#bbbbbb" }}
                  src={props.img && `${props.img}`}
                />
              }
            >
              <Avatar
                alt="Travis Howard"
                src={props.img}
                sx={{ backgroundColor: theme.palette.mode === 'dark' && "#bbbbbb" }}
              >{props.name && props.name[0]}</Avatar>
            </Badge>

            <Stack direction={"column"} alignItems="flex-start" justifyContent="center">
              <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'light' ? 'black' : '#fff' }}>{props.name}</Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontStyle: props.msg ? "normal" : "italic", color: theme.palette.mode === 'light' ? 'black' : '#fff' }}
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
