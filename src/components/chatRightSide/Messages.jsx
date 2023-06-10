import React from "react";
import { useSelector } from "react-redux";
import Loader from "../shared/Loader";

const Messages = () => {
  const { isLoading, error, data, chatId } = useSelector(
    (state) => state.message
  );
  const user = useSelector((state) => state.user?.user);

  let messages;
  if (isLoading) {
    messages = <Loader />;
  }
  if (error) {
    messages = (
      <div className="flex w-full h-full justify-center items-center">
        <p className="text-gray-500 text-sm">{error}</p>
      </div>
    );
  }
  if (data?.length > 0 && chatId) {
    messages = (
      <div>
        {data?.map((msg) => {
          if (msg?.chat?._id === chatId || msg?.chat === chatId) {
            if (msg?.sender?._id === user?.data?._id) {
              return (
                <div className="chat chat-end" key={msg._id}>
                  <div className="chat-bubble text-[13px] text-start break-all">
                    {msg.content}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="chat chat-start" key={msg._id}>
                  <div className="chat-image avatar">
                    <div className="w-6 rounded-full">
                      <img src={msg?.sender?.picture?.url} alt="" />
                    </div>
                  </div>
                  <div className="chat-bubble text-[13px] text-start break-all">
                    {msg?.content}
                  </div>
                </div>
              );
            }
          }
          return "";
        })}
      </div>
    );
  }
  return messages;
};

export default Messages;
