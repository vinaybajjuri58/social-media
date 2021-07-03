export const FollowersModal = ({ followers, displayState, toggleDisplay }) => {
  return (
    <div
      className="rounded-lg shadow-lg max-h-96 bg-gray-100 modal mt-20 ml-80 z-10  md:mt-16 md:w-1/3 p-0"
      id="modal"
      style={{
        display: displayState ? "block" : "none",
      }}
    >
      <div className="modal-content p-0 m-0 w-full">
        <div className="border-b border-blue-400 text-gray-800 mt-0 bg-blue-400 w-full">
          <button onClick={toggleDisplay} className="p-4 text-lg text-black">
            X
          </button>
        </div>
        {followers.length > 0 ? (
          <div className="relative p-4 pl-20 w-full border-gray-0">
            {followers.map((follower) => (
              <UserDisplay user={follower} />
            ))}
          </div>
        ) : (
          <div className="relative p-4 pl-20 w-full border-gray-0">
            <p>No followers</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserDisplay = ({ user }) => {
  return (
    <div className="flex">
      <img src={user.userImage} alt={user.userName} />
      <div className="flex flex-col">
        <p>{user.name}</p>
        <p>@{user.userName}</p>
      </div>
      <button className="border-blue-300 text-gray-50 bg-blue-300">
        Following
      </button>
    </div>
  );
};
