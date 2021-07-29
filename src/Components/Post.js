import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost, dislikePost } from "../features/posts/postSlice";
import { toast } from "react-toastify";
export const Post = ({ postData }) => {
  const { userId, userToken } = useSelector((store) => store.authData);
  const dispatch = useDispatch();
  const { userImage, message, userName, name, postId, likes, comments } =
    postData;
  const dummyUserImage =
    "https://storage.googleapis.com/stateless-campfire-pictures/2019/05/e4629f8e-defaultuserimage-15579880664l8pc.jpg";

  return (
    <div key={postId}>
      <div className="flex flex-shrink-0 p-4 pb-0">
        <Link
          to={
            userId === postData.userId
              ? "/profile"
              : `/profile/${postData.userId}`
          }
          className="flex-shrink-0 group block"
        >
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-10 w-10 rounded-full z-0"
                src={userImage.length > 0 ? userImage : dummyUserImage}
                alt={name}
              />
            </div>
            <div className="ml-3">
              <p className="text-base leading-6 font-medium text-black">
                {name}
                <span className="text-sm leading-5  font-medium  text-gray-400  group-hover:text-gray-300  transition  ease-in-out  duration-150">
                  @{userName}
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
      <Link to={`/posts/${postId}`}>
        <div className="pl-16">
          <p className=" text-base  width-auto  font-medium  text-black  flex-shrink">
            {message}
          </p>
        </div>
      </Link>
      <div>
        <div className="flex items-center py-4 justify-evenly ">
          <div className=" flex items-center  p-1 m-1 text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            <Link to={`/posts/${postId}`}>
              <i className="fas fa-comment"></i>{" "}
            </Link>
            <span className="ml-1">
              {comments.length > 0 ? comments.length : ""}{" "}
            </span>
          </div>
          <div className=" flex items-center text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            {likes.includes(userId) ? (
              <button
                onClick={() =>
                  dispatch(dislikePost({ userToken, postId, userId }))
                }
              >
                <i className="fas fa-heart text-red-600"></i>
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch(likePost({ userToken, postId, userId }))
                }
              >
                <i className="fas fa-heart"></i>
              </button>
            )}
            <span className="ml-1">
              {" "}
              {likes.length > 0 ? likes.length : " "}{" "}
            </span>
          </div>
          <div className=" flex items-center text-gray-800 hover:text-blue-400 transition duration-350 ease-in-out">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://fin-tweets.netlify.app/posts/${postId}`
                );
                toast.info("link copied to clipboard");
              }}
            >
              <i class="fas fa-share"></i>
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
    </div>
  );
};
