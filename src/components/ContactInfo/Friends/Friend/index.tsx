import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { FC } from "react";

interface FriendProps {
  id: string;
  fullname: string;
  avatar: string;
}

const Friend: FC<FriendProps> = (props) => {
  return (
    <Box>
      <Button
        key={props.id}
        size="large"
        sx={{ justifyContent: "left", width: "100%" }}
      >
        <Avatar sx={{ marginRight: 3 }} src={props.avatar} />
        <Typography variant="h4">{props.fullname}</Typography>
      </Button>
      <Divider />
    </Box>
  );
};

export default Friend;
