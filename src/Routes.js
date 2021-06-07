import { Counter } from "./features/counter/Counter";
import { Routes, Route } from "react-router-dom";
export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/counter" element={<Counter />} />
    </Routes>
  );
};
