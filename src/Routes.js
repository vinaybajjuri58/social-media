import { Posts } from "./features/posts/Posts";
import { Notifications } from "./features/notifications/Notifications";
import { Login, SignUp } from "./features/authData";
import { Routes, Route } from "react-router-dom";
import { UserProfile } from "./features/userData/UserProfile";
import { Profile } from "./features/Profile/Profile";
import { PrivateRoute } from "./PrivateRoute";
import { SinglePost } from "./features/posts/SinglePost";
export const RoutesComponent = () => {
  return (
    <Routes>
      <PrivateRoute path="/notifications" element={<Notifications />} />
      <PrivateRoute path="/posts" element={<Posts />} />
      <PrivateRoute path="/posts/:postId" element={<SinglePost />} />
      <PrivateRoute path="/profile/:userId" element={<Profile />} />
      <PrivateRoute path="/profile" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <PrivateRoute path="*" element={<Posts />} />
    </Routes>
  );
};
