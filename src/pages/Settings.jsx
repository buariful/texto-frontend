import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileUpdate from "../components/settings/ProfileUpdate";
import PasswordUpdate from "../components/settings/PasswordUpdate";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const userData = useSelector((state) => state.user.user.data);
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-slate-600 px-8  text-start">
        {" "}
        <button className="text-2xl py-4" onClick={() => navigate("/chat")}>
          <FaArrowCircleLeft />
        </button>
      </div>
      <div className="max-w-5xl wa-11/12 mx-auto pb-48">
        <h2 className="py-6 text-xl">Your Profile Informations</h2>
        <div className="flex justify-center items-center gap-3">
          <img
            src={userData?.picture?.url}
            alt=""
            className="max-w-[120px] max-h-[120px]"
          />
          <div className="text-start text-gray-400 text-sm">
            <p className="capitalize">
              Name: <span className="text-gray-300">{userData?.name}</span>
            </p>
            <p className="capitalize">
              Email: <span className="text-gray-300">{userData?.email}</span>
            </p>
          </div>
        </div>
        <h2 className=" text-md mt-14 mb-3">
          Update Your Profile Informations
        </h2>
        <div className="bg-slate-700 w-11/12 max-w-[500px] mx-auto py-2 mb-5">
          <div>
            {" "}
            <button
              className={`text-sm px-4 py-2 rounded mr-3 ${
                selectedTab === "profile"
                  ? "bg-slate-800 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setSelectedTab("profile")}
            >
              Profile
            </button>
            <button
              className={`text-sm px-4 py-2 rounded ${
                selectedTab === "password"
                  ? "bg-slate-800 text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setSelectedTab("password")}
            >
              Password
            </button>
          </div>
          {selectedTab === "profile" && <ProfileUpdate />}
          {selectedTab === "password" && <PasswordUpdate />}
        </div>
      </div>
    </>
  );
};

export default Settings;
