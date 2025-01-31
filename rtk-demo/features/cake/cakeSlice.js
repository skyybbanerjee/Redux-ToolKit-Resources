const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfCakes: 10,
};

const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    orderCake: (state, action) => {
      state.numOfCakes -= action.payload ?? 1;
    },
    restockCake: (state, action) => {
      state.numOfCakes += action.payload ?? 1;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;

