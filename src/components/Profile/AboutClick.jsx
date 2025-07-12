import React from "react";
import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";

const AboutClick = ({ singleobj }) => {
  const theme = useTheme();

  if (!singleobj || Object.keys(singleobj).length === 0) return null;

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, md: 4 },
        borderRadius: 3,
        bgcolor: "#f0f4f8", // Soft light-blue background
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h5"
        fontWeight={600}
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        About {singleobj.name}
      </Typography>

      {/* Bio */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ lineHeight: 1.7 }}
      >
        {singleobj.bio || "No bio available."}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Photography Styles */}
      <Typography
        variant="subtitle1"
        fontWeight={500}
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        📸 Photography Styles
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
        {(singleobj.styles || []).map((style, i) => (
          <Chip
            key={i}
            label={style}
            color="primary"
            variant="filled"
            size="small"
          />
        ))}
      </Stack>

      {/* Tags */}
      <Typography
        variant="subtitle1"
        fontWeight={500}
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        🏷️ Specializations
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {(singleobj.tags || []).map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            color="secondary"
            variant="outlined"
            size="small"
            sx={{ fontStyle: "italic" }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default AboutClick;
