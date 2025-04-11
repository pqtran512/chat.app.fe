import { Box, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";

import { useFriendRequest } from "src/contexts/FriendContext";
import FriendSent from "./FriendSent";
import FriendReceived from "./FriendReceived";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

interface FriendRequestsProps { }
const FriendRequests: FC<FriendRequestsProps> = (props) => {
  const theme = useTheme();
  const { t } = useContext(LanguageContext);

  const { friendSentList, friendReceivedList } = useFriendRequest();

  return (
    <Stack sx={{ height: "100vh" }}>
      <Box sx={{
        backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        padding: 2
      }}>
        <Stack direction={"row"}>
          <PersonAddAlt1Icon sx={{
            marginRight: 1,
            marginLeft: {
              xs: 4,
              lg: 0,
            }
          }} />
          <Typography variant="h4">{t.friend_request}</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="auto">
        <Box sx={{ padding: 3 }}>
          <Typography>{`${t.friend_request_sent} (${friendSentList[0].id === '' ? 0 : friendSentList.length})`}</Typography>
        </Box>
        <Stack spacing={1} sx={{
          backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        }}>
          {friendSentList[0].id !== '' && friendSentList.map((f) => (
            <FriendSent {...f} />
          ))}
        </Stack>
        <Box sx={{ padding: 3 }}>
          <Typography>{`${t.friend_request_received} (${friendReceivedList[0].id === '' ? 0 : friendReceivedList.length})`}</Typography>
        </Box>
        <Stack spacing={1} sx={{
          backgroundColor: theme.palette.mode === 'light' ? "#fff" : '#303030',
        }}>
          {friendReceivedList[0].id !== '' && friendReceivedList.map((f) => (
            <FriendReceived {...f} />
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};
export default FriendRequests;
