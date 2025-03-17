import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState, FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LogInDto } from "src/types/api/dto";
import { useMutation } from "react-query";
import { authAPI, profileAPI } from "src/api";
import { STORAGE_KEY } from "src/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/contexts/AuthContext";
import { enqueueSnackbar } from "notistack";
import { useProfile } from "src/contexts/ProfileContext";
import Copyright from "../../../utils/functions/generateCopyright";

interface LoginProps { }

const Login: FC<LoginProps> = ({ }) => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const { setAccessToken, setUserId } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const profileContext = useProfile();
  const [loginInfo, setLoginInfo] = useState({
    phone: "",
    password: "",
  } as LogInDto);

  const handleClickShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login.mutate(loginInfo);
  };

  const onFormChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangePhone = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length <= 10) {
      setLoginInfo((prev) => ({ ...prev, phone: onlyNums }));
    }
  };

  const login = useMutation(authAPI.login, {
    onSuccess: (response) => {
      const { access_token, refresh_token, user, is_success } = response.data;

      if (is_success) {
        localStorage.setItem(STORAGE_KEY.ID, user.id);
        localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, access_token);
        localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, refresh_token);
        getProfile.mutate()
        // connectChatSocket();

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

  const getProfile = useMutation(profileAPI.getprofile, {
    onSuccess: (response) => {
      if (response.status === 200) {
        const { fullname, avatar, id } = response.data[0];
        localStorage.setItem("fullname", fullname)
        localStorage.setItem("avatar", avatar)
        localStorage.setItem("profileId", id)

        profileContext.setProfileId(id);
        profileContext.setFulname(fullname);
        profileContext.setAvatar(avatar);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

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
              value={loginInfo.phone}
              // disabled={loading}
              onChange={handleChangePhone}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={loginInfo.password}
              // disabled={loading}
              onChange={onFormChangeHandler}
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
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Link href="/forgot-password" variant="body2">
                Quên mật khẩu?
              </Link>
              <Link href="/register" variant="body2">
                Đăng ký
              </Link>
            </Stack>
          </Box>
        </Box>
        <Copyright sx={{ position: 'absolute', bottom: 0, py: 2 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
