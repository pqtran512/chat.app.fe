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
import { error } from "console";
import { enqueueSnackbar } from "notistack";
import React, { FC, useState } from "react";
import { useMutation } from "react-query";
import { authAPI } from "src/api";
import { friendAPI } from "src/api/friend.api";

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

  const handleChangeSearch = (e) => {
    setPhoneInput(e.target.value);
  };

  // call api to check user exists

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
      enqueueSnackbar(error.respone.data.message);
    },
  });

  // call api to send request
  const handleAddFriend = () => {
    // alert("Add friend")
    console.log(phoneInput)
    addFriend.mutate({"to_user_phone": phoneInput});
  };
  const addFriend = useMutation(friendAPI.addFriend, {
    onSuccess: (responese) => {
      console.log(responese);
      enqueueSnackbar(`Sent friend request to ${phoneInput}`, {variant:"success"})
    },
    onError: (error:any) => {
      // enqueueSnackbar(error.respone.data.message, {variant: "error"})
      enqueueSnackbar(`You have already sent friend request to ${phoneInput}`, {variant:"warning"})
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
