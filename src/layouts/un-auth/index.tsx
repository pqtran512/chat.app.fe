import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

import {
  Box, Container,
} from "@mui/material";
import { STORAGE_KEY } from "src/utils/constants";

import cover from "../../assets/images/login-cover.jpg";

interface UnAuthProps {
  children?: ReactNode;
}

const UnAuth: FC<UnAuthProps> = ({ children }) => {
  if (localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: { xs: "100%", md: "50%" },
          height: { xs: "20vh", md: "100vh" },
          display: { xs: "block", md: "block" },
        }}
      >
      </Box>
      {children || <Outlet />}
    </Container>
  );
};

UnAuth.propTypes = {
  children: PropTypes.node,
};

export default UnAuth;
