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
import { onReceiveChat } from "src/utils/ws/clients/chat";
import { useAuth } from "src/contexts/AuthContext";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

import moment from "moment";
import "moment/locale/vi";
import { ChatBox, Group } from "src/types/entities";
import { Conversation } from "src/types/entities/conversation.entity";
moment.locale("vi");

interface ChatListProps {
  onSelectChat: (chatboxId: string) => void;
  onSuccess?: (data: any) => void;
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

  // const { data, isLoading } = useQuery({
  //   queryKey: ["GetChatBoxListByUser"],
  //   queryFn: () => chatAPI.listChatBox(1),
  //   enabled: true,
  //   select: (rs) => {
  //     if (onSuccess) {
  //       onSuccess(rs.data);
  //     }
  //     const conversations = rs.data.conversations

  //     const { data, isLoading } = useQuery({
  //       queryKey: ["GetChatBoxListByUser"],
  //       queryFn: () => chatAPI.listChatBox(),
  //       enabled: true,
  //       select: (rs) => {
  //         if (onSuccess) {
  //           onSuccess(rs.data);
  //         }
  //         if (rs.data.count > 0 && !toUserId && !toGroupId) {
  //           const firstChatBox = rs.data.data[0];
  //           // setChatboxId(firstChatBox.id);
  //           if (firstChatBox.to_group_profile) {
  //             const { avatar, name, id, group_members } =
  //               firstChatBox.to_group_profile;
  //             setToGroupId(id);
  //             setChatProfile({
  //               id,
  //               isGroupChat: true,
  //               name,
  //               avatar,
  //               memberCount: group_members.length,
  //               newMessage: firstChatBox.new_message,
  //               groupOwnerId: firstChatBox.to_group_profile.owner_id,
  //             });
  //           } else {
  //             const uid = firstChatBox.to_user_profile.id;
  //             const { avatar, fullname } = firstChatBox.to_user_profile.profile[0];
  //             setToUserId(uid);
  //             setChatProfile({
  //               id: uid,
  //               isGroupChat: false,
  //               name: fullname,
  //               avatar,
  //               newMessage: firstChatBox.new_message,
  //               groupOwnerId: '',
  //             });
  //           }
  //         }
  //         return rs.data;
  //       },
  //     });

  // const { data, isLoading } = useQuery({
  //   queryKey: ["GetChatBoxListByUser"],
  //   queryFn: () => chatAPI.listChatBox(Number(userId)),
  //   enabled: true,
  //   select: (rs) => {
  //     if (onSuccess) onSuccess(rs.data);

  //     const conversations = rs.data.conversations;

  //     if (conversations && conversations.length > 0 && !toUserId && !toGroupId) {
  //       const firstConversation = conversations[0];
  //       const isGroupChat = firstConversation.participants.length > 2;

  //       if (isGroupChat) {
  //         const { name, id, participants } = firstConversation

  //         setToGroupId(firstConversation.id.toString());

  //         setChatProfile({
  //           id: id.toString(),
  //           isGroupChat: true,
  //           name: name,
  //           avatar: "",
  //           memberCount: participants.length,
  //           participants: participants
  //         });
  //       }
  //       else {
  //         const otherParticipant = firstConversation.participants.find(p => p.id.toString() !== userId)
  //         setToUserId(otherParticipant.id.toString());
  //         setChatProfile({
  //           id: otherParticipant.id.toString(),
  //           isGroupChat: false,
  //           name: otherParticipant.username,
  //           avatar: otherParticipant.avatar,
  //           participants: firstConversation.participants
  //         });
  //       }
  //     }

