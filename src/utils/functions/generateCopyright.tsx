import { Box, Typography, Link } from "@mui/material";

function Copyright(props: any) {
  return (
    <Box {...props}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          HCMUT
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default Copyright;
