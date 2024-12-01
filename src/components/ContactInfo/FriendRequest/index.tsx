import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useFriendRequest } from "src/contexts/FriendContext";
import FriendSent from "./FriendSent";
import FriendReceived from "./FriendReceived";
interface FriendRequestsProps {}
const FriendRequests: FC<FriendRequestsProps> = (props) => {

  const {friendSentList, friendReceivedList} = useFriendRequest();

  return (
    <Stack sx={{height: "100vh"}}>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <PersonAddAltIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Lời mời kiết bạn</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
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
