import { Box, Stack } from "@mui/material";
import { FC, useEffect, useRef } from "react";
import { Chat_History } from "src/data";
import {
  TimeLineBreak,
  TextMsg,
  ImgMSg,
  ReplyMsg,
  LinkMsg,
  DocMsg,
} from "./MsgType";
import { useChat } from "src/contexts/ChatContext";
import { useAuth } from "src/contexts/AuthContext";
import { useQuery } from "react-query";
import { chatAPI } from "src/api/chat.api";
import { ChatLogContentTypeCode } from "src/utils/enums";
import { da } from "@faker-js/faker/.";

interface MessagesProps { }

const Messages: FC<MessagesProps> = () => {
  const { chatboxId, toGroupId, toUserId } = useChat();
  const { chatProfile } = useChat()
  const { userId } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const { isLoading, data } = useQuery({
    // queryKey: ["ChatDetail", chatboxId, toGroupId, toUserId],
    queryKey: ["ChatDetail", chatboxId],
    queryFn: () =>
      chatAPI.chatDetail(chatboxId),
    select: (rs) => {
      return rs.data;
    },
    enabled: !!chatboxId,
  });

  useEffect(() => {
    if (data?.messages?.length) {
      ref.current?.scrollIntoView({
        block: "end",
      });
    }
  }, [data?.messages?.length]);

  return (
    <Box height="100%"
      overflow="auto"
      px={1}
      mb={4}
      display="flex"
      flexDirection="column">
      <Box
        flex="1" // 👈 Chiếm toàn bộ chiều cao còn lại để có thể đẩy nội dung xuống
        display="flex"
        flexDirection="column"
        justifyContent="flex-end" // 👈 Đẩy nội dung xuống đáy nếu chưa đủ chiều cao
      >
        <Stack p={1} spacing={1}>

          {/* <Box height={"100%"} overflow={"auto"} px={1} mb={4}>
      <Stack
        p={1}
        height="100%"
        spacing={1}
        display="flex"
        justifyContent="flex-end"
      > */}
          {/* fix - comment history */}
          {/* {Chat_History.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <TimeLineBreak key={index} {...el} />;
            case "msg":
              // fix - tran
              // switch (el.subtype) {
              //   case "img":
              //     return <ImgMSg key={index} {...el} />;
              //   case "doc":
              //     return <DocMsg key={index} {...el}/>
              //   case "link":
              //     return <LinkMsg key={index} {...el}/>
              //   case "reply":
              //     return <ReplyMsg key={index} {...el}/>

              //   default:
              return <TextMsg key={index} {...el} />;
            // }
            default:
              return <></>;
          }
        })} */}

          {/* {data && data.length > 0 &&
          data.map((el, index) => {
            switch (el.chat_log.content_type.code) {
              case ChatLogContentTypeCode.TEXT:
                return (
                  <TextMsg
                    key={index}
                    incoming={el.chat_log.owner_id !== userId}
                    message={el.chat_log.content}
                  />
                );
              case ChatLogContentTypeCode.IMAGE:
                return <ImgMSg key={index} {...el} />;
              case ChatLogContentTypeCode.VIDEO:
                return <ImgMSg key={index} {...el} />;
              // case "divider":
              //   return <TimeLineBreak key={index} {...el} />;
              // case "msg":
              //   switch (el.subtype) {
              //     case "img":
              //       return <ImgMSg key={index} {...el} />;
              //     case "doc":
              //       return <DocMsg key={index} {...el}/>
              //     case "link":
              //       return <LinkMsg key={index} {...el}/>
              //     case "reply":
              //       return <ReplyMsg key={index} {...el}/>

              //     default:
              //       return <TextMsg key={index} {...el} />;
              //   }
              default:
                return <></>;
            }
          })} */}
          {data && data.messages?.length > 0 &&
            data.messages.map((el, index) => {
              const sender = chatProfile.participants.find(p => Number(p.id) === el.senderId);
              const username = sender ? sender.username : '';
              return (
                <div key={index} style={{}}>
                  <span>{el.senderId !== Number(userId) && username} </span>
                  <TextMsg
                    incoming={el.senderId !== Number(userId)}
                    message={el.content}
                  />
                </div>
              );
            })}
          <div ref={ref} />
        </Stack>
      </Box>
    </Box>
  );
};

export default Messages;
