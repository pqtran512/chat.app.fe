import { Box } from "@mui/material";
import { useEffect, useState, FC } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  return (
    <Box
      sx={{
        height: 300,
        width: 400,
        backgroundColor: "#fff",
        padding: "30px 45px",
        borderRadius: "2px",
        position: 'relative',
        margin: '0 auto',
        boxShadow: '0 8px 24px rgba(21, 48, 142, 0.14)',
      }}
    ></Box>
  );
};

export default Login;
