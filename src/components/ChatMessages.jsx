import React from "react";

const ChatMessages = () => {
  return (
    <>
      <div className="bg-green-200 relative w-full h-screen overflow-x-hidden">
        <div className="bg-gray-900 overflow-y-auto h-[92vh] px-5">
          {/* ------- chat start --------- */}
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-6 rounded-full">
                <img src={require("../img/avatar.png")} alt="" />
              </div>
            </div>
            <div className="chat-bubble text-[13px]">
              You were the Chosen One!
            </div>
            <div className="chat-footer opacity-50 text-[11px]">Delivered</div>
          </div>

          {/* ------- chat end --------- */}
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-6 rounded-full">
                <img src={require("../img/avatar.png")} alt="" />
              </div>
            </div>

            <div className="chat-bubble text-[13px]">I hate you!</div>
            <div className="chat-footer opacity-50 text-[11px]">
              Seen at 12:46
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-800 h-[8vh] flex items-center justify-center">
          ddsf
        </div>
      </div>
    </>
  );
};

export default ChatMessages;
