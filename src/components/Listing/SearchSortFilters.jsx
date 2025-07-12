import React from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchSortFilters = ({ filters, setFilters }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      gap={2}
      mt={4}
      alignItems="center"
      px={2}
      width="80%"
      mx="auto"
    >
      {/* Search Bar */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search by name, location, or specialization..."
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Sort Dropdown */}
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <Select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
          }
          displayEmpty
        >
          <MenuItem value="">Sort by</MenuItem>
          <MenuItem value="rating-desc">Highest Rated</MenuItem>
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="recent">Recently Added</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchSortFilters;
