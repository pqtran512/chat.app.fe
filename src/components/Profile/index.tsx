import {
  Avatar,
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
import styled from "@emotion/styled";
import { UpdateProfileDto } from "src/types/api/dto";
import { useMutation } from "react-query";
import { profileAPI } from "src/api";
import { useProfile } from "src/contexts/ProfileContext";
import { enqueueSnackbar } from "notistack";

interface ProfileProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Profile: FC<ProfileProps> = (props) => {
  const profileContext = useProfile()
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateProfileInfo, setUpdateProfileInfo] = useState({
    profileId: profileContext.profileId,
    fullname: profileContext.fullname,
    avatar: profileContext.avatar,
  } as UpdateProfileDto);

  const handleUpdate = (e) => {
    updateProfile.mutate(updateProfileInfo)
  };

  const updateProfile = useMutation(profileAPI.updateProfile, {
    onSuccess: (response) => {
      enqueueSnackbar("Update profile successfull!!", {variant: "success"})
      profileContext.setProfileId(updateProfileInfo.profileId)
      profileContext.setFulname(updateProfileInfo.fullname)
      profileContext.setAvatar(updateProfileInfo.avatar)
      handleClose();
    },
    onError: (error: any) => {

      enqueueSnackbar(error.response.data.message, {variant: "error"})
    }
  })

  const handleInputChange = (e) => {
    setUpdateProfileInfo((prev) => ({ ...prev, fullname: e.target.value }));
  };

  const handleSelectedAvatar = async (e) => {
    function resizeImage(file, width) {
      return new Promise((resolve, reject) => {
        const fileName = file.target.files[0].name;
        const reader = new FileReader();

        reader.readAsDataURL(file.target.files[0]);

        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result.toString();

          img.onload = () => {
            const elem = document.createElement("canvas");
            const scaleFactor = width / img.width;
            elem.width = width;
            elem.height = img.height * scaleFactor;

            const ctx = elem.getContext("2d");
            ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);

            ctx.canvas.toBlob(
              (blob) => {
                resolve(
                  new File([blob], fileName, {
                    type: "image/jpeg",
                    lastModified: Date.now(),
                  })
                );
              },
              "image/jpeg",
              1
            );
          };
        };
      });
    }
    if (e.target.files[0]) {
      const resizedImg = await resizeImage(e, 100);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(resizedImg as Blob);
      fileReader.addEventListener(
        "load",
        () => {
          const avatar = String(fileReader.result).split(",")[1];
          setUpdateProfileInfo((prev) => ({ ...prev, avatar: avatar }));
        },
        false
      );
    }
  };

  const handleClose = () => {
    props.handleClose(false);
    setOpenUpdate(false);
  }

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
          onClick={handleClose}
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
              <Button component="label" role={undefined} tabIndex={-1}>
                
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={`data:image/jpeg;base64,${updateProfileInfo.avatar}`}
                  />
                

                <VisuallyHiddenInput
                  accept=".jpeg, .jpg, .png"
                  type="file"
                  onChange={handleSelectedAvatar}
                />
              </Button>
            </Stack>

            <Stack spacing={1}>
              <Typography>Change name</Typography>
              <TextField
                label="your name"
                value={updateProfileInfo.fullname
                }
                onChange={handleInputChange}
              />
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
                src={`data:image/jpeg;base64,${profileContext.avatar}`}
              />
              <Typography variant="h4">{profileContext.fullname}</Typography>
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

export default Profile;
