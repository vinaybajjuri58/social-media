import React from "react";
import { RoutesComponent } from "./Routes";
import { Navbar } from "./Components";
import { useSelector } from "react-redux";
function App() {
  const authData = useSelector((store) => store.authData);
  return (
    <div className="flex">
      {authData.isLoggedIn && <Navbar />}
      <RoutesComponent />
    </div>
  );
}

export default App;
