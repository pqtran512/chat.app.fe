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
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { UpdateProfileGroupDto } from "src/types/api/dto";
import { useMutation } from "react-query";
import { groupAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { useChat } from "src/contexts/ChatContext";

interface ProfileGroupProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileGroup: FC<ProfileGroupProps> = (props) => {
  const { chatProfile, setChatProfile } = useChat();
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateProfileGroupInfo, setUpdateProfileGroupInfo] = useState({
    id: chatProfile.id,
    name: chatProfile.name,
    avatar: chatProfile.avatar,
    group_status_code: "active",
    description: "",
  } as UpdateProfileGroupDto);

  const handleUpdateGroup = (e) => {
    updateProfileGroup.mutate(updateProfileGroupInfo);
  };

  const updateProfileGroup = useMutation(groupAPI.updateGroup, {
    onSuccess: (response) => {
      enqueueSnackbar("Update profile successfull!!", { variant: "success" });
      setChatProfile((prev) => ({ ...prev, id: updateProfileGroupInfo.id }));
      setChatProfile((prev) => ({
        ...prev,
        name: updateProfileGroupInfo.name,
      }));
      setChatProfile((prev) => ({
        ...prev,
        avatar: updateProfileGroupInfo.avatar,
      }));

      handleClose();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleLeaveGroup = () => {
    leaveGroup.mutate(chatProfile.id)
    handleClose();
  }
  const leaveGroup = useMutation(groupAPI.leaveGroup, {
    onSuccess: (response) => {
      enqueueSnackbar(`You've just leave group ${chatProfile.name}`, {variant: "success"})
      // Switch to another leave group
    },
    onError: (error: any) => {
      enqueueSnackbar(`Fail leave group ${chatProfile.name} - ${error.message}`, {variant: "error"})
    }
  })

  const handleNameInputChange = (e) => {
    setUpdateProfileGroupInfo((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionInputChange = (e) => {
    setUpdateProfileGroupInfo((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleClose = () => {
    props.handleClose(false);
    setOpenUpdate(false);
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
          setUpdateProfileGroupInfo((prev) => ({ ...prev, avatar: avatar }));
        },
        false
      );
    }
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
                  src={`data:image/jpeg;base64,${updateProfileGroupInfo.avatar}`}
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
                value={updateProfileGroupInfo.name}
                onChange={handleNameInputChange}
              />
              <Typography>Change description</Typography>
              <TextField
                label="description"
                value={updateProfileGroupInfo.description}
                onChange={handleDescriptionInputChange}
              />
            </Stack>
            <Divider />
            <Stack direction={"row"} justifyContent={"right"} spacing={1}>
              <Button variant="text" onClick={() => setOpenUpdate(false)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdateGroup}>
                Update
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
      ) : (
        <DialogContent>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Stack
                spacing={2}
                alignItems={"center"}
                justifyContent={"center"}
                direction={"row"}
              >
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  src={`data:image/jpeg;base64,${chatProfile.avatar}`}
                />
                <Stack>
                  <Typography variant="h4">{chatProfile.name}</Typography>
                  <Typography variant="subtitle2">
                    {updateProfileGroupInfo.description}
                  </Typography>
                </Stack>
              </Stack>
              <Button onClick={handleClose}>Chat</Button>
            </Stack>
            <Divider />
            <Typography variant="h4">Members (2)</Typography>
            <Divider />
            <Typography variant="h4">Photos/Video</Typography>
            <Divider />
            <Button onClick={() => setOpenUpdate(true)}>Update</Button>
            <Divider />
            <Button color="error" onClick={handleLeaveGroup}>Leave Group</Button>
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

export default ProfileGroup;
