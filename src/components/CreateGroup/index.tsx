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
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CreateGroupForm = ({ handleClose }) => {
  const NewgroupSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    members: yup.array().min(2, "Must have at least 2 members"),
  });

  const defaultValues = {
    title: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewgroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

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
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            id="group-name"
            label="Enter group name..."
            variant="standard"
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
            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
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
