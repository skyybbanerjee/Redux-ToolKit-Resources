//import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderCake, restockCake } from "./cakeSlice";

function CakeView() {
  const numOfCakes = useAppSelector((state) => state.cake.numOfCakes);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Number of cakes 🍰 : {numOfCakes}</h2>
      <button onClick={() => dispatch(orderCake(2))}>Order cake(s) 🛒</button>
      <button onClick={() => dispatch(restockCake(5))}>Restock cakes ➕</button>
    </div>
  );
}

export default CakeView;
