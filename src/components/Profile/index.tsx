import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "react-query";
import { profileAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import styled from "@emotion/styled";

interface ProfileProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
  fullname: string;
  avatar: string;
}
const Profile: FC<ProfileProps> = (props) => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const handleUpdate = () => {
    // Call API
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        {openUpdate ? (
          <DialogTitle>Edit Profile</DialogTitle>
        ) : (
          <DialogTitle>Profile</DialogTitle>
        )}
        <IconButton
          onClick={() => {
            props.handleClose(false);
            setOpenUpdate(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      {openUpdate ? (
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={4} alignItems={"center"}>
              <Typography>Change Avatar</Typography>
              <InputFileUpload>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  src={`data:image/jpeg;base64,${props.avatar}`}
                />
              </InputFileUpload>
            </Stack>

            <Stack spacing={1}>
              <Typography>Display name</Typography>
              <TextField label="Your name" value={props.fullname} />
            </Stack>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="male"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <Divider />
            <Stack direction={"row"} justifyContent={"right"} spacing={1}>
              <Button variant="text" onClick={() => setOpenUpdate(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Update
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      ) : (
        <DialogContent>
          <Stack spacing={2}>
            <Stack spacing={2} alignItems={"center"}>
              <Avatar
                sx={{ width: 60, height: 60 }}
                src={`data:image/jpeg;base64,${props.avatar}`}
              />
              <Typography variant="h4">{props.fullname}</Typography>
              <Stack direction={"row"}></Stack>
            </Stack>

            <Divider />
            <Stack spacing={2}>
              <Typography variant="h4">Personal information</Typography>
              <Typography>Gender: </Typography>
              <Typography>Birthday: </Typography>
              <Typography>Phone: </Typography>
            </Stack>
            <Divider />
            <Button onClick={() => setOpenUpdate(true)}>Update</Button>
          </Stack>
        </DialogContent>
      )}
    </Dialog>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function InputFileUpload({ children }) {
  return (
    <Button component="label" role={undefined} tabIndex={-1}>
      {children}
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}

export default Profile;
