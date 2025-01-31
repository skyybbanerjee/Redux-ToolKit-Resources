import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderCake, restockCake } from "./cakeSlice";

function CakeView() {
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Number of cakes 🍰 : {numOfCakes}</h2>
      <button onClick={() => dispatch(orderCake())}>Order cake(s) 🛒</button>
      <button onClick={()=> dispatch(restockCake())}>Restock cakes ➕</button>
    </div>
  );
}

export default CakeView;
