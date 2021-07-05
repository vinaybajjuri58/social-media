import { UserDisplay } from "./UserDisplay";
export const FollowersModal = ({ followers, displayState, toggleDisplay }) => {
  return (
    <div
      className="rounded-lg shadow-lg max-h-96 bg-gray-100 modal mt-6 z-10 w-full  md:mt-20 md:ml-80 md:w-1/3 p-0"
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
              <UserDisplay key={follower.id} user={follower} />
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
