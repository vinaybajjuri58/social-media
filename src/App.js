import React, { useState, useEffect } from "react";
import { RoutesComponent } from "./Routes";
import { Navbar, TopNavBar } from "./Components";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { reload } from "./features/userData/userSlice";
function App() {
  const authData = useSelector((store) => store.authData);
  const userData = useSelector((store) => store.userData);
  const [displaySidebar, setDisplaySidebar] = useState(true);
  const sidebarToggler = () => {
    setDisplaySidebar((state) => !state);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData.status === "success" && userData.userId !== authData.userId) {
      dispatch(reload());
    }
  }, [userData.status, userData.userId, authData.userId, dispatch, userData]);
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
