import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import PrivateRoute from "./utils/PrivateRoute";
import useAuthCheck from "./utils/useAuthCheck";
import Loader from "./components/shared/Loader";
import Settings from "./pages/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuthChecked = useAuthCheck();
  return (
    <div className="App">
      {!isAuthChecked ? (
        <div className="w-screen h-screen">
          <Loader />
        </div>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
