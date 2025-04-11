import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Theme,
  useMediaQuery,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, FC, useEffect, useContext } from "react";
import SingleChat from "./SingleChat";
import GroupChat from "./GroupChat";
import SearchFriend from "../SearchFriend";
import CreateGroup from "../CreateGroup";
import { useQuery, useQueryClient } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { ListChatBoxByUserResult } from "src/types/api/response/chatbox";
import { useChat } from "src/contexts/ChatContext";
import { ReceiveMessageDto } from "src/types/ws/dto/chat";
import { onReceiveChat } from "src/utils/ws/clients/chat.";
import { useAuth } from "src/contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

import moment from "moment";
import "moment/locale/vi";
import { ChatBox, Group } from "src/types/entities";
moment.locale("vi");

interface ChatListProps {
  onSelectChat: (chatboxId: string) => void;
  onSuccess?: (data: Group[]) => void;
}

const ChatList: FC<ChatListProps> = ({ onSelectChat, onSuccess }) => {
  const theme = useTheme();
  const { t } = useContext(LanguageContext);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openSearchFriend, setOpenSearchFriend] = useState(false);
  const { userId } = useAuth();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const {
    toUserId,
    toGroupId,
    chatboxId,
    setChatboxId,
    setToUserId,
    setToGroupId,
    setChatProfile,
  } = useChat();

  const { data, isLoading } = useQuery({
    queryKey: ["GetChatBoxListByUser"],
    queryFn: () => chatAPI.listChatBox(),
    enabled: true,
    select: (rs) => {
      if (onSuccess) {
        onSuccess(rs.data);
      }
      
      if (rs.data.length > 0 && !toUserId && !toGroupId) {
        // const firstChatBox = rs.data.data[0];
        const firstChatBox = rs.data[0];
        // setChatboxId(firstChatBox.id);  // fix - tran
        // if (firstChatBox.to_group_profile) {
          // const { avatar, name, id, group_members } =
          //   firstChatBox.to_group_profile;
          const { avatar, name, id, group_members } = firstChatBox;
          setToGroupId(id);
          setChatProfile({
            id,
            isGroupChat: true,
            name,
            avatar,
            memberCount: group_members.length,
            // newMessage: firstChatBox.new_message,
            // groupOwnerId: firstChatBox.to_group_profile.owner_id,
          });

        // } else {
        //   const uid = firstChatBox.to_user_profile.id;
        //   const { avatar, fullname } = firstChatBox.to_user_profile.profile[0];
        //   setToUserId(uid);
        //   setChatProfile({
        //     id: uid,
        //     isGroupChat: false,
        //     name: fullname,
        //     avatar,
        //     newMessage: firstChatBox.new_message,
        //     groupOwnerId: '',
        //   });
        // }
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
        width: isMobile ? "100%" : 500,
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
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
            label={t.search}
            variant="outlined"
            sx={{ width: 250 }}
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
                sx={{ padding: "0 0 0 0", color: theme.palette.mode === 'light' ? 'black' : 'white' }}
              >
                {t.all}
              </Button>
              <Button
                variant="text"
                sx={{ padding: "0 0 0 0", color: theme.palette.mode === 'light' ? 'black' : 'white' }}
              >
                {t.un_read}
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}></Stack>
          </Stack>
          <Divider />
        </Stack>

        <Stack
          sx={{
            flexGrow: 1,
            overflow: "auto",
            height: "100%",
            marginTop: "0px !important",
          }}
          direction="column"
        >
          {data &&
            data.map((chatbox, index) => {
              const time = moment(chatbox.latest_updated_date).fromNow();
              // const lastChatLogContent = chatbox?.chatbox_chatlogs[0]?.chat_log.content; // fix - tran
              const lastChatLogContent = "Hello" // fix - tran
              // const isNewMessage = chatbox.new_message; // fix - tran
              const isNewMessage = "How are you ?"; // fix - tran
              const chatboxId = chatbox.id;

              // if (chatbox.to_user_profile) { // fix - tran
              //   const { fullname, avatar } = chatbox.to_user_profile.profile[0];
              //   return (
              //     <SingleChat
              //       key={index}
              //       id={chatbox.to_user_profile.id}
              //       chatboxId={chatboxId}
              //       name={fullname}
              //       img={avatar}
              //       time={time}
              //       msg={lastChatLogContent}
              //       newMessage={isNewMessage}
              //       onClick={() => onSelectChat(chatboxId)}
              //     />
              //   );
              // }
              // const { name, avatar, id, group_members, owner_id } =
              //   chatbox.to_group_profile; // fix - tran
                const { name, avatar, id, group_members, owner_id } =
                chatbox;
              return (
                <GroupChat
                  key={index}
                  id={id}
                  chatboxId={chatboxId}
                  name={name}
                  img={avatar ? avatar : ""}
                  time={time}
                  memberCount={group_members ? group_members.length : 0}
                  msg={lastChatLogContent}
                  // newMessage={isNewMessage}
                  ownerId={owner_id}
                  onClick={() => onSelectChat(chatboxId)}
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