  //     return conversations;
  //   },
  // });

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["GetChatBoxListByUser"],
    queryFn: () => chatAPI.listChatBox(Number(userId)),
    enabled: true,
    select: (rs) => {
      if (onSuccess) onSuccess(rs.data);
      return rs.data.conversations;
    }
  });

  // useEffect(() => {

  //   if (!toUserId && !toGroupId && conversations.length > 0) {
  //     const firstConversation = conversations[0];
  //     const isGroupChat = firstConversation.participants.length > 2;

  //     if (isGroupChat) {
  //       const { name, id, participants } = firstConversation;

  //       setToGroupId(id.toString());

  //       setChatProfile({
  //         id: id.toString(),
  //         isGroupChat: true,
  //         name: name,
  //         avatar: "",
  //         memberCount: participants.length,
  //         participants: participants
  //       });

  //     } else {
  //       const otherParticipant = firstConversation.participants.find(p => p.id.toString() !== userId);
  //       if (otherParticipant) {
  //         setToUserId(otherParticipant.id.toString());

  //         setChatProfile({
  //           id: otherParticipant.id.toString(),
  //           isGroupChat: false,
  //           name: otherParticipant.username,
  //           avatar: otherParticipant.avatar,
  //           participants: firstConversation.participants
  //         });
  //       }
  //     }
  //   }
  // }, [conversations, toUserId, toGroupId]);

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
              {/* <Button
                variant="text"
                sx={{ padding: "0 0 0 0", color: theme.palette.mode === 'light' ? 'black' : 'white' }}
              >
                {t.un_read}
              </Button> */}
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
          {/* {data?.length &&
                data.map((chatbox, index) => {
                  // const time = moment(chatbox.latest_updated_date).fromNow();
                  const time = moment().fromNow();
                  // const lastChatLogContent = chatbox?.chatbox_chatlogs[0]?.chat_log.content;
                  const lastChatLogContent = "Hello"
                  // const isNewMessage = chatbox.new_message;
                  const isNewMessage = "How are you ?";
                  // const chatboxId = chatbox.id;
                  const chatboxId = '1';
                  // if (chatbox.to_user_profile) {
                  //   const { username, avatar } = chatbox.to_user_profile.profile[0];
                  //   return (
                  //     <SingleChat
                  //       key={index}
                  //       id={chatbox.to_user_profile.id}
                  //       chatboxId={chatboxId}
                  //       name={username}
                  //       img={avatar}
                  //       time={time}
                  //       msg={lastChatLogContent}
                  //       newMessage={isNewMessage}
                  //       onClick={() => onSelectChat(chatboxId)}
                  //     />
                  //   );
                  // }
                  // const { name, avatar, id, group_members, owner_id } =
                  //   chatbox.to_group_profile;
                  // const { name, avatar, id, group_members, owner_id } = chatbox;
                  const name = "Trân"
                  const avatar = ""
                  const id = "1"
                  const group_members = []
                  const owner_id = ""
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
                })} */}
          {conversations?.length > 0 &&
            [...conversations] // copy mảng để không mutate data gốc
              .sort((a, b) => {
                const timeA = new Date(a.latest_message_created_at).getTime();
                const timeB = new Date(b.latest_message_created_at).getTime();
                return timeB - timeA;
              }).map((conversation, index) => {
                const isGroupChat = conversation.participants.length > 2;

                const time =
                  conversation.latest_message_created_at
                    && conversation.latest_message_created_at !== '0001-01-01T00:00:00Z'
                    ? moment(conversation.latest_message_created_at).fromNow()
                    : moment().fromNow();

                let lastChatLogContent = conversation.latest_message_content;

                const seen = conversation.seen;
                const chatboxId = conversation.id.toString();

                const otherParticipant = !isGroupChat
                  ? conversation.participants.find(p => p.id.toString() !== userId)
                  : null;

                const avatar = isGroupChat
                  ? ''
                  : otherParticipant?.avatar || '';

                const group_name = isGroupChat ? conversation.name : otherParticipant?.username || '';

                if (isGroupChat) {
                  return (
                    <GroupChat
                      key={index}
                      id={chatboxId}
                      chatboxId={chatboxId}
                      name={group_name}
                      img={avatar}
                      time={time}
                      participants={conversation.participants}
                      memberCount={conversation.participants.length}
                      seen={seen}
                      latest_message_sender_name={conversation.latest_message_sender_name}
                      msg={lastChatLogContent}
                      ownerId={conversation.creator_id.toString()}
                      onClick={() => onSelectChat(chatboxId)}
                    />
                  );
                } else {
                  return (
                    <SingleChat
                      key={index}
                      id={chatboxId}
                      chatboxId={chatboxId}
                      name={group_name}
                      img={avatar}
                      time={time}
                      msg={lastChatLogContent}
                      seen={seen}
                      participants={conversation.participants}
                      latest_message_sender_name={conversation.latest_message_sender_name}
                      onClick={() => onSelectChat(chatboxId)}
                    />
                  );
                }
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
