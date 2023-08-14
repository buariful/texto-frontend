import React, { useState } from "react";
import { useLoginMutation } from "../../features/auth/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import { useNavigate } from "react-router-dom";
import setLocalStorage from "../../utils/setLocalstorage";
import Toast from "../../utils/Toast";

const LoginForm = ({ loginTab }) => {
  const [login] = useLoginMutation();
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
      email: email,
      password: password,
    };

    login(data)
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        setLocalStorage(res.token);
        Toast(res?.message);
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered input-secondary w-full max-w-xs mb-2 mt-2"
        />

        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <div className="overflow-x-auto w-11/12 max-w-[500px] mx-auto my-8 text-white">
          <table className="min-w-full border text-center text-sm font-light ">
            <tbody>
              <tr
                className="border-b font-semibold cursor-pointer hover:bg-gray-300 hover:text-slate-800 duration-300"
                onClick={() => {
                  setEmail("abc@gmail.com");
                  setPassword("111111");
                }}
              >
                <td className="whitespace-nowrap border-r px-4 py-2 font-medium ">
                  <span className="font-semibold">User 1</span>
                </td>
                <td className="whitespace-nowrap border-r px-4 py-2">
                  abc@gmail.com
                </td>
                <td className="whitespace-nowrap px-4 py-2">111111</td>
              </tr>

              <tr
                className="border-b font-semibold cursor-pointer hover:bg-gray-300 hover:text-slate-800 duration-300"
                onClick={() => {
                  setEmail("abc2@gmail.com");
                  setPassword("111111");
                }}
              >
                <td className="whitespace-nowrap border-r px-4 py-2 font-medium ">
                  <span className="font-semibold">User 2</span>
                </td>
                <td className="whitespace-nowrap border-r px-4 py-2">
                  abc2@gmail.com
                </td>
                <td className="whitespace-nowrap px-4 py-2">111111</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
