import {
  Typography,
  Link,
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { FC, useState } from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { enqueueSnackbar } from "notistack";
import { useMutation } from "react-query";
import { authAPI } from "src/api";
import { LoadingButton } from "@mui/lab";
import { STORAGE_KEY } from "src/utils/constants";
import { useAuth } from "src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

interface RegisterProps {}

const Register: FC<RegisterProps> = (props) => {
  const [register, setRegister] = useState({
    fullname: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { setUserId, setAccessToken } = useAuth();

  const defaultTheme = createTheme();

  const { isLoading, mutate: mutateRegister } = useMutation(authAPI.register, {
    onSuccess: (res) => {
      if (res.data) {
        const { access_token, refresh_token, user, is_success } = res.data;
        localStorage.setItem(STORAGE_KEY.ID, user.id);
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, access_token);
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refresh_token);

        setUserId(user.id);
        setAccessToken(access_token);

        navigate("/");
      }
    },
  });

  const onFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      enqueueSnackbar("Mật khẩu không khớp", { variant: "error" });
      return;
    }
    mutateRegister({
      fullname: register.fullname,
      password: register.password,
      phone: register.phone,
    });
  };

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
            <AccessibilityNewIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Tạo tài khoản
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullname"
              label="Họ và tên"
              name="fullname"
              autoFocus
              value={register.fullname}
              disabled={isLoading}
              onChange={onFormChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Số điện thoại"
              name="phone"
              value={register.phone}
              disabled={isLoading}
              onChange={onFormChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Mật khẩu"
              type="password"
              name="password"
              value={register.password}
              disabled={isLoading}
              onChange={onFormChangeHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Nhập lại mật khẩu"
              type="password"
              id="confirmPassword"
              value={register.confirmPassword}
              disabled={isLoading}
              onChange={onFormChangeHandler}
            />
            <Box sx={{ position: "relative" }}>
              <LoadingButton
                loading={isLoading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#0190f3" }}
              >
                Đăng ký
              </LoadingButton>
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
  );
};

export default Register;
