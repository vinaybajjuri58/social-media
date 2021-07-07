import { useState } from "react";
import { toast } from "react-toastify";
import { addComment } from "../features/posts/postSlice";
import { useDispatch } from "react-redux";
export const AddComment = ({ userToken, postId }) => {
  const [commentContent, setCommentContent] = useState("");
  const [errorInContent, setErrorInContent] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCommentContent(e.target.value);
    if (commentContent.length > 60) {
      setErrorInContent("Comment length be greater than 60 characters");
    } else {
      setErrorInContent(null);
    }
  };
  const handleSubmit = () => {
    if (commentContent.length > 0) {
      dispatch(addComment({ userToken, postId, comment: commentContent }));
      setCommentContent("");
    } else {
      toast.error("Comment cannot be empty !");
    }
  };

  const dummyUserImage = "https://placekitten.com/g/50/50";
  return (
    <div className="rounded-lg shadow-lg bg-blue-50">
      <div className="p-4 pl-20 relative flex flex-col">
        <img
          className="absolute top-0 left-0 ml-4 mt-4 z-0 rounded-full"
          src={dummyUserImage}
          alt="Hello World"
        />
        <div className="flex justify-between">
          <input
            className="text-black border-transparent text-md w-3/4"
            placeholder="Add your comment!"
            value={commentContent}
            onChange={handleChange}
            type="text"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-400 rounded-full text-white inline-block py-2 px-4"
          >
            Comment
          </button>
        </div>
      </div>
      {errorInContent && <p className=" text-red-400 ">{errorInContent}</p>}
    </div>
  );
};
