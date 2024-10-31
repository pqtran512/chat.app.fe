import { FC } from "react";
import { Box, Avatar, styled, Badge, Stack, Typography } from "@mui/material";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface GroupChatProps {
  id: number;
  group?: boolean;
  img?: string[];
  name: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
}

const GroupChat: FC<GroupChatProps> = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: "#f0f0f5",
      }}
      p={1}
    >
      <Stack direction="row">
        <Stack
          direction={"row"}
          spacing={2}
          alignItems="center"
          justifyContent={"space-between"}
          p={0.6}
          width={"100%"}
        >
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            {/* {props.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={props.img} />
              </StyledBadge>
            ) : (
              <Avatar src={props.img} />
            )} */}
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar
                  alt="Remy Sharp"
                  src={props.img[0]}
                />
              }
            >
              <Avatar alt="Travis Howard" src={props.img[1]} />
            </Badge>

            <Stack direction={"column"}>
              <Typography variant="subtitle2">{props.name}</Typography>
              <Typography variant="subtitle1">{props.msg}</Typography>
            </Stack>
          </Stack>

          <Stack spacing={2} alignItems="center">
            <Typography sx={{ fontWeight: 300 }}>{props.time}</Typography>
            <Badge color="primary" badgeContent={props.unread}></Badge>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GroupChat;