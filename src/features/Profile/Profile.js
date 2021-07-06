import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData, resetStatus } from "./profileSlice";
import { ProfileComponent } from "../../Components";
import { Posts } from "../posts/Posts";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";

export const Profile = () => {
  const profileData = useSelector((store) => store.profileData);
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {
    if (profileData.status === "idle") {
      dispatch(getUserData({ userId: userId }));
    }
  }, [profileData.status, dispatch, userId]);
  useEffect(() => {
    if (profileData.status === "success" && profileData.userId !== userId) {
      dispatch(resetStatus());
    }
  }, [userId, profileData.userId, dispatch, profileData.status]);
  useEffect(() => {
    if (profileData.status === "error") {
      toast.error("Error in loading user data");
    }
  }, [profileData.status]);
  return (
    <div className="w-full">
      {profileData.status === "loading" && (
        <BeatLoader
          color={color}
          loading={profileData.status}
          css={override}
          size={15}
        />
      )}
      {profileData.status === "success" && (
        <div>
          <hr className="border-gray-800" />
          <ProfileComponent userData={profileData} />
          <div>
            <div className="fixed mt-20 ml-20">
              {profileData.apiCallStatus === "loading" && (
                <BeatLoader
                  color={color}
                  loading={profileData.apiCallStatus}
                  css={override}
                  size={15}
                />
              )}
            </div>
            <div>
              <Posts userId={profileData.userId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
