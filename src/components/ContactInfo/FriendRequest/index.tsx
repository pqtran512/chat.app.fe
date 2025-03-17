import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

import { useFriendRequest } from "src/contexts/FriendContext";
import FriendSent from "./FriendSent";
import FriendReceived from "./FriendReceived";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useTheme } from "@mui/material/styles";

interface FriendRequestsProps { }
const FriendRequests: FC<FriendRequestsProps> = (props) => {
  const theme = useTheme();

  const { friendSentList, friendReceivedList } = useFriendRequest();

  return (
    <Stack sx={{ height: "100vh" }}>
      <Box sx={{
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        padding: 2
      }}>
        <Stack direction={"row"}>
          <PersonAddAlt1Icon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Lời mời kết bạn</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="auto">
        <Box sx={{ padding: 3 }}>
          <Typography>{`Lời mời đã gửi (${friendSentList[0].id === '' ? 0 : friendSentList.length})`}</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {friendSentList[0].id !== '' && friendSentList.map((f) => (
            <FriendSent {...f} />
          ))}
        </Stack>
        <Box sx={{ padding: 3 }}>
          <Typography>{`Lời mới đã nhận (${friendReceivedList[0].id === '' ? 0 : friendReceivedList.length})`}</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {friendReceivedList[0].id !== '' && friendReceivedList.map((f) => (
            <FriendReceived {...f} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
export default FriendRequests;
