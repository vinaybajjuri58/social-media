import { Counter } from "./features/counter/Counter";
import { Posts } from "./features/posts/Posts";
import { Notifications } from "./features/notifications/Notifications";
import { Routes, Route } from "react-router-dom";
export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/counter" element={<Counter />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
};
