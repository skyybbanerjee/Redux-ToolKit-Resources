const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "Soumadip",
  address: {
    street: "123 main St.",
    city: "Boston",
    state: "MA",
  },
};

//constant for the ACTION.TYPE
const STREET_UPDATED = "STREET_UPDATED";

//action creator -> returning the action object{}
function updateStreet(newStreet) {
  return {
    type: STREET_UPDATED,
    payload: newStreet,
  };
}

//reducer f(x)
function reducerFx(state = initialState, action) {
  switch (action.type) {
    case STREET_UPDATED:
    //   return {
    //     ...state,
    //     address: { ...state.address, street: action.payload },
    //   };
    return produce(state, (draft)=>{
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
}

const store = redux.createStore(reducerFx);
console.log(`Initial State: `, store.getState());
const unsubscribe = store.subscribe(() => {
  console.log(`Updated state: `, store.getState());
});
store.dispatch(updateStreet("456 Elm St."));
unsubscribe();
