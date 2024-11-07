import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { GroupList } from "src/data";
import Group from "./Group";

interface GroupsProps {}
const Groups: FC<GroupsProps> = (props) => {
  return (
    <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
      <Box sx={{ padding: 3 }}>
        <Typography>Groups(99)</Typography>
      </Box>
      <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
        {GroupList.map((g) => (
          <Group {...g} />
        ))}
      </Stack>
      ;
    </Box>
  );
};
export default Groups;
