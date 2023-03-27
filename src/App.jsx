import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/home";

function App() {
  
  return (
    <div>
       <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored" position="bottom-center" limit={1} />
    </div>
  );
}

export default App;
