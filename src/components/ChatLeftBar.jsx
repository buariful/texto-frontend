import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersMutation } from "../features/auth/userApi";
import Loader from "./shared/Loader";
import { useGetAllChatsMutation } from "../features/chat/chatApi";
import Mychat from "./chatLftBar/Mychat";
import SearchFriend from "./chatLftBar/SearchFriend";
import { setChats, setNotification } from "../features/chat/chatSlice";
import GroupModal from "./shared/GroupModal";
import { useGetAllNotificationMutation } from "../features/notification/notificationApi";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../features/auth/userSlice";

const ChatLeftBar = ({ setDrawerOpen }) => {
  const [getUsers, { data, isLoading }] = useGetUsersMutation();
  const [getAllChats, { isLoading: chatLoading }] = useGetAllChatsMutation();
  const [getAllNotification] = useGetAllNotificationMutation();
  const [searchText, setSearchText] = useState(false);
  const [error, setError] = useState("");
  const userChats = useSelector((state) => state.chat);
  const userData = useSelector((state) => state.user);
  const token = userData?.user?.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    getUsers({ token: token, search: text })
      .unwrap()
      .then((res) => {
        setError("");
      })
      .catch((err) => {
        setError(err.data.message);
      });
  };

  const handleLogOut = () => {
    dispatch(clearUser());

    navigate("/");
  };

  useEffect(() => {
    getAllChats(token)
      .then((res) => {
        dispatch(setChats(res.data?.data));
      })
      .catch((err) => {});
    getAllNotification(token)
      .then((res) => {
        dispatch(setNotification(res.data?.data));
      })
      .catch((err) => {});
  }, [getAllChats, getAllNotification, token, dispatch]);

  let seachContent;
  if (data) {
    seachContent = data.data?.map((d) => (
      <SearchFriend key={d._id} data={d} setState={setSearchText} />
    ));
  } else if (isLoading) {
    seachContent = <Loader />;
  } else if (error) {
    seachContent = <p className="text-red-500">{error}</p>;
  }

  let chatContent;
  if (chatLoading) {
    chatContent = <Loader />;
  }
  if (userChats?.data?.length > 0) {
    chatContent = userChats.data?.map((chat) => (
      <Mychat key={chat._id} data={chat} setDrawerOpen={setDrawerOpen} />
    ));
  }
  if (userChats?.data?.length === 0) {
    chatContent = (
      <p className="text-sm px-2 text-gray-500">
        No chats available. Search and add friends
      </p>
    );
  }
  return (
    <>
      <div className="h-screen w-full bg-[#0000002e] ">
        <div className="h-[16%] pt-3">
          <div className="bg-[#202C33] py-2 px-8 flex justify-around items-center">
            <img
              src={userData?.user?.data?.picture?.url}
              alt=""
              className="max-w-[40px] max-h-[40px] rounded-full"
            />

            <div className="dropdown">
              <button className="text-white text-xl" tabIndex={0}>
                <CiMenuKebab />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content w-52 bg-gray-700 shadow shadow-gray-600 rounded p-3 text-sm "
              >
                <li>
                  <label
                    htmlFor="my-modal"
                    className="block hover:bg-slate-800 py-2 cursor-pointer"
                  >
                    Create group
                  </label>
                </li>
                <li>
                  <button
                    className="block w-full text-center hover:bg-slate-800 py-2 cursor-pointer"
                    onClick={handleLogOut}
                  >
                    Log out
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-center hover:bg-slate-800 py-2 cursor-pointer"
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </button>
                </li>
              </ul>
            </div>
            <GroupModal />
          </div>

          <div className="my-2">
            <input
              type="text"
              placeholder="Type here"
              className="w-full max-w-xs font-semibold text-sm bg-[#202C33] text-white px-3 py-2 rounded focus:outline-slate-700 focus:border-0"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="h-[80%] overflow-y-auto mt-4 pb-4">
          {searchText ? (
            <div className="bg-[#202C33] py-4 h-full mx-4 rounded border border-[#4c4c4c] overflow-y-auto">
              <p className="text-center mb-3">Your search result</p>

              {seachContent}
            </div>
          ) : (
            <div>{chatContent}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatLeftBar;
