import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import useSearchUser from "../utils/useSearchUser";

const GroupModal = () => {
  const { data, isLoading, error } = useSelector((state) => state.searchUser);
  const [inputText, setInputText] = useState("");
  const [friends, setFriends] = useState([
    { id: 1, name: "a" },
    { id: 2, name: "b" },
    { id: 3, name: "c" },
  ]);

  const selectedFriends = (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {friends.map((friend) => {
        return (
          <button
            className="bg-red-400 text-white text-[10px] flex px-3  rounded items-center gap-1 mt-2"
            onClick={() => {
              const otherFriends = friends.filter((f) => f.id !== friend.id);
              setFriends(otherFriends);
            }}
          >
            {friend.name} <AiOutlineClose />{" "}
          </button>
        );
      })}
    </div>
  );

  const handleSearch = (e) => {
    setInputText(e.target.value);
  };

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal ">
        <div className="modal-box bg-slate-800 text-sm">
          <h3 className="font-semibold text-sm mb-3">
            Search and select your friends
          </h3>
          {selectedFriends}
          <input
            type="text"
            placeholder="Type here"
            className="w-full max-w-xs font-semibold text-sm bg-gray-600 text-white px-3 py-2 rounded focus:outline-slate-700 focus:border-0 mb-1"
            value={inputText}
            onChange={handleSearch}
          />

          <div className="bg-slate-700 p-2 mt-2">
            <div className="w-52 max-h-52 mx-auto overflow-auto">
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
              <div className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-900 cursor-pointer">
                <img
                  src="https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&h=204&fit=crop&w=228&dpr=1"
                  alt=""
                  className="w-[35px] col-span-2 rounded-full"
                />
                <p>name</p>
              </div>
            </div>
          </div>
        </div>
      </label>
    </>
  );
};

export default GroupModal;
