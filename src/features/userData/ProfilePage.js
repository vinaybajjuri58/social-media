import { useState } from "react";
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
export const ProfilePage = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [imageData, setImageData] = useState(imageUrls);
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
  return (
    <div>
      <h2>Profile Data</h2>
      <div>
        <label>
          Bio :
          <input
            type="text-area"
            className="form-textarea rounded-sm bg-transparent"
            value={userData.bio}
            onChange={handleTextChange}
          />
        </label>
        <label>
          websiteUrl :
          <input
            type="text"
            className="form-input rounded-sm bg-transparent"
            value={userData.websiteUrl}
            onChange={handleTextChange}
          />
        </label>
      </div>
      <div>
        <label>
          Profile Pic
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            value={userData.profilePicUrl}
            onChange={handleFileInputChange}
            name="profileImage"
          />
        </label>
        {imageData.profileImage && (
          <img src={imageData.profileImage} alt="profile pic" />
        )}
      </div>
      <div>
        <label>
          Cover Pic
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            value={userData.coverPageUrl}
            onChange={handleFileInputChange}
            name="coverImage"
          />
        </label>
        {imageData.coverImage && (
          <img src={imageData.coverImage} alt="coverImage" />
        )}
      </div>
    </div>
  );
};

// const uploadImage = async () => {
//   if (!previewInputFile) {
//     console.log("No image exists");
//     return;
//   }
//   let response = {};
//   try {
//     response = await axios({
//       method: "post",
//       url: "url-path",
//       data: {
//         image: previewInputFile
//       },
//       headers: {
//         "Content-type": "application/json",
//         "Access-Control-Allow-Origin": true
//       }
//     });
//     console.log(response.data.result);
//   } catch (error) {
//     console.log(error);
//   }
// };
