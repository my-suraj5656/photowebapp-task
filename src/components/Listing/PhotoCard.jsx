import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const PhotoCard = ({ card, onViewProfile }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "0.3s",
        p: 0,
        "&:hover": {
          boxShadow: 5,
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* image */}
      <Box sx={{ position: "relative" }}>
        {!imageLoaded && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom right, #eee, #ddd)",
              animation: "pulse 1.5s infinite ease-in-out",
              zIndex: 1,
            }}
          />
        )}
        <CardMedia
          component="img"
          image={card.profilePic}
          alt={card.name}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
          sx={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {/* rating */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            backgroundColor: "rgba(255,255,255,0.95)",
            px: 1,
            py: 0.5,
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "0.8rem",
            fontWeight: 500,
            boxShadow: 1,
          }}
        >
          <StarIcon sx={{ fontSize: 16, color: "#facc15" }} />
          {card.rating}
        </Box>
      </Box>

      {/* content */}
      <CardContent sx={{ px: 2.5, py: 2, flexGrow: 1 }}>
        <Stack spacing={1.2}>
          {/* name & location */}
          <Box>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              {card.name}
            </Typography>
            <Box display="flex" alignItems="center" color="text.secondary">
              <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography variant="body2">{card.location}</Typography>
            </Box>
          </Box>

          {/* tags */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {card.tags.slice(0, 2).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                color="primary"
              />
            ))}
            {card.tags.length > 2 && (
              <Chip
                label={`+${card.tags.length - 2}`}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>

          {/* Styles */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {card.styles.slice(0, 2).map((style) => (
              <Typography
                key={style}
                variant="caption"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <CameraAltIcon sx={{ fontSize: 14 }} />
                {style}
              </Typography>
            ))}
          </Stack>

          {/* Price & Button */}
          <Box
            mt={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ marginRight: "20px" }}
            >
              ₹{card.price.toLocaleString()}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: "#7c3aed",
                borderColor: "#7c3aed",
                "&:hover": {
                  backgroundColor: "#ede9fe",
                  borderColor: "#6d28d9",
                },
              }}
              onClick={() => onViewProfile?.(card.id)}
            >
              View Profile
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PhotoCard;
