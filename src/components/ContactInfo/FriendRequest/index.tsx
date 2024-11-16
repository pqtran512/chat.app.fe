import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFriendRequest } from "src/contexts/FriendContext";
import FriendSent from "./FriendSent";
import FriendReceived from "./FriendReceived";
interface FriendRequestsProps {}
const FriendRequests: FC<FriendRequestsProps> = (props) => {

  const {friendSentList, friendReceivedList} = useFriendRequest();

  return (
    <Stack>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <PersonAddAltIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Friend list</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
        <Box sx={{ padding: 3 }}>
          <Typography>Sent (5)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {friendSentList.map((f) => (
            <FriendSent {...f} />
          ))}
        </Stack>
        <Box sx={{ padding: 3 }}>
          <Typography>Received (10)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {friendReceivedList.map((f) => (
            <FriendReceived {...f} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
export default FriendRequests;
