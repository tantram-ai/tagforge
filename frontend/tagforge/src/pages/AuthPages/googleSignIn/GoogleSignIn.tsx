import { Button } from '@mui/material'
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from '../../../shared/hooks';
import { useAuthStore, useGuardedRoutesStore, useSnackbarStore } from '../../../store';
import { googleLogin } from '../../../api/services';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const GoogleSignIn = () => {
    const { showSnackbar } = useSnackbarStore()
    const { setTokenFromCookie } = useAuthStore()
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState<boolean>(false)

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            // Get user info
            const user = result.user;

            // Get Firebase ID token (to send to backend)
            const idToken = await user.getIdToken();

            try {
                const result = await googleLogin(idToken);
                if (result.code === "SUCCESS") {
                    setTokenFromCookie()
                    showSnackbar(result?.message, "success");
                    navigate('/dashboard')
                }
            } catch (err: any) {
                const { code, message, data } = err?.response?.data || {}
                if (code == "VERIFY_EMAIL") {
                  showSnackbar(message, "warning");
                  navigate('/emailVerification', { state: { token: data?.token } })
                } else if (code == "PLAN_EXPIRED" || code == "NOT_SUBSCRIBED") {
                  setTokenFromCookie()
                  showSnackbar(message, "warning");
                }
                else {
                  if (code == "INTERNAL_SERVER") {
                    showSnackbar("Internal Server error", "error");
                  }
                }
            } finally {
                setLoading(false)
            }

            console.log("User logged in:", user.email);
        } catch (err) {
            console.error("Google sign-in error:", err);
        }
    };

    return (
        <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={login}
            sx={{
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
            }}
            loading={isLoading}
            loadingPosition='end'
            disabled={isLoading}
        >
            Continue with Google
        </Button>
    )
}
