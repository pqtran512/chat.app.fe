import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import Friend from "./Friend";

import PersonIcon from "@mui/icons-material/Person";
import { useFriendList } from "src/contexts/FriendContext";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { SearchFriendDto } from "src/types/api/dto";
import { enqueueSnackbar } from "notistack";

interface FriendsProps {}
const Friends: FC<FriendsProps> = (props) => {
  // const [input, setInput] = useState('');
  const [input, setInput] = useState({ text: "" } as SearchFriendDto);
  const { friendList, setFriendList } = useFriendList();

  const handleChangeInput = (e) => {
    // console.log(e.target.value)
    // assign 
    setInput((p) => ({...p, text: e.target.value}));
  };
  // console.log(input)

  const handleSearchFriend = () => {
    //call api to get friend
    searchFriend.mutate(input)
  };

  const searchFriend = useMutation(friendAPI.searchFriend, {
    // Xử lý responser: nếu success thì render lên UI
    onSuccess: (res) => {
      const searchFriendResults = []

      res.data.map((e) => {
        searchFriendResults.push({
          id: e.to_user_profile.id,
          fullname: e.to_user_profile.profile[0].fullname,
          avatar: e.to_user_profile.profile[0].avatar
        })
      })
      setFriendList(searchFriendResults)
    },
    // Xử lý error: nếu lôi thông báo lỗi cho người dùng
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, {variant: "error"})
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
              value={input.text}
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
