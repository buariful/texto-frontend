import React, { useState } from "react";
import { useSignUpMutation } from "../features/auth/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target.password.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    signUp(signUpData)
      .unwrap()
      .then(async (res) => {
        dispatch(setUser(res?.data));
        navigate("/chat");
      })
      .catch((err) => {
        setError(err?.data?.message);
      });
  };

  const loginForm = (
    <div>
      <form onSubmit={handleLogin}>
        <input
          required
          type="email"
          placeholder="email"
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2"
        />

        <input
          required
          type="password"
          placeholder="password"
          name="password"
          className="input input-bordered input-secondary w-full max-w-xs mb-2 "
        />

        <button type="submit" className="btn block w-full max-w-xs m-auto">
          Submit
        </button>
      </form>
    </div>
  );

  const registerForm = (
    <div>
      <form onSubmit={handleRegister} className="text-black">
        {error && <p className="text-red-500 my-2">{error}</p>}
        <input
          required
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) =>
            setSignUpData({ ...signUpData, name: e.target.value })
          }
          value={signUpData.name}
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2"
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
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2"
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

        <button type="submit" className={`btn block w-full max-w-xs m-auto`}>
          Submit
        </button>
      </form>
    </div>
  );

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="max-w-[500px] w-[500px] mx-auto bg-[#f3f3f4] p-5 rounded">
        <div className="flex items-center justify-center gap-5 border-b pb-3">
          <button
            className={`btn ${tab === "login" ? "bg-red-400" : "bg-black"}`}
            onClick={() => setTab("login")}
          >
            login
          </button>
          <button
            className={`btn ${tab === "register" ? "bg-red-400" : "bg-black"}`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        {tab === "login" ? loginForm : registerForm}
      </div>
    </div>
  );
};

export default Home;
