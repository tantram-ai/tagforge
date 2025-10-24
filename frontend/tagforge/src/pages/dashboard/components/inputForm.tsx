import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { PremiumBadge, TgTextInput } from "../../../shared/components";
import { useAuthStore } from "../../../store";

type inputFormProps = {
  handleSubmit: any
  generatingKeywords: boolean
  defaultData: any
}

export const InputForm = ({ handleSubmit, generatingKeywords = false, defaultData }: inputFormProps) => {
  const theme = useTheme();
  const { planDetails } = useAuthStore()
  const planInfo = planDetails?.data?.Plan
  const [formData, setFormData] = useState({
    businessBrief: defaultData?.businessBrief || "",
    brandName: defaultData?.brandName || "",
    pageType: defaultData?.pageType || "",
    tone: defaultData?.tone || "",
    length: defaultData?.length || "",
    goal: defaultData?.goal || "",
    cta: defaultData?.cta || "",
    competitors: defaultData?.competitors || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const planWiseLength = (contentLengthByPlan: string) => {
    const lengths = ["short", "medium", "long"]
    const index = lengths.indexOf(contentLengthByPlan)
    return lengths.slice(0, index + 1)
  }

  return (

    <Box>
      <Stack spacing={1.5}>
        {/* Business Brief */}
        <TgTextInput
          label="Business Brief"
          name="businessBrief"
          value={formData?.businessBrief}
          onChange={handleChange}
          required={true}
          multiline={true}
          rows={2}
          placeholder="Describe your business..."
        />

        {/* User Keyword */}

        <TgTextInput
          label="Brand Name"
          name="brandName"
          value={formData?.brandName}
          onChange={handleChange}
          required={true}
        />

        {/* Page Type */}

        <TgTextInput
          select={true}
          label="Page Type"
          name="pageType"
          value={formData?.pageType}
          onChange={handleChange}
          required={true}
          list={["blog", "landing", "product", "service", "faq"]}
        />

        {/* Tone */}

        <TgTextInput
          select={true}
          label="Tone"
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          required={true}
          list={[
            "professional",
            "friendly",
            "conversational",
            "persuasive",
            "storytelling",
          ]}
        />

        {/* Length */}

        <TgTextInput
          select={true}
          label="Content Length"
          name="length"
          value={formData.length}
          onChange={handleChange}
          required={true}
          list={planWiseLength(planInfo?.maxContentLength)}
        />


        {/* Goal */}

        <TgTextInput
          select={true}
          label="Goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required={true}
          list={["inform", "sell", "educate", "capture_leads"]}
        />

        {/* CTA */}
        <TgTextInput
          label="CTA (Call to Action)"
          name="cta"
          value={formData.cta}
          onChange={handleChange}
          hidden={false}
        />

        {/* Competitors */}
        <PremiumBadge hidden={planInfo?.features?.competitorAnalysis}>
          <TgTextInput
            label="Competitors URL"
            name="competitorsUrl"
            value={formData.competitors}
            onChange={handleChange}
            disabled={!planInfo?.features?.competitorAnalysis}
          />
        </PremiumBadge>


        {/* Submit */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            py: 1.3,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => handleSubmit(formData)}
          disabled={generatingKeywords}
          loading={generatingKeywords}
          loadingPosition="end"
        >
          Generate Content
        </Button>
      </Stack>
    </Box>

  );
};

