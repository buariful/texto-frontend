import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowCircleLeft, FaTelegram } from "react-icons/fa";
import { useSendMessageMutation } from "../features/messages/messageApi";
import { addNewMsg } from "../features/messages/messageSlice";
import socket from "../socket";
import {
  addSingleNotification,
  updateLatestMsg,
} from "../features/chat/chatSlice";
import ChatInfoModal from "./shared/ChatInfoModal";
import Messages from "./chatRightSide/Messages";

const ChatRight = ({ setDrawerOpen, isDrawerOpen }) => {
  const { chatId } = useSelector((state) => state.message);
  const user = useSelector((state) => state.user?.user);
  const allChats = useSelector((state) => state.chat?.data);
  const [sendMessage] = useSendMessageMutation();
  const [msgText, setMsgText] = useState("");
  const [roomId, setRoomId] = useState("");
  const dispatch = useDispatch();
  const [isSocketConnected, setisSocketConnected] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const msgIdRef = useRef();
  const selectedChatID = useRef();
  const selectedChatName = useRef();

  const sendMessageHandle = () => {
    setMsgText("");
    let data = {
      content: msgText,
      chatId,
    };
    sendMessage({ token: user.token, data })
      .unwrap()
      .then(async (res) => {
        await dispatch(addNewMsg(res.data));
        await dispatch(updateLatestMsg(res.data));
        socket.emit("new message", res.data);
      })
      .catch((err) => console.log(err));
  };

  let typingTimeout = null;
  const handleWriting = (e) => {
    setMsgText(e.target.value);

    if (isSocketConnected) {
      socket.emit("typing", chatId);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        socket.emit("stop typing", chatId);
      }, 3000);
    }
  };

  useEffect(() => {
    socket.emit("setup", user.data);
    socket.on("connected", () => setisSocketConnected(true));
    socket.on("typing", (room) => {
      setIsTyping(true);
      setRoomId(room);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, [user.data, chatId]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      let notificationData;
      let msgData = {};
      for (const key in newMessageRecieved) {
        if (key === "notifications") {
          notificationData = newMessageRecieved[key];
        } else {
          msgData[key] = newMessageRecieved[key];
        }
      }

      if (msgData._id !== msgIdRef.current) {
        dispatch(addNewMsg(msgData));
        msgIdRef.current = msgData._id;
        dispatch(addSingleNotification(notificationData));
      }
      dispatch(updateLatestMsg(msgData));
      msgIdRef.current = msgData._id;
    });
    return () => {
      socket.off("message received");
    };
  });

  useEffect(() => {
    if (chatId) {
      selectedChatID.current = chatId;

      const selectedChat = allChats.find((chat) => chat._id === chatId);
      if (selectedChat.isGroupChat) {
        selectedChatName.current = selectedChat.chatName;
      } else {
        const friend = selectedChat.users.find(
          (frnd) => frnd._id !== user?.data?._id
        );
        selectedChatName.current = friend.name;
      }
    }
  }, [chatId, allChats, user?.data?._id]);
  // }, [chatId, allChats, user?.data]);

  return (
    <>
      {/* --------------- large screen ------------- */}
      <div className="hidden sm:block w-full h-screen overflow-x-hidden relative">
        <div className="bg-gray-900 overflow-y-auto h-[90vh] xl:h-[93vh]">
          <div className="bg-gray-800 text-sm min-h-[60px] flex items-center justify-center sticky top-0 left-0 z-50">
            {chatId && (
              <label
                className="capitalize text-center cursor-pointer bg-slate-700 p-2 px-4 rounded"
                htmlFor="ChatInfoModal"
              >
                {selectedChatName.current}
              </label>
            )}
          </div>

          <div className="px-5">
            <Messages />
            {istyping && roomId === chatId && (
              <div className="chat chat-start">
                <div className="chat-bubble text-sm text-gray-500">
                  typing...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full bg-gray-800 h-[10vh] xl:h-[7vh] flex items-center justify-center gap-5">
          <textarea
            placeholder="Write message here"
            className={`w-full max-w-2xl font-semibold text-sm bg-slate-900 text-white px-3 py-1 h-10 rounded focus:outline-slate-700 focus:border-0 ${
              chatId ? "" : "cursor-not-allowed"
            }`}
            onChange={handleWriting}
            onBlur={() => {
              clearTimeout(typingTimeout);
              socket.emit("stop typing", chatId);
            }}
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

      {/* ----------- mobile screen ----------- */}

      <div
        className={`block sm:hidden max-w-full w-full min-h-screen h-screen fixed left-0 top-0 inset-0 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-gray-900 overflow-y-auto h-[90vh]">
          <div className="bg-gray-800 text-sm min-h-[50px] flex items-center justify-around sticky top-0 left-0 z-50">
            {chatId && (
              <>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="text-xl"
                >
                  <FaArrowCircleLeft />
                </button>

                <label
                  className="text-center cursor-pointer bg-slate-700 p-2 px-4 rounded capitalize"
                  htmlFor="ChatInfoModal"
                >
                  {selectedChatName.current}
                </label>
              </>
            )}
          </div>
          <div className=" px-5">
            <Messages />
            {istyping && roomId === chatId && (
              <div className="chat chat-start">
                <div className="chat-bubble text-sm text-gray-500">
                  typing...
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full bg-gray-800 h-[10vh] flex items-center justify-center gap-3 sticky bottom-0">
          <textarea
            placeholder="Write message here"
            className={`font-semibold text-sm bg-slate-900 text-white px-3 py-1 h-10 rounded focus:outline-slate-700 focus:border-0 w-full max-w-[300px] ${
              chatId ? "" : "cursor-not-allowed"
            }`}
            onChange={handleWriting}
            onBlur={() => {
              clearTimeout(typingTimeout);
              socket.emit("stop typing", chatId);
            }}
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
      <ChatInfoModal />
    </>
  );
};

export default ChatRight;
