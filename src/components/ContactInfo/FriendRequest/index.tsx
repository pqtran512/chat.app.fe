import { Box, Stack, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FriendSent from "./FriendSent";
// import { FriendList } from "src/data";
import FriendReceived from "./FriendReceived";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";

interface FriendRequestsProps {}
const FriendRequests: FC<FriendRequestsProps> = (props) => {
  
  const [friendSentList, setFriendSentList] = useState([]);

  // useEffect(()=>{
  //   friendSent.mutate();
  // })
  

  const friendSent = useMutation(friendAPI.friendSent, {
    onSuccess: (response) => {
      console.log(response)
      console.log(response.data)
      setFriendSentList(response.data)
    },
    onError: (error: any) => {
      console.log(error)
    }
  })
  
  friendSent.mutate();

  return (
    <Stack>
      <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
        <Stack direction={"row"}>
          <PersonAddAltIcon sx={{ marginRight: 2 }} />
          <Typography variant="h4">Friend list</Typography>
        </Stack>
      </Box>
      <Box sx={{ paddingLeft: 3, paddingRight: 3 }} overflow="scroll">
        <Box sx={{ padding: 3 }}>
          <Typography>Sent (5)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {/* {friendSentList.map((f) => (
            <FriendSent {...f} />
          ))} */}
        </Stack>
        <Box sx={{ padding: 3 }}>
          <Typography>Received (10)</Typography>
        </Box>
        <Stack spacing={1} sx={{ backgroundColor: "#fff" }}>
          {/* {FriendList.map((f) => (
            <FriendReceived {...f} />
          ))} */}
        </Stack>
      </Box>
    </Stack>
  );
};
export default FriendRequests;
