import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
export const PrivateRoute = ({ path, ...props }) => {
  const authData = useSelector((store) => store.authData);
  return authData.isLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
