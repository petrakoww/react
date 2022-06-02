import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  data: [],
};

export const getCarTypes = createAsyncThunk(
  "carType/getCarTypes",
  async () => {
    const response = await fetch("http://localhost:3001/carTypes");
    const data = await response.json();
    return data;
  }
);

export const carTypeSlice = createSlice({
  name: "carType",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCarTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCarTypes.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default carTypeSlice.reducer;
