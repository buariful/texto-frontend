import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useGetUsersMutation } from "../features/auth/userApi";
import Loader from "./Loader";
import { useGetAllChatsMutation } from "../features/chat/chatApi";
import Mychat from "./Mychat";
import SearchFriend from "./SearchFriend";
import { setChats } from "../features/chat/chatSlice";
import GroupModal from "./GroupModal";

const ChatLeftBar = () => {
  const [getUsers, { data, isLoading }] = useGetUsersMutation();
  const [getAllChats, { isLoading: chatLoading }] = useGetAllChatsMutation();
  const [searchText, setSearchText] = useState(false);
  const [error, setError] = useState("");
  const [activeChat, setActiveChat] = useState("");
  const userChats = useSelector((state) => state.chat);
  const userData = useSelector((state) => state.user);
  const token = userData?.user?.token;

  const dispatch = useDispatch();

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
  if (userChats) {
    chatContent = userChats.data?.map((chat) => (
      <Mychat
        key={chat._id}
        data={chat}
        state={activeChat}
        setState={setActiveChat}
      />
    ));
  }
  if (userChats?.data?.length === 0) {
    chatContent = (
      <p className="text-sm px-2 text-gray-500">
        No chats available. Search and add friends
      </p>
    );
  }

  useEffect(() => {
    getAllChats(token).then((res) => {
      dispatch(setChats(res.data.data));
    });
  }, [getAllChats, token, dispatch]);

  return (
    <>
      <div className="h-screen w-full bg-[#0000002e] pt-3 pb-4 ">
        <div className="h-[16%]">
          <div className="bg-[#202C33] py-2 px-8 flex justify-around items-center">
            <img
              src={require("../img/avatar.png")}
              alt=""
              className="w-[40px]"
            />
            {/* <div className="dropdown">
              <label tabIndex={0} className="btn m-1">
                Click
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div> */}
            <div className="dropdown">
              <button className="text-white text-xl" tabIndex={0}>
                <CiMenuKebab />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content w-52 bg-gray-700 shadow shadow-gray-600 rounded p-3 text-sm "
              >
                {/* <li htmlFor="my-modal">Item 1</li> */}
                <li>
                  <label
                    htmlFor="my-modal"
                    className="block hover:bg-slate-800 py-2 cursor-pointer"
                  >
                    Create group
                  </label>
                </li>
                <li>Item 2</li>
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

        <div className="h-[80%] overflow-y-auto mt-4">
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

      {/* <label htmlFor="my-modal" className="btn">
        open modal
      </label> */}

      {/* Put this part before </body> tag */}
    </>
  );
};

export default ChatLeftBar;
