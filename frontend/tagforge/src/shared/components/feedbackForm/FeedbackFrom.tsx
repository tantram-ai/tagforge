import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'

export const FeedbackFrom = () => {
    return (
        <Box textAlign="center" sx={{ mb: 6 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Didn’t find the right plan?
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                Share your feedback and help us improve.
            </Typography>

            <Paper
                sx={{
                    maxWidth: 600,
                    mx: "auto",
                    mt: 3,
                    p: 4,
                    borderRadius: 4,
                    boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                    textAlign: "left",
                }}
                elevation={0}
            >
                <Stack spacing={3}>
                    <TextField
                        label="Your Name"
                        fullWidth
                        variant="outlined"
                        size="medium"
                    />
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        size="medium"
                    />
                    <TextField
                        label="What features do you need?"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        size="medium"
                    />
                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: 3,
                            py: 1.5,
                            fontWeight: "bold",
                            background:
                                "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
                        }}
                    >
                        Submit Feedback
                    </Button>
                </Stack>
            </Paper>
        </Box>
    )
}
