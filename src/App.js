import React from "react";
import { Link } from "react-router-dom";
import { RoutesComponent } from "./Routes";
function App() {
  return (
    <div className="App">
      <p>Hello World</p>
      <Link to="/counter">counter</Link>
      <RoutesComponent />
    </div>
  );
}

export default App;
