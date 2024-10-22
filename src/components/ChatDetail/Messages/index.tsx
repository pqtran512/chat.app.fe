import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { Chat_History } from "src/data";
import { TimeLineBreak, TextMsg, ImgMSg, ReplyMsg, LinkMsg, DocMsg } from "./MsgType";

interface MessagesProps {}

const Messages: FC<MessagesProps> = () => {
  return (
    <Box overflow={"scroll"}>
      <Stack spacing={1}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              return <TimeLineBreak {...el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <ImgMSg {...el} />;
                case "doc":
                  return <DocMsg {...el}/>
                case "link":
                  return <LinkMsg {...el}/>
                case "reply":
                  return <ReplyMsg {...el}/>

                default:
                  return <TextMsg {...el} />;
              }
              break;

            default:
              return <></>;
              break;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Messages;
