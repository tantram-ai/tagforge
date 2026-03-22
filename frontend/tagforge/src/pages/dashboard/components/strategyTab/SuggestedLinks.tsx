import React from "react";
import {
  Box,
  Card,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

type LinkTagType = "product" | "brand" | "support" | "related";

type InternalLinkItem = {
  url: string;
  tag: string;
  tagType: LinkTagType;
};

type SuggestedInternalLinksProps = {
  title?: string;
  opportunityLabel?: string;
  items?: InternalLinkItem[];
};

const getTagStyles = (type: LinkTagType, isDark: boolean) => {
  switch (type) {
    case "product":
      return {
        bg: isDark ? "rgba(59, 130, 246, 0.12)" : "#EEF4FF",
        color: isDark ? "#93C5FD" : "#2563EB",
        border: isDark ? "rgba(59, 130, 246, 0.20)" : "rgba(37, 99, 235, 0.12)",
      };
    case "brand":
      return {
        bg: isDark ? "rgba(217, 70, 239, 0.12)" : "#FDF4FF",
        color: isDark ? "#E9A8F7" : "#C026D3",
        border: isDark ? "rgba(217, 70, 239, 0.20)" : "rgba(192, 38, 211, 0.12)",
      };
    case "support":
      return {
        bg: isDark ? "rgba(34, 197, 94, 0.12)" : "#ECFDF3",
        color: isDark ? "#86EFAC" : "#15803D",
        border: isDark ? "rgba(34, 197, 94, 0.20)" : "rgba(21, 128, 61, 0.12)",
      };
    case "related":
    default:
      return {
        bg: isDark ? "rgba(132, 204, 22, 0.12)" : "#F7FEE7",
        color: isDark ? "#BEF264" : "#4D7C0F",
        border: isDark ? "rgba(132, 204, 22, 0.20)" : "rgba(77, 124, 15, 0.12)",
      };
  }
};

export const SuggestedLinks: React.FC<SuggestedInternalLinksProps> = ({
  title = "Suggested Internal Links",
  opportunityLabel = "4 opportunities",
  items = [
    {
      url: "/collections/custom-planters",
      tag: "Product",
      tagType: "product",
    },
    {
      url: "/blog/3d-printing-process",
      tag: "Support",
      tagType: "support",
    },
    {
      url: "/pages/about-us",
      tag: "Brand",
      tagType: "brand",
    },
    {
      url: "/blog/home-decor-trends-2025",
      tag: "Related",
      tagType: "related",
    },
  ],
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: `1px solid ${
          isDark ? "rgba(59, 130, 246, 0.14)" : "rgba(37, 99, 235, 0.12)"
        }`,
        background: isDark
          ? "linear-gradient(180deg, rgba(15,23,42,0.96) 0%, rgba(17,24,39,0.98) 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #FAFCFF 100%)",
        boxShadow: isDark
          ? "0 8px 24px rgba(0,0,0,0.22)"
          : "0 8px 24px rgba(15, 23, 42, 0.04)",
        overflow: "hidden",
        mt:2
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: isDark
                ? "rgba(59, 130, 246, 0.12)"
                : "rgba(37, 99, 235, 0.08)",
              color: isDark ? "#93C5FD" : "#2563EB",
            }}
          >
            <LinkRoundedIcon sx={{ fontSize: 18 }} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1rem", sm: "1.125rem" },
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: isDark ? "#93C5FD" : "#2563EB",
          }}
        >
          {opportunityLabel}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      {/* Link Grid */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2.2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 1.5,
        }}
      >
        {items.map((item, index) => {
          const tagStyles = getTagStyles(item.tagType, isDark);

          return (
            <Box
              key={`${item.url}-${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1.2,
                px: 1.4,
                py: 1.2,
                borderRadius: 2.5,
                border: `1px solid ${
                  isDark ? "rgba(148, 163, 184, 0.16)" : "rgba(148, 163, 184, 0.18)"
                }`,
                bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#FCFDFF",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isDark ? "rgba(255,255,255,0.04)" : "#F8FBFF",
                  borderColor: isDark
                    ? "rgba(59, 130, 246, 0.20)"
                    : "rgba(37, 99, 235, 0.18)",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  color: isDark ? "#93C5FD" : "#2563EB",
                  flex: 1,
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={item.url}
              >
                {item.url}
              </Typography>

              <Chip
                label={item.tag}
                size="small"
                sx={{
                  height: 28,
                  borderRadius: 2,
                  fontWeight: 700,
                  bgcolor: tagStyles.bg,
                  color: tagStyles.color,
                  border: `1px solid ${tagStyles.border}`,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};