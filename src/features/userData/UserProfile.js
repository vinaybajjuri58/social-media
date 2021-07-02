import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { EditProfile } from "./EditProfile";
import { getUserDataAPI, reload } from "./userSlice";
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
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData.status === "idle") {
      dispatch(getUserDataAPI({ token: authData.userToken }));
    }
    if (userData.status === "error") {
      toast.error("Error in loading user data");
    }
  }, [authData.userToken, dispatch, userData.status]);
  useEffect(() => {
    if (userData.status === "success" && userData.userId !== authData.userId) {
      dispatch(reload());
    }
  }, [userData.status, userData.userId, authData.userId, dispatch]);

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
        <div className="w-full md:w-4/5">
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
