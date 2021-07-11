import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateProfile } from "./apiCalls";
import { profileDataUpdated } from "./userSlice";
import { LoadingComponent } from "../../Components";

const initialUserData = {
  websiteUrl: "",
  profilePicUrl: "",
  coverPageUrl: "",
  bio: "",
};
const imageUrls = {
  profileImage: null,
  coverImage: null,
};
export const EditProfile = ({ displayState, changeDisplayState }) => {
  const { website, bio, coverImage, userImage } = useSelector(
    (store) => store.userData
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { userToken } = useSelector((store) => store.authData);
  const [userData, setUserData] = useState(initialUserData);
  const [imageData, setImageData] = useState(imageUrls);
  useEffect(() => {
    setUserData((initialData) => ({
      ...initialData,
      websiteUrl: website,
      bio: bio,
    }));
  }, [bio, website]);
  useEffect(() => {
    if (coverImage.length > 0) {
      setImageData((initialData) => ({
        ...initialData,
        coverImage: coverImage,
      }));
    }
    if (userImage.length > 0) {
      setImageData((initialData) => ({
        ...initialData,
        profileImage: userImage,
      }));
    }
  }, [coverImage, userImage]);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file, e.target.name);
  };
  const previewFile = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData((initialData) => ({
        ...initialData,
        [name]: reader.result,
      }));
    };
  };
  const handleTextChange = (e) => {
    setUserData((initialData) => ({
      ...initialData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    const response = await updateProfile({
      bio: userData.bio,
      websiteUrl: userData.websiteUrl,
      profileImage: imageData.profileImage,
      coverImage: imageData.coverImage,
      token: userToken,
    });
    setLoading(false);
    if (response.success === true) {
      dispatch(
        profileDataUpdated({
          bio: userData.bio,
          websiteUrl: userData.websiteUrl,
          profileImage:
            imageData.profileImage !== null ? imageData.profileImage : "",
          coverImage: imageData.coverImage !== null ? imageData.coverImage : "",
        })
      );
      toast.success("Updated profile data");
    } else {
      toast.error("Please try again !");
    }
  };
  return (
    <div
      id="modal"
      style={{ display: displayState }}
      className="modal md:m-auto w-full p-0 md:w-8/12  bg-gray-50 md:ml-24"
    >
      <div className="modal-content modal-theme  m-auto -mt-6">
        {loading && <LoadingComponent apiCallStatus={loading} />}
        <div className="md:col-span-1 w-full mt-20 md:px-28">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Profile
            </h3>
            <p className="mt-1 text-sm text-black">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="shadow sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="mt-5 md:mt-0 md:col-span-2 ">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    About
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block md:w-full  sm:text-sm border border-gray-300 rounded-md"
                      type="text-area"
                      value={userData.bio}
                      onChange={handleTextChange}
                      placeholder=""
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company_website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Website
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          name="websiteUrl"
                          id="company_website"
                          value={userData.websiteUrl}
                          onChange={handleTextChange}
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block rounded-none rounded-r-md sm:text-sm border-gray-300 "
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile picture
                </label>
                <div className="mt-1 flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    {imageData.profileImage && (
                      <img src={imageData.profileImage} alt="profile pic" />
                    )}
                  </span>
                  <label>
                    <button
                      type="button"
                      className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleFileInputChange}
                        name="profileImage"
                      />
                    </button>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover photo
                </label>

                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div>
                      {imageData.coverImage && (
                        <img
                          className="mx-auto h-16 w-16"
                          src={imageData.coverImage}
                          alt="coverImage"
                        />
                      )}
                    </div>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          onChange={handleFileInputChange}
                          name="coverImage"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50  sm:px-6">
                <button
                  onClick={handleSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className="close-modal">
        <button
          id="close-modal"
          onClick={changeDisplayState}
          className="button button-warning modal-toggle mt-20 mr-20 sm:mr-12"
        >
          X
        </button>
      </span>
    </div>
  );
};
