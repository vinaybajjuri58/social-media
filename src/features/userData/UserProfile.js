import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { EditProfile } from "./EditProfile";
import { getUserDataAPI } from "./userSlice";
import { ProfileComponent, Post } from "../../Components";
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
      dispatch(getUserDataAPI({ userToken: authData.userToken }));
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
    <div className="w-full">
      {userData.status === "loading" && (
        <BeatLoader
          color={color}
          loading={userData.status}
          css={override}
          size={15}
        />
      )}
      {userData.status === "success" && (
        <div>
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
          <div>
            {userData.posts.map((post) => (
              <Post key={post.postId} postData={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
