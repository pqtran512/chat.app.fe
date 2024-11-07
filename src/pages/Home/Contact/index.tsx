import { Box, Stack } from "@mui/material";
import { FC, useState } from "react";
import ContactBar from "src/components/Contactbar";
import ContactInfo from "src/components/ContactInfo";


interface ContactProps {};

const Contact:FC<ContactProps> = (props) => {
    const [chosen, setChosen] = useState(0);
    return (
        <Box>
            <Stack direction={'row'}>

                <ContactBar setChosen={setChosen}/>

                <ContactInfo chosen={chosen}/>

            </Stack>
        </Box>
    );
}

export default Contact;