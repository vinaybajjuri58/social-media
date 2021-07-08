import axios from "axios";
export const updateProfile = async ({
  token,
  bio,
  websiteUrl,
  profileImage,
  coverImage,
}) => {
  let response = {};
  try {
    response = await axios.post(
      "http://localhost:5000/api/users/",
      {
        bio,
        websiteUrl,
        profileImage,
        coverImage,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: "Error in updating data",
    };
  } finally {
    return response.data;
  }
};
