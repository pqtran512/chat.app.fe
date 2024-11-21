import { Typography, Link, createTheme, ThemeProvider, Container, CssBaseline, Box, Avatar, TextField, Button, Grid } from "@mui/material";
import { FC } from "react";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';



interface RegisterProps {};

const Register: FC<RegisterProps> = (props) => {
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

  const onSubmit = () => {}
    
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
                id="username"
                label="Họ và tên"
                name="username"
                autoComplete="username"
                autoFocus
              />
            <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Số điện thoại"
                name="phone"
                autoComplete="phone"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Mật khẩu"
                type="password"
                name="password"
                autoComplete="password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password-confirm"
                label="Nhập lại mật khẩu"
                type="password"
                id="password-confirm"
                autoComplete="password-comfirm"
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
    );
}

export default Register;