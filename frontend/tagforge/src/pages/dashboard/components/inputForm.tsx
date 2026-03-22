import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { PremiumBadge, TgAutocomplete, TgMultiToggle, TgTextInput } from "../../../shared/components";
import { useAuthStore } from "../../../store";
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import { fontStyle } from "html2canvas/dist/types/css/property-descriptors/font-style";
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { contentAssetOptions, contentLengthOptions, funnelStageOptions, offeringOptions, pageIntentOptions, primaryGoalOptions, serpGoalOptions, toneOfVoiceOptions } from "./prdefinedata";

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
  const [selectedPageIntent, setSelectedPageIntent] = React.useState(pageIntentOptions[0]);
  const [selectedFunnelStage, setSelectedFunnelStage] = React.useState(funnelStageOptions[0]);

  const isDark = theme.palette.mode === "dark";

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
      <Box display="flex" alignItems="center" mb={1} gap={1}>
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: isDark
              ? "rgba(59, 130, 246, 0.16)"
              : "rgba(37, 99, 235, 0.08)",
            color: isDark ? "#93C5FD" : "#2563EB",
          }}
        >
          <BusinessRoundedIcon sx={{ fontSize: 18 }} />
        </Box>
        <Typography fontWeight="800">
          Business Context
        </Typography>
      </Box>
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

        {/* User offrings */}

        <TgAutocomplete
          multiple={true}
          defaultValue={[offeringOptions[0], offeringOptions[1]]}
          options={offeringOptions}
          label="Offrings"
        />

        {/* Target Audience */}

        <TgTextInput
          label="Target Audience "
          name="targetAudience"
          value={formData?.targetAudience}
          onChange={handleChange}
          required={true}
        />

        {/* Location*/}

        <TgTextInput
          label="Location"
          name="location"
          value={formData?.location}
          onChange={handleChange}
          required={true}
        />

        {/* Page Type */}

        {/* <TgTextInput
          select={true}
          label="Page Type"
          name="pageType"
          value={formData?.pageType}
          onChange={handleChange}
          required={true}
          list={["blog", "landing", "product", "service", "faq"]}
        /> */}

        {/* Tone */}

        {/* <TgTextInput
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
        /> */}

        {/* Length */}

        {/* <TgTextInput
          select={true}
          label="Content Length"
          name="length"
          value={formData.length}
          onChange={handleChange}
          required={true}
          list={planWiseLength(planInfo?.maxContentLength)}
        /> */}


        {/* Goal */}

        {/* <TgTextInput
          select={true}
          label="Goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required={true}
          list={["inform", "sell", "educate", "capture_leads"]}
        /> */}

        {/* CTA */}
        {/* <TgTextInput
          label="CTA (Call to Action)"
          name="cta"
          value={formData.cta}
          onChange={handleChange}
        /> */}

        {/* Competitors */}
        {/* <PremiumBadge hidden={planInfo?.features?.competitorAnalysis}> */}
        <TgTextInput
          label="Competitors URL"
          name="competitors"
          value={formData.competitors}
          onChange={handleChange}
          disabled={!planInfo?.features?.competitorAnalysis}
        />
        {/* </PremiumBadge> */}


        <Box display="flex" alignItems="center" mb={1} pb={1} gap={1}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: isDark
                ? "rgba(59, 130, 246, 0.16)"
                : "rgba(37, 99, 235, 0.08)",
              color: isDark ? "#93C5FD" : "#2563EB",
            }}
          >
            <HubRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography fontWeight="800">
            SEO Strategy
          </Typography>
        </Box>

        {/* Primery Goal */}

        <TgAutocomplete
          defaultValue={primaryGoalOptions[0]}
          options={primaryGoalOptions}
          label="Primery Goal"
        />

        {/* Page Intent */}

        <Box>
          <Typography sx={{ fontSize: '14px', mb: 1 }}>
            Page Intent
          </Typography>
          <TgMultiToggle alignment={selectedPageIntent} setAlignment={setSelectedPageIntent} list={pageIntentOptions} />
        </Box>


        {/* Content Asset */}

        <Box pt={1}>
          <TgAutocomplete
            defaultValue={contentAssetOptions[0]}
            options={contentAssetOptions}
            label="Content Asset"
          />
        </Box>


        {/*Funnel Stage */}

        <Box py={1}>
          <Typography sx={{ fontSize: '14px', mb: 1 }}>
            Funnel Stage
          </Typography>
          <TgMultiToggle alignment={selectedFunnelStage} setAlignment={setSelectedFunnelStage} list={funnelStageOptions} />
        </Box>


        {/* SERP Goals */}

        <TgAutocomplete
          multiple={true}
          defaultValue={[serpGoalOptions[0], serpGoalOptions[1]]}
          options={serpGoalOptions}
          label="SERP Goals"
        />


        <Box display="flex" alignItems="center" mb={1} gap={1}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              bgcolor: isDark
                ? "rgba(59, 130, 246, 0.16)"
                : "rgba(37, 99, 235, 0.08)",
              color: isDark ? "#93C5FD" : "#2563EB",
            }}
          >
            <TuneRoundedIcon sx={{ fontSize: 18 }} />
          </Box>
          <Typography fontWeight="800">
            Writting Preferences
          </Typography>
        </Box>


        {/* tone of Voice */}

        <Box pt={1}>
          <TgAutocomplete
            defaultValue={toneOfVoiceOptions[0]}
            options={toneOfVoiceOptions}
            label="Tone of Voice"
          />
        </Box>

        {/* Content Length */}

        <Box pt={1}>
          <TgAutocomplete
            defaultValue={contentLengthOptions[0]}
            options={contentLengthOptions}
            label="Content Length"
          />
        </Box>
        {/* CTA Text */}

        <TgTextInput
          label="CTA Text"
          name="ctaText"
          value={formData.cta}
          onChange={handleChange}
          disabled={!planInfo?.features?.competitorAnalysis}
        />


        <Button
          fullWidth
          disableElevation
          onClick={() => console.log("Generate SEO Strategy")}
          startIcon={<AutoAwesomeRoundedIcon sx={{ fontSize: 12 }} />}
          sx={{
            position: "relative",
            overflow: "hidden",
            minHeight: 20,
            px: 2,
            py: 1,
            borderRadius: "12px",
            textTransform: "none",

            fontSize: {
              xs: "1rem",
              sm: "0.6rem",
              md: "1rem",
            },
            color: "#ffffff",
            background: isDark
              ? "linear-gradient(90deg, #0B5CFF 0%, #083EA9 55%, #6A1BFF 100%)"
              : "linear-gradient(90deg, #0D6BFF 0%, #0A49D1 55%, #7B2CFF 100%)",
            boxShadow: isDark
              ? "0 8px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 10px 24px rgba(38, 86, 255, 0.28), inset 0 1px 0 rgba(255,255,255,0.22)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(255,255,255,0.22)",
            backdropFilter: "blur(6px)",
            transition: "all 0.25s ease",

            "& .MuiButton-startIcon": {
              mr: 1.2,
              "& svg": {
                filter: "drop-shadow(0 1px 2px rgba(255,255,255,0.18))",
              },
            },

            // top glossy shine
            "&::before": {
              content: '""',
              position: "absolute",
              top: 4,
              left: 8,
              right: 8,
              height: "50%",
              borderRadius: "16px",
              background: isDark
                ? "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 100%)"
                : "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 100%)",
              pointerEvents: "none",
            },

            // subtle inner glow
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "20px",
              boxShadow: isDark
                ? "inset 0 -3px 8px rgba(0,0,0,0.22)"
                : "inset 0 -3px 8px rgba(0,0,0,0.12)",
              pointerEvents: "none",
            },

            "&:hover": {
              transform: "translateY(-1px)",
              background: isDark
                ? "linear-gradient(90deg, #1767FF 0%, #0B47B7 55%, #7A2BFF 100%)"
                : "linear-gradient(90deg, #1A78FF 0%, #0C53E6 55%, #8A3AFF 100%)",
              boxShadow: isDark
                ? "0 12px 28px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)"
                : "0 14px 30px rgba(38, 86, 255, 0.34), inset 0 1px 0 rgba(255,255,255,0.24)",
            },

            "&:active": {
              transform: "translateY(0px) scale(0.995)",
            },

            "&.Mui-disabled": {
              color: "rgba(255,255,255,0.7)",
              background: isDark
                ? "linear-gradient(90deg, #355aa5 0%, #29458a 55%, #5a3d99 100%)"
                : "linear-gradient(90deg, #6d98e8 0%, #5f84d9 55%, #9c74e8 100%)",
            },
          }}
        >
          {/* {loading ? "Generating..." : "Generate SEO Strategy"} */}
          Generate SEO Strategy
        </Button>

        {/* Submit */}
        {/* <Button
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
        </Button> */}
      </Stack>
    </Box>

  );
};




