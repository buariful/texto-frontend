import React, { useState } from "react";
import { useLoginMutation } from "../../features/auth/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import setLocalStorage from "../../utils/setLocalstorage";

const LoginForm = ({ loginTab }) => {
  const [login] = useLoginMutation();
  const [loginError, setLoginError] = useState("");
  const [actionLoading, setActionLoading] = useState({
    loginLoading: false,
    signUpLoading: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setActionLoading({ ...actionLoading, loginLoading: true });

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    login(data)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        setLocalStorage(res.token);
        setActionLoading({ ...actionLoading, loginLoading: false });
        navigate("/chat");
      })
      .catch((err) => {
        setLoginError(err?.data?.message);
        setActionLoading({ ...actionLoading, loginLoading: false });
      });
  };
  return (
    <>
      {" "}
      <form
        className="p-7 block text-black"
        ref={loginTab}
        onSubmit={handleLogin}
      >
        {loginError && <p className="text-red-500 my-2">{loginError}</p>}
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2"
        />

        <input
          required
          type="password"
          placeholder="password"
          name="password"
          className="input input-bordered input-secondary w-full max-w-xs mb-2 "
        />

        <button
          type="submit"
          className={`btn w-full max-w-xs ${
            actionLoading.loginLoading
              ? "bg-[#444952b0] text-[#ffffff75] loading"
              : ""
          }`}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginForm;
