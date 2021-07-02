import axios from "axios";
export const addPost = async ({ token, message }) => {
  let response;
  try {
    response = await axios.post(
      "https://fin-twitter-backend.herokuapp.com/api/posts/",
      {
        message,
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
      message: "Please try again",
    };
  } finally {
    return response;
  }
};
