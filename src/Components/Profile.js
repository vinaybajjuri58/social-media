import { useState } from "react";
// import { useSelector } from "react-redux";
import { FollowersModal } from "./FollowersModal";
import { FollowingModal } from "./FollowingModal";
export const ProfileComponent = ({ userProfile, toggleDisplay, userData }) => {
  const [followersModalDisplay, setFollowersModalDisplay] = useState(false);
  const [followingModalDisplay, setFollowingModalDisplay] = useState(false);
  // const { userId } = useSelector((store) => store.userData);
  const dummyAvatar =
    "https://storage.googleapis.com/stateless-campfire-pictures/2019/05/e4629f8e-defaultuserimage-15579880664l8pc.jpg";
  const dummyBackground =
    "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg";
  const toggleFollowersModalDisplay = () => {
    setFollowersModalDisplay((initialState) => !initialState);
  };
  const toggleFollowingModalDisplay = () => {
    setFollowingModalDisplay((initialState) => !initialState);
  };
  return (
    <div>
      <div
        className="w-full bg-cover bg-no-repeat bg-center"
        style={{
          height: "200px",
          backgroundImage: `url(${dummyBackground})`,
        }}
      ></div>
      <div className="p-4">
        <div className="relative flex w-full">
          <div className="flex flex-1">
            <div style={{ marginTop: "-6rem" }}>
              <div
                style={{ height: "9rem", width: "9rem" }}
                className="md rounded-full relative avatar"
              >
                <img
                  style={{ height: "9rem", width: "9rem" }}
                  className="
                          md
                          rounded-full
                          relative
                          border-4 border-gray-900
                          avatar
                          sm:z-0
                        "
                  src={
                    userData.userImage.length > 0
                      ? userData.userImage
                      : dummyAvatar
                  }
                  alt={userData.userName}
                />
              </div>
            </div>
          </div>
          {userProfile && (
            <div className="flex flex-col text-right">
              <button
                onClick={toggleDisplay}
                className="  justify-center  max-h-max  whitespace-nowrap  focus:outline-none focus:ring  max-w-max  border  bg-transparent
                      border-blue-500  text-blue-500  hover:border-blue-800  flex  items-center  hover:shadow-lg  font-bold  py-2  px-4  rounded-full
                      mr-0  ml-auto
                    "
              >
                Edit Profile
              </button>
            </div>
          )}
          {!userProfile && (
            <div className="flex flex-col text-right">
              <button
                onClick={toggleDisplay}
                className="  justify-center  max-h-max  whitespace-nowrap  focus:outline-none focus:ring  max-w-max  border  bg-transparent
                      border-blue-500  text-blue-500  hover:border-blue-800  flex  items-center  hover:shadow-lg  font-bold  py-2  px-4  rounded-full
                      mr-0  ml-auto
                    "
              >
                Follow
              </button>
            </div>
          )}
        </div>

        <div className="space-y-1 justify-center w-full mt-3 ml-3">
          <div>
            <h2 className="text-xl leading-6 font-bold text-black">
              {userData.name}
            </h2>
            <p className="text-sm leading-5 font-medium text-gray-600">
              {userData.userName}
            </p>
          </div>
          <div className="mt-3">
            <p className="text-black leading-tight mb-2">{userData.bio}</p>
            <div className="text-black flex">
              <span className="flex mr-2">
                <a
                  href="https://ricardoribeirodev.com/personal/"
                  target="#"
                  className="leading-5 ml-1 text-blue-400"
                >
                  {userData.website}
                </a>
              </span>
            </div>
          </div>
          <div className=" pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
            <div className="text-center pr-3">
              <span className="font-bold text-black">
                {userData.following.length}{" "}
              </span>
              <span className="text-gray-600">
                <button onClick={toggleFollowingModalDisplay}>
                  {" "}
                  Following
                </button>
              </span>
            </div>
            {followingModalDisplay && (
              <FollowingModal
                following={userData.following}
                displayState={followingModalDisplay}
                toggleDisplay={toggleFollowingModalDisplay}
              />
            )}
            <div className="text-center px-3">
              <span className="font-bold text-black">
                {userData.followers.length}{" "}
              </span>
              <span className="text-gray-600">
                <button onClick={toggleFollowersModalDisplay}>
                  {" "}
                  Followers
                </button>
              </span>
            </div>
            {followersModalDisplay && (
              <FollowersModal
                followers={userData.followers}
                displayState={followersModalDisplay}
                toggleDisplay={toggleFollowersModalDisplay}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// userData.coverImage === undefined &&
// userData.coverImage.length === 0
//   ? `url(${dummyBackground})`
//   : `url(${userData.coverImage})`,
