import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import useAuthCheck from "./utils/useAuthCheck";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");
function App() {
  useAuthCheck();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat socket={socket} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
