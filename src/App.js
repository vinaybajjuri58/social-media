import React from "react";
import { RoutesComponent } from "./Routes";
import { Navbar } from "./Components";
function App() {
  return (
    <div className="flex">
      <Navbar />
      <RoutesComponent />
    </div>
  );
}

export default App;
