import React from "react";
import { RoutesComponent } from "./Routes";
import { Navbar } from "./Components";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const authData = useSelector((store) => store.authData);
  return (
    <div>
      <ToastContainer />
      <div className="flex">
        <div className="sm:fixed md:relative">
          {authData.isLoggedIn && <Navbar />}
        </div>
        <RoutesComponent />
      </div>
    </div>
  );
}

export default App;
