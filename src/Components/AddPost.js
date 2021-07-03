import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addPost } from "./apiCall";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { addPostButtonClicked } from "../features/posts/postSlice";
import { newPostAdded } from "../features/userData/userSlice";
const dummyUserImage = "https://placekitten.com/g/50/50";
const override = css`
  display: block;
  margin: auto 2px;
  position: absolute;
  top: 160px;
  left: 260px;
  align-self: center;
  border-color: blue;
`;
const color = "blue";

export const AddPost = () => {
  const { userToken } = useSelector((store) => store.authData);
  const { userId, userImage, name, userName } = useSelector(
    (store) => store.userData
  );
  const [postContent, setPostContent] = useState("");
  const [errorInContent, setErrorInContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setPostContent(e.target.value);
    if (postContent.length > 60) {
      setErrorInContent("post length be greater than 60 characters");
    } else {
      setErrorInContent(null);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (postContent.length > 0) {
      const { data } = await addPost({
        token: userToken,
        message: postContent,
      });
      setLoading(false);
      dispatch(
        addPostButtonClicked({
          userId,
          userImage,
          name,
          userName,
          postId: data.savedPost._id,
          message: postContent,
          likes: [],
          comments: [],
        })
      );
      dispatch(
        newPostAdded({
          userId,
          userImage,
          name,
          userName,
          postId: data.savedPost._id,
          message: postContent,
          likes: [],
          comments: [],
        })
      );
      setPostContent("");
    } else {
      setLoading(false);
      toast.error("Post cannot be empty !");
    }
  };
  return (
    <div className="rounded-lg shadow-lg bg-blue-50 z-0">
      {loading && (
        <BeatLoader color={color} loading={loading} css={override} size={15} />
      )}
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
