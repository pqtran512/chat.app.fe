import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";

interface FriendReceivedProps {
  id: string,
  fullname: string;
  avatar: string;
}

const FriendReceived: FC<FriendReceivedProps> = (props) => {

  const handleAccept = () => {
    accept.mutate(props.id);
  }
  const handleDecline = () => {
    decline.mutate(props.id);
  }

  const accept = useMutation(friendAPI.accept, {
    onSuccess: (response) => {
      // console.log(response)
      enqueueSnackbar("Accept successfully", {variant: 'success'})
    },
    onError: (error: any) => {
      enqueueSnackbar("Fail Accept!!", {variant: 'error'})
    }
  })
  const decline = useMutation(friendAPI.decline, {
    onSuccess: (response) => {
      // console.log(response)
      enqueueSnackbar("Decline successfully", {variant: 'success'})
    },
    onError: (error: any) => {
      enqueueSnackbar("Fail Decline!!", {variant: 'error'})
    }
  })


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
