import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { error } from "console";
import { enqueueSnackbar } from "notistack";
import { FC, useContext } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useAuth } from "src/contexts/AuthContext";
import { useFriendRequest } from "src/contexts/FriendContext";
import { LanguageContext } from "src/language/LanguageProvider";

interface FriendSentProps {
  id: string;
  username: string;
  avatar: string;
}

const FriendSent: FC<FriendSentProps> = (props) => {
  const friendRequestContext = useFriendRequest();
  const { userId } = useAuth()
  const { t } = useContext(LanguageContext);

  const handleCancel = () => {
    // cancel.mutate(props.id);
    cancel.mutate({
      userId: Number(userId),
      friendId: Number(props.id)
    });
  };

  const cancel = useMutation(friendAPI.cancel, {
    onSuccess: (response) => {
      enqueueSnackbar("Cancel successfull", { variant: "success" });
      getFriendSent.mutate(Number(userId));
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail Cancel!! - ${error}`, {
        variant: "error",
      });
    },
  });

  const getFriendSent = useMutation(friendAPI.friendSent, {
    onSuccess: (response) => {
      if (response.data && response.data.length > 0) {
        const responseSentList = [];

        response.data.forEach((e) => {
          responseSentList.push({
            id: e.id,
            // username: e.to_user_profile.profile[0].username,
            // avatar: e.to_user_profile.profile[0].avatar,
            username: "Jennie", // fix - tran
            avatar: "Jennie"
          });
        });
        friendRequestContext.setFriendSentList(responseSentList);
      } else {

        friendRequestContext.setFriendSentList([
          { id: "", username: "", avatar: "" },
        ]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

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
          <Typography variant="h4">{props.username}</Typography>
        </Stack>

        <Button onClick={handleCancel}>{t.cancel}</Button>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FriendSent;
