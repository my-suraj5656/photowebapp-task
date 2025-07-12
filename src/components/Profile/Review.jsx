import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Divider,
  Rating,
} from "@mui/material";

const Review = ({ singleobj }) => {
  if (!singleobj?.reviews || singleobj.reviews.length === 0) return null;

  return (
    <Box mt={4}>
      <Typography variant="h5" fontWeight={600} px={3} gutterBottom>
        Reviews
      </Typography>

      <Stack spacing={2}>
        {singleobj.reviews.map((review, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "#f0f4f8", // Soft light-blue background

              border: "1px solid #e0e0e0",
            }}
          >
            <Box display="flex" alignItems="center" mb={1.5}>
              <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                {review.name[0]}
              </Avatar>
              <Box>
                <Typography fontWeight={600}>{review.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>

            <Rating
              value={review.rating}
              readOnly
              size="small"
              sx={{ mb: 1 }}
            />

            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Review;
