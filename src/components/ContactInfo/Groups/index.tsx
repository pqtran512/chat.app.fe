import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import Group from "./Group";

import GroupsIcon from "@mui/icons-material/Groups";
import { useGroupList } from "src/contexts/GroupContext";
import { useMutation } from "react-query";
import { groupAPI } from "src/api/group.api";
import { GroupListDto } from "src/types/api/dto";
import { enqueueSnackbar } from "notistack";

interface GroupsProps {}
const Groups: FC<GroupsProps> = (props) => {
  const [input, setInput] = useState({ searchText: "" } as GroupListDto);
  const { groupList, setGroupList } = useGroupList();

  const handleChangeInput = (e) => {
    setInput((p) => ({ ...p, searchText: e.target.value }));
  };

  const handleSearchGroup = (e) => {
    e.preventDefault();
    searchGroup.mutate(input);
  };

  const searchGroup = useMutation(groupAPI.groupList, {
    onSuccess: (res) => {
      if (res.data.groups.length > 0) {
        const searchGroupResults = [];
        res.data.groups.map((e) => {
          searchGroupResults.push({
            id: e.group.id,
            name: e.group.name,
            avatar: e.group.avatar,
            group_members: [...e.group.group_members],
          });
        });
        setGroupList([...searchGroupResults]);
      } else {
        enqueueSnackbar("Not found any groups with that name", {
          variant: "info",
        });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

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
          <Stack direction={"row"} padding={1} spacing={2} component={"form"}>
            <TextField
              size="small"
              label="Search Group"
              value={input.searchText}
              onChange={handleChangeInput}
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              onClick={handleSearchGroup}
            >
              Search
            </Button>
          </Stack>
          {groupList.map((g, index) => (
            <Group key={index} {...g} memberCount={g?.group_members?.length || 0} />
          ))}
        </Stack>
        ;
      </Box>
    </Stack>
  );
};
export default Groups;
