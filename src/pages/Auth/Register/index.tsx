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
import Copyright from "../../../utils/functions/generateCopyright";

interface RegisterProps { }

const Register: FC<RegisterProps> = (props) => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setUserId, setAccessToken } = useAuth();

  const { isLoading, mutate: mutateRegister } = useMutation(authAPI.register, {
    onSuccess: (res) => {
      if (res.data) {
        const { AccessToken, id } = res.data;
        // localStorage.setItem(STORAGE_KEY.ID, user.id);
        // localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, AccessToken);

        // setUserId(user.id);
        // setAccessToken(AccessToken);

        navigate("/login");
      }
    },
    onError: (error: any) => {
      let err_msg
      if (error?.error.toLowerCase().includes('duplicate')) {
        err_msg = 'Số điện thoại hoặc email đã tồn tại.'
      }
      else {
        err_msg = 'Đăng ký thất bại. Vui lòng thử lại !'
      }

      enqueueSnackbar(err_msg, {
        variant: "error",
      });
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
      username: register.username,
      password: register.password,
      phone: register.phone,
      email: register.email,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: 'relative',
          height: '100%'
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "#fff",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",

            width: { xs: "100%", md: "50%" },
            maxWidth: '600px',
            padding: { xs: "40px 20px", md: "30px 45px" },
            borderRadius: "2px",
            margin: "0 auto",
            boxShadow: "0 8px 24px rgba(21, 48, 142, 0.14)",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#0190f3" }}>
            <AccessibilityNewIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký tài khoản
          </Typography>
          <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Họ và tên"
              name="username"
              autoFocus
              value={register.username}
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
              id="email"
              label="Email"
              name="email"
              value={register.email}
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
        <Copyright sx={{ position: 'absolute', bottom: 0, py: 2 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
