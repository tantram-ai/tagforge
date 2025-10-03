import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Stack,
  useTheme,
  Paper,
} from "@mui/material";

export const InputForm = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState({
    businessBrief: "",
    userKeyword: "",
    pageType: "",
    tone: "",
    length: "",
    goal: "",
    cta: "",
    competitors: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
   
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={1.5}>
          {/* Business Brief */}
          <TextField
            label="Business Brief"
            name="businessBrief"
            value={formData.businessBrief}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={2}
            variant="standard"
            placeholder="Describe your business..."
          />

          {/* User Keyword */}
          <TextField
            label="Main Keyword"
            name="userKeyword"
            value={formData.userKeyword}
            onChange={handleChange}
            fullWidth
            required
            variant="standard"
          />

          {/* Page Type */}
          <TextField
            select
            label="Page Type"
            name="pageType"
            value={formData.pageType}
            onChange={handleChange}
            fullWidth
            required
            variant="standard"
          >
            {["blog", "landing", "product", "service", "faq"].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          {/* Tone */}
          <TextField
            select
            label="Tone"
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            fullWidth
            required
            variant="standard"

          >
            {[
              "professional",
              "friendly",
              "conversational",
              "persuasive",
              "storytelling",
            ].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          {/* Length */}
          <TextField
            select
            label="Content Length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            fullWidth
            required
            variant="standard"
          >
            {["short", "medium", "long"].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

          {/* Goal */}
          <TextField
            select
            label="Goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            fullWidth
            required
            variant="standard"

          >
            {["inform", "sell", "educate", "capture_leads"].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt.replace("_", " ")}
              </MenuItem>
            ))}
          </TextField>

          {/* CTA */}
          <TextField
            label="CTA (Call to Action)"
            name="cta"
            value={formData.cta}
            onChange={handleChange}
            fullWidth
            variant="standard"
            
          />

          {/* Competitors */}
          <TextField
            label="Competitors"
            name="competitors"
            value={formData.competitors}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            variant="standard"

          />

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
          >
            Generate Content
          </Button>
        </Stack>
      </Box>
 
  );
};

