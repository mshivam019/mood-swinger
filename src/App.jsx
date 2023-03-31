import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
      <ToastContainer theme="colored" position="bottom-center" limit={1} />
    </div>
  );
}

export default App;
