import { Post } from "../../Components/Post";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postSlice";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
const override = css`
  display: block;
  margin: 80px 80px;
  border-color: blue;
`;
const color = "blue";
export const Posts = () => {
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

  return (
    <div className="w-full">
      {postsData.status === "loading" && (
        <BeatLoader
          color={color}
          loading={postsData.status}
          css={override}
          size={15}
        />
      )}
      {postsData.status === "success" && (
        <div>
          {postsData.posts.map((post) => (
            <Post key={post.postId} postData={post} />
          ))}
        </div>
      )}
    </div>
  );
};
