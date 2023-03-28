import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Dashboard() {
  let props = {
    navigation: [{}],
    btn: "Sign out",
    btnurl: "/",
  };
  return (
    <div>
      <Navbar {...props} />
      <div className="min-h-screen"></div>
      <Footer />
    </div>
  );
}

export default Dashboard;
