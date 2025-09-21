import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Link,
} from "@mui/material";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../../../api/services";
import { useSnackbarStore } from "../../../store";

export const ChangePassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const oobCode = searchParams.get("oobCode") || "";
    const { showSnackbar } = useSnackbarStore()
    const [isLoading, setLoading] = useState<boolean>(false)

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [message, setMessage] = useState("");

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!oobCode) {
            showSnackbar("Invalid or missing reset code.", "warning")
            return;
        }
        if (!newPassword || !confirmPassword) {
            showSnackbar("All the fields are required!", "warning")
        }
        if (newPassword !== confirmPassword) {
            showSnackbar("Passwords do not match.", "warning")
            return;
        }
        try {
            const result = await resetPassword({ oobCode, newPassword });
            if (result.code === "SUCCESS") {
                showSnackbar(result?.message, "success");
                navigate("/login")
            }
        } catch (err: any) {
            showSnackbar(err?.response?.data?.message, "error");
        } finally {
            setNewPassword("")
            setConfirmPassword("")
            setLoading(true)
        }
    };

    if (!oobCode) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                bgcolor: "background.default",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    textAlign: "center",
                }}
            >
                {/* App Logo + Heading */}
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    🔑 TagForge.AI
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Change your password
                </Typography>

                {/* Form */}
                <Box
                    component="form"
                    onSubmit={handleChangePassword}
                    sx={{ mt: 3 }}
                >
                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        required
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Update Password
                    </Button>
                </Box>

                {/* Status message */}
                {/* {message && (
                    <Typography sx={{ mt: 2 }} color="text.secondary">
                        {message}
                    </Typography>
                )} */}

                {/* Back to Login */}
                <Typography sx={{ mt: 3 }}>
                    Remember your password?{" "}
                    <Link
                        component="button"
                        underline="hover"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

