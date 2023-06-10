import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateProfileMutation } from "../../features/auth/userApi";
import { setUser } from "../../features/auth/userSlice";
import setLocalStorage from "../../utils/setLocalstorage";
import Toast from "../../utils/Toast";

const ProfileUpdate = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userData = useSelector((state) => state.user?.user);
  const [updateProfile] = useUpdateProfileMutation();
  const dispatch = useDispatch();

  function handleUpdate(e) {
    e.preventDefault();
    setError("");
    setActionLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("publicId", userData?.data?.picture?.publicId);
    if (e.target.image.files[0]) {
      formData.append("image", e.target.image.files[0]);
    }
    updateProfile({ token: userData?.token, data: formData })
      .unwrap()
      .then((res) => {
        dispatch(setUser(res));
        setLocalStorage(res.token);
        setActionLoading(false);
        Toast(res?.message);
        setError("");
        setName("");
        setEmail("");
      })
      .catch((err) => {
        setError(err.data.message);
        Toast(err?.data?.message);
        setActionLoading(false);
      });
  }

  useEffect(() => {
    setName(userData?.data?.name);
    setEmail(userData?.data?.email);
  }, [userData?.data?.name, userData?.data?.email]);
  return (
    <div className="px-2">
      <form onSubmit={handleUpdate} className="text-black mt-5">
        {error && <p className="text-red-500 my-2">{error}</p>}
        <div className="max-w-xs mx-auto text-start text-[12px]">
          <div className="flex items-center justify-center gap-2">
            <label>
              Name <span className="text-white">*</span>
              <input
                required
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered input-secondary w-full max-w-[280px] mb-2 "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <p
              className="bg-red-700 hover:bg-red-800 text-white text-sm rounded py-1 px-3 max-h-6 cursor-pointer flex items-center"
              onClick={() => setName(userData?.data?.name)}
            >
              Reset
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <label>
              Email <span className="text-white">*</span>
              <input
                required
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered input-secondary w-full max-w-[280px] mb-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </label>
            <p
              className="bg-red-700 hover:bg-red-800 text-white text-sm rounded py-1 px-3 max-h-6 cursor-pointer flex items-center"
              onClick={() => setEmail(userData?.data?.email)}
            >
              Reset
            </p>
          </div>

          <p className="mb-1">
            Update Profile Picture{" "}
            <span className="text-white">(optional)</span>
          </p>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs mb-2"
            name="image"
          />
          <button
            type="submit"
            className={`btn w-full max-w-xs hover:bg-slate-800 ${
              actionLoading
                ? "bg-slate-800 text-[#ffffff75] loading"
                : "bg-slate-900"
            }`}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdate;
