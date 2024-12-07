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

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
  const { chatboxId, toGroupId, toUserId } = useChat();
  const { userId } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const { isLoading, data } = useQuery({
    queryKey: ["ChatDetail", chatboxId, toGroupId, toUserId],
    queryFn: () =>
      chatAPI.chatDetail({
        chat_box_id: chatboxId,
        to_group: toGroupId,
        to_user: toUserId,
      }),
    select: (rs) => {
      return rs.data;
    },
  });

  useEffect(() => {
    if (data?.length) {
      ref.current?.scrollIntoView({
        block: "end",
      });
    }
  }, [data?.length]);

  return (
    <Box height={"100%"} overflow={"scroll"}>
      <Stack p={1} height={"100%"} spacing={1}>
        {/* {Chat_History.map((el, index) => {
          switch (el.type) {
            case "divider":
              return <TimeLineBreak key={index} {...el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <ImgMSg key={index} {...el} />;
                case "doc":
                  return <DocMsg key={index} {...el}/>
                case "link":
                  return <LinkMsg key={index} {...el}/>
                case "reply":
                  return <ReplyMsg key={index} {...el}/>

                default:
                  return <TextMsg key={index} {...el} />;
              }
            default:
              return <></>;
          }
        })} */}
        {data &&
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
          })}
        <div ref={ref} />
      </Stack>
    </Box>
  );
};

export default Messages;
