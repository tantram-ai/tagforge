import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ProtectedRouteController, RouteGuard } from "./navigation";
import { BrandPage } from "./pages/brandPage";
import { About } from "./pages/about";
import { Plans } from "./pages/plans";
import { Login } from "./pages/AuthPages/login";
import { Dashboard } from "./pages/dashboard";
import { NavigationBar } from "./shared/components";
import { SignUp } from "./pages/AuthPages/signUp";
import { EmailVerification } from "./pages/AuthPages/emailVerification";
import { useSnackbarStore } from "./store";
import { Snackbar, Alert } from "@mui/material";


type AppProps = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

function App({ toggleTheme, mode }: AppProps) {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();

  return (
    <>

      <Router>
        <Routes>
          {/* General Routes */}

          <Route path="/" element={<NavigationBar toggleTheme={toggleTheme} mode={mode}><BrandPage /></NavigationBar>} />
          <Route path="/about" element={<NavigationBar toggleTheme={toggleTheme} mode={mode}><About /></NavigationBar>} />
          <Route path="/plans" element={<NavigationBar toggleTheme={toggleTheme} mode={mode}><Plans /></NavigationBar>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteController>
                <Dashboard />
              </ProtectedRouteController>
            }
          />
          {/* Guarded routes */}

          <Route
            path="/emailVerification"
            element={
              <RouteGuard path="/emailVerification" redirectTo="/signUp">
                <EmailVerification />
              </RouteGuard>
            }
          />


        </Routes>
      </Router>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
