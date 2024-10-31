import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

interface SettingProps {}

const Setting: FC<SettingProps> = (props) => {
  return (
    <>
      <Box sx={{ width: 800, height: 800, position: "absolute", top: 80, left: 500}} display={"none"}>
        <Stack direction={"row"} width={"100%"} height={"100%"}>
          <Box sx={{ width:200, height: "100%", background: "#fff" }}>
            <Stack>
              <Box padding={2}>
              <Typography variant="h4">Settings</Typography>
              </Box>
              <Button sx={{justifyContent: "left"}}>
                <Typography variant="subtitle1">General Settings</Typography>
              </Button>
              <Button sx={{justifyContent: "left"}}>
                <Typography variant="subtitle1">Privacy</Typography>
              </Button>
              <Button sx={{justifyContent: "left"}}>
                <Typography variant="subtitle1">Theme</Typography>
              </Button>
              <Button sx={{justifyContent: "left"}}>
                <Typography variant="subtitle1">Notification</Typography>
              </Button>
              <Button sx={{justifyContent: "left"}}>
                <Typography variant="subtitle1">Message</Typography>
              </Button>
              <Button sx={{justifyContent: "left"}}>
                <Typography variant="subtitle1">Utilities</Typography>
              </Button>
            </Stack>
          </Box>
          <Box sx={{ width: 600, height: "100%", background: "#e6e6eb" }}>
            <Stack>Setting Info</Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Setting;
