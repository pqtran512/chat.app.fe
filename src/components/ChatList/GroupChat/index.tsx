import { FC, useEffect } from "react";
import { Box, Avatar, styled, Badge, Stack, Typography } from "@mui/material";
import { useChat } from "src/contexts/ChatContext";
import { useMutation, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "src/contexts/AuthContext";

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
}

const GroupChat: FC<GroupChatProps> = (props) => {
  const { toGroupId, setToUserId, setToGroupId, setChatProfile, setChatboxId } =
    useChat();
  const queryClient = useQueryClient();
  const { userId } = useAuth();

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
          alignItems="center"
          justifyContent={"space-between"}
          p={0.6}
          width={"100%"}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  alt="Remy Sharp"
                  src={`data:image/png;base64, ${props.img}`}
                />
              }
            >
              <Avatar
                alt="Travis Howard"
                src={`data:image/png;base64, ${props.img}`}
              />
            </Badge>

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

export default GroupChat;
