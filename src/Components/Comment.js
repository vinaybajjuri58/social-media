import { Link } from "react-router-dom";
import { likeComment, dislikeComment } from "../features/posts/postSlice";
import { useSelector, useDispatch } from "react-redux";
export const Comment = ({ commentData, postId }) => {
  const { userId, userToken } = useSelector((store) => store.authData);
  const {
    comment,
    likes,
    userId: { userName, name, userImage, id },
  } = commentData;
  const dispatch = useDispatch();
  const dummyUserImage =
    "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png";
  return (
    <div>
      <div className="flex flex-shrink-0 p-4 pb-0">
        <Link
          to={userId === id ? "/profile" : `/profile/${id}`}
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
                  @{userName} . 16 April
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="pl-16">
        <p className=" text-base  width-auto  font-medium  text-black  flex-shrink">
          {comment}
        </p>
      </div>
      <div>
        <div className="flex items-center py-4">
          <div className=" flex px-20 text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            {likes.includes(userId) ? (
              <button
                onClick={() =>
                  dispatch(
                    dislikeComment({
                      userToken,
                      commentId: commentData._id,
                      userId,
                      postId,
                    })
                  )
                }
              >
                <i className="fas fa-heart text-red-600"></i>
              </button>
            ) : (
              <button
                onClick={() =>
                  dispatch(
                    likeComment({
                      userToken,
                      commentId: commentData._id,
                      userId,
                      postId,
                    })
                  )
                }
              >
                <i className="fas fa-heart"></i>
              </button>
            )}
            <span>{likes.length > 0 ? likes.length : ""} </span>
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
    </div>
  );
};
