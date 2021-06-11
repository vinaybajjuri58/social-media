import React from "react";
import { Link } from "react-router-dom";
import { RoutesComponent } from "./Routes";
function App() {
  return (
    <div className="App">
      <p>Hello World</p>
      <Link to="/posts">posts</Link>
      {"||"}
      <Link to="/notifications">notifications</Link>
      {"||"}
      <Link to="/login">login</Link>
      {"||"}
      <Link to="/signup">signup</Link>
      {"||"}
      <RoutesComponent />
    </div>
  );
}

export default App;
