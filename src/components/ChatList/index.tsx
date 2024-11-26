import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, FC } from "react";
import SingleChat from "./SingleChat";
import { ChatLists } from "src/data";
import GroupChat from "./GroupChat";
import { faker } from "@faker-js/faker";
import SearchFriend from "../SearchFriend";
import CreateGroup from "../CreateGroup";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import { useFriendList } from "src/contexts/FriendContext";
import { enqueueSnackbar } from "notistack";

const ChatGroupHistory = [
  {
    id: 0,
    group: true,
    img: [
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
      faker.image.avatar(),
    ],
    name: "Software Architrcture Group",
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    online: true,
  },
];

interface ChatListProps {}

const ChatList: FC<ChatListProps> = () => {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openSearchFriend, setOpenSearchFriend] = useState(false);
  const friendListContext = useFriendList();

  const handleClose = () => {
    setOpenCreateGroup(false);
    setOpenSearchFriend(false);
  };

  const handleOpenCreateGroup = () => {
    setOpenCreateGroup(true);
    getFriendList.mutate();
  };

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
        friendListContext.setFriendList(friendList);
      } else {
        friendListContext.setFriendList([{ id: "", fullname: "", avatar: "" }]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        width: 500,
        backgroundColor: "#fff",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack sx={{ height: "100vh" }} direction="column" p={2} spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            id="search"
            label="Tìm kiếm"
            variant="outlined"
            sx={{ width: 250 }}
            // slotProps={{
            //   input: {
            //     startAdornment: <InputAdornment position="start">
            //       <IconButton>
            //         <SearchIcon/>
            //       </IconButton>
            //     </InputAdornment>
            //   }
            // }}
          />
          <Stack direction={"row"} spacing={1}>
            <IconButton
              sx={{ padding: "0 0 0 0" }}
              onClick={() => setOpenSearchFriend(true)}
            >
              <PersonAddAltIcon />
            </IconButton>
            <IconButton
              sx={{ padding: "0 0 0 0" }}
              onClick={handleOpenCreateGroup}
            >
              <GroupAddIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1}>
              <Button
                variant="text"
                sx={{ padding: "0 0 0 0", color: "#6e7278" }}
              >
                Tất cả
              </Button>
              <Button
                variant="text"
                sx={{ padding: "0 0 0 0", color: "#6e7278" }}
              >
                Chưa đọc
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Button
                variant="text"
                sx={{ padding: "0 0 0 0", color: "#6e7278" }}
              >
                Phân loại
                <KeyboardArrowUpIcon />
              </Button>
              {/* <IconButton sx={{ padding: "0 0 0 0" }}>
                  <MoreHorizIcon />
                </IconButton> */}
            </Stack>
          </Stack>
          <Divider />
        </Stack>

        <Stack
          sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          direction="column"
          spacing={1}
        >
          <GroupChat {...ChatGroupHistory[0]} />
          {ChatLists.map((el) => {
            return <SingleChat {...el} />;
          })}
          {/* {ChatLists.map((el) => {
              return el.group 
              ?  <GroupChat {...el} />
              :  <SingleChat {...el} />;
            })} */}
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

export default ChatList;
