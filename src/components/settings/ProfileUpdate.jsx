import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileUpdate = () => {
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const userData = useSelector((state) => state.user?.user?.data);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");
    setActionLoading(true);

    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.append("name", name);
    formData.append("email", email);

    // signUp(formData)
    //   .unwrap()
    //   .then((res) => {
    //     dispatch(setUser(res));
    //     setActionLoading(false);
    //     navigate("/chat");
    //   })
    //   .catch((err) => {
    //     setSignError(err?.data?.message);
    //     console.log(err);
    //     setActionLoading(false);
    //   });
  };

  useEffect(() => {
    setName(userData?.name);
    setEmail(userData?.email);
  }, [userData?.name, userData?.email]);
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
              onClick={() => setName(userData?.name)}
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
              onClick={() => setEmail(userData?.email)}
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
