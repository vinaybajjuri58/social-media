import { Posts } from "./features/posts/Posts";
import { Notifications } from "./features/notifications/Notifications";
import { Login, SignUp, EditProfile } from "./features/userData";
import { Routes, Route } from "react-router-dom";
export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/edit/profile" element={<EditProfile />} />
    </Routes>
  );
};
