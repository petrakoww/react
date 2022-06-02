import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  data: [],
  entity: null,
};

export const createCar = createAsyncThunk(
  "car/createCar",
  async (data) => {
    const body = JSON.stringify(data);
    await fetch("http://localhost:3001/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const getCars = createAsyncThunk("car/getCars", async () => {
  const response = await fetch("http://localhost:3001/cars");
  const data = await response.json();
  return data;
});

export const getCar = createAsyncThunk("car/getCar", async (id) => {
  const response = await fetch("http://localhost:3001/cars/" + id);
  const data = await response.json();
  return data;
});

export const editCar = createAsyncThunk(
  "car/editCar",
  async ({ id, data }) => {
    const body = JSON.stringify(data);
    await fetch("http://localhost:3001/cars/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const deleteCar = createAsyncThunk(
  "car/deleteCar",
  async (id) => {
    await fetch("http://localhost:3001/cars/" + id, { method: "DELETE" });
    return true;
  }
);

export const carSlice = createSlice({
  name: "car",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });

    builder
      .addCase(getCar.pending, (state) => {
        state.status = "loading";
        state.entity = null;
      })
      .addCase(getCar.fulfilled, (state, action) => {
        state.status = "idle";
        state.entity = action.payload;
      });
  },
});

export default carSlice.reducer;
