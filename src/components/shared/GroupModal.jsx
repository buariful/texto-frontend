import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGetUsersMutation } from "../../features/auth/userApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../shared/Loader";
import { useCreateGroupMutation } from "../../features/chat/chatApi";
import { addSingleChat } from "../../features/chat/chatSlice";

const GroupModal = () => {
  const [getUsers, { data, isLoading, error }] = useGetUsersMutation();
  const token = useSelector((state) => state.user?.user?.token);
  const [friends, setFriends] = useState([]);
  const [inputText, setInputText] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupError, setGroupError] = useState("");
  const [createGroup] = useCreateGroupMutation();
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const text = e.target.value;
    setInputText(text);
    getUsers({ token: token, search: text });
  };

  const addFriends = (data) => {
    const { id } = data;
    const isAdded = friends.find((fr) => fr.id === id);

    if (!isAdded) {
      setFriends([...friends, data]);
    }
  };

  const handleCreateGroup = () => {
    setGroupError("");
    const users = friends.map((friend) => friend.id);
    const data = {
      users: users,
      name: groupName,
    };

    createGroup({ token, data })
      .unwrap()
      .then((res) => dispatch(addSingleChat(res.data)))
      .catch((err) => setGroupError(err?.data?.message));

    setGroupName("");
    setInputText("");
    setFriends([]);
  };

  const selectedFriends = (
    <div className="flex flex-wrap gap-2 items-center justify-center mb-2">
      {friends.map((friend) => {
        return (
          <button
            key={friend.id}
            className="bg-red-400 text-white text-[10px] flex px-3  rounded items-center gap-1 mt-2"
            onClick={() => {
              const otherFriends = friends.filter((f) => f.id !== friend.id);
              setFriends(otherFriends);
            }}
          >
            {friend.name} <AiOutlineClose />{" "}
          </button>
        );
      })}
    </div>
  );

  let searchResults;
  if (data) {
    searchResults = data?.data?.map((d) => (
      <div
        className="mb-2 flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-700 cursor-pointer"
        key={d._id}
        onClick={() => addFriends({ id: d._id, name: d.name })}
      >
        <img
          src={d.picture}
          alt=""
          className="w-[35px] col-span-2 rounded-full"
        />
        <p>{d.name}</p>
      </div>
    ));
  }
  if (isLoading) {
    searchResults = <Loader />;
  }
  if (error) {
    searchResults = (
      <div className="h-full w-full flex justify-center items-center">
        <p>{error?.data?.message}</p>
      </div>
    );
  }

  return (
    <>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box bg-slate-800 text-sm">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-semibold text-sm mb-3">
            Search and select your friends
          </h3>
          <p className="text-red-500 my-1 text-sm">{groupError}</p>
          {selectedFriends}

          <div className="flex justify-center items-center gap-3 mb-2">
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              className="max-w-xs font-semibold text-sm bg-gray-600 text-white px-3 py-2 rounded focus:outline-slate-700 focus:border-0 mb-1"
              onChange={(e) => setGroupName(e.target.value)}
            />
            <button
              className="bg-gray-700 px-4 py-2 rounded"
              onClick={handleCreateGroup}
            >
              Create Group
            </button>
          </div>

          <input
            type="text"
            placeholder="Search here"
            value={inputText}
            className="w-full max-w-xs font-semibold text-sm bg-gray-600 text-white px-3 py-2 rounded focus:outline-slate-700 focus:border-0 mb-1"
            onChange={handleSearch}
          />

          <div className="bg-[#1118274d] py-4 mt-1 rounded-lg">
            <div className="w-52 h-56 mx-auto overflow-auto">
              {inputText && searchResults}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupModal;
