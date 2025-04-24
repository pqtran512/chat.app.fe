import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGroupMembers } from "src/contexts/GroupMemberContext";
import Member from "./Member";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { friendAPI, groupAPI } from "src/api";
import { useFriendList } from "src/contexts/FriendContext";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "src/contexts/AuthContext";
import { useChat } from "src/contexts/ChatContext";
import { LanguageContext } from "src/language/LanguageProvider";

interface GroupMembersProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  group_id: string;
  ownerId?: string;
}

const GroupMembers: FC<GroupMembersProps> = (props) => {
  const [selectedFriend, setSelectedFriend] = useState([]);
  const { t } = useContext(LanguageContext);
  const [selectedRemovingMember, setSelectedRemovingMember] = useState([]);
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { setChatProfile } = useChat();

  const {
    isLoading,
    data: friendList,
    refetch: refetchGetFriendList,
  } = useQuery({
    queryKey: ["getFriends"],
    queryFn: () => friendAPI.searchFriend(""), // fix - tran
    select: (rs) => {
      return rs.data;
    },
  });

  const {
    isLoading: loadingGetGroupMembers,
    data: groupMembers,
    refetch: refetchGetGroupMembers,
  } = useQuery({
    queryKey: ["getGroupMembers", props.group_id],
    queryFn: () => groupAPI.getGroupMembers(props.group_id),
    select: (rs) => {
      return rs.data;
    },
  });

  const addableMembers = useMemo(() => {
    if (friendList && groupMembers) {
      setChatProfile((prev) => ({ ...prev, memberCount: groupMembers.count }));
      const addableMembers = friendList.filter(
        (o) =>
          groupMembers.users.findIndex(
            // (u) => u.user_id === o.to_user_profile.id 
            (u) => u.user_id === o.id  // fix -tran
          ) === -1
      );

      const friendsOption = addableMembers.map((option) => {
        // const firstLetter =
        //   option.to_user_profile.profile[0].username !== ""
        //     ? option.to_user_profile.profile[0].username[0].toUpperCase()
        //     : "";

        const firstLetter =  // fix -tran
          option.username !== ""
            ? option.username[0].toUpperCase()
            : "";

        return {
          firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
          ...option,
        };
      });

      return friendsOption;
    }
  }, [friendList, groupMembers]);

  const removableMembers = useMemo(() => {
    if (groupMembers) {
      setChatProfile((prev) => ({ ...prev, memberCount: groupMembers.count }));
      const filterdGroupMembers = groupMembers.users.filter(
        (o) => o.user_id !== userId
      );
      const friendsOption = filterdGroupMembers.map((option) => {
        const firstLetter =
          option.user.profile[0].username !== "" 
            ? option.user.profile[0].username[0].toUpperCase()
            : "";
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
          ...option,
        };
      });

      return friendsOption;
    }
  }, [groupMembers]);

  const handleAddMember = () => {
    const user_ids = [];
    selectedFriend.forEach((e) => {
      user_ids.push(e.to_user_profile.id);
    });
    addMember.mutate({
      group_id: props.group_id,
      user_ids: user_ids,
    });
  };

  const handleRemoveMember = () => {
    const user_ids = [];
    selectedRemovingMember.forEach((e) => {
      user_ids.push(e.user_id);
    });
    removeMember.mutate({
      group_id: props.group_id,
      user_ids: user_ids,
    });
  };

  const addMember = useMutation(groupAPI.addMembers, {
    onSuccess: (response) => {
      enqueueSnackbar("Thêm vào nhóm thành công", { variant: "success" });
      setSelectedFriend([]);
      refetchGetFriendList();
      refetchGetGroupMembers();
      queryClient.invalidateQueries(["GetChatBoxListByUser"]);
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const removeMember = useMutation(groupAPI.removeMembers, {
    onSuccess: (response) => {
      if (response.data && response.data === true) {
        enqueueSnackbar("Xoá thành viên thành công", { variant: "success" });
        setSelectedRemovingMember([]);
        // refetchGetFriendList();
        refetchGetGroupMembers();
        queryClient.invalidateQueries(["GetChatBoxListByUser"]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  return (
    <Dialog open={props.open} onClose={props.setOpen} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h4">Thành viên nhóm</Typography>
          <IconButton onClick={() => props.setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Divider />
      <DialogContent>
        <Button
          size="small"
          sx={{ width: "100%", marginBottom: 1 }}
          variant="contained"
          onClick={handleAddMember}
        >
          Thêm thành viên
        </Button>
        <Autocomplete
          multiple
          value={selectedFriend}
          id="group-members"
          disableCloseOnSelect
          options={
            addableMembers &&
            addableMembers.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )
          }
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) =>
            option.to_user_profile.profile[0].username
          }
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label={t.friend_search}
              placeholder="Thêm thành viên"
            />
          )}
          onChange={(event, value) => setSelectedFriend(value)}
        ></Autocomplete>
        {props.ownerId && props.ownerId === userId && (
          <>
            <Button
              size="small"
              color="error"
              sx={{ width: "100%", marginBottom: 1, marginTop: 1 }}
              variant="contained"
              onClick={handleRemoveMember}
            >
              Xóa thành viên
            </Button>
            <Autocomplete
              value={selectedRemovingMember}
              multiple
              id="group-members"
              disableCloseOnSelect
              options={
                removableMembers &&
                removableMembers.sort(
                  (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                )
              }
              groupBy={(option: any) => option.firstLetter}
              getOptionLabel={(option: any) => option.user.profile[0].username}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn thành viên"
                  placeholder="Chọn thành viên"
                />
              )}
              onChange={(event, value) => setSelectedRemovingMember(value)}
            ></Autocomplete>
          </>
        )}
        {!loadingGetGroupMembers && (
          <>
            <Typography
              variant="h5"
              padding={2}
            >{`Danh sách thành viên (${groupMembers.count})`}</Typography>
            <Stack spacing={2}>
              {groupMembers.users.map((m) => {
                const { username, avatar } = m.user.profile[0];
                return (
                  <Member
                    key={m.user_id}
                    id={m.user_id}
                    username={username}
                    avatar={avatar}
                    isOwner={props.ownerId === m.user_id}
                  />
                );
              })}
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GroupMembers;
