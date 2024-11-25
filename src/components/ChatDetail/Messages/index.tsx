import { Box, Stack } from "@mui/material";
import { FC } from "react";
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

  const { isLoading, data } = useQuery({
    queryKey: ["ChatDetail", chatboxId, toGroupId, toUserId],
    queryFn: () =>
      chatAPI.chatDetail({
        chat_box_id: chatboxId,
        to_group: toGroupId,
        to_user: toUserId,
      }),
    select: (rs) => {
      console.log(rs.data);
      return rs.data;
    },
  });

  return (
    <Box overflow={"scroll"}>
      <Stack minHeight={800} spacing={1}>
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
                return <TextMsg key={index} {...el} />;
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
      </Stack>
    </Box>
  );
};

export default Messages;
