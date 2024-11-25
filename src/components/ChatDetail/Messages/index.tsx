import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Chat_History } from "src/data";
import { TimeLineBreak, TextMsg, ImgMSg, ReplyMsg, LinkMsg, DocMsg } from "./MsgType";

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
  return (
    <Box overflow={"scroll"}>
      <Stack spacing={1}>
        {Chat_History.map((el, index) => {
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
        })}
      </Stack>
    </Box>
  );
};

export default Messages;
