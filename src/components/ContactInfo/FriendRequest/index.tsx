import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

interface FriendRequestsProps {}
const FriendRequests: FC<FriendRequestsProps> = (props) => {
  // api

  return (
    <Stack>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <PersonAddAltIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Friend requests</Typography>
        </Stack>
      </Box>
      <Box>
        <h1>Friend request</h1>
      </Box>
    </Stack>
  );
};
export default FriendRequests;
