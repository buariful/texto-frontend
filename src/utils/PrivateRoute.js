import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/shared/Loader";

const PrivateRoute = () => {
  const userData = useSelector((state) => state.user);

  if (userData?.isAuthLoading) {
    return (
      <div className="w-screen h-screen">
        <Loader />
      </div>
    );
  }

  if (userData?.user) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
