import React from "react";
import {
  IconButton,
  Drawer,
  Button,
  Slider,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Stack,
  Select,
  MenuItem,
  FormControl,
  FormGroup,
  Checkbox,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import StarIcon from "@mui/icons-material/Star";
import LocationCity from "@mui/icons-material/LocationCity";
import { CameraAlt } from "@mui/icons-material";

const LeftSlider = ({
  isDrawerOpen,
  setIsDrawerOpen,
  filters,
  setFilters,
  items,
}) => {
  const city = items.map((obj) => obj.location);
  const cityset = new Set(city);
  const cities = Array.from([...cityset]);

  const styles = [];
  items.forEach((ele) => {
    return ele.styles.forEach((nestele) => styles.push(nestele));
  });

  const set = new Set(styles);
  const finalstyles = Array.from([...set]);
  // console.log(finalstyles);

  const ratings = [4.5, 4.0, 3.5, 3.0];

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, price: e.target.value }));
  };

  const handleRatingChange = (e) => {
    setFilters((prev) => ({ ...prev, rating: e.target.value }));
  };

  const handlestyleschange = (e) => {
    const value = e.target.value;
    const ischecked = e.target.checked;

    console.log(value, ischecked);

    setFilters((prev) => ({
      ...prev,
      styles: ischecked
        ? [...prev.styles, value]
        : prev.styles.filter((s) => s !== value),
    }));
  };

  const getLabel = (rating) => {
    if (rating === 4.5) return "Excellent";
    if (rating === 4.0) return "Very Good";
    if (rating === 3.5) return "Good";
    return "Above Average";
  };

  const commonui = () => {
    return (
      <div>
        {/* Price Range Slider */}
        <div className="mb-6 w-full">
          <Typography variant="subtitle1" gutterBottom>
            Price Range
          </Typography>
          <Slider
            value={filters.price}
            min={5000}
            max={20000}
            step={1000}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
          />
          <Typography variant="subtitle2" mt={1}>
            ₹{filters.price[0]} - ₹{filters.price[1]}
          </Typography>
        </div>

        {/* Rating Filter */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            mb={1.5}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <StarIcon fontSize="small" />
            Minimum Rating
          </Typography>

          <RadioGroup
            value={filters.rating}
            onChange={handleRatingChange}
            name="rating-filter"
          >
            <Stack spacing={1}>
              {ratings.map((rating) => (
                <FormControlLabel
                  key={rating}
                  value={rating}
                  control={<Radio size="small" />}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <StarIcon sx={{ fontSize: 18, color: "#facc15" }} />
                      <Typography variant="body2">
                        {rating}+ ({getLabel(rating)})
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        {/* cities filter */}
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            mb={1.5}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <LocationCity fontSize="small" />
            City
          </Typography>
          <FormControl fullWidth size="small" sx={{ mt: 1 }}>
            <Select
              labelId="city-label"
              label="city"
              value={filters.city}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, city: e.target.value }))
              }
              displayEmpty
              renderValue={(selected) => (selected ? selected : "All Cities")}
            >
              <MenuItem value="">All Cities</MenuItem>
              {cities.map((city, i) => (
                <MenuItem key={i} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Styles Filter */}
        <Box mt={3}>
          <Typography
            variant="subtitle1"
            fontWeight={500}
            mb={1.5}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <CameraAlt fontSize="small" />
            Photography Styles
          </Typography>

          <FormGroup>
            {finalstyles.map((style) => (
              <FormControlLabel
                key={style}
                control={
                  <Checkbox
                    size="small"
                    value={style}
                    checked={filters.styles.includes(style)}
                    onChange={handlestyleschange}
                  />
                }
                label={style}
              />
            ))}
          </FormGroup>
        </Box>
      </div>
    );
  };

  return (
    <div>
      {/* Toggle Button for Mobile */}
      <div className="lg:hidden mb-4">
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <FilterListIcon />
        </IconButton>
      </div>

      {/* Sidebar (Large Screens) */}
      <div className="hidden lg:flex flex-col h-full p-5 border rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FilterListIcon className="text-gray-700" />
          Filter Options
        </h2>
        {commonui()}
      </div>

      {/* Drawer (Mobile) */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="w-72 h-full p-4 bg-white">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FilterListIcon className="text-gray-700" />
            Filter Options
          </h2>
          {commonui()}
        </div>
      </Drawer>
    </div>
  );
};

export default LeftSlider;
