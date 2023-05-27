import React from "react";
import { useSelector } from "react-redux";

const Mychat = ({ data }) => {
  const { users } = data;
  const userData = useSelector((state) => state.user.user);

  const userChats = users.filter((user) => user._id !== userData?.data?._id);

  let chats = userChats?.map((user) => {
    const time = new Date(user.updatedAt).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
    if (!user.isGroupChat) {
      return (
        <div className="mt-8" key={user._id}>
          <div className="grid grid-cols-12 px-2">
            <img
              src={user.picture}
              alt=""
              className="w-[35px] col-span-2 rounded-full"
            />
            <div className="col-span-10 flex justify-between items-center gap-2 border-b border-slate-800">
              <div className="text-start">
                <h5>{user.name}</h5>
                {/* <p className="text-sm text-slate-500">
                  Lorem ipsum dolor sit amet.
                </p> */}
              </div>
              <p className="text-sm text-slate-500">{time}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-8" key={user._id}>
          <div className=" flex justify-between items-center gap-2 border-b border-slate-800 px-2">
            <div className="text-start">
              <h5>{user.name}</h5>
              <p className="text-sm text-slate-500">{users.length} members</p>
            </div>
            <p className="text-sm text-slate-500">{time}</p>
          </div>
        </div>
      );
    }
  });
  return <div>{chats}</div>;
};

export default Mychat;
