import { useSelector } from "react-redux";
import { useState } from "react";
import { addPost } from "./apiCall";
import { toast } from "react-toastify";
export const AddPost = () => {
  const { userToken } = useSelector((store) => store.authData);
  const [postContent, setPostContent] = useState("");
  const [errorInContent, setErrorInContent] = useState(null);
  //   const dispatch = useDispatch();
  const handleChange = (e) => {
    setPostContent(e.target.value);
    if (postContent.length > 60) {
      setErrorInContent("post length be greater than 60 characters");
    } else {
      setErrorInContent(null);
    }
  };
  const handleSubmit = async () => {
    if (postContent.length > 0) {
      const response = await addPost({
        token: userToken,
        message: postContent,
      });
    } else {
      toast.error("Post cannot be empty !");
    }
  };
  return (
    <div className="w-5/6 rounded-lg shadow-lg bg-blue-50">
      <div className="relative p-4 pl-20">
        <img
          src="https://placekitten.com/g/50/50"
          className="absolute top-0 left-0 ml-4 mt-4 rounded-full"
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
