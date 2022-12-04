import { UserDisplay } from "./UserDisplay";
import { useSelector } from "react-redux";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
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
export const FollowersModal = ({ followers, displayState, toggleDisplay }) => {
  const { apiCallStatus } = useSelector((store) => store.userData);
  return (
    <div
      className="rounded-lg shadow-lg bg-gray-100 modal max-h-96 z-10 w-full  mt-20 md:ml-80 md:w-1/3 p-0"
      id="modal"
      style={{
        display: displayState ? "block" : "none",
      }}
    >
      <div className="modal-content p-0 m-0 w-full">
        {apiCallStatus === "loading" && (
          <BeatLoader
            color={color}
            loading={apiCallStatus}
            css={override}
            size={15}
          />
        )}
        <div className="border-b border-blue-400 text-gray-800 mt-0 bg-blue-400 w-full">
          <button onClick={toggleDisplay} className="p-4 text-lg text-black">
            X
          </button>
          <span className="p-4 text-lg text-black">Followers</span>
        </div>
        {followers.length > 0 ? (
          <div className="relative p-1 w-full border-gray-0">
            {followers.map((follower) => (
              <UserDisplay key={follower.id} user={follower} />
            ))}
          </div>
        ) : (
          <div className="relative p-4 pl-20  w-full border-gray-0">
            <p>No followers</p>
          </div>
        )}
      </div>
    </div>
  );
};
