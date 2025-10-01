import React from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface Plan {
    name: string;
    price: number;
    currency: string;
    projectsLimit: number;
    keywordsPerProject: number;
    aiGenerations: number;
    maxContentLength: "short" | "medium" | "long";
    billingCycle: "monthly" | "yearly";
    finalAmount:number;
    features: {
        seoContent: boolean;
        schemaSupport: boolean;
        competitorAnalysis: boolean;
        teamSupport: boolean;
    };
}

interface PlanCardProps {
    plan: Plan;
    onSubscribe: (plan: Plan) => void;
    billingCycle: string;
    isSending:boolean
}

export const PlanCard = ({ plan, onSubscribe, billingCycle ,isSending }: PlanCardProps) => {

    return (
        <Card
            sx={{
                borderRadius: 4,
                boxShadow: 2,
                textAlign: "center",
                p: 2,
                bgcolor: "background.paper",
                height: '100%'
            }}
        >
            <CardContent>
                {/* Plan Name */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {plan.name}
                </Typography>

                {/* Price */}
                <Typography variant="h6" fontWeight="bold" color="primary">
                    {plan?.finalAmount === 0 ? "Free" : `${plan?.currency} ${plan?.finalAmount}`}
                </Typography>

                {plan?.finalAmount !== 0 &&
                    <Typography variant="body2" color="text.secondary">
                        per {billingCycle}
                    </Typography>
                }


                <Divider sx={{ my: 2 }} />

                {/* Limits */}
                <Stack spacing={1} sx={{ mb: 2 }}>
                    <Typography>
                        <strong>{plan?.projectsLimit === -1 ? "N" : plan.projectsLimit}</strong> Project(s)
                    </Typography>
                    <Typography>
                        <strong>{plan.keywordsPerProject}</strong> Keywords / Project
                    </Typography>
                    <Typography>
                        <strong>{plan.aiGenerations}</strong> AI Generations
                    </Typography>
                    <Typography>
                        Content Length: <strong>{plan.maxContentLength}</strong>
                    </Typography>
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Features */}
                <Stack spacing={1} sx={{ mb: 3 }}>
                    <FeatureItem label="SEO Content" enabled={plan.features.seoContent} />
                    <FeatureItem
                        label="Schema Support"
                        enabled={plan.features.schemaSupport}
                    />
                    <FeatureItem
                        label="Competitor Analysis"
                        enabled={plan.features.competitorAnalysis}
                    />
                    <FeatureItem label="Team Support" enabled={plan.features.teamSupport} />
                </Stack>

                {/* Subscribe Button */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ borderRadius: 3 }}
                    onClick={() => onSubscribe(plan)}
                    loading={isSending}
                    loadingPosition="end"
                    disabled={isSending}
                >
                    {plan.price === 0 ? "Get Started" : "Subscribe Now"}
                </Button>
            </CardContent>
        </Card>
    );
};

const FeatureItem: React.FC<{ label: string; enabled: boolean }> = ({
    label,
    enabled,
}) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
        }}
    >
        {enabled ? (
            <CheckCircleIcon color="success" fontSize="small" />
        ) : (
            <CancelIcon color="error" fontSize="small" />
        )}
        <Typography variant="body2">{label}</Typography>
    </Box>
);

export default PlanCard;
