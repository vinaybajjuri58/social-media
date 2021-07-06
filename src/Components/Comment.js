import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export const Comment = ({ commentData }) => {
  const { userId } = useSelector((store) => store.authData);
  const { userId, userName, userImage, name } = commentData;
  return (
    <div key={commentId}>
      <div className="flex flex-shrink-0 p-4 pb-0">
        <Link
          to={
            userId === commentData.userId
              ? "/profile"
              : `/profile/${commentData.userId}`
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
                  @{userName} . 16 April
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="pl-16">
        <p className=" text-base  width-auto  font-medium  text-black  flex-shrink">
          {message}
        </p>
      </div>
      <div>
        <div className="flex items-center py-4 justify-evenly ">
          <div className=" flex items-center text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            {likes.includes(userId) ? (
              <button>
                <i className="fas fa-heart text-red-600"></i>
              </button>
            ) : (
              <button>
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
