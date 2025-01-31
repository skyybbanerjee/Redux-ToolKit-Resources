import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  numOfCakes: number;
};

const initialState: InitialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    orderCake: (state, action: PayloadAction<number>) => {
      state.numOfCakes -= action.payload ?? 1;
    },
    restockCake: (state, action) => {
      state.numOfCakes += action.payload ?? 1;
    },
  },
});

export const { orderCake, restockCake } = cakeSlice.actions;
export default cakeSlice.reducer;
