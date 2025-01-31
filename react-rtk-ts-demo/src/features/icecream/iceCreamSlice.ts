import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { orderCake } from "../cake/cakeSlice";

type InitialState = {
  numOfIceCreams: number;
}

const initialState: InitialState = {
  numOfIceCreams: 20,
};

const iceCreamSlice = createSlice({
  name: "iceCream",
  initialState,
  reducers: {
    orderIceCream: (state, action: PayloadAction<number>) => {
      state.numOfIceCreams -= action.payload ?? 1;
    },
    restockIceCream: (state, action: PayloadAction<number>) => {
      state.numOfIceCreams += action.payload ?? 1;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(orderCake, (state) => {
  //     state.numOfIceCreams--;
  //   });
  // },
});

export const { orderIceCream, restockIceCream } = iceCreamSlice.actions;
export default iceCreamSlice.reducer;
