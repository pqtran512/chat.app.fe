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
  username: string;
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
      enqueueSnackbar(`Hủy kết bạn thành công`, { variant: "success" });
      getFriendList.mutate(""); // fix -tran
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });
  
  const getFriendList = useMutation(friendAPI.searchFriend, {
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

        FriendListContext.setFriendList(friendList);
        
      } else {
        FriendListContext.setFriendList([{ id: "", username: "", avatar: "" }]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleItemClick = () => {
    setShowContactInfo(false);
    setShowChatDetail(true);
    setToUserId(props.id);
    setToGroupId('');
    setChatProfile({
      id: props.id,
      name: props.username,
      isGroupChat: false,
      avatar: props.avatar,
      groupOwnerId: '',
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
          src={props?.avatar}
        />
        <Typography variant="h4">{props.username}</Typography>
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
          <Button>Hủy kết bạn</Button>
        </MenuItem>
      </Menu>
      <Divider />
    </Stack>
  );
};

export default Friend;
