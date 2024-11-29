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
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGroupMembers } from "src/contexts/GroupMemberContext";
import Member from "./Member";
import { useMutation } from "react-query";
import { groupAPI } from "src/api";
import { useFriendList } from "src/contexts/FriendContext";
import { enqueueSnackbar } from "notistack";

interface GroupMembersProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  group_id: string;
}

const GroupMembers: FC<GroupMembersProps> = (props) => {
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [selectedMember, setSelectedMember] = useState([]);
  const { friendList } = useFriendList();
  const { members, setMembers } = useGroupMembers();

  const friendsOption = friendList.map((option) => {
    const firstLetter =
      option.fullname !== "" ? option.fullname[0].toUpperCase() : "";
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const membersOption = members.map((option) => {
    const firstLetter =
      option.fullname !== "" ? option.fullname[0].toUpperCase() : "";
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleAddMember = () => {
    const user_ids = [];
    selectedFriend.forEach((e) => {
      user_ids.push(e.id);
    });
    addMember.mutate({
      group_id: props.group_id,
      user_ids: user_ids,
    });
  };

  const handleRemoveMember = () => {
    const user_ids = [];
    selectedMember.forEach((e) => {
      user_ids.push(e.user_id);
    });
    removeMember.mutate({
      group_id: props.group_id,
      user_ids: user_ids,
    });
  };

  const addMember = useMutation(groupAPI.addMembers, {
    onSuccess: (response) => {
      enqueueSnackbar("Add to Group Successfull", { variant: "success" });
      getGroupMembers.mutate(props.group_id);
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const removeMember = useMutation(groupAPI.removeMembers, {
    onSuccess: (response) => {
      enqueueSnackbar("Remove Successfull", { variant: "success" });
      getGroupMembers.mutate(props.group_id);
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const getGroupMembers = useMutation(groupAPI.getGroupMembers, {
    onSuccess: (response) => {
      if (response.status === 200) {
        const groupMembers = [];
        response.data.users.forEach((u) => {
          groupMembers.push({
            user_id: u.user.id,
            profile_id: u.user.profile[0].id,
            fullname: u.user.profile[0].fullname,
            avatar: u.user.profile[0].avatar,
            active: "inactive",
          });
        });
        setMembers(groupMembers);
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
          <Typography variant="h4">Members</Typography>
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
          Add members
        </Button>
        <Autocomplete
          multiple
          id="group-members"
          disableCloseOnSelect
          options={friendsOption.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.fullname}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Friend"
              placeholder="Add members"
            />
          )}
          onChange={(event, value) => setSelectedFriend(value)}
        ></Autocomplete>
        <Button
          size="small"
          color="error"
          sx={{ width: "100%", marginBottom: 1, marginTop: 1 }}
          variant="contained"
          onClick={handleRemoveMember}
        >
          Remove members
        </Button>
        <Autocomplete
          multiple
          id="group-members"
          disableCloseOnSelect
          options={membersOption.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option.fullname}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose members"
              placeholder="Add members"
            />
          )}
          onChange={(event, value) => setSelectedMember(value)}
        ></Autocomplete>
        <Typography
          variant="h5"
          padding={2}
        >{`List members (${members.length})`}</Typography>
        <Stack spacing={2}>
          {members.map((m) => (
            <Member id={m.user_id} fullname={m.fullname} avatar={m.avatar} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default GroupMembers;
