import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "../features/cake/cakeSlice";
import iceCreamReducer from "../features/icecream/iceCreamSlice"; // ✅ Fixed typo (icreamReducer → iceCreamReducer)
import userReducer from "../features/user/userSlice"; // ✅ Fixed import

// import { createLogger } from "redux-logger"; //middleware
// const logger = createLogger();

const store = configureStore({
  reducer: {
    cake: cakeReducer,
    iceCream: iceCreamReducer, // ✅ Fixed reducer name
    user: userReducer, // ✅ Fixed reducer import
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
