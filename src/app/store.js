import { configureStore } from "@reduxjs/toolkit";
import carTypeReducer from "../features/car-type/carTypeSlice";
import fuelTypeReducer from "../features/fuel-type/fuelTypeSlice";
import carReducer from "../features/car/carSlice";
import userReducer from "../features/user/userSlice";
import rentReducer from "../features/rent/rentSlice";

export const store = configureStore({
  reducer: {
    carType: carTypeReducer,
    fuelType: fuelTypeReducer,
    car: carReducer,
    user: userReducer,
    rent: rentReducer,
  },
});
