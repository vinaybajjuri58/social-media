import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../Components/Post";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import { Comment, AddComment } from "../../Components/";
import BeatLoader from "react-spinners/BeatLoader";
import { getSinglePost } from "./postSlice";
import { useEffect } from "react";
const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";
export const SinglePost = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const { userToken } = useSelector((store) => store.authData);
  const { singlePost, apiCallStatus } = useSelector((store) => store.postsData);
  useEffect(() => {
    if (singlePost === null || postId !== singlePost._id) {
      dispatch(getSinglePost({ postId }));
    }
  }, [dispatch, postId, singlePost]);
  return (
    <div>
      <div className="fixed mt-15 ml-20">
        {(singlePost === null ||
          apiCallStatus === "loading" ||
          postId !== singlePost._id) && (
          <BeatLoader
            color={color}
            loading={apiCallStatus}
            css={override}
            size={15}
          />
        )}
      </div>
      {singlePost !== null && postId === singlePost._id && (
        <>
          <Post
            postData={{
              ...singlePost,
              userId: singlePost.userId.id,
              name: singlePost.userId.name,
              userImage: singlePost.userId.userImage,
              userName: singlePost.userId.userName,
              postId: singlePost._id,
            }}
          />
          <AddComment userToken={userToken} postId={singlePost._id} />
          {singlePost.comments.length > 0 &&
            singlePost.comments.map((comment) => (
              <Comment
                key={comment._id}
                commentData={comment}
                postId={singlePost._id}
              />
            ))}
        </>
      )}
    </div>
  );
};
