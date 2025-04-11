import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { error } from "console";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendRequest } from "src/contexts/FriendContext";

interface FriendSentProps {
  id: string;
  fullname: string;
  avatar: string;
}

const FriendSent: FC<FriendSentProps> = (props) => {
  const friendRequestContext = useFriendRequest();

  const handleCancel = () => {
    // cancel.mutate(props.id);
    cancel.mutate({ 
      userId: '1',
      friendId: '2'
    }); // fix - tran
  };

  const cancel = useMutation(friendAPI.reject, {
    onSuccess: (response) => {
      enqueueSnackbar("Cancel successfull", { variant: "success" });
      // getFriendSents.mutate('1'); // fix - tran
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail Cancel!! - ${error}`, {
        variant: "error",
      });
    },
  });

  // const getFriendSents = useMutation(friendAPI.friendSent, {
  //   onSuccess: (response) => {
  //     if (response.data.length > 0) {
  //       const responseSentList = [];
  //       response.data.forEach((e) => {
  //         responseSentList.push({
  //           id: e.id,
  //           fullname: e.to_user_profile.profile[0].fullname,
  //           avatar: e.to_user_profile.profile[0].avatar,
  //         });
  //       });
  //       friendRequestContext.setFriendSentList(responseSentList);
  //     } else {

  //       friendRequestContext.setFriendSentList([
  //         { id: "", fullname: "", avatar: "" },
  //       ]);
  //     }
  //   },
  //   onError: (error: any) => {
  //     enqueueSnackbar(error, { variant: "error" });
  //   },
  // });

  return (
    <Box key={props.id}>
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

        <Button onClick={handleCancel}>Cancel</Button>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FriendSent;
