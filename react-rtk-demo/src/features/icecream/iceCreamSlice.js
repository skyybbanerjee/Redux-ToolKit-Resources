import { createSlice } from "@reduxjs/toolkit";
import { orderCake } from "../cake/cakeSlice"; // ✅ Fixed ES6 import

const initialState = {
  numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    orderIceCream: (state, action) => {
      state.numOfIceCreams -= action.payload ?? 1;
    },
    restockIceCream: (state, action) => {
      state.numOfIceCreams += action.payload ?? 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderCake, (state) => {
      state.numOfIceCreams--;
    });
  },
});

export const { orderIceCream, restockIceCream } = iceCreamSlice.actions;
export default iceCreamSlice.reducer;
