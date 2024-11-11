import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface FriendReceivedProps {
  //   id: number;
  avatar: string;
  name: string;
}

const FriendReceived: FC<FriendReceivedProps> = (props) => {
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ margin: 1 }}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Avatar sx={{ marginRight: 3 }} src={props.avatar} />
          <Typography variant="h4">{props.name}</Typography>
        </Stack>
        <Stack direction={"row"}>
          <Button>Decline</Button>
          <Button>Accept</Button>
        </Stack>
      </Stack>

      <Divider />
    </Box>
  );
};

export default FriendReceived;
