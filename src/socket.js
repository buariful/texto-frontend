// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addSocket } from "../features/socketSlice";
// import { io } from "socket.io-client";

// const socket = io(process.env.REACT_APP_SERVER_URL);
// const useSetSocket = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(addSocket(socket));
//   });
//   return () => {
//     socket.disconnect();
//   };
// };

// export default useSetSocket;

import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL);

export default socket;
