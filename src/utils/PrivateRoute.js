import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/userSlice";
import { useGetUserByTokenMutation } from "../features/auth/userApi";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

export default async function PrivateRoute({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [getUserByToken, { data, isLoading }] = useGetUserByTokenMutation();
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (auth) {
    await getUserByToken(auth);
    dispatch(setUser(data));
    return children;
  }

  if (!auth) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
}
