import { useContext, useEffect, useState } from "react";
import Scrollbar from "src/components/Scrollbar";
import { SidebarContext } from "src/contexts/SidebarContext";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Drawer,
  styled,
  Divider,
  useTheme,
  Button,
  darken,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";

import SidebarMenu from "./SidebarMenu";
import Logo from "src/components/LogoSign";
import ProfileComponent from "src/components/Profile";
import Setting from "src/components/Setting";
import { useAuth } from "src/contexts/AuthContext";
import { useMutation, useQuery } from "react-query";
import { authAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { LogOutDto } from "src/types/api/dto/auth";
import { STORAGE_KEY } from "src/utils/constants";
import { disconnectChatSocket } from "src/utils/ws/clients/chat";
import { userAPI } from "src/api/user.api";
import { LanguageContext } from "src/language/LanguageProvider";
import { useNavigate } from "react-router-dom";

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
  const userId = localStorage.getItem("id");
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  const [openMyProfile, setOpenMyProfile] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const handleClickProfile = () => {
    setOpenMyProfile(true);
  };

  const {
    data: userDetail,
    isLoading: loadingGetUserDetail,
    refetch: refetchGetUserDetail,

  } = useQuery({
    queryKey: ["GetUserDetail", userId],
    queryFn: () => userAPI.getDetail(userId),
    select: (rs) => {
      return rs.data;
    },
    enabled: !!userId,
  });

  return (
    <>
      <SidebarWrapper
        sx={{
          // display: {
          //   xs: "none",
          //   lg: "inline-block",
          // },
          display: "inline-block",
          // position: "fixed",
          position: {
            xs: "absolute",
            lg: "fixed",
          },
          left: 0,
          top: 0,
          background: "#1FAEEB",
          boxShadow:
            theme.palette.mode === "dark" ? theme.sidebar.boxShadow : "none",
        }}
      >
        <Box height={'85vh'}>
          {!loadingGetUserDetail && ( // fix - no comment
          <Box mt={3}>
            <Box>
              <Button
                // onClick={() => {
                //   setOpenMyProfile(true);
                //   console.log("Open profile");
                //   getProfile.mutate();
                // }}
                onClick={handleClickProfile}
                sx={{ mx: 'auto' }}
              >
                <Avatar
                  sx={{ width: 55, height: 55, bgcolor: '#AAAAAA', fontSize: '18px', border: '2px solid white' }}
                  alt={userDetail?.username || "Avatar"}
                  src={userDetail?.avatar && `data:image/jpeg;base64,${userDetail?.avatar}`}
                />
              </Button>
            </Box>
          </Box>
          )}

          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10],
            }}
          />
          <SidebarMenu />
        </Box>
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
          <SettingButton
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

      {!loadingGetUserDetail && (
      <>
        {" "}
        <ProfileComponent
          profile={userDetail}
          open={openMyProfile}
          handleClose={setOpenMyProfile}
        />
        <Setting open={openSetting} handleClose={setOpenSetting} />
      </>
      )}
    </>
  );
}

function SettingButton({ setOpenProfile, setOpenSetting }) {
  const { t } = useContext(LanguageContext);
  const theme = useTheme();
  const navigate = useNavigate();
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
        disconnectChatSocket();
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  const handleLogout = async () => {
    const userId: string | null = localStorage.getItem(STORAGE_KEY.ID);
    const access_token: string | null = localStorage.getItem(
      STORAGE_KEY.ACCESS_TOKEN
    );
    if (userId && access_token) {
      logout.mutate({ userId, access_token } as unknown as LogOutDto);
      localStorage.clear();
      navigate("/login");
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
        <SettingsIcon fontSize="large"
          sx={{
            color: theme.colors.alpha.trueWhite[100],
          }}
        />
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
        transitionDuration={0}
      >
        <MenuItem
          sx={{ justifyContent: "space-between" }}
          onClick={() => {
            setAnchorEl(null);
            setOpenProfile(true);
          }}
        >
          <Typography>{t.profile}</Typography>
          <PersonIcon />
        </MenuItem>
        <MenuItem
          sx={{ justifyContent: "space-between" }}
          onClick={() => {
            setAnchorEl(null);
            setOpenSetting(true);
          }}
        >
          <Typography>{t.settings}</Typography>
          <SettingsIcon />
        </MenuItem>
        <MenuItem
          sx={{ justifyContent: "space-between" }}
          onClick={handleLogout}
        >
          <Typography>{t.signout}</Typography>
          <LogoutIcon sx={{ marginLeft: 2 }} />
        </MenuItem>
      </Menu>
    </>
  );
}

export default Sidebar;
