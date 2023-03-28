import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/home";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
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
  );
}

export default App;
