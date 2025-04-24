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
import { useAuth } from "src/contexts/AuthContext";
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
  const { userId } = useAuth();
  const [user, setUser] = useState({
    id: "",
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
      const data = response.data?.users;
      const user = data ? data[0] : null;

      if (user?.id) {
        setUser((prev) => ({
          ...prev,
          id: user.id,
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

  const handleAddFriend = (friend_id: string) => {
    addFriend.mutate({
      userId: Number(userId),
      friendId: Number(friend_id)
    });

    handleClose();
  };

  const addFriend = useMutation(friendAPI.addFriend, {
    onSuccess: (responese) => {
      getFriendSents.mutate(Number(userId));
      enqueueSnackbar(`Gửi lời mời kết bạn tới ${phoneInput}`, {
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
            id: e.friend_id,
            // username: e.username,
            avatar: e.avatar,
            username: 'Gia Linh',
          });
        });
        friendRequestContext.setFriendSentList(responeSentList);
      } else {
        friendRequestContext.setFriendReceivedList([
          { id: "", username: "", avatar: "" },
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
                src={user.avatar}
              />
              <Typography>{user.username}</Typography>
            </Stack>
            <Button variant="contained" size="small" onClick={() => handleAddFriend(user.id)}>
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
