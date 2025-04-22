import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useContext } from "react";
import { useMutation } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { friendAPI } from "src/api/friend.api";
import { useAuth } from "src/contexts/AuthContext";
import { useFriendRequest } from "src/contexts/FriendContext";
import { LanguageContext } from "src/language/LanguageProvider";

interface FriendReceivedProps {
  id: string;
  username: string;
  avatar: string;
}

const FriendReceived: FC<FriendReceivedProps> = (props) => {
  const {userId} = useAuth()
  const friendRequestContext = useFriendRequest();
  const { t } = useContext(LanguageContext);

  const handleAccept = () => {
    // accept.mutate(props.id);
    accept.mutate({
      userId: Number(userId),
      friendId: Number(props.id)
    });
  };
  const handleReject = () => {
    // reject.mutate(props.id);
    reject.mutate({
      userId: Number(userId),
      friendId: Number(props.id)
    });
  };

  const accept = useMutation(friendAPI.accept, {
    onSuccess: (response) => {
      enqueueSnackbar("Accept successfully", { variant: "success" });

      getFriendReceived.mutate(Number(userId));

      createChat.mutate({
        type: "private",
        creator_id: Number(userId),
        participants: [Number(userId), Number(props.id)],
      });
    },
    
    onError: (error: any) => {
      enqueueSnackbar(`Fail Accept!! - ${error}`, {
        variant: "error",
      });
    },
  });
  const reject = useMutation(friendAPI.reject, {
    onSuccess: (response) => {
      enqueueSnackbar("Decline successfully", { variant: "success" });
      getFriendReceived.mutate(Number(userId));
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail Decline!! - ${error}`, {
        variant: "error",
      });
    },
  });

  const getFriendReceived = useMutation(friendAPI.friendRecieved, {
    onSuccess: (response) => {
      if (response.data && response.data.length > 0) {
        const responseReceivedList = [];

        response.data.forEach((e) => {
          responseReceivedList.push({
            // id: e.friend_id,
            // username: e.from_user_profile.profile[0].username,
            // avatar: e.from_user_profile.profile[0].avatar,

            id: e.id,
            username: "Lisa", // fix - tran
            avatar: "Lisa"
          });
        });

        friendRequestContext.setFriendReceivedList(responseReceivedList);

      } else {
        friendRequestContext.setFriendReceivedList([
          { id: "", username: "", avatar: "" },
        ]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const createChat = useMutation(chatAPI.createChat, {
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ margin: 1 }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar sx={{ marginRight: 3 }} src={props.avatar} />
          <Typography variant="h4">{props.username}</Typography>
        </Stack>
        <Stack direction={"row"}>
          <Button onClick={handleAccept}>{t.accept}</Button>
          <Button onClick={handleReject}>{t.reject}</Button>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FriendReceived;
