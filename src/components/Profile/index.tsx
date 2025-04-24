import {
  Avatar,
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
import { FC, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { UpdateProfileDto } from "src/types/api/dto";
import { useMutation, useQueryClient } from "react-query";
import { profileAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { Profile } from "src/types/entities";

interface ProfileProps {
  open: boolean;
  profile?: Profile;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileComponent: FC<ProfileProps> = (props) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const queryClient = useQueryClient();
  const [updateProfileInfo, setUpdateProfileInfo] = useState<{
    id?: string;
    username?: string;
    avatar?: File | null;
  }>({
    id: props.profile?.id,
    username: props.profile?.username,
    avatar: null,
  });

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("id", updateProfileInfo.id?.toString() || "");
    formData.append("username", updateProfileInfo.username || "");
    if (updateProfileInfo.avatar) {
      formData.append("avatar", updateProfileInfo.avatar);
    }

    updateProfile.mutate(formData);
  };


  const updateProfile = useMutation(profileAPI.updateProfile, {
    onSuccess: (response) => {
      enqueueSnackbar("Update profile successfull!!", { variant: "success" });
      queryClient.invalidateQueries("GetPersonalProfile");

      handleClose();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleInputChange = (e) => {
    setUpdateProfileInfo((prev) => ({ ...prev, username: e.target.value }));
  };

  const handleSelectedAvatar = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUpdateProfileInfo((prev) => ({ ...prev, avatar: file }));
    }
  };

  const handleClose = () => {
    props.handleClose(false);
    setOpenUpdate(false);
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
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Divider />
      {openUpdate ? (
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={4} alignItems={"center"}>
              <Typography>Change Avatar</Typography>
              <Button component="label" role={undefined} tabIndex={-1}>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt={updateProfileInfo?.username || "Avatar"}
                  // src={updateProfileInfo?.avatar && `data:image/jpeg;base64,${updateProfileInfo?.avatar}`}
                  src={
                    updateProfileInfo.avatar
                      ? URL.createObjectURL(updateProfileInfo.avatar)
                      : undefined
                  }
                />

                <VisuallyHiddenInput
                  accept=".jpeg, .jpg, .png"
                  type="file"
                  onChange={handleSelectedAvatar}
                />
              </Button>
            </Stack>

            {/* <Stack spacing={1}>
              <Typography>Change name</Typography>
              <TextField
                label="your name"
                value={updateProfileInfo?.username}
                onChange={handleInputChange}
              />
            </Stack> */}
            {/* <FormControl>
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
            </FormControl> */}
            <Divider />
            <Stack direction={"row"} justifyContent={"right"} spacing={1}>
              <Button variant="text" onClick={() => setOpenUpdate(false)}>
                Hủy
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Cập nhật
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
                src={props?.profile.avatar}
              />
              <Typography variant="h4">{props.profile.username || 'User'}</Typography>
              <Stack direction={"row"}></Stack>
            </Stack>

            {/* <Divider /> */}
            {/* <Stack spacing={2}>
              <Typography variant="h4">Personal information</Typography>
              <Typography>Gender: </Typography>
              <Typography>Birthday: </Typography>
              <Typography>Phone: </Typography>
            </Stack> */}
            <Divider />
            <Button onClick={() => setOpenUpdate(true)}>Cập nhật</Button>
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

export default ProfileComponent;
