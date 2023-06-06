import React from "react";

const FormTab = ({
  loginBtn,
  switchTab,
  regBtn,
  loginTab,
  registerTab,
  switcherTab,
}) => {
  return (
    <>
      {" "}
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
    </>
  );
};

export default FormTab;
