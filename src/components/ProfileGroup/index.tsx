import {
  Avatar,
  AvatarGroup,
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
import { FC, useEffect, useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { UpdateProfileGroupDto } from "src/types/api/dto";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { friendAPI, groupAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { ChatProfile, useChat } from "src/contexts/ChatContext";
import { GroupStatusCode } from "src/utils/enums";
import { useGroupMembers } from "src/contexts/GroupMemberContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import GroupMembers from "./GroupMembers";
import { useFriendList } from "src/contexts/FriendContext";
import { LanguageContext } from "src/language/LanguageProvider";

interface ProfileGroupProps {
  open: boolean;
  profile?: ChatProfile;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileGroup: FC<ProfileGroupProps> = (props) => {
  const { setChatProfile, setToGroupId } = useChat();
  const { t } = useContext(LanguageContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openMember, setOpenMember] = useState(false);
  const [updateProfileGroupInfo, setUpdateProfileGroupInfo] = useState({
    id: props.profile.id,
    name: props.profile.name,
    avatar: props.profile.avatar,
    description: "",
  } as UpdateProfileGroupDto);
  const queryClient = useQueryClient();

  const { members } = useGroupMembers();
  const friendListContext = useFriendList();

  const handleUpdateGroup = (e) => {
    updateProfileGroup.mutate(updateProfileGroupInfo);
    handleClose();
  };

  const updateProfileGroup = useMutation(groupAPI.updateGroup, {
    onSuccess: (response) => {
      enqueueSnackbar("Cập nhật thành công", { variant: "success" });
      setChatProfile((prev) => ({
        ...prev,
        id: updateProfileGroupInfo.id,
        name: updateProfileGroupInfo.name,
        avatar: updateProfileGroupInfo.avatar,
      }));
      queryClient.invalidateQueries(["GetChatBoxListByUser"]);
    },
    onError: (error: any) => {
      enqueueSnackbar(error.mesage, { variant: "error" });
    },
  });

  const handleLeaveGroup = () => {
    leaveGroup.mutate(props.profile.id);
    handleClose();
  };
  const leaveGroup = useMutation(groupAPI.leaveGroup, {
    onSuccess: (response) => {
      enqueueSnackbar(`Bạn vừa rời khỏi nhóm ${props.profile.name}`, {
        variant: "success",
      });
      setToGroupId("");
      queryClient.invalidateQueries(["GetChatBoxListByUser"]);
      // Switch to another group
    },
    onError: (error: any) => {
      enqueueSnackbar(
        `Rời nhóm ${props.profile.name} không thành công - ${error.message}`,
        { variant: "error" }
      );
    },
  });

  const { refetch } = useQuery({
    queryKey: ["FriendList"],
    queryFn: () => friendAPI.searchFriend(""),
    enabled: false,

    onSuccess: (response) => {
      if (response.data.length > 0) {
        const friendList = [];

        response.data.forEach((e) => {
          friendList.push({
            id: e.id,
            username: e.username,
            avatar: e.avatar,
          });
        });
        friendListContext.setFriendList(friendList);
      } else {
        friendListContext.setFriendList([{ id: "", username: "", avatar: "" }]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  useEffect(() => {
    setUpdateProfileGroupInfo({
      id: props.profile.id,
      name: props.profile.name,
      avatar: props.profile.avatar,
      description: "",
    } as UpdateProfileGroupDto);
  }, [props.profile.id]);

  const handleNameInputChange = (e) => {
    setUpdateProfileGroupInfo((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionInputChange = (e) => {
    setUpdateProfileGroupInfo((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleStatusCode = (e) => {
    setUpdateProfileGroupInfo((prev) => ({
      ...prev,
      group_status_code: e.target.value,
    }));
  };

  const handleClose = () => {
    props.handleClose(false);
    setOpenUpdate(false);
    setOpenMember(false);
  };

  const handleOpenMembersOfGroup = () => {
    setOpenMember(true);
    refetch();
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
    <Box>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth
        maxWidth="xs"
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          {openUpdate ? (
            <DialogTitle>Chỉnh sửa thông tin nhóm</DialogTitle>
          ) : (
            <DialogTitle>Thông tin nhóm</DialogTitle>
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
                <Typography>Đổi ảnh đại diện</Typography>
                <Button component="label" role={undefined} tabIndex={-1}>
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={updateProfileGroupInfo.avatar && `data:image/jpeg;base64,${updateProfileGroupInfo.avatar}`}
                  />

                  <VisuallyHiddenInput
                    accept=".jpeg, .jpg, .png"
                    type="file"
                    onChange={handleSelectedAvatar}
                  />
                </Button>
              </Stack>

              <Stack spacing={1}>
                <Typography>Đổi tên nhóm</Typography>
                <TextField
                  label={t.group_name}
                  value={updateProfileGroupInfo.name}
                  onChange={handleNameInputChange}
                />
                {/* <Typography>Đổi miêu tả nhóm</Typography>
                <TextField
                  label="Miêu tả nhóm"
                  value={updateProfileGroupInfo.description}
                  onChange={handleDescriptionInputChange}
                /> */}
              </Stack>
              <Divider />
              {/* <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Trạng thái
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="male"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    onClick={handleStatusCode}
                    value={GroupStatusCode.ACTIVE}
                    control={<Radio />}
                    label="Hoạt động"
                  />
                  <FormControlLabel
                    onClick={handleStatusCode}
                    value={GroupStatusCode.INACTIVE}
                    control={<Radio />}
                    label="không hoạt động"
                  />
                </RadioGroup>
              </FormControl> */}
              <Divider />
              <Stack direction={"row"} justifyContent={"right"} spacing={1}>
                <Button variant="text" onClick={() => setOpenUpdate(false)}>
                  {t.back}
                </Button>
                <Button variant="contained" onClick={handleUpdateGroup}>
                  Cập nhật
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
                    src={props.profile.avatar && `data:image/jpeg;base64,${props.profile.avatar}`}
                  />
                  <Stack>
                    <Typography variant="h4">{props.profile.name}</Typography>
                    <Typography variant="subtitle2">
                      {updateProfileGroupInfo.description}
                    </Typography>
                  </Stack>
                </Stack>
                <Button onClick={handleClose}>Nhắn tin</Button>
              </Stack>
              <Divider />
              <Typography variant="h5">{`Thành viên (${members.length})`}</Typography>
              <Stack direction={"row"}>
                <AvatarGroup max={3}>
                  {members.map((m) => (
                    <Avatar
                      key={m.user_id}
                      alt={m.username}
                      src={m.avatar && `data:image/jpeg;base64, ${m.avatar}`}
                    />
                  ))}
                </AvatarGroup>
                <IconButton onClick={handleOpenMembersOfGroup}>
                  <MoreHorizIcon />
                </IconButton>
              </Stack>
              <Divider />
              <Typography variant="h5">Ảnh/Videos</Typography>
              <Divider />
              <Button onClick={() => setOpenUpdate(true)}>Cập nhật</Button>
              <Divider />
              <Button color="error" onClick={handleLeaveGroup}>
                Rời nhóm
              </Button>
            </Stack>
          </DialogContent>
        )}
      </Dialog>
      {openMember && (
        <GroupMembers
          open={openMember}
          setOpen={setOpenMember}
          group_id={props.profile.id}
          ownerId={props.profile.groupOwnerId}
        />
      )}
    </Box>
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
