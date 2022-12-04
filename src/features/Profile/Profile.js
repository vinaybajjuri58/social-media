import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData, resetStatus } from "./profileSlice";
import { ProfileComponent, LoadingComponent } from "../../Components";
import { Posts } from "../posts/Posts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Profile = () => {
  const profileData = useSelector((store) => store.profileData);
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {
    if (profileData.status === "idle") {
      dispatch(getProfileData({ userId: userId }));
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
        <LoadingComponent apiCallStatus={profileData.status} />
      )}
      {profileData.status === "success" && (
        <div>
          <hr className="border-gray-800" />
          <ProfileComponent userData={profileData} />
          <div>
            <div className="fixed mt-20 ml-20">
              {profileData.apiCallStatus === "loading" && (
                <LoadingComponent apiCallStatus={profileData.apiCallStatus} />
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
