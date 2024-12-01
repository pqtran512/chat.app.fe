import { Avatar, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import KeyIcon from "@mui/icons-material/Key";

interface MemberProps {
  id: string;
  fullname: string;
  avatar: string;
  isOwner?: boolean;
}

const Member: FC<MemberProps> = (props) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      spacing={2}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2} style={{}}>
        <Avatar src={`data:image/jpeg;base64, ${props.avatar}`} />
        <Typography variant="h4">{props.fullname}</Typography>
      </Stack>
      <Stack>{props.isOwner && <KeyIcon />}</Stack>
    </Stack>
  );
};

export default Member;
