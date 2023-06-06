import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthLoading, setUser } from "../features/auth/userSlice";
import { useGetUserByTokenMutation } from "../features/auth/userApi";

export default function useAuthCheck() {
  const [isAuthChecked, setAuthCheck] = useState(false);
  const dispatch = useDispatch();
  const [getUserByToken] = useGetUserByTokenMutation();
  const token = localStorage.getItem("auth");

  useEffect(() => {
    if (token) {
      const parseToken = JSON.parse(token);
      dispatch(setAuthLoading(true));
      getUserByToken(parseToken)
        .unwrap()
        .then((res) => {
          dispatch(setUser(res));
          dispatch(setAuthLoading(false));
        })
        .catch((err) => {
          dispatch(setAuthLoading(false));
        });
    }
    setAuthCheck(true);
  }, [isAuthChecked, dispatch, token, getUserByToken]);
  return isAuthChecked;
}
