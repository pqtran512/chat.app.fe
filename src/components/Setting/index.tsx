import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState, useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeContext } from "../../theme/ThemeProvider";
import { useTheme } from "@mui/material/styles";
import { LanguageContext } from "src/language/LanguageProvider";

interface SettingProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Setting: FC<SettingProps> = (props) => {
  const theme = useTheme();
  const setThemeName = useContext(ThemeContext);
  const [selectedSetting, setSelectedSetting] = useState<string>("theme");
  const { language, setLanguage, t } = useContext(LanguageContext);

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
            <Typography variant="h4">{t.settings}</Typography>
            <IconButton onClick={() => props.handleClose(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: 0 }}>
          <Stack direction={"row"}>
            <Box width={300}>
              <Stack>
                {/* <Button sx={{ justifyContent: "left" }}>
                  <Typography variant="subtitle1">General Settings</Typography>
                </Button> */}
                <Button sx={{ justifyContent: "left" }} onClick={() => setSelectedSetting("theme")}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'light' ? 'black' : "white" }}>{t.theme}</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }} onClick={() => setSelectedSetting("language")}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'light'? 'black' : "white" }}>{t.language}</Typography>
                </Button>
                
                <Button sx={{ justifyContent: "left" }} onClick={() => setSelectedSetting("privacy")}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'light'? 'black' : "white" }}>{t.privacy}</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }} onClick={() => setSelectedSetting("message")}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'light'? 'black' : "white" }}>{t.message}</Typography>
                </Button>
                <Button sx={{ justifyContent: "left" }} onClick={() => setSelectedSetting("utilities")}>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'light'? 'black' : "white" }}>{t.utilities}</Typography>
                </Button>
              </Stack>
            </Box>
            <Box sx={{
              width: "100%",
              backgroundColor: theme.palette.mode === 'light' ? "#e6e9ed" : '#303030',
              padding: 2
            }}>
              {selectedSetting === "theme" && (
                <RadioGroup onChange={(e) => setThemeName(e.target.value)}>
                  <FormControlLabel value="PureLightTheme" control={<Radio />} checked={theme.palette.mode === 'light'} label={t.light} />
                  <FormControlLabel value="DarkTheme" control={<Radio />} checked={theme.palette.mode === 'dark'} label={t.dark} />
                </RadioGroup>
              )}
              {selectedSetting === "language" && (
                <RadioGroup onChange={(e) => setLanguage(e.target.value)}>
                  <FormControlLabel value="english" control={<Radio />} checked={language === 'english'} label={t.english} />
                  <FormControlLabel value="vietnamese" control={<Radio />} checked={language === 'vietnamese'} label={t.vietnamese} />
                </RadioGroup>
              )}
              {selectedSetting !== "language" && selectedSetting !== "theme" && (
                <Typography variant="h4">Coming soon...</Typography>
              )}
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Setting;
