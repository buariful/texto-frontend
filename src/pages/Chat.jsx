import React, { useState } from "react";
import ChatLeftBar from "../components/ChatLeftBar";
import ChatRight from "../components/ChatRight";

const Chat = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="h-[100vh] w-full px-3 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 max-w-[1600px] w-full mx-auto">
          <div className="col-span-12 sm:col-span-5 lg:col-span-4 xl:col-span-3">
            <ChatLeftBar setDrawerOpen={setDrawerOpen} />
          </div>

          <div className=" col-span-7 lg:col-span-8 xl:col-span-9">
            <ChatRight
              setDrawerOpen={setDrawerOpen}
              isDrawerOpen={isDrawerOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
