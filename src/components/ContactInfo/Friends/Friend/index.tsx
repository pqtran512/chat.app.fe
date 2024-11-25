import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendList } from "src/contexts/FriendContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useTabs } from "src/contexts/TabsContext";
import { useChat } from "src/contexts/ChatContext";

interface FriendProps {
  id: string;
  fullname: string;
  avatar: string;
}

const Friend: FC<FriendProps> = (props) => {
  // make ui more beatifull
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ------------------------
  const FriendListContext = useFriendList();
  const { setShowChatDetail, setShowContactInfo } = useTabs();
  const { setToUserId, setToGroupId, setChatProfile } = useChat();

  const handleUnfriend = () => {
    unfriend.mutate(props.id);
    setAnchorEl(null);
  };

  const unfriend = useMutation(friendAPI.unfriend, {
    onSuccess: (response) => {
      enqueueSnackbar(`unfriend Sucessfull`, { variant: "success" });
      getFriendList.mutate();
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });
  const getFriendList = useMutation(friendAPI.friendList, {
    onSuccess: (response) => {
      if (response.data.length > 0) {
        const friendList = [];
        response.data.forEach((e) => {
          friendList.push({
            id: e.to_user_profile.id,
            fullname: e.to_user_profile.profile[0].fullname,
            avatar: e.to_user_profile.profile[0].avatar,
          });
        });
        FriendListContext.setFriendList(friendList);
      } else {
        FriendListContext.setFriendList([{ id: "", fullname: "", avatar: "" }]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  const handleItemClick = () => {
    setShowContactInfo(false);
    setShowChatDetail(true);
    setToUserId(props.id);
    setToGroupId('');
    setChatProfile({
      id: props.id,
      name: props.fullname,
      isGroupChat: false,
      avatar: props.avatar,
    });
  };

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Button
        key={props.id}
        size="large"
        sx={{ justifyContent: "left", width: "100%" }}
        onClick={handleItemClick}
      >
        <Avatar
          sx={{ marginRight: 3 }}
          src={`data:image/png;base64, ${props.avatar}`}
        />
        <Typography variant="h4">{props.fullname}</Typography>
      </Button>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ padding: 0 }} onClick={handleUnfriend}>
          <Button>Unfriend</Button>
        </MenuItem>
      </Menu>
      <Divider />
    </Stack>
  );
};

export default Friend;
