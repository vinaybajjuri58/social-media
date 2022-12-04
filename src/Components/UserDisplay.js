import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followUserAPI, unFollowUserAPI } from "../features/userData/userSlice";
export const UserDisplay = ({ user }) => {
  const dummyUserImage =
    user.userImage.length > 0
      ? user.userImage
      : "https://storage.googleapis.com/stateless-campfire-pictures/2019/05/e4629f8e-defaultuserimage-15579880664l8pc.jpg";
  const dispatch = useDispatch();
  const { following } = useSelector((store) => store.userData);
  const { userToken, userId } = useSelector((store) => store.authData);
  const inFollowing = following.find((userB) => userB.id === user.id);
  return (
    <div className="flex h-28 items-center justify-between">
      <Link
        to={userId === user.id ? "/profile" : `/profile/${user.id}`}
        className="flex group h-full items-center justify-between"
      >
        <img
          src={dummyUserImage}
          alt={user.userName}
          className="inline-block h-10 w-10 rounded-full z-0"
        />
        <div className="flex flex-col">
          <b>{user.name}</b>
          <p>@{user.userName}</p>
        </div>
      </Link>
      {inFollowing === undefined ? (
        <button
          onClick={() =>
            dispatch(
              followUserAPI({
                userToken,
                userBId: user.id,
              })
            )
          }
          className="max-w-max  border  bg-transparent
                      border-blue-500  text-blue-500  font-bold  py-2  px-4  rounded-full"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={() =>
            dispatch(
              unFollowUserAPI({
                userToken,
                userBId: user.id,
                userId,
              })
            )
          }
          className="max-w-max  border  bg-transparent
                        border-blue-500  bg-blue-500 text-white   font-bold  py-2  px-4  rounded-full"
        >
          Following
        </button>
      )}
    </div>
  );
};
