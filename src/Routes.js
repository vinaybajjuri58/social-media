import { Posts } from "./features/posts/Posts";
import { Notifications } from "./features/notifications/Notifications";
import { Login, SignUp } from "./features/authData";
import { Routes, Route } from "react-router-dom";
import { Profile } from "./features/Profile/Profile";
import { PrivateRoute } from "./PrivateRoute";
export const RoutesComponent = () => {
  return (
    <Routes>
      <PrivateRoute path="/notifications" element={<Notifications />} />
      <PrivateRoute path="/posts" element={<Posts />} />
      <PrivateRoute path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
