import { FC } from "react";
import { Box, Avatar, styled, Badge, Stack, Typography } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface SingleChatProps {
  id: number;
  group?: boolean;
  img?: string;
  name: string;
  msg: string;
  time: string;
  unread: number;
  online: boolean;
}

const SingleChat: FC<SingleChatProps> = (props) => {
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
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            {props.online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar src={props.img} />
              </StyledBadge>
            ) : (
              <Avatar src={props.img} />
            )}

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

export default SingleChat;
