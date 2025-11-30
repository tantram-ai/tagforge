import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { BrandPage } from "./pages/brandPage";
import { About } from "./pages/about";
import { Plans } from "./pages/plans";
import { Login } from "./pages/AuthPages/login";
import { NavigationBar } from "./shared/components";
import { SignUp } from "./pages/AuthPages/signUp";
import { EmailVerification } from "./pages/AuthPages/emailVerification";
import { useAuthStore, useSnackbarStore } from "./store";
import { Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
import { ChangePassword } from "./pages/AuthPages/changePassword";
import { PaymentsPage } from "./pages/paymentPage";
import { Dashboard } from "./pages/dashboard";
import { ProtectedRouteController } from "./navigation";


type AppProps = {
  toggleTheme: () => void;
  mode: "light" | "dark";
};

export const App = ({ toggleTheme, mode }: AppProps) => {
  const { open, message, severity, closeSnackbar } = useSnackbarStore();
  const { setTokenFromCookie } = useAuthStore();

  useEffect(() => {
    setTokenFromCookie();
  }, [setTokenFromCookie]);

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
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/emailVerification" element={<EmailVerification />} />
          <Route path="/payments" element={<PaymentsPage />} />



          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteController>
                <NavigationBar toggleTheme={toggleTheme} mode={mode} isDashboard={true}><Dashboard /></NavigationBar>
              </ProtectedRouteController>
            }
          />
          {/* Guarded routes */}

          {/* <Route
            path="/emailVerification"
            element={
              <RouteGuard path="/emailVerification" redirectTo="/signUp">
                <EmailVerification />
              </RouteGuard>
            }
          /> */}
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

