import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Grid,
} from "@mui/material";
import { ComparisonTable, PlanCard } from "./components";
import { buyPlan, getPlans } from "../../api/services";
import { useAuthStore, useSnackbarStore } from "../../store";
import { FeedbackFrom } from "../../shared/components";
import { useNavigate } from "react-router-dom";

type planType = [{
  name: string;
  price: number;
  currency: string;
  projectsLimit: number;
  keywordsPerProject: number;
  aiGenerations: number;
  offerDescount: number,
  offerTitle: string,
  billingCycleDiscount: number,
  maxContentLength: "short" | "medium" | "long";
  billingCycle: "monthly" | "yearly";
  features: {
    seoContent: boolean;
    schemaSupport: boolean;
    competitorAnalysis: boolean;
    teamSupport: boolean;
  };
}] | []


export const Plans = () => {
  const [billingCycle, setBillingCycle] = useState<{ key: string, value: string }>({ key: "monthly", value: "month" })
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isSending, setSending] = useState<boolean>(false)
  const { showSnackbar } = useSnackbarStore()
  const [plans, setPlans] = useState<planType>([])
  const navigate = useNavigate()
  const { setTokenFromCookie, decoded } = useAuthStore()

  const getPlanData = async () => {
    setLoading(true)
    try {
      const result = await getPlans();
      if (result.code === "SUCCESS") {
        setPlans(result?.data)
      }
    } catch (err: any) {
      if (err?.response?.data?.code == "INTERNAL_SERVER") {
        showSnackbar("Internal Server error", "error");
      }
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPlanData()
  }, [])

  const handleToggle = () => {
    if (billingCycle?.key === "monthly") {
      setBillingCycle({ key: "yearly", value: "year" })
    } else {
      setBillingCycle({ key: "monthly", value: "month" })
    }
  }

  const getFinalPrice = useCallback(() => {
    if (!plans) return [];

    return plans.map((item) => {
      const basePrice = item?.price || 0;
      let finalAmount = basePrice;
      let yearlyDiscount = 0;
      let offerDiscount = 0;
      let principleAmount = 0

      if (billingCycle.key === "yearly") {
        const yearlyPrice = basePrice * 12;
        principleAmount = yearlyPrice
        yearlyDiscount = (item?.billingCycleDiscount / 100) * yearlyPrice;
        offerDiscount = (item?.offerDescount / 100) * yearlyPrice;
        finalAmount = yearlyPrice - (yearlyDiscount + offerDiscount);
      } else {
        principleAmount = basePrice
        offerDiscount = (item?.offerDescount / 100) * basePrice;
        finalAmount = basePrice - offerDiscount;
      }

      return {
        ...item,
        yearlyDiscountAmount: Math.round(yearlyDiscount),
        offerDiscountAmount: Math.round(offerDiscount),
        principleAmount,
        finalAmount: Math.round(finalAmount),
      };
    });
  }, [plans, billingCycle]);


  const setPlan = async (plan: any) => {
    const payload =
    {
      planId: plan?.planId,
      plan: plan?.name,
      preferedBillingCycle: billingCycle?.key
    }
    try {
      const result = await buyPlan(payload);

      if (result.code === "SUCCESS") {
        setTokenFromCookie()
        showSnackbar(result?.message, "success");
        navigate("/dashboard")
      }
    } catch (err: any) {
      showSnackbar(err?.response?.data?.message, "error");
      setSending(false)
    } finally {
      setSending(false)
    }
  }

  const handleSubscribe = (plan: any) => {
    if (plan?.price === 0 && decoded) {
      setPlan(plan)
    } else {
      navigate("/payments", { state: { plan: plan } })
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      {/* 🔹 Hero Section */}
      <Box textAlign="center" sx={{ mb: 6 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Plans & Pricing
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Choose the plan that fits your needs. Upgrade anytime.
        </Typography>
        <Typography
          variant="body1"
          color="success.main"
          sx={{ mt: 1, fontWeight: "bold" }}
        >
          🎉 Get {plans[0]?.billingCycleDiscount}% discount with annual subscription plans!
        </Typography>
        <Switch
          checked={billingCycle?.key === "yearly"}
          onChange={handleToggle}
          color="success"
        />
      </Box>

      {/* 🔹 Plan Cards Section */}

      <Grid container spacing={2}>
        <Grid size={10} mx="auto">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "nowrap",
              gap: 3,
              overflowX: { xs: "auto", md: "visible" },
              pb: 2,
              mb: 8,
            }}
          >
            {getFinalPrice()?.map((plan) => (
              <Box key={plan.name} sx={{ minWidth: { xs: "85%", md: "30%" } }}>
                <PlanCard plan={plan}
                  billingCycle={billingCycle?.value}
                  onSubscribe={() => handleSubscribe(plan)}
                  isSending={isSending}
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
      <ComparisonTable getFinalPrice={getFinalPrice} />
      <FeedbackFrom />
    </Box>
  );
};
