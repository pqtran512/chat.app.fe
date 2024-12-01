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
import { useState, FC, useEffect } from "react";
import SingleChat from "./SingleChat";
import GroupChat from "./GroupChat";
import SearchFriend from "../SearchFriend";
import CreateGroup from "../CreateGroup";
import { useQuery, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";
import { useChat } from "src/contexts/ChatContext";
import moment from "moment";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";
import { onReceiveChat } from "src/utils/ws/clients/chat.";
import { useAuth } from "src/contexts/AuthContext";

interface ChatListProps {
  onSuccess?: (data: ListChatBoxByUserResult) => void;
}

const ChatList: FC<ChatListProps> = ({ onSuccess }) => {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openSearchFriend, setOpenSearchFriend] = useState(false);
  const {
    toUserId,
    toGroupId,
    chatboxId,
    setChatboxId,
    setToUserId,
    setToGroupId,
    setChatProfile,
  } = useChat();
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["GetChatBoxListByUser"],
    queryFn: () => chatAPI.listChatBox(),
    enabled: true,
    select: (rs) => {
      if (onSuccess) {
        onSuccess(rs.data);
      }
      if (rs.data.count > 0 && !toUserId && !toGroupId) {
        const firstChatBox = rs.data.data[0];
        // setChatboxId(firstChatBox.id);
        if (firstChatBox.to_group_profile) {
          const { avatar, name, id, group_members } =
            firstChatBox.to_group_profile;
          setToGroupId(id);
          setChatProfile({
            id,
            isGroupChat: true,
            name,
            avatar,
            memberCount: group_members.length,
            newMessage: firstChatBox.new_message,
            groupOwnerId: firstChatBox.to_group_profile.owner_id,
          });
        } else {
          const uid = firstChatBox.to_user_profile.id;
          const { avatar, fullname } = firstChatBox.to_user_profile.profile[0];
          setToUserId(uid);
          setChatProfile({
            id: uid,
            isGroupChat: false,
            name: fullname,
            avatar,
            newMessage: firstChatBox.new_message,
            groupOwnerId: '',
          });
        }
      }
      return rs.data;
    },
  });

  const handleClose = () => {
    setOpenCreateGroup(false);
    setOpenSearchFriend(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: 500,
        backgroundColor: "#fff",
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack sx={{ height: "100vh" }} direction="column" spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={2}
        >
          <TextField
            id="search"
            label="Tìm kiếm"
            variant="outlined"
            sx={{ width: 250 }}
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
              onClick={() => setOpenCreateGroup(true)}
            >
              <GroupAddIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack spacing={1} p={2}>
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
            <Stack direction="row" alignItems="center" spacing={1}></Stack>
          </Stack>
          <Divider />
        </Stack>

        <Stack
          sx={{
            flexGrow: 1,
            overflow: "scroll",
            height: "100%",
            marginTop: "0px !important",
          }}
          direction="column"
        >
          {data &&
            data.data.map((chatbox, index) => {
              const time = moment(chatbox.latest_updated_date).format("HH:mm");
              const lastChatLogContent =
                chatbox.chatbox_chatlogs[0].chat_log.content;
              const isNewMessage = chatbox.new_message;
              const chatboxId = chatbox.id;
              if (chatbox.to_user_profile) {
                const { fullname, avatar } = chatbox.to_user_profile.profile[0];
                return (
                  <SingleChat
                    key={index}
                    id={chatbox.to_user_profile.id}
                    chatboxId={chatboxId}
                    name={fullname}
                    img={avatar}
                    time={time}
                    msg={lastChatLogContent}
                    newMessage={isNewMessage}
                  />
                );
              }
              const { name, avatar, id, group_members, owner_id } =
                chatbox.to_group_profile;
              return (
                <GroupChat
                  key={index}
                  id={id}
                  chatboxId={chatboxId}
                  name={name}
                  img={avatar}
                  time={time}
                  memberCount={group_members.length}
                  msg={lastChatLogContent}
                  newMessage={isNewMessage}
                  ownerId={owner_id}
                />
              );
            })}
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
