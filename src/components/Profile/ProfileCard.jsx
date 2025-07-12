import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import InquiryModal from "./InquiryModal"; // make sure path is correct

const ProfileCard = ({ singleobj }) => {
  const [openModal, setOpenModal] = useState(false);

  if (!singleobj) return null;

  return (
    <>
      <Card
        sx={{
          flexBasis: { md: "30%" },
          width: "100%",
          position: { md: "sticky" },
          bgcolor: "#f0f4f8",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
            <Avatar
              src={singleobj.profilePic}
              alt={singleobj.name}
              sx={{ width: 96, height: 96, mb: 2 }}
            />
            <Typography variant="h6">{singleobj.name}</Typography>
            <Box
              display="flex"
              alignItems="center"
              color="text.secondary"
              mt={0.5}
            >
              <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2">{singleobj.location}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5} mt={1}>
              <StarIcon fontSize="small" sx={{ color: "#facc15" }} />
              <Typography variant="body2" fontWeight={500}>
                {singleobj.rating}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({singleobj.reviews?.length || 0} reviews)
              </Typography>
            </Box>
          </Box>

          <Box
            bgcolor="#f9f9f9"
            borderRadius={2}
            p={2}
            textAlign="center"
            mb={3}
          >
            <Typography variant="h6" fontWeight={700}>
              ₹{singleobj.price?.toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Starting price
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => setOpenModal(true)}
            sx={{
              background: "linear-gradient(to right, #2563eb, #14b8a6)",
              textTransform: "none",
              fontWeight: 500,
              mb: 2,
              ":hover": {
                background: "linear-gradient(to right, #1e40af, #0f766e)",
              },
            }}
            startIcon={<SendIcon />}
          >
            Send Inquiry
          </Button>
        </CardContent>
      </Card>

      {/* Modal */}
      <InquiryModal
        photographerName={singleobj.name}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default ProfileCard;
