import { io } from "socket.io-client";

// const socket = io(process.env.REACT_APP_SERVER_URL);

const socket = io("https://texto-backend.onrender.com");

export default socket;
