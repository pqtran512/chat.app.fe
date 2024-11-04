import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface SettingProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Setting: FC<SettingProps> = (props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle margin={0}>
          <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography variant="h4">Setting</Typography>
            <IconButton onClick={()=>props.handleClose(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider/>
        <DialogContent sx={{padding: 0}}>
          <Stack direction={"row"}>
            <Box width={300}>
              <Stack>
                <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">General Settings</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">Privacy</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">Theme</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">Notification</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">Message</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">Utilities</Typography>
                </Button>
              </Stack>
            </Box>
            <Box sx={{ width: "100%", backgroundColor: "#e6e9ed" }}>option</Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Setting;
