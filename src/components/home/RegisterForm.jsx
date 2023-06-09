import React, { useState } from "react";
import { useSignUpMutation } from "../../features/auth/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ registerTab }) => {
  const [signError, setSignError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [signUp] = useSignUpMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setSignError("");
    setActionLoading(true);

    const formData = new FormData();
    formData.append("image", e.target.image.files[0]); // Updated image file
    formData.append("name", e.target.name.value); // Additional field: name
    formData.append("password", e.target.password.value);
    formData.append("email", e.target.email.value);

    signUp(formData)
      .unwrap()
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res?.token));
        dispatch(setUser(res));
        setActionLoading(false);
        navigate("/chat");
      })
      .catch((err) => {
        setSignError(err?.data?.message);
        console.log(err);
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
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2 "
        />

        <input
          required
          type="email"
          name="email"
          placeholder="email"
          className="input input-bordered input-secondary w-full max-w-xs mb-2"
        />

        <input
          required
          type="password"
          name="password"
          placeholder="password"
          className="input input-bordered input-secondary w-full max-w-xs mb-2 "
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full max-w-xs mb-2"
          name="image"
        />
        <button
          type="submit"
          className={`btn w-full max-w-xs ${
            actionLoading ? "bg-[#444952b0] text-[#ffffff75] loading" : ""
          }`}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
