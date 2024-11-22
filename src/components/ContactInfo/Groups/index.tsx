import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import Group from "./Group";

import GroupsIcon from "@mui/icons-material/Groups";
import { useGroupList } from "src/contexts/GroupContext";

interface GroupsProps {}
const Groups: FC<GroupsProps> = (props) => {

  const {groupList, setGroupList} = useGroupList();

  return (
    <Stack>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <GroupsIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Groups</Typography>
        </Stack>
      </Box>

      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
        <Box sx={{ padding: 3 }}>
          <Typography>Groups(99)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          <Stack direction={"row"} padding={1} spacing={2}>
            <TextField size="small" label="Search Group" />
            <Button size="small" variant="contained">
              Search
            </Button>
          </Stack>
          {groupList.map((g) => (
            <Group {...g} />
          ))}
        </Stack>
        ;
      </Box>
    </Stack>
  );
};
export default Groups;
