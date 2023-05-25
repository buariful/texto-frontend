import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useGetUsersMutation } from "../features/auth/userApi";
import Loader from "./Loader";

const ChatLeftBar = () => {
  const [getUsers, { data, isLoading }] = useGetUsersMutation();
  const [searchText, setSearchText] = useState(false);
  const [error, setError] = useState("");
  const userData = useSelector((state) => state.user);
  console.log(userData);

  const handleSearch = (e) => {
    const text = e.target.value;
    const token = userData?.user?.token;

    setSearchText(text);
    getUsers({ token: token, search: text })
      .unwrap()
      .then((res) => {
        setError("");
      })
      .catch((err) => {
        setError(err.data.message);
      });
  };

  let seachContent;
  if (data) {
    seachContent = data?.data?.map((d) => {
      return (
        <div
          className="flex items-center gap-2 p-3 hover:bg-gray-700 cursor-pointer"
          key={d._id}
          onClick={() => console.log(d._id)}
        >
          <img src={d?.picture} alt="" className="max-w-[30px] rounded-full" />
          <p className="capitalize text-sm">{d?.name}</p>
        </div>
      );
    });
  } else if (isLoading) {
    seachContent = <Loader />;
  } else if (error) {
    seachContent = <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="h-screen w-full bg-[#0000002e] pt-3 pb-4 ">
        <div className="h-[16%]">
          <div className="bg-[#202C33] py-2 px-8 flex justify-around items-center">
            <img
              src={require("../img/avatar.png")}
              alt=""
              className="w-[40px]"
            />
            <button className="text-white text-xl">
              <CiMenuKebab />
            </button>
          </div>

          <div className="my-2">
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-xs font-semibold text-sm bg-[#202C33] text-white px-3 py-2 rounded focus:outline-slate-700 focus:border-0"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="h-[80%] overflow-y-auto mt-4">
          {searchText ? (
            <div className="bg-[#202C33] py-4 h-full mx-4 rounded border border-[#4c4c4c] overflow-y-auto">
              <p className="text-center mb-3">Your search result</p>

              {seachContent}
            </div>
          ) : (
            <div>
              <div className="mt-8">
                <div className="grid grid-cols-12 px-2">
                  <img
                    src={require("../img/avatar.png")}
                    alt=""
                    className="w-[40px] col-span-2"
                  />
                  <div className="col-span-10 flex justify-between items-center gap-2 border-b border-slate-800">
                    <div className="text-start">
                      <h5>Shamim Hossain</h5>
                      <p className="text-sm text-slate-500">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                    <p className="text-sm text-slate-500">3:10 PM</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatLeftBar;
