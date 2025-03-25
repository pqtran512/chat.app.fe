import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FC, useState, useContext } from "react";
import Group from "./Group";

import GroupsIcon from "@mui/icons-material/Groups";
import { GroupListContext, useGroupList } from "src/contexts/GroupContext";
import { useMutation, useQuery } from "react-query";
import { groupAPI } from "src/api/group.api";
import { GroupListDto } from "src/types/api/dto";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

interface GroupsProps { }
const Groups: FC<GroupsProps> = (props) => {
  const theme = useTheme();
  const { t } = useContext(LanguageContext);
  const [input, setInput] = useState({ searchText: "" } as GroupListDto);
  const [searchText, setSearchText] = useState("");
  const { groupList, setGroupList } = useGroupList();

  const handleChangeInput = (e) => {
    setInput((p) => ({ ...p, searchText: e.target.value }));
  };

  const handleSearchGroup = (e) => {
    e.preventDefault();
    setSearchText(input.searchText);
    // searchGroup.mutate(input);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["GetListGroupByUser", searchText],
    queryFn: () => groupAPI.groupList({ searchText: searchText }),
    select: (res) => {
      return res.data;
    },
  });

  const searchGroup = useMutation(groupAPI.groupList, {
    onSuccess: (res) => {
      console.log(res);

      if (res.data.groups.length > 0) {
        const searchGroupResults = [];
        res.data.groups.map((e) => {
          console.log(e);
          searchGroupResults.push({
            id: e.group.id,
            name: e.group.name,
            avatar: e.group.avatar,
            group_members: [...e.group.group_members],
            owner_id: e.group.owner_id,
          });
        });
        setGroupList([...searchGroupResults]);
      } else {
        enqueueSnackbar("Không tìm thấy", {
          variant: "info",
        });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  return (
    <Stack sx={{ height: "100vh" }}>
      <Box sx={{
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        padding: 2
      }}>
        <Stack direction={"row"}>
          <GroupsIcon sx={{
              marginRight: 1,
              marginLeft: {
                xs: 4,
                lg: 0,
              }
            }} />
          <Typography variant="h4">{t.group_list}</Typography>
        </Stack>
      </Box>

      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="auto">
        <Box sx={{ padding: 3 }}>
          <Typography>{t.group} ({data ? data.groups.length : 0})</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030' }}>
          <Stack direction={"row"} padding={1} spacing={2} component={"form"}>
            <TextField
              size="small"
              label={t.group_search}
              value={input.searchText}
              onChange={handleChangeInput}
            />
            <Button
              type="submit"
              size="small"
              variant="contained"
              onClick={handleSearchGroup}
            >
              {t.search}
            </Button>
          </Stack>
          {!isLoading &&
            data.groups.map((g, index) => {
              console.log(g);
              return (
                <Group
                  key={index}
                  {...g.group}
                  memberCount={g?.group?.group_members?.length || 0}
                />
              );
            })}
        </Stack>
      </Box>
    </Stack>
  );
};
export default Groups;
