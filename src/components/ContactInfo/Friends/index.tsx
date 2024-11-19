import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import Friend from "./Friend";

import PersonIcon from "@mui/icons-material/Person";
import { useFriendList } from "src/contexts/FriendContext";

interface FriendsProps {}
const Friends: FC<FriendsProps> = (props) => {

  const { friendList, setFriendList } = useFriendList();

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
          <Typography>{`Contact (${friendList[0].id === '' ? 0  : friendList.length})`}</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          <Stack direction={"row"} padding={1} spacing={2}>
            <TextField size="small" label="Search friend" />
            <Button size="small" variant="contained">
              Search
            </Button>
          </Stack>
          {friendList[0].id !== '' && friendList.map((f) => (
            <Friend {...f} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
export default Friends;
