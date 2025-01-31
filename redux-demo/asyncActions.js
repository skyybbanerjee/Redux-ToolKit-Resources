const { createStore, applyMiddleware } = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

// Initial State
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Action Types
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// Action Creators
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUESTED });
const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Reducer with default state
const reducerFx = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true, error: "" };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Async Action Creator using Redux Thunk
const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
};

// ✅ Ensure middleware is correctly applied
const store = createStore(reducerFx, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch the async action
store.dispatch(fetchUsers());
