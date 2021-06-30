import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "./profileSlice";
import { ProfileComponent } from "../../Components/Profile";

export const Profile = () => {
  const authData = useSelector((store) => store.authData);
  const userData = useSelector((store) => store.userData);
  useEffect(() => {
    if (userData.status === "idle") {
      console.log("In UseEffect");
      getUserData({ token: authData.userToken });
    }
  }, [authData.userToken, userData.status]);
  return (
    <div className="w-4/5">
      <hr className="border-gray-800" />
      <ProfileComponent />
    </div>
  );
};
