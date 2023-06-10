import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteGroupMutation,
  useRemoveFromGroupMutation,
} from "../../features/chat/chatApi";
import { removeUser, updateChats } from "../../features/chat/chatSlice";
import { setChatId } from "../../features/messages/messageSlice";
import Toast from "../../utils/Toast";

const ChatInfoModal = () => {
  const chatId = useSelector((state) => state.message.chatId);
  const allChats = useSelector((state) => state.chat.data);
  const userId = useSelector((state) => state.user?.user?.data?._id);
  const token = useSelector((state) => state.user?.user?.token);
  const [removeFromGroup] = useRemoveFromGroupMutation();
  const [deleteGroup] = useDeleteGroupMutation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    leaveLoading: false,
    deleteLoading: false,
  });
  const dispatch = useDispatch();
  const selectedChat = allChats.find((chat) => chat._id === chatId);
  const userFriend = selectedChat?.users?.find((user) => user._id !== userId);

  function handleLeaveGroup(id) {
    setLoading({ ...loading, leaveLoading: true });
    removeFromGroup({ token, data: { chatId, userId: id } })
      .unwrap()
      .then((res) => {
        setError("");
        dispatch(updateChats(chatId));
        dispatch(setChatId(null));
        Toast(res.message);
        setLoading({ ...loading, leaveLoading: false });
      })
      .catch((err) => {
        setError(err.message);
        Toast(err?.data?.message);
        setLoading({ ...loading, leaveLoading: false });
      });
  }

  function handleRemoveUser(id) {
    setLoading({ deleteLoading: true, leaveLoading: true });
    removeFromGroup({ token, data: { chatId, userId: id } })
      .unwrap()
      .then((res) => {
        setError("");
        dispatch(removeUser({ userId: id, chatId }));
        Toast(res.message);
        setLoading({ deleteLoading: false, leaveLoading: false });
      })
      .catch((err) => {
        setError(err.message);
        Toast(err?.data?.message);
        setLoading({ deleteLoading: false, leaveLoading: false });
      });
  }

  function handledeleteGroup() {
    setLoading({ ...loading, deleteLoading: true });
    deleteGroup({ token, chatId })
      .unwrap()
      .then((res) => {
        setError("");
        dispatch(updateChats(chatId));
        dispatch(setChatId(null));
        Toast(res.message);
        setLoading({ ...loading, deleteLoading: false });
      })
      .catch((err) => {
        setError(err.message);
        Toast(err?.data?.message);
        setLoading({ ...loading, deleteLoading: false });
      });
  }
  let chatInfo;
  if (selectedChat?.isGroupChat) {
    const groupMembers = selectedChat?.users?.map((user) => {
      return (
        <div
          className={`flex gap-2 items-center justify-between flex-wrap border-b border-slate-600 py-2 ${
            selectedChat?.groupAdmin?._id === user._id && "hidden"
          }`}
          key={user._id}
        >
          <div
            className={`bg-cover bg-no-repeat bg-center col-span-2 rounded-full w-[32px] h-[32px]`}
            style={{ backgroundImage: `url(${user?.picture?.url})` }}
          ></div>

          <p className="capitalize">{user?.name}</p>
          <button
            className={`text-red-500  ${
              selectedChat?.groupAdmin?._id !== userId
                ? "hidden"
                : "inline-block"
            }`}
            onClick={() => handleRemoveUser(user._id)}
          >
            <FaWindowClose />{" "}
          </button>
        </div>
      );
    });
    const admin = (
      <div className="flex justify-center items-center gap-2">
        <img
          src={selectedChat?.groupAdmin?.picture?.url}
          alt=""
          className="max-h-10 mb-2 rounded"
        />

        <div>
          <p>Group Admin</p>
          <p className="text-sm capitalize">
            <span className="text-gray-500">Name:</span>{" "}
            {selectedChat?.groupAdmin?.name}
          </p>
        </div>
      </div>
    );

    chatInfo = (
      <div>
        {admin}
        {groupMembers}
      </div>
    );
  } else {
    chatInfo = (
      <>
        {" "}
        <div className="mt-2">
          <img
            src={userFriend?.picture?.url}
            alt=""
            className="max-h-28 mb-2 mx-auto rounded"
          />

          <p className="text-sm capitalize">
            <span className="text-gray-500">Name:</span> {userFriend?.name}
          </p>
          <p className="text-sm capitalize">
            <span className="text-gray-500">Email:</span> {userFriend?.email}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      {chatId && (
        <div>
          <input type="checkbox" id="ChatInfoModal" className="modal-toggle" />
          <div className="modal ">
            <div className="modal-box bg-slate-800 text-sm">
              <label
                htmlFor="ChatInfoModal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="font-semibold text-sm mb-3 capitalize">
                {selectedChat.isGroupChat
                  ? selectedChat.chatName
                  : userFriend.name}
              </h3>
              {chatInfo}

              {error && <p className="text-red-500 text-sm my-1">{error}</p>}
              {selectedChat?.isGroupChat &&
                selectedChat?.groupAdmin?._id !== userId && (
                  <button
                    className={`btn  px-[15px] rounded text-[12px] bg-red-600  hover:bg-red-700 mt-2  ${
                      loading.leaveLoading &&
                      "loading disabled cursor-not-allowed bg-red-800"
                    }`}
                    onClick={() => handleLeaveGroup(userId)}
                  >
                    Leave group
                  </button>
                )}

              {selectedChat?.isGroupChat &&
                selectedChat?.groupAdmin?._id === userId && (
                  <button
                    className={` px-3 py-2 rounded text-sm bg-red-600  hover:bg-red-700 mt-2 btn ${
                      loading.deleteLoading &&
                      "loading disabled cursor-not-allowed bg-red-800"
                    }`}
                    onClick={handledeleteGroup}
                  >
                    Delete group
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatInfoModal;
