import { FC, ReactNode, useEffect } from "react";
import { Box, alpha, lighten, useTheme } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

// import Sidebar from './Sidebar';
// import Header from './Header';
import { STORAGE_KEY } from "src/utils/constants";
// import Footer from './Footer';
import { useAuth } from "src/contexts/AuthContext";

interface AuthProps {
  children?: ReactNode;
}

const Auth: FC<AuthProps> = () => {
  console.log('auth')
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

  return <><p>Auth layout</p></>;
};

export default Auth;
