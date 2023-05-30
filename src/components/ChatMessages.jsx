import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { FaTelegram } from "react-icons/fa";
import { useSendMessageMutation } from "../features/messages/messageApi";
import { addNewMsg } from "../features/messages/messageSlice";

const ChatMessages = () => {
  const { isLoading, error, data, chatId } = useSelector(
    (state) => state.message
  );
  const user = useSelector((state) => state.user?.user);
  const [sendMessage] = useSendMessageMutation();
  const [msgText, setMsgText] = useState("");

  const dispatch = useDispatch();

  const sendMessageHandle = () => {
    // { content, chatId }
    setMsgText("");
    let data = {
      content: msgText,
      chatId,
    };

    sendMessage({ token: user.token, data })
      .unwrap()
      .then((res) => dispatch(addNewMsg(res.data)))
      .catch((err) => console.log(err));
  };

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
    messages = (
      <div>
        {data.map((msg, i) => {
          if (msg?.sender?._id === user?.data?._id) {
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
        <div className="bg-gray-900 overflow-y-auto h-[90vh] px-5">
          {messages}
        </div>

        <div className="w-full bg-gray-800 h-[10vh] flex items-center justify-center gap-5">
          <textarea
            placeholder="Write message here"
            className={`w-full max-w-2xl font-semibold text-sm bg-slate-900 text-white px-3 py-1 h-10 rounded focus:outline-slate-700 focus:border-0 ${
              chatId ? "" : "cursor-not-allowed"
            }`}
            onChange={(e) => setMsgText(e.target.value)}
            value={msgText}
            disabled={!chatId}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                sendMessageHandle();
              }
            }}
          />
          <button
            onClick={sendMessageHandle}
            disabled={!chatId}
            className={chatId ? "" : "cursor-not-allowed"}
          >
            <FaTelegram className="text-xl" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
