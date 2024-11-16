import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import Friend from "./Friend";

import PersonIcon from "@mui/icons-material/Person";
import { useFriendList } from "src/contexts/FriendContext";

interface FriendsProps {}
const Friends: FC<FriendsProps> = (props) => {
  // call api to take "FriendList"
  // const {}
  const {friendList, setFriendList} = useFriendList();

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
          <Typography>Contacts(99)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {friendList.map((f) => (
            <Friend {...f} />
          ))}
        </Stack>
        ;
      </Box>
    </Stack>
  );
};
export default Friends;
