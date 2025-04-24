import {
  Avatar,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useMutation, useQueryClient } from "react-query";
import { groupAPI } from "src/api/group.api";
import { useGroupList } from "src/contexts/GroupContext";
import { enqueueSnackbar } from "notistack";
import { useTabs } from "src/contexts/TabsContext";
import { useChat } from "src/contexts/ChatContext";
import { useAuth } from "src/contexts/AuthContext";
import { group } from "console";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface GroupProps {
  id: string;
  name: string;
  avatar: string;
  memberCount?: number;
  owner_id?: string;
}

const Group: FC<GroupProps> = (props) => {
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
  const groupListContext = useGroupList();
  const { userId } = useAuth();

  const queryClient = useQueryClient();

  const handleLeaveGroup = () => {
    leaveGroup.mutate(props.id);
    setAnchorEl(null);
  };

  const { setShowChatDetail, setShowContactInfo } = useTabs();
  const { setToUserId, setToGroupId, setChatProfile } = useChat();

  const handleItemClick = () => {
    setShowContactInfo(false);
    setShowChatDetail(true);
    setToGroupId(props.id);
    setToUserId("");
    setChatProfile({
      id: props.id,
      avatar: props.avatar,
      name: props.name,
      isGroupChat: true,
      memberCount: props.memberCount,
      groupOwnerId: props.owner_id,
    });
  };

  const leaveGroup = useMutation(groupAPI.leaveGroup, {
    onSuccess: (response) => {
      enqueueSnackbar(`Rời nhóm ${props.name}`, {
        variant: "success",
      });
      queryClient.invalidateQueries(["GetListGroupByUser"]);
      // searchGroup.mutate({ searchText: "" });
    },
    onError: (error: any) => {
      enqueueSnackbar(
        `Rời nhóm ${props.name} không thành công - ${error.message}`,
        {
          variant: "error",
        }
      );
    },
  });

  const searchGroup = useMutation(groupAPI.groupList, {
    onSuccess: (res) => {
      if (res.data.groups.length > 0) {
        const searchGroupResults = [];
        res.data.groups.map((e) => {
          searchGroupResults.push({
            id: e.group.id,
            name: e.group.name,
            avatar: e.group.avatar,
            group_members: [...e.group.group_members],
          });
        });
        groupListContext.setGroupList([...searchGroupResults]);
      } else {
        enqueueSnackbar("", {
          variant: "info",
        });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleRemoveGroup = () => {
    removeGroup.mutate(props.id);
    handleClose();
  };
  const removeGroup = useMutation(groupAPI.deleteGroup, {
    onSuccess: (response) => {
      enqueueSnackbar("Giải tán nhóm", { variant: "success" });
      queryClient.invalidateQueries(["GetListGroupByUser"]);
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Button
        key={props.id}
        size="large"
        sx={{ justifyContent: "left", width: "100%" }}
        onClick={handleItemClick}
      >
        {/* <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<SmallAvatar alt="Remy Sharp" src={props.avatar[0]} />}
        >
          <Avatar alt="Travis Howard" src={props.avatar[1]} />
        </Badge> */}
        <Avatar
          alt={props.name}
          src={props?.avatar}
        />

        <Typography variant="h4" sx={{ marginLeft: 3 }}>
          {props.name}
        </Typography>
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
        <MenuItem onClick={handleLeaveGroup}>
          <Typography color="primary" variant="h5">
            Rời nhóm
          </Typography>
        </MenuItem>
        {props.owner_id && props.owner_id === userId && (
          <MenuItem onClick={handleRemoveGroup}>
            <Typography color="error" variant="h5">
              Giải tán nhóm
            </Typography>
          </MenuItem>
        )}
      </Menu>
      <Divider />
    </Stack>
  );
};

export default Group;
