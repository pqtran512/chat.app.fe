import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendRequest } from "src/contexts/FriendContext";

interface FriendReceivedProps {
  id: string;
  fullname: string;
  avatar: string;
}

const FriendReceived: FC<FriendReceivedProps> = (props) => {
  const friendRequestContext = useFriendRequest();

  const handleAccept = () => {
    accept.mutate(props.id);
  };
  const handleDecline = () => {
    decline.mutate(props.id);
  };

  const accept = useMutation(friendAPI.accept, {
    onSuccess: (response) => {
      enqueueSnackbar("Accept successfully", { variant: "success" });
      getFriendRecieveds.mutate();
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail Accept!! - ${error.response.data.message}`, {
        variant: "error",
      });
    },
  });
  const decline = useMutation(friendAPI.decline, {
    onSuccess: (response) => {
      enqueueSnackbar("Decline successfully", { variant: "success" });
      getFriendRecieveds.mutate();
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail Decline!! - ${error.response.data.message}`, {
        variant: "error",
      });
    },
  });

  const getFriendRecieveds = useMutation(friendAPI.friendRecieved, {
    onSuccess: (response) => {
      if (response.data.length > 0) {
        const responseReceicedList = [];
        response.data.forEach((e) => {
          responseReceicedList.push({
            id: e.id,
            fullname: e.from_user_profile.profile[0].fullname,
            avatar: e.from_user_profile.profile[0].avatar,
          });
        });
        friendRequestContext.setFriendReceivedList(responseReceicedList);
      } else {
        friendRequestContext.setFriendReceivedList([
          { id: "", fullname: "", avatar: "" },
        ]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
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
          <Button onClick={handleDecline}>Decline</Button>
          <Button onClick={handleAccept}>Accept</Button>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FriendReceived;
