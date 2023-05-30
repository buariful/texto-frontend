import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const ChatMessages = () => {
  const { isLoading, error, data } = useSelector((state) => state.message);
  const user = useSelector((state) => state.user?.user?.data?._id);

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
  if (data) {
    console.log(data);
    messages = (
      <div>
        {data.map((msg) => {
          if (msg?.sender?._id === user) {
            return (
              <div className="chat chat-end" key={msg._id}>
                {/* <div className="chat-image avatar">
                  <div className="w-6 rounded-full">
                    <img src={require("../img/avatar.png")} alt="" />
                  </div>
                </div> */}

                <div className="chat-bubble text-[13px]">{msg.content}</div>
                {/* <div className="chat-footer opacity-50 text-[11px]">
                  Seen at 12:46
                </div> */}
              </div>
            );
          } else {
            return (
              <div className="chat chat-start" key={msg._id}>
                <div className="chat-image avatar">
                  <div className="w-6 rounded-full">
                    <img src={msg?.sender?.picture} alt="" />
                  </div>
                </div>
                <div className="chat-bubble text-[13px]">{msg?.content}</div>
                {/* <div className="chat-footer opacity-50 text-[11px]">
                  Delivered
                </div> */}
              </div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <>
      <div className="bg-green-200 relative w-full h-screen overflow-x-hidden">
        <div className="bg-gray-900 overflow-y-auto h-[92vh] px-5">
          {/* ------- chat start --------- */}
          {/* <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-6 rounded-full">
                <img src={require("../img/avatar.png")} alt="" />
              </div>
            </div>
            <div className="chat-bubble text-[13px]">
              You were the Chosen One!
            </div>
            <div className="chat-footer opacity-50 text-[11px]">Delivered</div>
          </div> */}

          {/* ------- chat end --------- */}
          {/* <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-6 rounded-full">
                <img src={require("../img/avatar.png")} alt="" />
              </div>
            </div>

            <div className="chat-bubble text-[13px]">I hate you!</div>
            <div className="chat-footer opacity-50 text-[11px]">
              Seen at 12:46
            </div>
          </div> */}

          {messages}
        </div>

        <div className="w-full bg-gray-800 h-[8vh] flex items-center justify-center">
          ddsf
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
