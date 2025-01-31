const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

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
    builder.addCase(cakeActions.orderCake, (state) => {
      state.numOfIceCreams--;
    });
  },
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
