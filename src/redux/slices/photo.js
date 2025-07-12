import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "https://json-photo-data-1.onrender.com";

export const fetchPhotos = createAsyncThunk("photos/fetch", async () => {
  const res = await axios.get(`${apiUrl}/photographers`);
  return res.data;
});

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const slice = createSlice({
  name: "photographers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default slice.reducer;
