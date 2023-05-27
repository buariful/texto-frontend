import React from "react";
import { useAccesOneChatMutation } from "../features/chat/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { addSingleChat } from "../features/chat/chatSlice";

const SearchFriend = ({ data, setState }) => {
  const { _id, picture, name } = data;
  const [accesOneChat] = useAccesOneChatMutation();
  const user = useSelector((state) => state.user?.user);
  const token = user.token;
  const dispatch = useDispatch();

  const handleAddFriend = async (id) => {
    const response = await accesOneChat({ token: token, id: { userId: _id } });
    dispatch(addSingleChat(response?.data));
    setState("");
  };

  return (
    <div
      className="flex items-center gap-2 p-3 hover:bg-gray-700 cursor-pointer"
      key={_id}
      onClick={handleAddFriend}
    >
      <img src={picture} alt="" className="max-w-[30px] rounded-full" />
      <p className="capitalize text-sm">{name}</p>
    </div>
  );
};

export default SearchFriend;