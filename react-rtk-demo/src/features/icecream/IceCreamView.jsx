import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderIceCream, restockIceCream } from "./iceCreamSlice";

const IceCreamView = () => {
  const [value, setValue] = useState(1); //local state
  const dispatch = useDispatch();
  const numOfIceCreams = useSelector((state) => state.iceCream.numOfIceCreams);
  return (
    <div>
      <h2>Number of icecreams🍧: {numOfIceCreams}</h2>
      <button onClick={() => dispatch(orderIceCream())}>
        Order icecream(s) 🛒
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button onClick={() => dispatch(restockIceCream(value))}>
        Restock icecreams ➕
      </button>
    </div>
  );
};

export default IceCreamView;
