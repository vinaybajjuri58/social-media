import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addPost,
  apiCallStatusToInitialState,
} from "../features/posts/postSlice";
const dummyUserImage = "https://placekitten.com/g/50/50";

export const AddPost = () => {
  const authData = useSelector((store) => store.authData);
  const { apiCallStatus, apiCallErrorMessage } = useSelector(
    (store) => store.postsData
  );
  const dispatch = useDispatch();
  const { userId, userImage, name, userName } = useSelector(
    (store) => store.userData
  );
  const [postContent, setPostContent] = useState("");
  const [errorInContent, setErrorInContent] = useState(null);

  useEffect(() => {
    if (apiCallStatus === "error") {
      toast.error(apiCallErrorMessage);
      dispatch(apiCallStatusToInitialState());
    }
    if (apiCallStatus === "success") {
      setPostContent("");
      dispatch(apiCallStatusToInitialState());
    }
  }, [apiCallErrorMessage, apiCallStatus, dispatch]);

  const handleChange = (e) => {
    setPostContent(e.target.value);
    if (postContent.length > 60) {
      setErrorInContent("post length be greater than 60 characters");
    } else {
      setErrorInContent(null);
    }
  };
  const handleSubmit = () => {
    dispatch(
      addPost({
        name,
        userName,
        userImage,
        userId,
        message: postContent,
        userToken: authData.userToken,
      })
    );
  };
  return (
    <div className="rounded-lg shadow-lg bg-blue-50 z-0">
      <div className="relative p-4 pl-20 z-0">
        <img
          className="absolute top-0 left-0 ml-4 mt-4 rounded-full"
          src={dummyUserImage}
          alt="Hello World"
        />
        <textarea
          className="bg-transparent pt-4 w-full text-black text-md outline-none"
          placeholder="What's happening?"
          value={postContent}
          onChange={handleChange}
          rows="3"
        ></textarea>
        {errorInContent && <p className=" text-red-400 ">{errorInContent}</p>}
      </div>
      <div className="pl-20 pb-4 pr-4 flex justify-between">
        <div>
          <button
            onClick={handleSubmit}
            className="bg-blue-400 rounded-full text-blue-100 inline-block py-2 px-4"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

// setLoading(true);
// if (postContent.length > 0) {
//   const { data } = await addPost({
//     token: userToken,
//     message: postContent,
//   });
//   setLoading(false);
//   dispatch(
//   );
//   setPostContent("");
// } else {
//   setLoading(false);
//   toast.error("Post cannot be empty !");
// }
