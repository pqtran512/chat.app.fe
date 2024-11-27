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
import { userAPI } from "src/api/user.api";
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
    fullname: "",
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

  const searchFriend = useMutation(userAPI.findByPhone, {
    onSuccess: (response) => {
      const { id, phone, profile } = response.data;
      if (id) {
        setUser((prev) => ({
          ...prev,
          phone: phone,
          fullname: profile[0].fullname,
          avatar: profile[0].avatar,
        }));
      } else {
        enqueueSnackbar("The user does not exist!!", { variant: "error" });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
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
      enqueueSnackbar(error, { variant: "error" });
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
      enqueueSnackbar(error, { variant: "error" });
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
              <Avatar
                alt={user.phone}
                src={`data:image/png;base64, ${user.avatar}`}
              />
              <Typography>{user.fullname}</Typography>
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
