export const ProfileComponent = ({ userProfile, toggleDisplay, userData }) => {
  const dummyAvatar =
    "https://storage.googleapis.com/stateless-campfire-pictures/2019/05/e4629f8e-defaultuserimage-15579880664l8pc.jpg";
  const dummyBackground =
    "https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg";
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
                        "
                  src={dummyAvatar}
                  alt="Hello World"
                />
                <div className="absolute"></div>
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
            <div className="text-gray-600 flex">
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
                {userData.following.length}
              </span>
              <span className="text-gray-600"> Following</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-black">
                {userData.followers.length}{" "}
              </span>
              <span className="text-gray-600"> Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* <img
className="opacity-0 w-full h-full"
src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
alt="Hello World"
/> */
