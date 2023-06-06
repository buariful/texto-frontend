import React, { useState } from "react";
import { useSignUpMutation } from "../../features/auth/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ registerTab }) => {
  const [signError, setSignError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setSignError("");
    setActionLoading(true);

    signUp(signUpData)
      .unwrap()
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res?.token));
        dispatch(setUser(res));
        setActionLoading(false);
        navigate("/chat");
      })
      .catch((err) => {
        setSignError(err?.data?.message);
        setActionLoading(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleRegister}
        ref={registerTab}
        className="text-black hidden mt-5"
      >
        {signError && <p className="text-red-500 my-2">{signError}</p>}
        <input
          required
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) =>
            setSignUpData({ ...signUpData, name: e.target.value })
          }
          value={signUpData.name}
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2 "
        />

        <input
          required
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) =>
            setSignUpData({ ...signUpData, email: e.target.value })
          }
          value={signUpData.email}
          className="input input-bordered input-secondary w-full max-w-xs mb-2"
        />

        <input
          required
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) =>
            setSignUpData({ ...signUpData, password: e.target.value })
          }
          value={signUpData.password}
          className="input input-bordered input-secondary w-full max-w-xs mb-2 "
        />

        <button
          type="submit"
          className={`btn w-full max-w-xs ${
            actionLoading.signUpLoading
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

export default RegisterForm;
