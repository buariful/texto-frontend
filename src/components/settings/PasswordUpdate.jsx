import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useUpdatePasswordMutation } from "../../features/auth/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/auth/userSlice";
import setLocalStorage from "../../utils/setLocalstorage";

const PasswordUpdate = () => {
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation();
  const token = useSelector((state) => state.user?.user?.token);
  const dispatch = useDispatch();
  const [watchPassword, setWatchPassword] = useState({
    oldPass: false,
    newPass: false,
    confirmPass: false,
  });
  const [password, setPassword] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });

  const handlePassUpdate = (e) => {
    e.preventDefault();
    setActionLoading(true);
    const passwords = {
      oldPassword: password.oldPass,
      newPassword: password.newPass,
      confirmPassword: password.confirmPass,
    };
    updatePassword({ token, passwords })
      .unwrap()
      .then((res) => {
        setActionLoading(false);
        dispatch(setUser(res));
        setLocalStorage(res.token);
        setPassword({
          oldPass: "",
          newPass: "",
          confirmPass: "",
        });
        setError("");
      })
      .catch((err) => {
        setError(err.data.message);
        setActionLoading(false);
      });
  };

  const handleShowPass = (state) => {
    setWatchPassword((prevState) => ({
      ...prevState,
      [state]: !prevState[state],
    }));
  };

  return (
    <>
      <form
        action=""
        className="mt-2 text-[12px] max-w-xs p-2 mx-auto text-black text-start"
      >
        {error && (
          <p className="text-red-500 my-2 capitalize text-[13px]">{error}</p>
        )}
        <label htmlFor="oldPass" className="block">
          Old Password <span className="text-white">*</span>
        </label>
        <div className="flex items-center gap-1">
          <input
            required
            id="oldPass"
            type={watchPassword.oldPass ? "text" : "password"}
            name="oldPass"
            placeholder="Old password"
            className="input input-bordered input-secondary w-full max-w-[280px] mb-2 "
            onChange={(e) =>
              setPassword({ ...password, oldPass: e.target.value })
            }
            value={password.oldPass}
          />
          {!watchPassword.oldPass ? (
            <AiFillEye
              className="cursor-pointer text-xl text-white"
              onClick={() => handleShowPass("oldPass")}
            />
          ) : (
            <AiFillEyeInvisible
              className="cursor-pointer text-xl text-white"
              onClick={() => handleShowPass("oldPass")}
            />
          )}
        </div>

        <label htmlFor="newPass" className="block">
          New Password <span className="text-white">*</span>
        </label>
        <div className="flex items-center gap-1">
          <input
            required
            id="newPass"
            type={watchPassword.newPass ? "text" : "password"}
            name="newPass"
            placeholder="New password"
            className="input input-bordered input-secondary w-full max-w-[280px] mb-2 "
            onChange={(e) =>
              setPassword({ ...password, newPass: e.target.value })
            }
            value={password.newPass}
          />
          {!watchPassword.newPass ? (
            <AiFillEye
              className="cursor-pointer text-xl text-white"
              onClick={() => handleShowPass("newPass")}
            />
          ) : (
            <AiFillEyeInvisible
              className="cursor-pointer text-xl text-white"
              onClick={() => handleShowPass("newPass")}
            />
          )}
        </div>

        <label htmlFor="conPass" className="block">
          Confirm Password <span className="text-white">*</span>
        </label>
        <div className="flex items-center gap-1">
          <input
            required
            id="conPass"
            type={watchPassword.conPass ? "text" : "password"}
            name="conPass"
            placeholder="Confirm password"
            className="input input-bordered input-secondary w-full max-w-[280px] mb-2 "
            onChange={(e) =>
              setPassword({ ...password, confirmPass: e.target.value })
            }
            value={password.confirmPass}
          />
          {!watchPassword.conPass ? (
            <AiFillEye
              className="cursor-pointer text-xl text-white"
              onClick={() => handleShowPass("conPass")}
            />
          ) : (
            <AiFillEyeInvisible
              className="cursor-pointer text-xl text-white"
              onClick={() => handleShowPass("conPass")}
            />
          )}
        </div>

        <button
          onClick={handlePassUpdate}
          className={`btn w-full max-w-xs hover:bg-slate-800 ${
            actionLoading
              ? "bg-slate-800 text-[#ffffff75] loading"
              : "bg-slate-900"
          }`}
        >
          Update
        </button>
      </form>
    </>
  );
};

export default PasswordUpdate;