const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { label: 'Forrest Gump', year: 1994 },
  { label: 'Inception', year: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { label: 'Goodfellas', year: 1990 },
  { label: 'The Matrix', year: 1999 },
  { label: 'Seven Samurai', year: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { label: 'City of God', year: 2002 },
  { label: 'Se7en', year: 1995 },
  { label: 'The Silence of the Lambs', year: 1991 },
  { label: "It's a Wonderful Life", year: 1946 },
  { label: 'Life Is Beautiful', year: 1997 },
  { label: 'The Usual Suspects', year: 1995 },
  { label: 'Léon: The Professional', year: 1994 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'The Intouchables', year: 2011 },
  { label: 'Modern Times', year: 1936 },
  { label: 'Raiders of the Lost Ark', year: 1981 },
  { label: 'Rear Window', year: 1954 },
  { label: 'The Pianist', year: 2002 },
  { label: 'The Departed', year: 2006 },
  { label: 'Terminator 2: Judgment Day', year: 1991 },
  { label: 'Back to the Future', year: 1985 },
  { label: 'Whiplash', year: 2014 },
  { label: 'Gladiator', year: 2000 },
  { label: 'Memento', year: 2000 },
  { label: 'The Prestige', year: 2006 },
  { label: 'The Lion King', year: 1994 },
  { label: 'Apocalypse Now', year: 1979 },
  { label: 'Alien', year: 1979 },
  { label: 'Sunset Boulevard', year: 1950 },
  {
    label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { label: 'The Great Dictator', year: 1940 },
  { label: 'Cinema Paradiso', year: 1988 },
  { label: 'The Lives of Others', year: 2006 },
  { label: 'Grave of the Fireflies', year: 1988 },
  { label: 'Paths of Glory', year: 1957 },
  { label: 'Django Unchained', year: 2012 },
  { label: 'The Shining', year: 1980 },
  { label: 'WALL·E', year: 2008 },
  { label: 'American Beauty', year: 1999 },
  { label: 'The Dark Knight Rises', year: 2012 },
  { label: 'Princess Mononoke', year: 1997 },
  { label: 'Aliens', year: 1986 },
  { label: 'Oldboy', year: 2003 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
  {
    label: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { label: 'Reservoir Dogs', year: 1992 },
  { label: 'Braveheart', year: 1995 },
  { label: 'M', year: 1931 },
  { label: 'Requiem for a Dream', year: 2000 },
  { label: 'Amélie', year: 2001 },
  { label: 'A Clockwork Orange', year: 1971 },
  { label: 'Like Stars on Earth', year: 2007 },
  { label: 'Taxi Driver', year: 1976 },
  { label: 'Lawrence of Arabia', year: 1962 },
  { label: 'Double Indemnity', year: 1944 },
  {
    label: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { label: 'Amadeus', year: 1984 },
  { label: 'To Kill a Mockingbird', year: 1962 },
  { label: 'Toy Story 3', year: 2010 },
  { label: 'Logan', year: 2017 },
  { label: 'Full Metal Jacket', year: 1987 },
  { label: 'Dangal', year: 2016 },
  { label: 'The Sting', year: 1973 },
  { label: '2001: A Space Odyssey', year: 1968 },
  { label: "Singin' in the Rain", year: 1952 },
  { label: 'Toy Story', year: 1995 },
  { label: 'Bicycle Thieves', year: 1948 },
  { label: 'The Kid', year: 1921 },
  { label: 'Inglourious Basterds', year: 2009 },
  { label: 'Snatch', year: 2000 },
  { label: '3 Idiots', year: 2009 },
  { label: 'Monty Python and the Holy Grail', year: 1975 },
];
