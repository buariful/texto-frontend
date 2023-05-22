import React, { useRef, useState } from "react";
import { BsFillUnlockFill, BsEnvelopeFill } from "react-icons/bs";
import { useLoginMutation, useSignUpMutation } from "../features/auth/userApi";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const LoginReg = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ============= login form states =========
  const [login] = useLoginMutation();
  const userData = useSelector((state) => state.user);
  console.log(userData, "sdfslkdjf");

  // ============= sign up form states =========
  const [signError, setSignError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signUp] = useSignUpMutation();

  // ========== for form tab activity =========
  const loginBtn = useRef(null);
  const regBtn = useRef(null);
  const switcherTab = useRef(null);
  const loginTab = useRef(null);
  const registerTab = useRef(null);

  const switchTab = (string, btn1, btn2, tab1, tab2) => {
    btn1.current.classList.add("bg-[#080d14]");
    btn2.current.classList.remove("bg-[#080d14]");

    tab1.current.classList.add("block");
    tab1.current.classList.remove("hidden");

    tab2.current.classList.add("hidden");
    tab2.current.classList.remove("block");

    if (string === "login") {
      switcherTab.current.classList.remove("translate-x-full");
    } else {
      switcherTab.current.classList.add("translate-x-full");
    }
  };

  //============ login submit action =========
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    login(data)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res?.data));
        navigate("/chat");
      })
      .catch((err) => {
        setLoginError(err?.data?.message);
        console.log(err);
      });
  };

  //============ registration submit action =========
  const handleRegister = (e) => {
    e.preventDefault();
    setSignError("");

    signUp(signUpData)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res?.data));
        navigate("/chat");
      })
      .catch((err) => {
        setSignError(err?.data?.message);
      });
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="max-w-[500px] w-[500px] mx-auto bg-gray-800 p-5 rounded overflow-hidden">
        {/* <div className="h-3/5 md:h-3/4 w-10/12 md:w-1/2 lg:w-1/3 m-auto bg-[#cbcbcb] overflow-hidden"> */}
        {/* ======== log-sign button ======= */}
        <div className="w-full grid grid-cols-2 place-items-center">
          <button
            ref={loginBtn}
            onClick={() =>
              switchTab("login", loginBtn, regBtn, loginTab, registerTab)
            }
            className="basis-1/2 font-semibold text-[#d6d6d6] hover:text-white  py-2 w-full text-center cursor-pointer bg-[#080d14]"
          >
            Login
          </button>
          <button
            ref={regBtn}
            onClick={() =>
              switchTab("register", regBtn, loginBtn, registerTab, loginTab)
            }
            className="basis-1/2 font-semibold text-[#d6d6d6] hover:text-white  py-2 w-full text-center cursor-pointer "
          >
            Register
          </button>
        </div>
        <div
          ref={switcherTab}
          className="w-1/2 h-[2px] bg-white transition-all duration-300 ease-out"
        ></div>

        {/*======== login form =========*/}
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

          <button type="submit" className="btn block w-full max-w-xs m-auto">
            Submit
          </button>
        </form>

        {/* ========== Register form ============ */}
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

          <button type="submit" className={`btn block w-full max-w-xs m-auto`}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginReg;
