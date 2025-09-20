import {
    Box,
    Button,
    Container,
    Link,
    Typography,
  } from "@mui/material";
  import { useNavigate } from "react-router-dom";
  
  export const EmailVerification = () => {
    const navigate = useNavigate();
  
    const handleResend = () => {
      console.log("Resend verification email clicked");
      // Call your backend API to resend email here
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
            Verify your email to get started
          </Typography>
        </Box>
  
        {/* Message */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We’ve sent you a verification link on your registered email.
            <br />
            Please check your inbox and verify your account.
          </Typography>
  
          <Button
            variant="contained"
            onClick={handleResend}
            sx={{
              py: 1.2,
              px: 4,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            Resend Verification Email
          </Button>
        </Box>
  
        {/* Back to login */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2">
            Already verified?{" "}
            <Link
              onClick={() => navigate("/login")}
              underline="hover"
              sx={{ cursor: "pointer", fontWeight: 500 }}
            >
              Go to Login
            </Link>
          </Typography>
        </Box>
      </Container>
    );
  };

  