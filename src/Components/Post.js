import { Link } from "react-router-dom";
export const Post = ({ postData }) => {
  const {
    userId,
    userImage,
    message,
    userName,
    name,
    postId,
    likes,
    comments,
  } = postData;
  const dummyUserImage =
    "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png";
  return (
    <div key={postId}>
      <div className="flex flex-shrink-0 p-4 pb-0">
        <Link to={`/profile/${userId}`} className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-10 w-10 rounded-full"
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

        <div className="flex items-center py-4">
          <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            <i class="fas fa-comment"></i>
            {comments.length} k
          </div>
          <div className="flex-1 flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out">
            <i class="fas fa-heart"></i>
            {likes.length} k
          </div>
        </div>
      </div>
      <hr className="border-gray-800" />
    </div>
  );
};
