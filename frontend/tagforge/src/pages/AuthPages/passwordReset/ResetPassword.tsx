import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useSnackbarStore } from "../../../store";
import { forgotPassword } from "../../../api/services";

type ResetPasswordProps = {
  setForgotPassModal: any
}

export const ResetPassword = ({ setForgotPassModal }: ResetPasswordProps) => {
  const [email, setEmail] = useState("");
  const { showSnackbar } = useSnackbarStore();
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await forgotPassword({ email });
      if (result.code === "SUCCESS") {
        showSnackbar(result?.message, "success");
        setForgotPassModal(false)
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
    } finally {
      setEmail("")
      setLoading(true)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          textAlign: "center",
        }}
      >
        {/* Website Logo + Name */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          🔑 TagForge.AI
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Reset your password
        </Typography>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleResetPassword}
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            fullWidth
            required
            type="email"
            label="Work Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2, borderRadius: 2 }}
            loading={isLoading}
            loadingPosition="end"
            disabled={isLoading}
          >
            Send Reset Link
          </Button>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }}>or</Divider>

        {/* Google Sign-in (Optional) */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          size="large"
          sx={{ borderRadius: 2 }}
        >
          Continue with Google
        </Button>

        {/* Back to Login */}
        <Typography sx={{ mt: 3 }}>
          Remember your password?{" "}
          <Link
            component="button"
            underline="hover"
            onClick={() => setForgotPassModal(false)}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

