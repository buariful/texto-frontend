import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
// import { useEffect } from "react";
// import { setUser } from "./features/auth/userSlice";
// import { useDispatch } from "react-redux";
// import { useGetUserByTokenMutation } from "./features/auth/userApi";

function App() {
  // const dispatch = useDispatch();
  // const [getUserByToken] = useGetUserByTokenMutation();

  // useEffect(() => {
  //   const token = JSON.parse(localStorage.getItem("auth"));
  //   if (token) {
  //     getUserByToken(token)
  //       .unwrap()
  //       .then((res) => dispatch(setUser(res)))
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [dispatch, getUserByToken]);

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
