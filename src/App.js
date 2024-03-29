import React, { useState, useEffect } from "react";
import { RoutesComponent } from "./Routes";
import { Navbar, TopNavBar } from "./Components";
import { useSelector, useDispatch } from "react-redux";
import { getUserDataAPI } from "./features/userData/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

function App() {
  const authData = useSelector((store) => store.authData);
  const userData = useSelector((store) => store.userData);
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const sidebarToggler = () => {
    setDisplaySidebar((state) => !state);
  };
  const dispatch = useDispatch();
  const isMobileView = useMediaQuery({
    query: "(max-width:640px)",
  });

  useEffect(() => {
    if (authData.isLoggedIn === true) {
      if (userData.status === "idle") {
        dispatch(getUserDataAPI({ userToken: authData.userToken }));
      }
    }
  }, [authData.userToken, dispatch, userData.status, authData.isLoggedIn]);

  return (
    <div>
      <ToastContainer />
      <TopNavBar
        loggedIn={authData.isLoggedIn}
        toggleDisplay={sidebarToggler}
      />
      <div className="flex relative top-16 z-20">
        {isMobileView ? (
          <div
            className="absolute z-20 md:fixed"
            style={{
              display: displaySidebar ? "block" : "none",
            }}
          >
            {authData.isLoggedIn && <Navbar toggleDisplay={sidebarToggler} />}
          </div>
        ) : (
          <div className="absolute z-20 md:fixed">
            {authData.isLoggedIn && <Navbar />}
          </div>
        )}
        <div className="w-full md:w-4/6 md:pl-4  lg:w-8/12 md:relative md:left-60 sm:z-0">
          <RoutesComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
