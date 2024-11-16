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

const CreateGroupForm = ({ handleClose }) => {

  const [nameGroup, setNameGroup] = useState("");




  const onSubmit = async (data) => {
    try {
      // API call
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const friends = [
    { name: "name1", id: 1 },
    { name: "name2", id: 2 },
    { name: "name3", id: 3 },
  ];

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
      enqueueSnackbar(`Create ${nameGroup} fail`, {variant:"warning"})
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
            options={friends}
            getOptionLabel={(option) => option.name}
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
      //   TransitionComponent={transition}
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
