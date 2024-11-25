import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { groupAPI } from "src/api/group.api";
import { useFriendList } from "src/contexts/FriendContext";
import { CreateGroupDto } from "src/types/api/dto";

const CreateGroupForm = ({ handleClose }) => {
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    description: "",
    user_ids: [],
  } as CreateGroupDto);

  const friendListContext = useFriendList();

  const options = friendListContext.friendList.map((option) => {
    const firstLetter =
      option.fullname !== "" ? option.fullname[0].toUpperCase() : "";
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleChangeSearch = (e) => {
    setGroupInfo((prev) => ({
      ...prev,
      name: e.target.value,
      description: `Create ${e.target.value} group`,
    }));
  };

  useEffect(()=> {
    const selectedFriendID = []
    selectedFriend.map((i) => selectedFriendID.push(i.id))
    setGroupInfo((prev) => ({...prev, user_ids: selectedFriendID}))
  },[selectedFriend])

  const handleCreateGroup = () => {
    createGroup.mutate(groupInfo);
    handleClose();
  };

  const createGroup = useMutation(groupAPI.createGroup, {
    onSuccess: (response) => {
      console.log(response.data)
      enqueueSnackbar(`Create ${groupInfo.name} successfull`, {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(
        `Create ${groupInfo.name} fail - ${error.response.data.message}`,
        { variant: "warning" }
      );
    },
  });

  return (
    <Stack spacing={3}>
      <TextField
        id="group-name"
        label="Enter group name..."
        variant="standard"
        onChange={handleChangeSearch}
      />
      <Autocomplete
        multiple
        id="group-members"
        disableCloseOnSelect
        options={options.sort(
          (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
        )}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.fullname}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} label="Members" placeholder="Add members" />
        )}
        // event, value) => {setGroupInfo((prev) => ({...prev, user_ids: [..., value]}))}
        // onInputChange={() => console.log('change ...')}
        onChange={(event, value) => setSelectedFriend(value)}
      ></Autocomplete>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleCreateGroup}>
          Create
        </Button>
      </Stack>
    </Stack>
  );
};
interface CreateGroupProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroup: FC<CreateGroupProps> = (props) => {
  return (
    <Dialog fullWidth maxWidth="xs" open={props.open}>
      <DialogTitle>Create group</DialogTitle>
      <Divider />
      <DialogContent>
        <CreateGroupForm handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
