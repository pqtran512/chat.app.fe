import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

const user = {
  name: "Beckham",
  avatar:
    "https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2024/03/21/ffa5b5dc-3fbf-41db-8b5f-d33280f96dee_1d2a602f.jpg?itok=Fpbj3u6T&v=1711010288",
  gender: "Male",
  birthday: "2/5/1975",
  phone: "0123435678",
};

interface ProfileProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const Profile: FC<ProfileProps> = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="xs"
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <DialogTitle>Profile</DialogTitle>
        <IconButton onClick={() => props.handleClose(false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      <DialogContent>
        <Stack spacing={2}>
          <Stack spacing={2} alignItems={"center"}>
            <Avatar
              sx={{ width: 60, height: 60 }}
              src="https://cdn.i-scmp.com/sites/default/files/styles/wide_landscape/public/d8/images/canvas/2024/03/21/ffa5b5dc-3fbf-41db-8b5f-d33280f96dee_1d2a602f.jpg?itok=Fpbj3u6T&v=1711010288"
            ></Avatar>
            <Typography variant="h4">Beckham</Typography>
            <Stack direction={"row"}></Stack>
          </Stack>

          <Divider />
          <Stack spacing={2}>
            <Typography variant="h4">Personal information</Typography>
            <Typography>Gender: {user.gender}</Typography>
            <Typography>Birthday: {user.birthday}</Typography>
            <Typography>Phone: {user.phone}</Typography>
          </Stack>
          <Divider />
          <Stack>
            <Button>Block</Button>
            <Button>Unfriend</Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
