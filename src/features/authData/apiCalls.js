import axios from "axios";
export const signUp = async ({ name, userName, email, password }) => {
  let response = {};
  try {
    response = await axios.post(
      "https://fin-twitter-backend.onrender.com/api/users/signup",
      {
        name,
        email,
        userName,
        password,
      }
    );
  } catch (err) {
    response.data = {
      success: false,
      message: err.response.message,
    };
  } finally {
    return response.data;
  }
};
