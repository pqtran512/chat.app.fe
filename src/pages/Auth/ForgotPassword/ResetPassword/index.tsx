import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Input,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface ResetPasswordProps {
  onClick?: (isValid: boolean) => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ onClick }) => {

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          HCMUT
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const defaultTheme = createTheme();

  const resetPassword = (e) => {
    // if 2 password are similar return to login screen
    if (true) {
      console.log("2 password same and return to login screen")
    }
    // else typing agrian correct password

  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "30px 45px",
              borderRadius: "2px",
              width: "500px",
              position: "relative",
              margin: "0 auto",
              boxShadow: "0 8px 24px rgba(21, 48, 142, 0.14)",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0190f3" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Thay đổi mật khẩu
            </Typography>
            <Box component="form" onSubmit={resetPassword} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="new-password"
                label="Mật khẩu mới"
                type="password"
                name="new-password"
                autoComplete="new-password"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="new-password-confirm"
                label="Xác nhận lại"
                type="password"
                id="new-password-confirm"
                autoComplete="new-password"
              />
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#0190f3" }}
                >
                  Thay đổi mật khẩu
                </Button>
              </Box>

              <Grid container>
                <Grid item xs>
                  <Link href="/login" variant="body2">
                    Quay lại
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ResetPassword;
