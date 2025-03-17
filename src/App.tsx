import { useRoutes } from "react-router-dom";
import router from "src/router";

import { CssBaseline } from "@mui/material";
import "./App.css";

import ThemeProvider from "./theme/ThemeProvider";
import LanguageProvider from "./language/LanguageProvider";

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CssBaseline />
        {content}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
