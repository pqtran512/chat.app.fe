import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useContext } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendRequest } from "src/contexts/FriendContext";
import { LanguageContext } from "src/language/LanguageProvider";

interface FriendReceivedProps {
  id: string;
  fullname: string;
  avatar: string;
}

const FriendReceived: FC<FriendReceivedProps> = (props) => {
  const friendRequestContext = useFriendRequest();
    const { t } = useContext(LanguageContext);

  const handleAccept = () => {
    // accept.mutate(props.id);
    accept.mutate({ 
      userId: '1',
      friendId: '2'
    }); // fix - tran
  };
  const handleReject = () => {
    // reject.mutate(props.id);
    reject.mutate({ 
      userId: '1',
      friendId: '2'
    }); // fix - tran
  };

  const accept = useMutation(friendAPI.accept, {
    onSuccess: (response) => {
      enqueueSnackbar("Accept successfully", { variant: "success" });
      getFriendRequests.mutate('1'); // fix - tran
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
      getFriendRequests.mutate('1'); // fix - tran
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail Decline!! - ${error}`, {
        variant: "error",
      });
    },
  });

  const getFriendRequests = useMutation(friendAPI.friendRequests, {
    onSuccess: (response) => {
      if (response.data && response.data.length > 0) {

        const responseReceivedList = [];
        response.data.forEach((e) => {

          responseReceivedList.push({
            id: e.friend_id,
            fullname: e.from_user_profile.profile[0].fullname,
            avatar: e.from_user_profile.profile[0].avatar,
          });
        });

        friendRequestContext.setFriendReceivedList(responseReceivedList);

      } else {
        friendRequestContext.setFriendReceivedList([
          { id: "", fullname: "", avatar: "" },
        ]);
      }
    },
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
          <Typography variant="h4">{props.fullname}</Typography>
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
