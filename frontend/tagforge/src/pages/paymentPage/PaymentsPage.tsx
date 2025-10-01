import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store";


export const PaymentsPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const location = useLocation()
  const { plan } = location.state || {};
  const { decoded } = useAuthStore()

  if (!decoded) {
    if (!plan) {
      return <Navigate to="/plans" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  console.log(plan,"**")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        p: { xs: 2, md: 6 },
      }}
    >
      {/* 🔹 Left Column → Plan Overview + Pricing in one card */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          borderRadius: 3,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Plan Header */}
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {plan.name} Plan
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Billing Cycle: {plan.billingCycle}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Features Grid */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={6}>
              <Chip
                label={`Projects: ${plan.projectsLimit}`}
                color="primary"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <Chip
                label={`Keywords / Project: ${plan.keywordsPerProject}`}
                color="primary"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <Chip
                label={`AI Generations: ${plan.aiGenerations}`}
                color="primary"
                variant="outlined"
              />
            </Grid>
            <Grid size={6}>
              <Chip
                label={`Content: ${plan.maxContentLength}`}
                color="primary"
                variant="outlined"
              />
            </Grid>
          </Grid>

          {/* Advanced Features */}
          <Grid container spacing={1}>
            {Object.entries(plan.features).map(([key, value]) => (
              <Grid
                size={6}
                key={key}
                sx={{ display: "flex", alignItems: "center" }}
              >
                {value ? (
                  <CheckCircleIcon color="success" fontSize="small" />
                ) : (
                  <CancelIcon color="error" fontSize="small" />
                )}
                <Typography
                  variant="body2"
                  sx={{ ml: 1, textTransform: "capitalize" }}
                >
                  {key.replace(/([A-Z])/g, " $1")}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Pricing Breakdown */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Pricing Breakdown
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography>Subtotal</Typography>
            <Typography>
              {plan.currency} {plan?.principleAmount}
            </Typography>
          </Box>

          {plan?.offerDescount > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography color="secondary">
                Offer ({plan.offerDescount}%)
              </Typography>
              <Typography color="success.main">
                - {plan.currency} {plan?.offerDiscountAmount}
              </Typography>
            </Box>
          )}

          {plan.yearlyDiscountAmount > 0 &&
           
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                }}
              >
                <Typography color="secondary">
                  Plan discount ({plan.billingCycleDiscount}%)
                </Typography>
                <Typography color="success.main">
                  - {plan.currency} {plan?.yearlyDiscountAmount}
                </Typography>
              </Box>
            }

          <Divider sx={{ my: 1 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h6">Final Price</Typography>
            <Typography variant="h6" color="primary">
              {plan.currency} {plan?.finalAmount}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 🔹 Right Column → Payment Options */}
      <Paper elevation={3} sx={{ flex: 1, borderRadius: 3, p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Payment Options
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Select your preferred payment method
        </Typography>

        <RadioGroup
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label="💳 Credit / Debit Card"
          />
          <FormControlLabel value="upi" control={<Radio />} label="📱 UPI" />
          <FormControlLabel
            value="netbanking"
            control={<Radio />}
            label="🏦 Net Banking"
          />
        </RadioGroup>

        {/* Mock Inputs */}
        <Box sx={{ mt: 4 }}>
          {selectedMethod === "card" && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Enter Card Details
              </Typography>
              <input
                placeholder="Card Number"
                style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
              />
              <input
                placeholder="Expiry (MM/YY)"
                style={{
                  width: "48%",
                  padding: "10px",
                  marginRight: "4%",
                  marginBottom: "10px",
                }}
              />
              <input
                placeholder="CVV"
                style={{ width: "48%", padding: "10px" }}
              />
            </Box>
          )}

          {selectedMethod === "upi" && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Enter UPI ID
              </Typography>
              <input
                placeholder="yourupi@upi"
                style={{ width: "100%", padding: "10px" }}
              />
            </Box>
          )}

          {selectedMethod === "netbanking" && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Select Bank
              </Typography>
              <select style={{ width: "100%", padding: "10px" }}>
                <option>SBI</option>
                <option>HDFC</option>
                <option>ICICI</option>
                <option>Axis</option>
              </select>
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4, py: 1.5, borderRadius: 2 }}
        >
          Proceed to Pay {plan.currency} {plan?.finalAmount}
        </Button>
      </Paper>
    </Box>
  );
};

