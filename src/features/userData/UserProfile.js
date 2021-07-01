import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditProfile } from "./EditProfile";
import { getUserDataAPI } from "./userSlice";
import { ProfileComponent } from "../../Components/Profile";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";

export const UserProfile = () => {
  const authData = useSelector((store) => store.authData);
  const userData = useSelector((store) => store.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData.status === "idle") {
      dispatch(getUserDataAPI({ token: authData.userToken }));
    }
    if (userData.status === "error") {
      toast.error("Error in loading user data");
    }
  }, [authData.userToken, dispatch, userData.status]);

  const [displayEditProfile, setDisplayEditProfile] = useState("none");
  const toggleDisplay = () => {
    setDisplayEditProfile((state) => (state === "block" ? "none" : "block"));
  };
  return (
    <div>
      {userData.status === "loading" && (
        <BeatLoader
          color={color}
          loading={userData.status}
          css={override}
          size={15}
        />
      )}
      {userData.status === "success" && (
        <div className="w-4/5">
          <hr className="border-gray-800" />
          <ProfileComponent
            userData={userData}
            userProfile
            toggleDisplay={toggleDisplay}
          />
          <EditProfile
            displayState={displayEditProfile}
            changeDisplayState={toggleDisplay}
          />
        </div>
      )}
    </div>
  );
};