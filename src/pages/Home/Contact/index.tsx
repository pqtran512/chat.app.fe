import { Box, Stack } from "@mui/material";
import { FC, useState } from "react";
import ContactBar from "src/components/Contactbar";
import ContactInfo from "src/components/ContactInfo";
import {
  FriendListProvider,
  FriendSentProvider,
} from "src/contexts/FriendContext";

interface ContactProps {}

const Contact: FC<ContactProps> = (props) => {
  const [chosen, setChosen] = useState(0);
  return (
    <FriendListProvider>
      <FriendSentProvider>
        <Box>
          <Stack direction={"row"}>
            <ContactBar chosen={chosen} setChosen={setChosen} />

            <ContactInfo chosen={chosen} />
          </Stack>
        </Box>
      </FriendSentProvider>
    </FriendListProvider>
  );
};

export default Contact;
