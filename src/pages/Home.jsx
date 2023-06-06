import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/shared/Loader";
import FormTab from "../components/home/FormTab";
import LoginForm from "../components/home/LoginForm";
import RegisterForm from "../components/home/RegisterForm";

const Home = () => {
  const userData = useSelector((state) => state.user);
  const loginBtn = useRef(null);
  const loginTab = useRef(null);
  const regBtn = useRef(null);
  const switcherTab = useRef(null);
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

  if (userData?.user) {
    return <Navigate to="/chat" />;
  }
  if (userData?.isAuthLoading) {
    return (
      <div className="w-screen h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="max-w-[500px] w-[500px] mx-auto bg-gray-800 p-5 rounded overflow-hidden">
        {/* ======== log-sign button ======= */}
        <FormTab
          switchTab={switchTab}
          loginBtn={loginBtn}
          regBtn={regBtn}
          loginTab={loginTab}
          registerTab={registerTab}
          switcherTab={switcherTab}
        />

        <LoginForm loginTab={loginTab} />
        <RegisterForm registerTab={registerTab} />
      </div>
    </div>
  );
};

export default Home;
