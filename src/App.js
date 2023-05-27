import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
// import PrivateRoute from "./utils/PrivateRoute";
import useAuthCheck from "./utils/useAuthCheck";

function App() {
  useAuthCheck();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
