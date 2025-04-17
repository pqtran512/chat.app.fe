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
import React, { FC, useState, useContext } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { userAPI } from "src/api/user.api";
import { useFriendRequest } from "src/contexts/FriendContext";
import { LanguageContext } from "src/language/LanguageProvider";

interface SearchFriendProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFriend: FC<SearchFriendProps> = (props) => {
  const { t } = useContext(LanguageContext);

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open} transitionDuration={0}>
      <DialogTitle>{t.search}</DialogTitle>
      <Divider />
      <DialogContent>
        <SearchFriendForm handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
};

const SearchFriendForm = ({ handleClose }) => {
  const { t } = useContext(LanguageContext);
  const [phoneInput, setPhoneInput] = useState("");
  const [user, setUser] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  const friendRequestContext = useFriendRequest();

  const handleChangeSearch = (e) => {
    setPhoneInput(e.target.value);
  };

  const onSearch = () => {
    searchFriend.mutate(phoneInput);
  };

  const searchFriend = useMutation(userAPI.findUser, {
    onSuccess: (response) => {
      console.log(response.data);
      const user = response.data.users[0];

      if (user?.id) {
        setUser((prev) => ({
          ...prev,
          phone: user.phone,
          username: user.username,
          avatar: user.avatar,
        }));

      } else {
        enqueueSnackbar("Không tìm thấy tài khoản", { variant: "error" });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleAddFriend = () => {
    addFriend.mutate({
      // to_user_phone: phoneInput 
      userId: 1,
      friendId: 2
    }); // fix - tran

    handleClose();
  };

  const addFriend = useMutation(friendAPI.addFriend, {
    onSuccess: (responese) => {
      // getFriendSents.mutate('1'); // fix - tran
      enqueueSnackbar(`Gửi lời mời kết bạn tới ${phoneInput}`, {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  // const getFriendSents = useMutation(friendAPI.friendSent, {
  //   onSuccess: (response) => {
  //     if (response.data.length > 0) {
  //       const responeSentList = [];
  //       response.data.forEach((e) => {
  //         responeSentList.push({
  //           id: e.id,
  //           username: e.to_user_profile.profile[0].username,
  //           avatar: e.to_user_profile.profile[0].avatar,
  //         });
  //       });
  //       friendRequestContext.setFriendSentList(responeSentList);
  //     } else {
  //       friendRequestContext.setFriendReceivedList([
  //         { id: "", username: "", avatar: "" },
  //       ]);
  //     }
  //   },
  //   onError: (error: any) => {
  //     enqueueSnackbar(error, { variant: "error" });
  //   },
  // });

  return (
    <Stack spacing={3}>
      <TextField
        value={phoneInput}
        onChange={handleChangeSearch}
        id="searchfriend"
        label={t.search}
        variant="standard"
      />
      <Button onClick={onSearch}>{t.search}</Button>
      <Typography variant="h6">{t.result}</Typography>
      {user.phone ? (
        <Box>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar
                alt={user.phone}
                src={user.avatar && `data:image/jpeg;base64, ${user.avatar}`}
              />
              <Typography>{user.username}</Typography>
            </Stack>
            <Button variant="contained" size="small" onClick={handleAddFriend}>
              {t.friend_add}
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box></Box>
      )}
      <Button onClick={handleClose}>{t.back}</Button>
    </Stack>
  );
};

export default SearchFriend;
