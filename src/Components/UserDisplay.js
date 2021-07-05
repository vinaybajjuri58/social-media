import { Link } from "react-router-dom";
export const UserDisplay = ({ user }) => {
  const dummyUserImage =
    "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png";
  return (
    <div className="flex p-4 pb-0 h-28 items-center justify-around">
      <Link
        to={`/profile/${user.id}`}
        className="flex group h-full w-1/2 items-center justify-between"
      >
        <img
          src={dummyUserImage}
          alt={user.userName}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p>{user.name}</p>
          <p>@{user.userName}</p>
        </div>
      </Link>
      <button
        className="max-w-max  border  bg-transparent
                        border-blue-500  text-blue-500  hover:border-blue-800  flex  items-center  hover:shadow-lg  font-bold  py-2  px-4  rounded-full
                        mr-0  ml-auto"
      >
        Follow
      </button>
    </div>
  );
};
