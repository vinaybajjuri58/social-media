import { Post } from "../../Components/Post";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postSlice";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import { AddPost } from "../../Components/AddPost";
const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";
export const Posts = ({ userId }) => {
  const postsData = useSelector((store) => store.postsData);

  const dispatch = useDispatch();
  useEffect(() => {
    if (postsData.status === "idle") {
      dispatch(getPosts());
    }
  }, [dispatch, postsData.status]);
  useEffect(() => {
    if (postsData.status === "error") {
      toast.error("Failed to load posts !");
    }
  }, [dispatch, postsData.status]);

  const posts = userId
    ? postsData.posts.filter((post) => post.userId === userId)
    : postsData.posts;

  return (
    <div className="w-full">
      <div className="fixed mt-20 ml-20">
        {postsData.apiCallStatus === "loading" && (
          <BeatLoader
            color={color}
            loading={postsData.apiCallStatus}
            css={override}
            size={15}
          />
        )}
      </div>
      {postsData.status === "loading" && (
        <BeatLoader
          color={color}
          loading={postsData.status}
          className="fixed top-1/2 left-1/2"
          css={override}
          size={15}
        />
      )}
      {postsData.status === "success" && (
        <div>
          {!userId && <AddPost />}
          {posts.map((post) => (
            <Post key={post.postId} postData={post} />
          ))}
        </div>
      )}
    </div>
  );
};
