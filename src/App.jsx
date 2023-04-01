import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserContext from "./utils/UserContext";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState(localStorage.user ||null);
  useEffect(() => {
 
  const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
}, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="colored" position="bottom-center" limit={1} />
    </div>
     </UserContext.Provider>
  );
}

export default App;
