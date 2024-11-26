import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import { STORAGE_KEY } from "./utils/constants";
import { ProfileProvider } from "./contexts/ProfileContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Create a client
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <BrowserRouter>
        <SnackbarProvider
          autoHideDuration={STORAGE_KEY.SNACKBAR_AUTOHIDE_DURATION}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          maxSnack={STORAGE_KEY.SNACKBAR_MAX_STACK}
          preventDuplicate={true}
        >
          <AuthProvider>
            <ProfileProvider>
              <App />
            </ProfileProvider>
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </React.StrictMode>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
