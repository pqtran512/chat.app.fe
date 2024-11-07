import { FC, ReactNode, useEffect } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

// import Sidebar from './Sidebar';
// import Header from './Header';
import { STORAGE_KEY } from "src/utils/constants";
// import Footer from './Footer';
import { useAuth } from "src/contexts/AuthContext";
import Sidebar from "./Sidebar";

interface AuthProps {
  children?: ReactNode;
}

const Auth: FC<AuthProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY.ACCESS_TOKEN && !e.newValue) {
        navigate("/login", { replace: true });
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY.REFRESH_TOKEN && !e.newValue) {
        navigate("/login", { replace: true });
      }
    });
  }, []);

  if (!localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: "100%",

          ".MuiPageTitle-wrapper": {
            background:
              theme.palette.mode === "dark"
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`,
          },
        }}
      >
        {/* <Header /> */}
        <Sidebar />
        <Box
          sx={{
            position: "relative",
            zIndex: 5,
            display: "block",
            flex: 1,
            [theme.breakpoints.up("lg")]: {
              ml: `${theme.sidebar.width}`,
            },
          }}
        >
          <Box display="block">
            <Outlet />
          </Box>
          {/* <Footer /> */}
        </Box>
      </Box>
    </>
  );
};

export default Auth;
