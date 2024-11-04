import { useContext, useState } from "react";
import Scrollbar from "src/components/Scrollbar";
import { SidebarContext } from "src/contexts/SidebarContext";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import {
  Box,
  Drawer,
  alpha,
  styled,
  Divider,
  useTheme,
  Button,
  lighten,
  darken,
  Tooltip,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Stack,
  Icon,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";
import Logo from "src/components/LogoSign";
import Profile from "src/components/Profile";
import Setting from "src/components/Setting";

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const [openMyProfile, setOpenMyProfile] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: "none",
            lg: "inline-block",
          },
          position: "fixed",
          left: 0,
          top: 0,
          background: "#0190f3",
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box 
              mx={2}
              sx={{
                width: 52,
              }}
            >
              <Button
                onClick={() => setOpenMyProfile(true)}
                sx={{ padding: 0 }}
              >
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt="Avatar"
                  src="https://cdn.tuoitre.vn/thumb_w/1200/471584752817336320/2024/9/21/aa1qvcnt-1726869380138704119824.jpeg"
                />
              </Button>
              {/* <Logo /> */}
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          // paddingTop={2.5}
          padding={1}
        >
          <SettingBotton setOpenProfile={setOpenMyProfile} setOpenSetting={setOpenSetting}/>
          {/* <div>
            <b>Version</b> {process.env.REACT_APP_VERSION}
          </div> */}
        </Box>
        {/* <Divider
          sx={{
            background: theme.colors.alpha.trueWhite[10],
          }}
        />
        <Box display="flex" justifyContent="center" alignItems="center" sx={{height: "50px"}} >
          <SettingsIcon/>
        </Box> */}
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`,
        }}
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.white[100]
                : darken(theme.colors.alpha.black[100], 0.5),
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52,
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.trueWhite[10],
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
      <Profile open={openMyProfile} handleClose={setOpenMyProfile} />
      <Setting open={openSetting} handleClose={setOpenSetting}/>
    </>
  );
}

function SettingBotton({setOpenProfile, setOpenSetting}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ padding: "0" }} onClick={()=>{
          setAnchorEl(null);
          setOpenProfile(true);
        }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <IconButton>
              <PersonIcon />
            </IconButton>
            <Typography>Profile Information</Typography>
          </Stack>
        </MenuItem>
        <MenuItem sx={{ padding: "0" }} onClick={()=> {
          setAnchorEl(null);
          setOpenSetting(true);
        }}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <Typography>Setting</Typography>
          </Stack>
        </MenuItem>
        <MenuItem sx={{ padding: "0" }} onClick={handleClose}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <IconButton>
              <LogoutIcon />
            </IconButton>
            <Typography>Sign out</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Sidebar;
