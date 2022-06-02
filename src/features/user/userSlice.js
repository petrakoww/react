import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  data: [],
  entity: null,
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data) => {
    const body = JSON.stringify(data);
    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async () => {
    const response = await fetch("http://localhost:3001/users");
    const data = await response.json();
    return data;
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (id) => {
    const response = await fetch("http://localhost:3001/users/" + id);
    const data = await response.json();
    return data;
  }
);

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ id, data }) => {
    const body = JSON.stringify(data);
    await fetch("http://localhost:3001/users/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return true;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id) => {
    await fetch("http://localhost:3001/users/" + id, { method: "DELETE" });
    return true;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      });

    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.entity = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.entity = action.payload;
      });
  },
});

export default userSlice.reducer;
