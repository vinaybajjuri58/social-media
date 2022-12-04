import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditProfile } from "./EditProfile";
import { getUserDataAPI, reload } from "./userSlice";
import { ProfileComponent, LoadingComponent } from "../../Components";
import { Posts } from "../posts/Posts";

export const UserProfile = () => {
  const authData = useSelector((store) => store.authData);
  const userData = useSelector((store) => store.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData.status === "idle") {
      dispatch(getUserDataAPI({ userToken: authData.userToken }));
    }
    if (userData.status === "error") {
      dispatch(reload());
    }
  }, [authData.userToken, dispatch, userData.status]);

  const [displayEditProfile, setDisplayEditProfile] = useState("none");
  const toggleDisplay = () => {
    setDisplayEditProfile((state) => (state === "block" ? "none" : "block"));
  };
  return (
    <div className="w-full">
      {userData.status === "loading" && (
        <LoadingComponent apiCallStatus={userData.status} />
      )}
      {userData.status === "success" && (
        <div>
          <hr className="border-gray-800" />
          <ProfileComponent
            userProfile={true}
            userData={userData}
            toggleDisplay={toggleDisplay}
          />
          <EditProfile
            displayState={displayEditProfile}
            changeDisplayState={toggleDisplay}
          />
          <div>
            <Posts userId={userData.userId} />
          </div>
        </div>
      )}
    </div>
  );
};
