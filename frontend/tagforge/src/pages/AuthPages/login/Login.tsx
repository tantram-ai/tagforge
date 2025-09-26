import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../../api/services";
import { useAuthStore } from "../../../store";
import { useSnackbarStore } from "../../../store";
import { useRef, useState } from "react";
import { TgModal } from "../../../shared/components/tgModal";
import { ResetPassword } from "../passwordReset";
import { GoogleSignIn } from "../googleSignIn";

export const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { showSnackbar } = useSnackbarStore()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [forgotPassModal, setForgotPassModal] = useState<boolean>(false)
  const { setTokenFromCookie, decoded, planDetails } = useAuthStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    const data = new FormData(event.currentTarget);
    const loginInfo = {
      email: data.get("email"),
      password: data.get("password"),
    }
    try {
      const result = await login(loginInfo);
      if (result.code === "SUCCESS") {
        setTokenFromCookie()
        showSnackbar(result?.message, "success");
        navigate('/dashboard')
      }
    } catch (err: any) {
      console.log(err)
      const { code, message, data } = err?.response?.data || {}
      if (code == "VERIFY_EMAIL") {
        showSnackbar(message, "warning");
        navigate('/emailVerification', { state: { token: data?.token } })
      } else if (code == "PLAN_EXPIRED" || code == "NOT_SUBSCRIBED") {
        setTokenFromCookie()
        showSnackbar(message, "warning");
      }
      else {
        if (code == "ERR_BAD_REQUEST") {
          showSnackbar("Invelid credentials", "error");
        }
      }
    } finally {
      formRef.current?.reset();
      setLoading(false)
    }
  };


  if (decoded) {
    if (planDetails?.data) {
      return <Navigate to="/" replace />
    } else {
      return <Navigate to="/plans" replace />
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      {/* Brand Header */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🚀 TagForge.AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Log in to continue your journey
        </Typography>
      </Box>


      <Box component="form" ref={formRef} onSubmit={handleSubmit} >
        <GoogleSignIn />
        <Divider sx={{ mb: 3 }}>or login with email</Divider>

        <TextField
          name="email"
          label="Work Email"
          type="email"
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          required
          sx={{ mb: 1 }}
        />
        <Box sx={{ textAlign: "end", mb: 1 }}>
          <Typography variant="body2">
            <Link
              onClick={() => setForgotPassModal(true)}
              underline="hover"
              sx={{ cursor: "pointer", fontWeight: 500 }}
            >
              Forgotten your password?
            </Link>
          </Typography>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          loading={isLoading}
          loadingPosition="end"
          disabled={isLoading}
        >
          Login
        </Button>
      </Box>

      {/* Sign up link */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="body2">
          Don’t have an account?{" "}
          <Link
            onClick={() => navigate("/signup")}
            underline="hover"
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            Sign up
          </Link>
        </Typography>
      </Box>

      <div>
        <TgModal open={forgotPassModal} setOpen={setForgotPassModal}>
          <ResetPassword setForgotPassModal={setForgotPassModal} />
        </TgModal>
      </div>
    </Container>
  );
};

