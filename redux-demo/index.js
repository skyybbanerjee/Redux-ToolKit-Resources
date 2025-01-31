const redux = require("redux");
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combinedReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

//cake-actions 🍰
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

//icecream-actions 🍧
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

//Cake action-creators 🎂
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

//Icecream action-creators 🍨
function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    quantity: qty,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return { ...state, numOfCakes: state.numOfCakes - 1 };
    case CAKE_RESTOCKED:
      return { ...state, numOfCakes: state.numOfCakes + action.payload };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return { ...state, numOfIceCreams: state.numOfIceCreams + 1 };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combinedReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state - ", store.getState());

const unSubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(1);

unSubscribe();
