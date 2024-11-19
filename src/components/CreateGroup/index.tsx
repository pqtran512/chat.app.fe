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
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { groupAPI } from "src/api/group.api";
import { useFriendList } from "src/contexts/FriendContext";

const CreateGroupForm = ({ handleClose }) => {

  const [nameGroup, setNameGroup] = useState("");

  console.log("Create group")

  const {friendList} = useFriendList();
  console.log(friendList);

  const onSubmit = async (data) => {
    try {
      // API call
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChangeSearch = (e) => {
    setNameGroup(e.target.value);
  }

  const handleCreateGroup = () => {
    createGroup.mutate(nameGroup);
  }

  const createGroup = useMutation(groupAPI.createGroup, {
    onSuccess: (response) => {
      // console.log(response);
      enqueueSnackbar(`Create ${nameGroup} successfull`, {variant:"success"})
    },
    onError: (error: any) => {
      enqueueSnackbar(`Create ${nameGroup} fail - ${error.response.data.message}`, {variant:"warning"})
    }
  })

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
            options={friendList}
            getOptionLabel={(option) => option.fullname}
            filterSelectedOptions
            renderInput={(params) => (  
              <TextField
                {...params}
                label="Members"
                placeholder="Add members"
              />
            )}
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
    <Dialog
      fullWidth
      maxWidth="xs"
      open={props.open}
    >
      <DialogTitle>Create group</DialogTitle>
      <Divider />
      <DialogContent>
        <CreateGroupForm handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
