import { Box } from "@mui/material";
import { FC } from "react";

import Groups from "./Groups";
import Friends from "./Friends";
import FriendRequests from "./FriendRequest";
import GroupInvitations from "./GroupRequest";

interface ContactInfoProps {
  chosen: number;
}

const ContactInfo: FC<ContactInfoProps> = (props) => {
  console.log(props.chosen);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {props.chosen === Number(0) && <Friends />}
      {props.chosen === Number(1) && <Groups />}
      {props.chosen === Number(2) && <FriendRequests />}
      {props.chosen === Number(3) && <GroupInvitations />}
    </Box>
  );
};

export default ContactInfo;
