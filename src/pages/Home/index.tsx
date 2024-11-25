import { Box, Stack } from "@mui/material";
import { useState, FC } from "react";
import ChatList from "src/components/ChatList";
import ChatDetail from "src/components/ChatDetail";
import ChatInformaion from "src/components/ChatInfomation";
import ContactBar from "src/components/Contactbar";
import { useTabs } from "src/contexts/TabsContext";
import ContactInfo from "src/components/ContactInfo";
import { enqueueSnackbar } from "notistack";
import { useFriendList } from "src/contexts/FriendContext";
import { useMutation } from "react-query";
import { friendAPI } from "src/api/friend.api";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const { showChatBoxList, showChatDetail, showContactInfo, showContactList } =
    useTabs();

  const [chosen, setChosen] = useState(0);
  const [openChatInfo, setOpenChatInfo] = useState(false);

  const friendListContext = useFriendList();

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
        {showChatBoxList && <ChatList />}
        {showContactList && <ContactBar chosen={chosen} setChosen={setChosen} />}
        {showChatDetail && (
          <ChatDetail {...{ openChatInfo, setOpenChatInfo }} />
        )}
        {showContactInfo && <ContactInfo chosen={chosen} />}
      </Stack>
    </Box>
  );
};

export default HomePage;
