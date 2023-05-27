import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/userSlice";
import { useGetUserByTokenMutation } from "../features/auth/userApi";

export default function useAuthCheck() {
  const [isAuthenticUser, setIsAuthenticUser] = useState(false);
  const dispatch = useDispatch();
  const [getUserByToken] = useGetUserByTokenMutation();
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    if (auth) {
      const token = JSON.parse(auth);
      getUserByToken(token)
        .unwrap()
        .then((res) => {
          dispatch(setUser(res));
          setIsAuthenticUser(true);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticUser(false);
        });
    }
  }, [dispatch, getUserByToken, auth]);
  return isAuthenticUser;
}
