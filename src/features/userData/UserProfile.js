import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { EditProfile } from "./EditProfile";
import { getUserDataAPI } from "./userSlice";
import { ProfileComponent } from "../../Components/Profile";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";

export const UserProfile = () => {
  const authData = useSelector((store) => store.authData);
  const userData = useSelector((store) => store.userData);
  useEffect(() => {
    getUserDataAPI();
  }, [authData.userToken, userData.status]);

  const [displayEditProfile, setDisplayEditProfile] = useState("none");
  const toggleDisplay = () => {
    setDisplayEditProfile((state) => (state === "block" ? "none" : "block"));
  };
  return (
    <div>
      {userData.status === "idle" && (
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
          <ProfileComponent userProfile toggleDisplay={toggleDisplay} />
          <EditProfile
            displayState={displayEditProfile}
            changeDisplayState={toggleDisplay}
          />
        </div>
      )}
    </div>
  );
};
