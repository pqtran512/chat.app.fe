import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendList } from "src/contexts/FriendContext";

interface FriendProps {
  id: string;
  fullname: string;
  avatar: string;
}

const Friend: FC<FriendProps> = (props) => {

  const FriendListContext = useFriendList();

  const handleUnfriend = () => {
    unfriend.mutate(props.id);
  };

  const unfriend = useMutation(friendAPI.unfriend, {
    onSuccess: (response) => {
      enqueueSnackbar(`unfriend Sucessfull`, {variant: "success"});
      getFriendList.mutate()
    },
    onError: (error:any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  });
  const getFriendList = useMutation(friendAPI.friendList, {
    onSuccess: (response) => {
      if (response.data.length > 0){

        const friendList = [];
        response.data.forEach((e) => {
          friendList.push({
            id: e.to_user_profile.id,
            fullname: e.to_user_profile.profile[0].fullname,
            avatar: e.to_user_profile.profile[0].avatar,
          });
        });
        FriendListContext.setFriendList(friendList);
      }
      else {
        FriendListContext.setFriendList([{id: '', fullname: '', avatar: ''}])
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Button
        key={props.id}
        size="large"
        sx={{ justifyContent: "left", width: "100%" }}
      >
        <Avatar sx={{ marginRight: 3 }} src={props.avatar} />
        <Typography variant="h4">{props.fullname}</Typography>
      </Button>
      <Button onClick={handleUnfriend}>
        <Typography color="red">Unfriend</Typography>
      </Button>
      <Divider />
    </Stack>
  );
};

export default Friend;
