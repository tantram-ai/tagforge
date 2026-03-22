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
import GppMaybeOutlinedIcon from "@mui/icons-material/GppMaybeOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

type StatusType = "satisfied" | "needed" | "medium" | "critical";

type EEATItem = {
  key: string;
  label: string;
  value: string;
  status: StatusType;
};

type EEATRequirementsProps = {
  title?: string;
  priority?: string;
  items?: EEATItem[];
};

const getStatusStyles = (status: StatusType, isDark: boolean) => {
  switch (status) {
    case "satisfied":
      return {
        icon: <CheckCircleRoundedIcon sx={{ fontSize: 16 }} />,
        textColor: isDark ? "#86EFAC" : "#15803D",
        bg: isDark ? "rgba(34, 197, 94, 0.12)" : "#DCFCE7",
        border: isDark ? "rgba(34, 197, 94, 0.20)" : "rgba(34, 197, 94, 0.18)",
      };
    case "needed":
      return {
        icon: <WarningAmberRoundedIcon sx={{ fontSize: 16 }} />,
        textColor: isDark ? "#FDBA74" : "#C2410C",
        bg: isDark ? "rgba(249, 115, 22, 0.10)" : "#FFEDD5",
        border: isDark ? "rgba(249, 115, 22, 0.20)" : "rgba(249, 115, 22, 0.16)",
      };
    case "medium":
      return {
        icon: <WarningAmberRoundedIcon sx={{ fontSize: 16 }} />,
        textColor: isDark ? "#FCD34D" : "#B45309",
        bg: isDark ? "rgba(245, 158, 11, 0.10)" : "#FEF3C7",
        border: isDark ? "rgba(245, 158, 11, 0.20)" : "rgba(245, 158, 11, 0.16)",
      };
    case "critical":
    default:
      return {
        icon: <ErrorOutlineRoundedIcon sx={{ fontSize: 16 }} />,
        textColor: isDark ? "#FDA4AF" : "#BE123C",
        bg: isDark ? "rgba(244, 63, 94, 0.10)" : "#FFE4E6",
        border: isDark ? "rgba(244, 63, 94, 0.20)" : "rgba(244, 63, 94, 0.16)",
      };
  }
};

const getCategoryIcon = (key: string, isDark: boolean) => {
  const colorMap = {
    experience: isDark ? "#86EFAC" : "#16A34A",
    expertise: isDark ? "#FDBA74" : "#EA580C",
    authority: isDark ? "#FCD34D" : "#D97706",
    trust: isDark ? "#FDA4AF" : "#E11D48",
  };

  const color = colorMap[key as keyof typeof colorMap] || (isDark ? "#93C5FD" : "#2563EB");

  switch (key) {
    case "experience":
      return <WorkspacePremiumOutlinedIcon sx={{ fontSize: 22, color }} />;
    case "expertise":
      return <SchoolOutlinedIcon sx={{ fontSize: 22, color }} />;
    case "authority":
      return <AccountBalanceOutlinedIcon sx={{ fontSize: 22, color }} />;
    case "trust":
      return <VerifiedUserOutlinedIcon sx={{ fontSize: 22, color }} />;
    default:
      return <WorkspacePremiumOutlinedIcon sx={{ fontSize: 22, color }} />;
  }
};

export const EeatRequirements: React.FC<EEATRequirementsProps> = ({
  title = "E-E-A-T Requirements",
  priority = "High Priority",
  items = [
    {
      key: "experience",
      label: "Experience",
      value: "Satisfied",
      status: "satisfied",
    },
    {
      key: "expertise",
      label: "Expertise",
      value: "Needed",
      status: "needed",
    },
    {
      key: "authority",
      label: "Authority",
      value: "Medium",
      status: "medium",
    },
    {
      key: "trust",
      label: "Trust",
      value: "Add 2+",
      status: "critical",
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
          isDark ? "rgba(244, 63, 94, 0.14)" : "rgba(244, 63, 94, 0.12)"
        }`,
        background: isDark
          ? "linear-gradient(180deg, rgba(31, 41, 55, 0.96) 0%, rgba(17, 24, 39, 0.98) 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #FFFBFC 100%)",
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
                ? "rgba(244, 63, 94, 0.12)"
                : "rgba(244, 63, 94, 0.08)",
              color: isDark ? "#FDA4AF" : "#E11D48",
            }}
          >
            <GppMaybeOutlinedIcon sx={{ fontSize: 18 }} />
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

        <Chip
          label={priority}
          size="small"
          sx={{
            borderRadius: 2,
            fontWeight: 700,
            height: 30,
            color: isDark ? "#FDA4AF" : "#BE123C",
            bgcolor: isDark ? "rgba(244, 63, 94, 0.10)" : "#FFE4E6",
            border: `1px solid ${
              isDark ? "rgba(244, 63, 94, 0.18)" : "rgba(244, 63, 94, 0.14)"
            }`,
          }}
        />
      </Box>

      <Divider sx={{ borderColor: "divider" }} />

      {/* Content */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 2.2,
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {items.map((item, index) => {
          const statusStyles = getStatusStyles(item.status, isDark);

          return (
            <Box
              key={`${item.key}-${index}`}
              sx={{
                minHeight: 88,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Stack direction="row" spacing={1.1} alignItems="center" sx={{ mb: 1 }}>
                {getCategoryIcon(item.key, isDark)}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1rem", sm: "1.05rem" },
                    color: "text.primary",
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.75,
                  px: 1.1,
                  py: 0.65,
                  borderRadius: 2,
                  width: "fit-content",
                  bgcolor: statusStyles.bg,
                  border: `1px solid ${statusStyles.border}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", color: statusStyles.textColor }}>
                  {statusStyles.icon}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: statusStyles.textColor,
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};