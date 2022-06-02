import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  data: [],
};

export const createRent = createAsyncThunk(
  "rent/createRent",
  async ({ rent, car }) => {
    const rentBody = JSON.stringify(rent);
    await fetch("http://localhost:3001/rents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: rentBody,
    });

    const carBody = JSON.stringify({ count: car.count });
    await fetch("http://localhost:3001/cars/" + car.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: carBody,
    });
    return true;
  }
);

export const getRents = createAsyncThunk("rent/getRents", async () => {
  const response = await fetch("http://localhost:3001/rents");
  const data = await response.json();
  return data;
});

export const rentSlice = createSlice({
  name: "rent",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRents.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });
  },
});

export default rentSlice.reducer;
