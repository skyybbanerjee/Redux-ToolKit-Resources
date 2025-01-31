### Using TypeScript with Redux Toolkit (RTK) – A Comprehensive Guide

Redux Toolkit (RTK) simplifies state management in React applications, and TypeScript enhances it with strong type safety. Here’s a detailed guide on integrating TypeScript with RTK.

---

## **1. Setting Up Redux Toolkit with TypeScript**
### **1.1 Install Dependencies**
We need to install Redux Toolkit and React-Redux:
```sh
npm install @reduxjs/toolkit react-redux
```
If you haven’t set up TypeScript in your project, install TypeScript and React types:
```sh
npm install typescript @types/react @types/react-redux --save-dev
```

---

## **2. Creating a Redux Store with TypeScript**
### **2.1 Defining a Slice**
In Redux Toolkit, a slice represents a part of the Redux store. Let's create a `counterSlice.ts` using TypeScript.

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state type
interface CounterState {
  value: number;
}

// Initial state
const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
```
### **Explanation**
1. We define an interface `CounterState` for the state shape.
2. We use `PayloadAction<T>` to type the action’s payload.
3. The reducers modify the state directly, thanks to Immer.

---

## **3. Configuring the Redux Store**
Create a `store.ts` file to configure the store.

```ts
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### **Explanation**
1. `configureStore` creates the store with `counterReducer`.
2. `RootState` is inferred using `store.getState()` to define the global state type.
3. `AppDispatch` gets the type of `store.dispatch` for typed dispatch.

---

## **4. Providing the Store to React**
Modify `main.tsx` or `index.tsx` to wrap the app with `Provider`.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```
### **Explanation**
- `Provider` makes the Redux store available to React components.

---

## **5. Using Redux State and Dispatch in Components**
To use Redux state and actions inside components, we use `useSelector` and `useDispatch`.

### **5.1 Creating Typed Hooks**
Create a `hooks.ts` file to define typed versions of Redux hooks.

```ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Typed versions of hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### **5.2 Using Redux in a Component**
Now, let’s create `Counter.tsx` and use Redux state.

```tsx
import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { increment, decrement, incrementByAmount } from "../features/counterSlice";

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
};

export default Counter;
```
### **Explanation**
1. We use `useAppSelector` to access state safely.
2. We use `useAppDispatch` to dispatch actions.

---

## **6. Using Async Thunks in TypeScript**
To handle async operations, we use `createAsyncThunk`.

### **6.1 Creating a Thunk**
Let’s fetch users from an API in `userSlice.ts`.

```ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the user type
interface User {
  id: number;
  name: string;
}

// Define the slice state type
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunk
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

// Export reducer
export default userSlice.reducer;
```
### **6.2 Using Thunk in a Component**
```tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchUsers } from "../features/userSlice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2>Users List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
```
---

## **7. Summary**
| Feature | Description |
|---------|-------------|
| **Typed State** | Define state using interfaces (`CounterState`, `UserState`) |
| **Typed Actions** | Use `PayloadAction<T>` to enforce type safety |
| **Typed Hooks** | Create `useAppDispatch` and `useAppSelector` |
| **Async Thunks** | Use `createAsyncThunk<User[], void, { rejectValue: string }>` for async logic |
| **Typed Store** | Define `RootState` and `AppDispatch` |

By following this approach, we get **full type safety, autocompletion, and better maintainability** while using Redux Toolkit with TypeScript.
