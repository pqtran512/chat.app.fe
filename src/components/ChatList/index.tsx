import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    Input,
    InputAdornment,
    Link,
    TextField,
    Typography,
  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useState, FC } from "react";

interface ChatListProps {}

const ChatList: FC<ChatListProps> = () => {

    const chats = {
    }

    return (
        <>
        <Box sx={{
                // backgroundColor: "#fff",
                // padding: "2px 2px 2px 2px",
                display: "flex",
                flexDirection: "column",
                border: "1px solid",
                padding: "0px 0px, 0px, 0px",
                position: "relative",
                margin: "0 auto"

            }}>
            {/* Search Bar */}
            <Box sx={{
                border: "1px solid",
                display: "flex",
                flex: "1",
                gap: "20px",
                padding: "20px",

                // align-items: center,
                // margin: "0px, 0px, 0px, 0px",
            }}>
                <Box sx={{
                    display: "flex"
                }}>
                    {/* <SearchIcon /> */}
                    <TextField id="search" label="Tìm kiếm" variant="outlined"/>
                </Box>
                <Box sx={{
                    display: "flex", 
                    alignItems: "center"}} >
                    <PersonAddAltIcon />
                </Box>

            </Box>
            {/* List chats */}
            <Box sx={{
                border: "1px solid"
            }}>
                <p>chat list</p>
            </Box>
        </Box>
        </>
    );
};

export default ChatList;