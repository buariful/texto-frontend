import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { FaTelegram } from "react-icons/fa";
import { useSendMessageMutation } from "../features/messages/messageApi";
import { addNewMsg } from "../features/messages/messageSlice";
import socket from "../socket";

const ChatMessages = () => {
  const { isLoading, error, data, chatId } = useSelector(
    (state) => state.message
  );
  const user = useSelector((state) => state.user?.user);
  const [sendMessage] = useSendMessageMutation();
  const [msgText, setMsgText] = useState("");
  const dispatch = useDispatch();
  const [isSocketConnected, setisSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const msgIdRef = useRef();

  const sendMessageHandle = () => {
    socket.emit("stop typing", chatId);
    setMsgText("");
    let data = {
      content: msgText,
      chatId,
    };
    sendMessage({ token: user.token, data })
      .unwrap()
      .then((res) => {
        dispatch(addNewMsg(res.data));
        socket.emit("new message", res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleWriting = (e) => {
    setMsgText(e.target.value);

    if (!isSocketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }

    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
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

  useEffect(() => {
    socket.emit("setup", user.data);
    socket.on("connected", () => setisSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user.data]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      // msgIdRef.current = msgId;
      if (newMessageRecieved._id !== msgIdRef.current) {
        dispatch(addNewMsg(newMessageRecieved));
        msgIdRef.current = newMessageRecieved._id;
      }
    });
    return () => {
      socket.off("message received");
    };
  });
  return (
    <>
      <div className="bg-green-200 relative w-full h-screen overflow-x-hidden">
        <div className="bg-gray-900 overflow-y-auto h-[90vh] px-5">
          {istyping && <button className="btn loading">sss</button>}
          {messages}
        </div>

        <div className="w-full bg-gray-800 h-[10vh] flex items-center justify-center gap-5">
          <textarea
            placeholder="Write message here"
            className={`w-full max-w-2xl font-semibold text-sm bg-slate-900 text-white px-3 py-1 h-10 rounded focus:outline-slate-700 focus:border-0 ${
              chatId ? "" : "cursor-not-allowed"
            }`}
            onChange={handleWriting}
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
