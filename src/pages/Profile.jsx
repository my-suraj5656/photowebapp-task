import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../redux/slices/photo";
import { useParams, useNavigate } from "react-router-dom";
import ProfileCard from "../components/Profile/ProfileCard";
import PhotoGallery from "../components/Profile/PhotoGallery";
import AboutClick from "../components/Profile/AboutClick";
import Review from "../components/Profile/Review";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { items } = useSelector((s) => s.photographers);
  const dispatch = useDispatch();
  const [singleobj, setsingleobj] = useState({});

  const findobj = (objid, itemsarray) => {
    let obj = itemsarray.find((ele) => ele.id === Number(objid));
    if (obj) setsingleobj(obj);
  };

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(() => {
    findobj(id, items);
  }, [items, id]);

  return (
    <Box sx={{ bgcolor: "#f9fafb", minHeight: "100vh", py: 4 }}>
      {/* Back Button */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          mb: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ textTransform: "none" }}
        >
          Back to Listing
        </Button>
      </Box>

      {/* Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "1200px",
          mx: "auto",
          px: 2,
          gap: 2,
        }}
      >
        {/* LEFT SIDE - 70% */}
        <Box sx={{ flexBasis: { md: "70%" }, width: "100%" }}>
          <PhotoGallery singleobj={singleobj} />
          <AboutClick singleobj={singleobj} />
          <Review singleobj={singleobj} />
        </Box>

        {/* RIGHT SIDE - 30% */}
        <Box
          sx={{
            flexBasis: { md: "30%" },
            width: "100%",
            position: { md: "sticky" },
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 1,
            height: "fit-content",
          }}
        >
          <ProfileCard singleobj={singleobj} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
