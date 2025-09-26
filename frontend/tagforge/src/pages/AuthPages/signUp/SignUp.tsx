import { useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../api/services";
import { useSnackbarStore } from "../../../store";
import { GoogleSignIn } from "../googleSignIn";

export const SignUp = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore()
  const formRef = useRef<HTMLFormElement>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitLoading(true)
    const data = new FormData(event.currentTarget);
    const signupInfo = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    }
    try {
      const result = await signUp(signupInfo);
      if (result?.code === "SUCCESS") {
        showSnackbar(result?.message, "success");
        navigate('/emailVerification', { state: { token: result?.data?.token } })
      }
    } catch (err: any) {
      if (err?.response?.data?.code == "EMAIL_ALREADY_EXISTS") {
        showSnackbar(err?.response?.data?.message, "warning");
      } else {
        showSnackbar(err?.response?.data?.message, "error");
      }
    } finally {
      formRef.current?.reset();
      setSubmitLoading(false)
    }
  };


  return (
    <Container component="main" maxWidth="sm">
      {/* Brand Header */}
      <Box
        sx={{
          textAlign: "center",
          mt: 4,
          mb: 5,
        }}
      >
        {/* Replace with your logo image if available */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🚀 TagForge.AI
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Supercharge your SEO & Content with AI
        </Typography>
      </Box>

      {/* Form Section */}
      <Box component="form" ref={formRef} onSubmit={handleSubmit} sx={{}} >
        {/* Google Sign In */}
        <GoogleSignIn />

        <Divider sx={{ mb: 3 }}>or sign up with email</Divider>

        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              name="firstName"
              label="First Name"
              fullWidth
              required
              autoFocus
            />
          </Grid>
          <Grid size={6}>
            <TextField name="lastName" label="Last Name" fullWidth required />
          </Grid>
          <Grid size={12}>
            <TextField
              name="email"
              label="Work Email"
              type="email"
              fullWidth
              required
            />
          </Grid>
          <Grid size={12}>
            <TextField
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 4,
            py: 1.5,
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          disabled={submitLoading}
          loading={submitLoading}
          loadingPosition="end"
        >
          Create Account
        </Button>
      </Box>

      {/* Already have an account */}
      <Box sx={{ textAlign: "center", mt: 3, mb: 3 }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/login")}
            underline="hover"
            sx={{ cursor: "pointer", fontWeight: 500 }}
          >
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
