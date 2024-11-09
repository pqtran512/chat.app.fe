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
import { resolve } from "path";
import React, { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface User {
  id: string;
  name: string;
  phone: string;
}

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
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    try {
      setError(null);
      // Call API to search phone number
      const response = await fetch(
        `https://api.example.com/search?phone=${phoneNumber}`
      );
      if (!response.ok) throw new Error("User not found");

      const user: User = await response.json();
      setSearchResult(user);
    } catch (err) {
      setSearchResult(null);
      setError("No user found with this phone number.");
    }
  };

  const methods = useForm();
  // call api to take respone
  const response = {
    name: "David Beckham",
    avatar:
      "https://ntvb.tmsimg.com/assets/assets/501949_v9_bb.jpg?w=360&h=480",
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            id="searchfriend"
            label="Search friend"
            variant="standard"
          />
          <Typography variant="h6">Results</Typography>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar alt={response.name} src={response.avatar} />
              <Typography>{response.name}</Typography>
            </Stack>
            <Button variant="contained" size="small">
              Send request
            </Button>
          </Stack>
          <Button onClick={handleClose}>Cancel</Button>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default SearchFriend;
