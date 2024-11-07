import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ChatLists, FriendList } from "src/data";

// icon
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Groups from "./Groups";
import Friends from "./Friends";

interface ContactInfoProps {
  chosen: number;
}

const ContactInfo: FC<ContactInfoProps> = (props) => {
  console.log(props.chosen);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stack>
        <Box sx={{ backgroundColor: "#fff", padding: 2 }}>
          <Stack direction={"row"}>
            <PersonIcon sx={{ marginRight: 2 }} />
            <Typography variant="h4">Friend list</Typography>
          </Stack>
        </Box>
        <Box>
          {props.chosen === Number(0) && <Friends />}
          {props.chosen === Number(1) && <Groups />}
          {props.chosen === Number(2) && <h1>Friend Request</h1>}
          {props.chosen === Number(3) && <h1>Groups Invitation</h1>}
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactInfo;
