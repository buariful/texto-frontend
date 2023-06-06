import React from "react";
import { FaWindowClose } from "react-icons/fa";

const ChatInfoModal = () => {
  return (
    <div>
      {" "}
      <input type="checkbox" id="ChatInfoModal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-slate-800 text-sm">
          <label
            htmlFor="ChatInfoModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-semibold text-sm mb-3">Frnd or group name</h3>

          <div className="flex gap-2 items-center justify-between flex-wrap border-b border-slate-600 pb-1">
            <img
              src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="w-[25px] h-[25px] rounded-full"
            />
            <p>Name</p>
            <button className="text-red-500">
              <FaWindowClose />{" "}
            </button>
          </div>

          <div className="mt-2">
            <img
              src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
              className="max-h-28 mb-2 mx-auto rounded"
            />

            <p className="text-sm">
              <span className="text-gray-500">Name:</span> Hudai
            </p>
            <p className="text-sm">
              <span className="text-gray-500">Email:</span> email@example.com
            </p>
          </div>

          <button className="text-sm bg-red-700 rounded px-2 py-1 mt-6">
            Leave group
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInfoModal;
