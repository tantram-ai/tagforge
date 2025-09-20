import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/services";
import { useGuardedRoutesStore } from "../../../store";

export const Login = () => {
  const navigate = useNavigate();
  const { setName } = useGuardedRoutesStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginInfo = {
      email: data.get("email"),
      password: data.get("password"),
    }
    console.log(loginInfo);
    try {
      const result = await login(loginInfo);
      console.log(result,"&&&&&&&&&&&&&&")
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // integrate Google login logic here
  };

  return (
    <Container component="main" maxWidth="sm">
      {/* Brand Header */}
      <Box
        sx={{
          textAlign: "center",
          mt: 10,
          mb: 6,
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🚀 TagForge.AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Log in to continue your journey
        </Typography>
      </Box>

      {/* Login Form */}
      <Box component="form" onSubmit={handleSubmit} >
        {/* Google Login */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{
            mb: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Continue with Google
        </Button>

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
          sx={{ mb: 3 }}
        />

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
    </Container>
  );
};

