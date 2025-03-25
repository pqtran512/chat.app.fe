import { Box, IconButton } from "@mui/material";
import { FC } from "react";

import Groups from "./Groups";
import Friends from "./Friends";
import FriendRequests from "./FriendRequest";
import GroupInvitations from "./GroupRequest";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface ContactInfoProps {
  chosen?: number;
  onBack?: () => void;
}

const ContactInfo: FC<ContactInfoProps> = (props) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {props.onBack && (
        <IconButton
          sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
          onClick={props.onBack}
        >
          <ArrowBackIcon />
        </IconButton>
      )}
      {props.chosen === Number(0) && <Friends />}
      {props.chosen === Number(1) && <Groups />}
      {props.chosen === Number(2) && <FriendRequests />}
      {/* {props.chosen === Number(3) && <GroupInvitations />} */}
    </Box>
  );
};

export default ContactInfo;
