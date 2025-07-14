import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../redux/slices/photo";
import Navbar from "../components/Listing/Navbar";
import SearchSortFilters from "../components/Listing/SearchSortFilters";
import { Box, Grid, Typography, Button, CircularProgress } from "@mui/material";
import PhotoCard from "../components/Listing/PhotoCard";
import { useNavigate } from "react-router-dom";
import LeftSlider from "../components/Listing/Slider";

const Listing = () => {
  const { items, status, error } = useSelector((s) => s.photographers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(items, status, error);

  const [filter, setFilter] = useState({
    search: "",
    sortBy: "",
    price: [5000, 20000],
    rating: 0,
    styles: [],
    city: "",
  });
  // console.log(filter.city);

  const [debouncedSearch, setDebouncedSearch] = useState(filter.search);
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filter.search);
    }, 400);

    return () => clearTimeout(timer);
  }, [filter.search]);

  // Filter and sort logic
  const filteredData = useMemo(() => {
    let data = [...items];
    const query = debouncedSearch.toLowerCase();

    data = data.filter(
      (obj) =>
        obj.name.toLowerCase().includes(query) ||
        obj.location.toLowerCase().includes(query) ||
        obj.tags.some((tag) => tag.toLowerCase().includes(query))
    );

    switch (filter.sortBy) {
      case "price-asc":
        data.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        data.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        data.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        data.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    data = data.filter(
      (item) => item.price >= filter.price[0] && item.price < filter.price[1]
    );

    if (filter.rating > 0) {
      data = data.filter((item) => item.rating > filter.rating);
    }

    if (filter.city) {
      data = data.filter((item) => item.location === filter.city);
    }

    if (filter.styles.length) {
      data = data.filter((item) =>
        filter.styles.some((style) => item.styles.includes(style))
      );
    }

    return data;
  }, [debouncedSearch, filter, items]);

  // Fetch data initially
  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  return (
    <Box className="min-h-screen">
      <Navbar title={filter.city} count={items.length} />

      <SearchSortFilters
        filters={filter}
        setFilters={setFilter}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setisDrawerOpen}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          maxWidth: "80%",
          mx: "auto",
          px: 2,
          mt: 4,
        }}
      >
        {/* Sidebar */}
        <Box sx={{ flexBasis: { md: "30%" }, flexShrink: 0 }}>
          <LeftSlider
            items={items}
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setisDrawerOpen}
            filters={filter}
            setFilters={setFilter}
          />
        </Box>

        {/* right side Grid */}
        <Box sx={{ flex: 1 }}>
          {status === "loading" ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
              <CircularProgress />
            </Box>
          ) : filteredData.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {filteredData.slice(0, visibleCount).map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={6} lg={4}>
                  <PhotoCard
                    card={card}
                    onViewProfile={() => navigate(`/profile/${card.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", width: "100%", mt: 4 }}>
              <Typography variant="h6" fontWeight={500}>
                😔 No results found
              </Typography>
              <Typography variant="body2">
                Try adjusting your filters or search terms.
              </Typography>
            </Box>
          )}

          {/* Load More Button */}
          {status === "idle" && filteredData.length > visibleCount && (
            <Box textAlign="center" mt={4}>
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((prev) => prev + 6)}
              >
                Load More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Listing;
