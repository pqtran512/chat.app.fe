import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface FriendSentProps {
  id: string;
  fullname: string;
  avatar: string;
}

const FriendSent: FC<FriendSentProps> = (props) => {
  return (
    <Box key={props.id}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ margin: 1 }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar sx={{ marginRight: 3 }} src={props.avatar} />
          <Typography variant="h4">{props.fullname}</Typography>
        </Stack>

        <Button>Cancel</Button>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FriendSent;
