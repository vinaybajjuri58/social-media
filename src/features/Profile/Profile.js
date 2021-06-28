import { useState } from "react";
import { EditProfile } from "./EditProfile";
export const Profile = () => {
  const [displayEditProfile, setDisplayEditProfile] = useState(false);
  return (
    <div className="w-4/5">
      <div
        className="w-full bg-cover bg-no-repeat bg-center"
        style={{
          height: "200px",
          backgroundImage:
            "url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)",
        }}
      >
        <img
          className="opacity-0 w-full h-full"
          src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
          alt=""
        />
      </div>
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
                        "
                  src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
                  alt=""
                />
                <div className="absolute"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-right">
            <button
              onClick={() => {
                setDisplayEditProfile(
                  (displayEditProfile) => !displayEditProfile
                );
              }}
              className="  justify-center  max-h-max  whitespace-nowrap  focus:outline-none focus:ring  max-w-max  border  bg-transparent
                      border-blue-500  text-blue-500  hover:border-blue-800  flex  items-center  hover:shadow-lg  font-bold  py-2  px-4  rounded-full
                      mr-0  ml-auto
                    "
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="space-y-1 justify-center w-full mt-3 ml-3">
          <div>
            <h2 className="text-xl leading-6 font-bold text-black">
              ℜ𝔦𝔠𝔞𝔯𝔡𝔬ℜ𝔦𝔟𝔢𝔦𝔯𝔬.dev
            </h2>
            <p className="text-sm leading-5 font-medium text-gray-600">
              @Ricardo_oRibeir
            </p>
          </div>
          <div className="mt-3">
            <p className="text-black leading-tight mb-2">
              Software Engineer / Designer / Entrepreneur <br />
              Visit my website to test a working <b>Twitter Clone.</b>
            </p>
            <div className="text-gray-600 flex">
              <span className="flex mr-2">
                <a
                  href="https://ricardoribeirodev.com/personal/"
                  target="#"
                  className="leading-5 ml-1 text-blue-400"
                >
                  www.RicardoRibeiroDEV.com
                </a>
              </span>
            </div>
          </div>
          <div className=" pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
            <div className="text-center pr-3">
              <span className="font-bold text-black">520</span>
              <span className="text-gray-600"> Following</span>
            </div>
            <div className="text-center px-3">
              <span className="font-bold text-black">23,4m </span>
              <span className="text-gray-600"> Followers</span>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
      {displayEditProfile && <EditProfile />}
    </div>
  );
};
