import React from "react";
import { useSelector } from "react-redux";

const Mychat = ({ data }) => {
  const userData = useSelector((state) => state.user.user);

  let chats;
  if (data.isGroupChat) {
    chats = (
      <div className="mt-8">
        <div className="grid grid-cols-12 px-2">
          <div
            className="w-[35px] h-[35px] rounded-full bg-white text-black text-sm
          flex justify-center items-center col-span-2 uppercase font-semibold"
          >
            {data.chatName.substring(0, 2)}
          </div>
          <div className="col-span-10 flex justify-between items-center gap-2 border-b border-slate-800">
            <div className="text-start">
              <h5>{data.chatName}</h5>
              <p className="text-sm text-slate-500">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            {/* <p className="text-sm text-slate-500">{time}</p> */}
          </div>
        </div>
      </div>
    );
  } else {
    const user = data.users.find((user) => user._id !== userData?.data?._id);
    const time = new Date(user.updatedAt).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    chats = (
      <div className="mt-8">
        <div className="grid grid-cols-12 px-2">
          <img
            src={user.picture}
            alt=""
            className="w-[35px] col-span-2 rounded-full"
          />
          <div className="col-span-10 flex justify-between items-center gap-2 border-b border-slate-800">
            <div className="text-start">
              <h5>{user.name}</h5>
              <p className="text-sm text-slate-500">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <p className="text-sm text-slate-500">{time}</p>
          </div>
        </div>
      </div>
    );
  }

  return <div>{chats}</div>;
};

export default Mychat;
