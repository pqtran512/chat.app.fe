import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

interface ContactBarProps {
  setChosen: React.Dispatch<React.SetStateAction<number>>;
}

const ContactBar: FC<ContactBarProps> = (props) => {
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const handleCloseCreateGroup = () => {
    setOpenCreateGroup(false);
  };
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          width: 500,
          height: "100vh",
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          position: "relative",
        }}
      >
        <Stack p={2} spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              id="search"
              label="Tìm kiếm"
              variant="outlined"
              sx={{ width: 250 }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Stack direction={"row"} spacing={1}>
              <IconButton sx={{ padding: "0 0 0 0" }}>
                <PersonAddAltIcon />
              </IconButton>
              <IconButton
                sx={{ padding: "0 0 0 0" }}
                onClick={() => {
                  setOpenCreateGroup(true);
                }}
              >
                <GroupAddIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Divider />
          <Stack>
            <Button
              size="large"
              sx={{ justifyContent: "left" }}
              onClick={() => props.setChosen(0)}
            >
              <PersonIcon sx={{ marginRight: 2 }} />
              <Typography variant="h4">Friend list</Typography>
            </Button>
            <Button
              size="large"
              sx={{ justifyContent: "left" }}
              onClick={() => props.setChosen(1)}
            >
              <GroupsIcon sx={{ marginRight: 2 }} />
              <Typography variant="h4">
                Joined groups and communities
              </Typography>
            </Button>
            <Button
              size="large"
              sx={{ justifyContent: "left" }}
              onClick={() => props.setChosen(2)}
            >
              <PersonAddAlt1Icon sx={{ marginRight: 2 }} />
              <Typography variant="h4">Friend requests</Typography>
            </Button>
            <Button
              size="large"
              sx={{ justifyContent: "left" }}
              onClick={() => props.setChosen(3)}
            >
              <GroupAddIcon sx={{ marginRight: 2 }} />
              <Typography variant="h4">
                Group and community invitations
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ContactBar;
