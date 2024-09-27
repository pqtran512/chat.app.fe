import { useRoutes } from "react-router-dom";
import router from "src/router";

import { CssBaseline } from "@mui/material";
import "./App.css";

function App() {
  const content = useRoutes(router);

  return (
    <>
      <CssBaseline />
      {content}
    </>
  );
}

export default App;
