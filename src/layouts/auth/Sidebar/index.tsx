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
import { useAuth } from "src/contexts/AuthContext";
import { STORAGE_KEY } from "src/utils/constants";
import { useMutation } from "react-query";
import { authAPI, profileAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { LogOutDto } from "src/types/api/dto/auth";

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

  // open profile
  const [profile, setProfile] = useState({
    fullname: "",
    avatar: "",
  });

  const handleClickProfile = () => {
    if (!localStorage.getItem("fullname")) {
      getProfile.mutate();
      setOpenMyProfile(true);
    } else {
      const fullname = localStorage.getItem("fullname");
      const avatar = localStorage.getItem("avatar");
      setProfile((prev) => ({ ...prev }));
      setProfile((prev) => ({ ...prev, fullname: fullname, avatar: avatar }));
      setOpenMyProfile(true);
    }
  };

  const getProfile = useMutation(profileAPI.getprofile, {
    onSuccess: (response) => {
      if (response.status === 200) {
        const { fullname, avatar } = response.data[0];
        localStorage.setItem("fullname", fullname);
        localStorage.setItem("avatar", avatar);

        setProfile((prev) => ({ ...prev, fullname: fullname, avatar: avatar }));
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

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
                // onClick={() => {
                //   setOpenMyProfile(true);
                //   console.log("Open profile");
                //   getProfile.mutate();
                // }}
                onClick={handleClickProfile}
                sx={{ padding: 0 }}
              >
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  alt="Avatar"
                  src={profile.avatar}
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
          <SettingBotton
            setOpenProfile={setOpenMyProfile}
            setOpenSetting={setOpenSetting}
          />
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
      <Profile
        open={openMyProfile}
        handleClose={setOpenMyProfile}
        fullname={profile.fullname}
        avatar={profile.avatar}
      />
      <Setting open={openSetting} handleClose={setOpenSetting} />
    </>
  );
}

function SettingBotton({ setOpenProfile, setOpenSetting }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { setAccessToken, setUserId } = useAuth();

  // logout
  const logout = useMutation(authAPI.logout, {
    onSuccess: async (response) => {
      const succsess: boolean = response.data;
      if (succsess) {
        setAnchorEl(null);
        localStorage.clear();
        setUserId("");
        setAccessToken("");
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleLogout = async () => {
    const userId: string | null = localStorage.getItem(STORAGE_KEY.ID);
    const refresh_token: string | null = localStorage.getItem(
      STORAGE_KEY.REFRESH_TOKEN
    );
    if (userId && refresh_token) {
      logout.mutate({ userId, refresh_token } as unknown as LogOutDto);
    }
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
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          sx={{ justifyContent: "space-between" }}
          onClick={() => {
            setAnchorEl(null);
            setOpenProfile(true);
          }}
        >
          <Typography>Profile</Typography>
          <PersonIcon />
        </MenuItem>
        <MenuItem
          sx={{ justifyContent: "space-between" }}
          onClick={() => {
            setAnchorEl(null);
            setOpenSetting(true);
          }}
        >
          <Typography>Setting</Typography>
          <SettingsIcon />
        </MenuItem>
        <MenuItem
          sx={{ justifyContent: "space-between" }}
          onClick={handleLogout}
        >
          <Typography>Sign out</Typography>
          <LogoutIcon sx={{ marginLeft: 2 }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default Sidebar;
