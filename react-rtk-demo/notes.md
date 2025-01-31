# **Redux Toolkit (RTK) – The Ultimate Guide** 🚀  

Redux Toolkit (RTK) is the **official, recommended way** to write Redux logic in a simpler, more efficient, and scalable way.  

---

## **🔹 What is Redux Toolkit (RTK)?**  
Redux Toolkit is a **state management library** built on top of Redux. It simplifies Redux development by:  
- Reducing **boilerplate code**  
- Improving **performance**  
- Providing built-in **best practices**  
- Supporting **async logic (thunks) out of the box**  

**Why Use Redux Toolkit?**  
✅ Less code, fewer files  
✅ Built-in `createSlice()` (no need for action creators & reducers separately)  
✅ Built-in `createAsyncThunk()` for handling API calls  
✅ Built-in middleware (e.g., `redux-thunk`)  
✅ Follows the **Redux principle** of a **single immutable store**  

---

# **🔹 How to Use Redux Toolkit in React**  
### **1️⃣ Installation**  
```sh
npm install @reduxjs/toolkit react-redux
```

### **2️⃣ Setting Up Redux Store**
**📌 `store.js` (Redux Store Setup)**  
```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Importing reducer

const store = configureStore({
  reducer: {
    counter: counterReducer, // Adding reducer to store
  },
});

export default store;
```

- `configureStore()` **creates the store** and automatically includes the Redux DevTools extension & middleware.

---

### **3️⃣ Creating a Slice (State + Reducers + Actions)**
**📌 `counterSlice.js`**
```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

🔥 **Why Use `createSlice()`?**  
- No need to manually write **action types, action creators, and reducers separately**.  
- Uses **Immer.js** internally, allowing **mutability-like syntax** (e.g., `state.value += 1`).  

---

### **4️⃣ Connecting Redux Store to React**
In `index.js` (or `main.js`), wrap the **entire app** with `<Provider store={store}>`:
```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Counter from "./Counter";

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
```
🔹 `<Provider store={store}>` **makes Redux available to all components**.

---

### **5️⃣ Using Redux State & Actions in React Components**
**📌 `Counter.js`**
```javascript
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>➕ Increment</button>
      <button onClick={() => dispatch(decrement())}>➖ Decrement</button>
      <button onClick={() => dispatch(reset())}>🔄 Reset</button>
    </div>
  );
};

export default Counter;
```

🔹 **`useSelector()`** → Gets the state from the store  
🔹 **`useDispatch()`** → Dispatches an action to update the state  

---

# **🔹 Async Thunks – Handling API Calls**
Redux Toolkit provides `createAsyncThunk()` for handling asynchronous operations like **API calls**.

### **📌 How `createAsyncThunk()` Works?**
- Automatically generates **3 action types**:  
  1️⃣ `pending` (when API request starts)  
  2️⃣ `fulfilled` (when data is received)  
  3️⃣ `rejected` (if the request fails)  

---

### **🔹 Fetching Data with Async Thunk**
**📌 `userSlice.js`**
```javascript
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk function to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
});

const userSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle", error: null },
  reducers: {}, // No sync actions needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

---

### **🔹 Using Async Thunk in React**
**📌 `UserList.js`**
```javascript
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
```

---

# **🔹 Middleware in Redux Toolkit**
### **What is Middleware?**
Middleware sits **between the action dispatch and the reducer**.  
Examples:
- Logging actions (`redux-logger`)
- Handling async operations (`redux-thunk`)
- API caching (`redux-persist`)

### **Using Middleware**
`configureStore()` **automatically applies thunk middleware**:
```javascript
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customMiddleware),
});
```
---

# **🔹 Understanding Builder Functions**
A **builder function** is used inside `extraReducers` to handle actions dynamically.

**Without Builder Function (Object Notation)**
```javascript
extraReducers: {
  [fetchUsers.pending]: (state) => { state.status = "loading"; },
  [fetchUsers.fulfilled]: (state, action) => { state.users = action.payload; },
  [fetchUsers.rejected]: (state, action) => { state.error = action.error.message; }
}
```

**With Builder Function (Recommended)**
```javascript
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => { state.status = "loading"; })
    .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; })
    .addCase(fetchUsers.rejected, (state, action) => { state.error = action.error.message; });
}
```
✅ Builder functions provide **better TypeScript support**.

---

# **🔹 Summary**
| Feature                | Description |
|----------------------|-------------|
| `createSlice()` | Combines state, actions, and reducers in one function |
| `configureStore()` | Creates the store with preconfigured middleware |
| `useSelector()` | Accesses the state in components |
| `useDispatch()` | Dispatches actions |
| `createAsyncThunk()` | Handles async actions (e.g., API calls) |
| Middleware | Extends Redux functionality |
| Builder Function | Improves handling of extra reducers |

---