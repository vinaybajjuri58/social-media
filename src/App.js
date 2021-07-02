import React, { useState } from "react";
import { RoutesComponent } from "./Routes";
import { Navbar, TopNavBar } from "./Components";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const authData = useSelector((store) => store.authData);
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const sidebarToggler = () => {
    setDisplaySidebar((state) => !state);
  };
  return (
    <div>
      <ToastContainer />
      <TopNavBar toggleDisplay={sidebarToggler} />
      <div className="flex relative top-16">
        <div
          className="fixed"
          style={{ display: displaySidebar ? "block" : "none" }}
        >
          {authData.isLoggedIn && <Navbar />}
        </div>
        <div className="w-full md:w-4/6 lg:w-8/12 md:relative md:left-60">
          <RoutesComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
