import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import StyledBadge from "../StyledBadge";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import InfoIcon from "@mui/icons-material/Info";
import { useChat } from "src/contexts/ChatContext";
import ProfileGroup from "src/components/ProfileGroup";
import ProfileFriend from "src/components/ProfileFriend";
import { useMutation } from "react-query";
import { groupAPI } from "src/api";
import { useGroupMembers } from "src/contexts/GroupMemberContext";
import { enqueueSnackbar } from "notistack";

interface HeaderProps {
  openChatInfo: boolean;
  setOpenChatInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<HeaderProps> = (props) => {
  const [openProfileFriendOrGroup, setOpenProfileFriendOrGroup] = useState(false);
  const { chatProfile } = useChat();
  const { members, setMembers } = useGroupMembers();


  const getGroupMembers = useMutation(groupAPI.getGroupMembers, {
    onSuccess: (response) => {
      if (response.status === 200) {
        const groupMembers = [];
        response.data.users.forEach((u) => {
          groupMembers.push({
            user_id: u.user.id,
            profile_id: u.user.profile[0].id,
            fullname: u.user.profile[0].fullname,
            avatar: u.user.profile[0].avatar,
            active: 'inactive',
          });
        });
        setMembers(groupMembers)
      }
        
    },
    onError: (error: any) => {
      enqueueSnackbar(error, {variant: "error"})
    }
  })

  const handleShowProfileFriendOrGroup = () => {
    setOpenProfileFriendOrGroup(true);
    getGroupMembers.mutate(chatProfile.id)
  }

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
      alignItems={"center"}
    >
      <Stack
        direction={"row"}
        width={"auto"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={1}
      >
        <Box>
          <Button onClick={handleShowProfileFriendOrGroup}>
            {chatProfile.id && (
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                {false ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      src={`data:image/png;base64, ${chatProfile.avatar}`}
                    />
                  </StyledBadge>
                ) : (
                  <Avatar
                    src={`data:image/png;base64, ${chatProfile.avatar}`}
                  />
                )}

                <Stack direction={"column"}>
                  <Typography textAlign={"left"} variant="h4">
                    {chatProfile.name}
                  </Typography>
                  {chatProfile.isGroupChat && (
                    <Typography textAlign={"left"} variant="h6">
                      {chatProfile.memberCount} thành viên
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}
          </Button>
        </Box>
        <Box>
          <Stack direction={"row"}>
            {chatProfile.isGroupChat && (
              <IconButton>
                <PersonAddAltIcon />
              </IconButton>
            )}
            {/* <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <CallIcon />
            </IconButton>
            <IconButton>
              <VideoCallIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                props.setOpenChatInfo((prev) => !prev);
              }}
            >
              <InfoIcon />
            </IconButton> */}
          </Stack>
        </Box>
      </Stack>
      {chatProfile.isGroupChat 
      ? 
      <ProfileGroup open={openProfileFriendOrGroup} handleClose={setOpenProfileFriendOrGroup} />
      : 
      <ProfileFriend open={openProfileFriendOrGroup} handleClose={setOpenProfileFriendOrGroup}/>
    }
    </Box>
  );
};

export default Header;
