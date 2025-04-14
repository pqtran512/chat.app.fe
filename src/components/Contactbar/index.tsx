import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CreateGroup from "../CreateGroup";
import SearchFriend from "../SearchFriend";
import { useMutation, useQuery } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendList, useFriendRequest } from "src/contexts/FriendContext";
import { enqueueSnackbar } from "notistack";
import { groupAPI } from "src/api/group.api";
import { useGroupList } from "src/contexts/GroupContext";
import { useTabs } from "src/contexts/TabsContext";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

interface ContactBarProps {
  chosen?: number;
  setChosen?: React.Dispatch<React.SetStateAction<number>>;
  onSelectContact?: () => void;
}

const ContactBar: FC<ContactBarProps> = (props) => {
  const theme = useTheme();
  const { t } = useContext(LanguageContext);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openSearchFriend, setOpenSearchFriend] = useState(false);
  const { setShowContactInfo, setShowChatDetail } = useTabs();

  const friendListContext = useFriendList();
  const friendRequestContext = useFriendRequest();
  const groupListContext = useGroupList();

  const handleClose = () => {
    setOpenCreateGroup(false);
    setOpenSearchFriend(false);
  };

  const handleOpenCreateGroup = () => {
    setOpenCreateGroup(true);
    refetch();
  };

  const showChatDetailActions = () => {
    setShowContactInfo(true);
    setShowChatDetail(false);
  };

  const handleFriendList = () => {
    showChatDetailActions();
    props.setChosen(0);
    props.onSelectContact?.();  // Gọi onSelectContact khi chọn
    refetch();
  };

  // const getFriendList = useQuery(friendAPI.friendList, {
  //   onSuccess: (response) => {
  //     if (response.data.length > 0) {
  //       const friendList = [];
  //       response.data.forEach((e) => {
  //         friendList.push({
  //           id: e.to_user_profile.id,
  //           fullname: e.to_user_profile.profile[0].fullname,
  //           avatar: e.to_user_profile.profile[0].avatar,
  //         });
  //       });
  //       friendListContext.setFriendList(friendList);
  //     } else {
  //       friendListContext.setFriendList([{ id: "", fullname: "", avatar: "" }]);
  //     }
  //   },
  //   onError: (error: any) => {
  //     enqueueSnackbar(error.response.data.message, { variant: "error" });
  //   },
  // });

  const { refetch } = useQuery({
    queryKey: ["FriendList"],
    queryFn: () => friendAPI.searchFriend({ text: "" }),
    enabled: false,
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
        friendListContext.setFriendList(friendList);
      } else {
        friendListContext.setFriendList([{ id: "", fullname: "", avatar: "" }]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleFriendRequests = async () => {
    showChatDetailActions();
    props.setChosen(2);
    props.onSelectContact?.();
    getFriendSent.mutate('1'); // fix - tran 
    getFriendReceived.mutate('1'); // fix - tran
  };

  const getFriendSent = useMutation(friendAPI.friendSent, {
    onSuccess: (response) => {

      if (response.data && response.data.length > 0) {
        const responeSentList = [];

        response.data.forEach((e) => {
          responeSentList.push({
            id: e.id,
            // fullname: e.to_user_profile.profile[0].fullname,
            // avatar: e.to_user_profile.profile[0].avatar,
            fullname: "Quỳnh Trân", // fix - tran
            avatar: "Trân"
          });
        });

        friendRequestContext.setFriendSentList(responeSentList);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const getFriendReceived = useMutation(friendAPI.friendRecieved, {
    onSuccess: (response) => {

      if (response.data && response.data.length > 0) {
        const responseReceivedList = [];

        response.data.forEach((e) => {
          if (e.status === 'pending') {
            responseReceivedList.push({
              id: e.friend_id,
              // fullname: e.from_user_profile.profile[0].fullname,
              // avatar: e.from_user_profile.profile[0].avatar,
              fullname: "Quỳnh Trân", // fix - tran
              avatar: "Trân"
            });
          }
        });

        friendRequestContext.setFriendReceivedList(responseReceivedList);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleGroupList = () => {
    showChatDetailActions();
    props.setChosen(1);
    props.onSelectContact?.();
    // getGroupList.mutate({ searchText: "" });
  };

  const getGroupList = useMutation(groupAPI.groupList, {
    onSuccess: (response) => {
      console.log(response.data);
      if (response.data.count > 0) {
        const responseGroupList = [];
        response.data.groups.forEach((e) => {
          responseGroupList.push({
            id: e.group.id,
            name: e.group.name,
            avatar: e.group.avatar,
            group_members: [...e.group.group_members],
            owner_id: e.group.owner_id,
          });
        });
        groupListContext.setGroupList([...responseGroupList]);
        groupListContext.setCount(response.data.count);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  useEffect(() => {
    props.setChosen(0);
    refetch();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        width: {
          xs: "100%",
          lg: 500,
        },
        height: "100vh",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        position: "relative",
      }}
    >
      <Stack p={2} spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            id="search"
            label={t.search}
            variant="outlined"
            sx={{ width: 250 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Stack direction={"row"} spacing={1}>
            <IconButton
              sx={{ padding: "0 0 0 0", color: theme.palette.mode === 'light' ? '#157FCA' : '#fff' }}
              onClick={() => setOpenSearchFriend(true)}
            >
              <PersonAddAlt1Icon />
            </IconButton>
            <IconButton
              sx={{ padding: "0 0 0 0", color: theme.palette.mode === 'light' ? '#157FCA' : '#fff' }}
              onClick={handleOpenCreateGroup}
            >
              <GroupAddIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Divider />
        <Stack>
          <Button
            key={0}
            variant={props.chosen == 0 ? "contained" : "text"}
            size="large"
            sx={{ justifyContent: "left" }}
            onClick={handleFriendList}
          >
            <PersonIcon sx={{ marginRight: 2 }} />
            <Typography variant="h4">{t.friend_list}</Typography>
          </Button>

          <Button
            key={1}
            variant={props.chosen === 1 ? "contained" : "text"}
            size="large"
            sx={{ justifyContent: "left" }}
            onClick={handleGroupList}
          >
            <GroupsIcon sx={{ marginRight: 2 }} />
            <Typography variant="h4">{t.group_list}</Typography>
          </Button>

          <Button
            variant={props.chosen === 2 ? "contained" : "text"}
            key={2}
            size="large"
            sx={{ justifyContent: "left" }}
            onClick={handleFriendRequests}
          >
            <PersonAddAlt1Icon sx={{ marginRight: 2 }} />
            <Typography variant="h4">{t.friend_request}</Typography>
          </Button>
          {/* <Button
            variant={props.chosen == 3 ? "contained" : "text"}
            key={3}
            size="large"
            sx={{ justifyContent: "left" }}
            onClick={() => props.setChosen(3)}
          >
            <GroupAddIcon sx={{ marginRight: 2 }} />
            <Typography variant="h4">
              Group and community invitations
            </Typography>
          </Button> */}
        </Stack>
      </Stack>
      {openCreateGroup && (
        <CreateGroup open={openCreateGroup} handleClose={handleClose} />
      )}
      {openSearchFriend && (
        <SearchFriend open={openSearchFriend} handleClose={handleClose} />
      )}
    </Box>
  );
};

export default ContactBar;
