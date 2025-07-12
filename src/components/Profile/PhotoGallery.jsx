import React, { useState } from "react";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PhotoGallery = ({ singleobj }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  if (!singleobj?.portfolio || singleobj.portfolio.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? singleobj.portfolio.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === singleobj.portfolio.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 800,
          height: { xs: 250, sm: 350, md: 400 },
          margin: "0 auto",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: theme.shadows[4],
        }}
      >
        <img
          src={singleobj.portfolio[currentIndex]}
          alt={`Photo ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "inherit",
            transition: "all 0.4s ease-in-out",
          }}
        />

        {/* Previous Button */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(240,240,240,1)" },
          }}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>

        {/* Next Button */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "rgba(240,240,240,1)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Index Counter */}
      <Typography
        variant="caption"
        color="text.secondary"
        mt={1}
        display="block"
      >
        {currentIndex + 1} / {singleobj.portfolio.length}
      </Typography>
    </Box>
  );
};

export default PhotoGallery;
