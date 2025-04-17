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
  import { FC, useContext } from "react";
  import CloseIcon from "@mui/icons-material/Close";
  import { useMutation } from "react-query";
  import { profileAPI } from "src/api";
  import { enqueueSnackbar } from "notistack";
  import { LanguageContext } from "src/language/LanguageProvider";
  
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
    username: string;
    avatar: string;
  }
  const Profile: FC<ProfileProps> = (props) => {
    const { t } = useContext(LanguageContext);
  
    return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth
        maxWidth="xs"
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <DialogTitle>{t.profile}</DialogTitle>
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
                src={props.avatar}
              ></Avatar>
              <Typography variant="h4">{props.username}</Typography>
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
  