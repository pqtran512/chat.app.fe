import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { FriendList } from "src/data";
import Friend from "./Friend";

interface FriendsProps {}
const Friends: FC<FriendsProps> = (props) => {
  return (
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
        <Box sx={{ padding: 3 }}>
          <Typography>Contacts(99)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff"}}>
        {FriendList.map((f) => <Friend {...f}/>)}
        </Stack>;
      </Box>
  );
};
export default Friends;
