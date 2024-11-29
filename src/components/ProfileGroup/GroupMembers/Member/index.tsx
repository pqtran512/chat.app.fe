import { Avatar, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface MemberProps {
  id: string;
  fullname: string;
  avatar: string;
}

const Member: FC<MemberProps> = (props) => {
  return (
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Avatar src={`data:image/jpeg;base64, ${props.avatar}`} />
        <Typography variant="h4">{props.fullname}</Typography>
      </Stack>
  );
};

export default Member;
