import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FriendList } from "src/data";
import Friend from "./Friend";

import PersonIcon from "@mui/icons-material/Person";

interface FriendsProps {}
const Friends: FC<FriendsProps> = (props) => {
  // api

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
          {FriendList.map((f) => (
            <Friend {...f} />
          ))}
        </Stack>
        ;
      </Box>
    </Stack>
  );
};
export default Friends;
