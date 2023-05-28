import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const GroupModal = () => {
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
  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal ">
        <div className="modal-box bg-slate-800 text-sm">
          <h3 className="font-semibold text-sm mb-3">
            Search and select your friends
          </h3>
          <input
            type="text"
            placeholder="Type here"
            className="w-full max-w-xs font-semibold text-sm bg-gray-600 text-white px-3 py-2 rounded focus:outline-slate-700 focus:border-0 mb-1"
            // onChange={handleSearch}
          />
          {selectedFriends}
        </div>
      </label>
    </>
  );
};

export default GroupModal;
