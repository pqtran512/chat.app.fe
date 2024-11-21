import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import Friend from "./Friend";

import PersonIcon from "@mui/icons-material/Person";
import { useFriendList } from "src/contexts/FriendContext";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";

interface FriendsProps {}
const Friends: FC<FriendsProps> = (props) => {
  const [input, setInput] = useState("");
  const { friendList, setFriendList } = useFriendList();

  const handleChangeInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearchFriend = () => {
    searchFriend.mutate(input);
  };

  const searchFriend = useMutation(friendAPI.searchFriend, {
    // Xử lý responser: nếu success thì render lên UI
    onSuccess: (response) => {
      console.log(response);
    },
    // Xử lý error: nếu lôi thông báo lỗi cho người dùng
    onError: (error: any) => {
      console.log(error);
    },
  });

  return (
    <Stack>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <PersonIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Friend list</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
        <Box sx={{ padding: 3 }}>
          <Typography>{`Contact (${
            friendList[0].id === "" ? 0 : friendList.length
          })`}</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          <Stack direction={"row"} padding={1} spacing={2}>
            <TextField
              size="small"
              label="Search friend"
              value={input}
              onChange={handleChangeInput}
            />
            <Button
              size="small"
              variant="contained"
              onClick={handleSearchFriend}
            >
              Search
            </Button>
          </Stack>
          {friendList[0].id !== "" && friendList.map((f) => <Friend {...f} />)}
        </Stack>
      </Box>
    </Stack>
  );
};
export default Friends;
