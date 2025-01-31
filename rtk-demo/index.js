const store = require("./app/store");
console.log(`⚛️  Initial state:`, store.getState());

const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const iceCreamActions =
  require("./features/icecream/iceCreamSlice").iceCreamActions;
const { fetchUsers } = require("./features/user/userSlice"); // ✅ Fixed import

const unsubscribe = store.subscribe(() => {
  // console.log(`✅ Updated state:`, store.getState()); //not needed as logger takes care of it
  console.log(`Updated state:`, store.getState());
});

store.dispatch(fetchUsers()); //fetches users and updates the state accordingly

// store.dispatch(cakeActions.orderCake(2));
// store.dispatch(cakeActions.orderCake(2));
// store.dispatch(cakeActions.orderCake(1));
// store.dispatch(cakeActions.orderCake()); //default: 1
// store.dispatch(cakeActions.restockCake(6));
// store.dispatch(iceCreamActions.orderIceCream(2));
// store.dispatch(iceCreamActions.restockIceCream(3));
// store.dispatch(iceCreamActions.restockIceCream(2));
// store.dispatch(iceCreamActions.restockIceCream()); //default: 1
// store.dispatch(iceCreamActions.orderIceCream()); //default: 1

//unsubscribe();
