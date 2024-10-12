import { useState, FC } from "react";
import Avatar from '@mui/material/Avatar';
import { Box, Stack } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import InfoIcon from '@mui/icons-material/Info';

interface ChatDetailProps {}

const ChatDetail: FC<ChatDetailProps> = () => {
    return (
        <>
        <Box sx={{
            border: "1px solid",
        }}> 
            {/* bar detail */}
            <Box sx={{border: "1px solid"}}>
                <Stack direction={"row"} spacing={5}>
                    <Box >
                        <Avatar>N</Avatar>
                        <span>Name</span>
                    </Box>
                    <Box>
                        <PersonAddAltIcon />
                        <SearchIcon />
                        <CallIcon />
                        <VideoCallIcon />
                        <InfoIcon />
                    </Box>
                </Stack>
            </Box>
            {/* chat detail */}
            <Box sx={{boder: "1px solid"}}>
                <span>chat details</span>
            </Box>
        </Box>
        </>
    );
};

export default ChatDetail;