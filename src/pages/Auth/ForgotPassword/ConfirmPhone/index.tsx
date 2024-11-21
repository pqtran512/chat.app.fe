import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState, FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useMutation } from "react-query";
import { authAPI } from "src/api";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface ConfirmPhoneProps {
  onClick?: (isValid: boolean, phone: string) => void;
}

const ConfirmPhone: FC<ConfirmPhoneProps> = ({ onClick }) => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

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


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // goi api
    checkphone.mutate(phone);
  };

  const handleChangePhone = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length <= 10) {
      setPhone(onlyNums);
    }
  };

  const checkphone = useMutation(authAPI.checkphone, {
    onSuccess: (respone) => {
      const isPhoneValid = respone.data;
      if (isPhoneValid) {
        onClick(isPhoneValid, phone);
      } else {
        enqueueSnackbar("phone is invalid", { variant: "error" });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error.respone.data.message, {
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
              Nhập số điện thoại của bạn
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
                onChange={handleChangePhone}
              />
              
              <Box sx={{ position: "relative" }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // disabled={loading}
                  sx={{ mt: 3, mb: 2, backgroundColor: "#0190f3" }}
                >
                  Xác nhận
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

export default ConfirmPhone;
