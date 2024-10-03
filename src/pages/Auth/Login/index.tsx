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

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
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

  const handleSubmit = () => {};

  return (
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
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Số điện thoại"
              name="phone"
              autoComplete="phone"
              autoFocus
              // value={loginInfo.username}
              // disabled={loading}
              // onChange={onFormChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              // value={loginInfo.password}
              // disabled={loading}
              // onChange={onFormChangeHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Nhớ mật khẩu"
            />
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // disabled={loading}
                sx={{ mt: 3, mb: 2, backgroundColor: "#0190f3" }}
              >
                Đăng nhập
              </Button>
              {/* {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )} */}
            </Box>

            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
