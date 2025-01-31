import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../features/cake/cakeSlice.js";
import iceCreamReducer from "../features/icecream/iceCreamSlice.ts";
import userReducer from "../features/user/userSlice.ts";

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
