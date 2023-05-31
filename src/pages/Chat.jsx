import React from "react";
import ChatLeftBar from "../components/ChatLeftBar";
import ChatMessages from "../components/ChatMessages.jsx";

const Chat = ({ socket }) => {
  return (
    <div className="h-[100vh] w-full px-3">
      <div className="grid grid-cols-12 gap-4 max-w-[1600px] w-full mx-auto">
        <div className="col-span-3">
          <ChatLeftBar socket={socket} />
        </div>

        <div className="col-span-9">
          <ChatMessages socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
