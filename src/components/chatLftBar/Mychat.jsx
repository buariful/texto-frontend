import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllMessagesMutation } from "../../features/messages/messageApi";
import {
  setChatId,
  setMsgData,
  setMsgError,
  setMsgLoading,
} from "../../features/messages/messageSlice";
import socket from "../../socket";
import { useDeleteNotificationMutation } from "../../features/notification/notificationApi";
import { updateNotifications } from "../../features/chat/chatSlice";

const Mychat = ({ data, setDrawerOpen }) => {
  const userData = useSelector((state) => state.user?.user);

  const chatId = useSelector((state) => state.message?.chatId);
  const notification = useSelector((state) => state.chat.notification);
  const [msgNotification, setMsgNotification] = useState([]);
  const [getAllMessages] = useGetAllMessagesMutation();
  const [deleteNotification] = useDeleteNotificationMutation();
  const dispatch = useDispatch();

  const handleShowMessages = async () => {
    setDrawerOpen(true);
    await deleteNotification({ token: userData?.token, chatId: data._id });
    if (notification && notification.length > 0) {
      await dispatch(
        updateNotifications({ chatId: data._id, userId: userData?.data?._id })
      );
    }
    let apiCallData = {
      token: userData?.token,
      chatId: data._id,
    };
    dispatch(setMsgLoading(true));
    dispatch(setChatId(data._id));
    getAllMessages(apiCallData)
      .unwrap()
      // .then(() => {
      //   dispatch(setMsgLoading(false));
      //   dispatch(setChatId(data._id));
      // })
      .then((res) => {
        dispatch(setMsgLoading(false));
        dispatch(setMsgError(null));
        dispatch(setChatId(data._id));
        dispatch(setMsgData(res.data));
        //  dispatch(setMsgData({ data: res?.data, chatId: data._id }))
      })
      .catch((err) => {
        dispatch(setMsgLoading(false));
        dispatch(setChatId(data._id));
        dispatch(setMsgData([]));
        dispatch(setMsgError(err?.data?.message));
        // setMsgError({ error: err?.data?.message, chatId: data._id })
      });

    socket.emit("join chat", data._id);
  };

  useEffect(() => {
    if (notification) {
      const userNotifications = notification.filter(
        (x) => x.chatId === data._id && x.userId === userData.data._id
      );
      // if (userNotifications && userNotifications.length > 0) {
      //   setMsgNotification(userNotifications);
      // }
      setMsgNotification(userNotifications);
    }
  }, [notification, data._id, userData.data._id]);

  let chats;
  let recentMsg = data?.latestMessage?.content;
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
            {data?.latestMessage?.sender?.name && (
              <p className="text-sm text-slate-500">
                <span className="text-white text-[10px] capitalize">
                  {userData?.data?._id === data?.latestMessage?.sender._id
                    ? "You : "
                    : data?.latestMessage?.sender?.name?.slice(0, 3) + " : "}
                </span>
                {recentMsg &&
                  (recentMsg.length > 22
                    ? recentMsg.slice(0, 22) + "..."
                    : recentMsg)}
              </p>
            )}
          </div>
          {msgNotification && msgNotification.length > 0 && (
            <p className="text-[9px] text-whie bg-red-700 px-2 py-1  rounded-full">
              {msgNotification.length}
            </p>
          )}
        </div>
      </div>
    );
  } else {
    const user = data.users.find((user) => user._id !== userData?.data?._id);
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
            {data?.latestMessage?.sender?.name && (
              <p className="text-sm text-slate-500">
                <span className="text-white text-[10px] capitalize">
                  {userData?.data?._id === data?.latestMessage?.sender._id
                    ? "You : "
                    : data?.latestMessage?.sender?.name?.slice(0, 3) + " : "}
                </span>
                {recentMsg &&
                  (recentMsg.length > 22
                    ? recentMsg.slice(0, 22) + "..."
                    : recentMsg)}
              </p>
            )}
          </div>

          {msgNotification && msgNotification.length > 0 && (
            <p className="text-[9px] text-whie bg-red-700 px-2 py-1  rounded-full">
              {msgNotification.length}
            </p>
          )}
        </div>
      </div>
    );
  }

  return <div>{chats}</div>;
};

export default Mychat;
