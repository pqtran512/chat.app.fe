import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useMutation } from "react-query";
import { authAPI } from "src/api";
import { friendAPI } from "src/api/friend.api";
import { useFriendRequest } from "src/contexts/FriendContext";

interface SearchFriendProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFriend: FC<SearchFriendProps> = (props) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={props.open}>
      <DialogTitle>Add friend</DialogTitle>
      <Divider />
      <DialogContent>
        <SearchFriendForm handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
};

const SearchFriendForm = ({ handleClose }) => {
  const [phoneInput, setPhoneInput] = useState("");
  const [user, setUser] = useState({
    phone: "",
    avatar:
      "https://www.pngkit.com/png/detail/115-1150714_avatar-single-customer-view-icon.png",
  });

  const friendRequestContext = useFriendRequest();

  const handleChangeSearch = (e) => {
    setPhoneInput(e.target.value);
  };

  const onSearch = () => {
    searchFriend.mutate(phoneInput);
  };

  const searchFriend = useMutation(authAPI.checkphone, {
    onSuccess: (response) => {
      const isUserExist = response.data;
      if (isUserExist) {
        setUser((prev) => ({ ...prev, phone: phoneInput }));
      } else {
        enqueueSnackbar("The user does not exist!!", { variant: "error" });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.respone.data.message, { variant: "error" });
    },
  });

  const handleAddFriend = () => {
    addFriend.mutate({ to_user_phone: phoneInput });
    handleClose();
  };
  const addFriend = useMutation(friendAPI.addFriend, {
    onSuccess: (responese) => {
      getFriendSents.mutate();
      enqueueSnackbar(`Sent friend request to ${phoneInput}`, {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(
        `You have already sent friend request to ${phoneInput} - ${error.respone.data.message}`,
        { variant: "warning" }
      );
    },
  });

  const getFriendSents = useMutation(friendAPI.friendSent, {
    onSuccess: (response) => {
      if (response.data.length > 0) {
        const responeSentList = [];
        response.data.forEach((e) => {
          responeSentList.push({
            id: e.id,
            fullname: e.to_user_profile.profile[0].fullname,
            avatar: e.to_user_profile.profile[0].avatar,
          });
        });
        friendRequestContext.setFriendSentList(responeSentList);
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
    <Stack spacing={3}>
      <TextField
        value={phoneInput}
        onChange={handleChangeSearch}
        id="searchfriend"
        label="Search friend"
        variant="standard"
      />
      <Button onClick={onSearch}>Search</Button>
      <Typography variant="h6">Results</Typography>
      {user.phone ? (
        <Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar alt={user.phone} src={user.avatar} />
              <Typography>{user.phone}</Typography>
            </Stack>
            <Button variant="contained" size="small" onClick={handleAddFriend}>
              Add Friend
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box></Box>
      )}
      <Button onClick={handleClose}>Cancel</Button>
    </Stack>
  );
};

export default SearchFriend;
