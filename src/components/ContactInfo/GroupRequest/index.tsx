import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

import GroupAddIcon from "@mui/icons-material/GroupAdd";

interface GroupInvitationsProps {}
const GroupInvitations: FC<GroupInvitationsProps> = (props) => {
  // api

  return (
    <Stack>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <GroupAddIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Groups invitations</Typography>
        </Stack>
      </Box>
      <Box>
        <h1>Group invitations</h1>
      </Box>
    </Stack>
  );
};
export default GroupInvitations;
