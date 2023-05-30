import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllMessagesMutation } from "../features/messages/messageApi";
import {
  setMsgData,
  setMsgError,
  setMsgLoading,
} from "../features/messages/messageSlice";

const Mychat = ({ data }) => {
  const userData = useSelector((state) => state.user?.user);
  const chatId = useSelector((state) => state.message?.chatId);
  const [getAllMessages] = useGetAllMessagesMutation();
  const dispatch = useDispatch();

  const handleShowMessages = () => {
    let apiCallData = {
      // token, chatId
      token: userData?.token,
      chatId: data._id,
    };

    dispatch(setMsgLoading());
    getAllMessages(apiCallData)
      .unwrap()
      .then((res) =>
        dispatch(setMsgData({ data: res?.data, chatId: data._id }))
      )
      .catch((err) =>
        dispatch(setMsgError({ error: err?.data?.message, chatId: data._id }))
      );
  };

  let chats;
  if (data.isGroupChat) {
    chats = (
      <div
        className={`grid grid-cols-12  items-center py-2 px-2 cursor-pointer hover:bg-[#202C33] rounded-2xl ${
          chatId === data._id && "bg-[#202C33]"
        }`}
        onClick={handleShowMessages}
      >
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
    );
  } else {
    const user = data.users.find((user) => user._id !== userData?.data?._id);
    const time = new Date(user.updatedAt).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    chats = (
      <div
        className={`grid grid-cols-12 py-2 px-2 cursor-pointer hover:bg-[#202C33] items-center rounded-2xl ${
          chatId === data._id && "bg-[#202C33]"
        } `}
        onClick={handleShowMessages}
      >
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
    );
  }

  return <div>{chats}</div>;
};

export default Mychat;
