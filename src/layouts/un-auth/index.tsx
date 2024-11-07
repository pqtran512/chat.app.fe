import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import { STORAGE_KEY } from "src/utils/constants";

import cover from "../../assets/images/unauth-cover.jpg";

interface UnAuthProps {
  children?: ReactNode;
}

const UnAuth: FC<UnAuthProps> = ({ children }) => {
  if (localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
    return <Navigate to="/" replace />;
  }
  // return <Navigate to="/login" replace />;

  return (
    <Box
      sx={{
        backgroundImage: `url(${cover})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        paddingTop: 25
      }}
    >
      {children || <Outlet />}
    </Box>
  );
};

UnAuth.propTypes = {
  children: PropTypes.node,
};

export default UnAuth;
