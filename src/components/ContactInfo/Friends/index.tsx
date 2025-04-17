import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState, useContext } from "react";
import Friend from "./Friend";

import PersonIcon from "@mui/icons-material/Person";
import { useFriendList } from "src/contexts/FriendContext";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { SearchFriendDto } from "src/types/api/dto";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

interface FriendsProps { }
const Friends: FC<FriendsProps> = (props) => {
  const theme = useTheme();
  const { t } = useContext(LanguageContext);
  const [input, setInput] = useState({ text: "" } as SearchFriendDto);
  const { friendList, setFriendList } = useFriendList();

  const handleChangeInput = (e) => {
    setInput((p) => ({ ...p, text: e.target.value }));
  };
  const handleSearchFriend = (e) => {
    e.preventDefault();
    searchFriend.mutate(input);
  };

  const searchFriend = useMutation(friendAPI.searchFriend, {
    onSuccess: (response) => {
      if (response.data.length > 0) {
        const searchFriendResults = [];
        response.data.map((e) => {
          searchFriendResults.push({
            id: e.to_user_profile.id,
            username: e.to_user_profile.profile[0].username,
            avatar: e.to_user_profile.profile[0].avatar,
          });
        });
        setFriendList(searchFriendResults);
      } else {
        enqueueSnackbar("Không tìm thấy", {
          variant: "info",
        });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  return (
    <Stack sx={{ height: "100vh" }}>
      <Box sx={{
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        padding: 2
      }}>
        <Stack direction={"row"}>
          <PersonIcon
            sx={{
              marginRight: 1,
              marginLeft: {
                xs: 4,
                lg: 0,
              }
            }}
          />
          <Typography variant="h4">{t.friend_list}</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="auto">
        <Box sx={{ padding: 3 }}>
          <Typography>{`${t.friend} (${friendList[0].id === "" ? 0 : friendList.length
            })`}</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030' }}>
          <Stack component={"form"} direction={"row"} padding={1} spacing={2}>
            <TextField
              size="small"
              label={t.friend_search}
              value={input.text}
              onChange={handleChangeInput}
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              onClick={handleSearchFriend}
            >
              {t.search}
            </Button>
          </Stack>
          {friendList[0].id !== "" && friendList.map((f, index) => <Friend key={index} {...f} />)}
        </Stack>
      </Box>
    </Stack>
  );
};
export default Friends;
