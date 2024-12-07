import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ResetPassworDto } from "src/types/api/dto";
import { useMutation } from "react-query";
import { authAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY } from "src/utils/constants";
import { useAuth } from "src/contexts/AuthContext";

interface ResetPasswordProps {
  // onClick?: (isValid: boolean) => void;
  phoneNumber: string;
}

const ResetPassword: FC<ResetPasswordProps> = ({ phoneNumber }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [resetInfo, setResetInfo] = useState({
    phone: phoneNumber,
    new_password: "",
  } as ResetPassworDto);

  const navigate = useNavigate();
  const { setAccessToken, setUserId } = useAuth();
  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);
  const defaultTheme = createTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordInput.password === passwordInput.confirmPassword) {
      // setResetInfo((prev)=>({
      //   ...prev,
      //   phone: phoneNumber,
      //   new_password: passwordInput.password,
      // }));
      reset.mutate({
        phone: phoneNumber,
        new_password: passwordInput.confirmPassword,
      });
    } else {
      enqueueSnackbar("Mật khẩu không khớp", { variant: "error" });
    }
  };

  const onFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPasswordInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const reset = useMutation(authAPI.resetpassword, {
    onSuccess: (response) => {
      const { access_token, refresh_token, user, is_success } = response.data;
      if (is_success) {
        localStorage.setItem(STORAGE_KEY.ID, user.id);
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, access_token);
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refresh_token);

        setUserId(user.id);
        setAccessToken(access_token);
        
        navigate("/");
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, {
        variant: "error",
      });
    },
  });

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
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Mật khẩu mới"
                name="password"
                autoComplete="new-password"
                autoFocus
                onChange={onFormChangeHandler}
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Xác nhận lại"
                id="confirmPassword"
                autoComplete="new-password"
                onChange={onFormChangeHandler}
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
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

export default ResetPassword;
