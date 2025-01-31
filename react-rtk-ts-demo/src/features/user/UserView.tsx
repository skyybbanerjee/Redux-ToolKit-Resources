import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const UserView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div>
      <h2>List Of Users:</h2>
      {user.loading && <h2>Loading.. ⌛.</h2>}
      {!user.loading && user.error ? (
        <h3 style={{ color: "red" }}>Error: {user.error}</h3>
      ) : null}
      {!user.loading && user.users.length ? (
        <ul>
          {user.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default UserView;
