import { Box, Stack } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";
import ChatDetail from "src/components/ChatDetail";
import ContactBar from "src/components/Contactbar";
import ContactInfo from "src/components/ContactInfo";
import {
  FriendListProvider,
  FriendSentProvider,
  useFriendList,
} from "src/contexts/FriendContext";
import { GroupListProvider } from "src/contexts/GroupContext";

interface ContactProps {}

const Contact: FC<ContactProps> = (props) => {
  const [chosen, setChosen] = useState(0);
  const [openChatInfo, setOpenChatInfo] = useState(false);

  const friendListContext = useFriendList();

  const handleOpenContact = () => {
    console.log("contact");
    getFriendList.mutate();
    console.log(friendListContext.friendList);
  };

  const getFriendList = useMutation(friendAPI.friendList, {
    onSuccess: (response) => {
      const friendList = [];
      if (response.data !== "") {
        response.data.forEach((e) => {
          friendList.push({
            id: e.to_user_profile.profile[0].id,
            fullname: e.to_user_profile.profile[0].fullname,
            avatar: e.to_user_profile.profile[0].avatar,
          });
        });
        friendListContext.setFriendList(friendList);
      } else {
        friendListContext.setFriendList([{ id: "", fullname: "", avatar: "" }]);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.message, { variant: "error" });
    },
  });

  return (
    <Box>
      <Stack direction={"row"}>
        <ContactBar chosen={chosen} setChosen={setChosen} />
        <ContactInfo chosen={chosen} />
        {/* <ChatDetail {...{ openChatInfo, setOpenChatInfo }} /> */}
      </Stack>
    </Box>
  );
};

export default Contact;
