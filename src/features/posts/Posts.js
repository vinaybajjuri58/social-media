import { Post, LoadingComponent } from "../../Components/";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "./postSlice";
import { toast } from "react-toastify";
import { AddPost } from "../../Components/AddPost";

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
          <LoadingComponent apiCallStatus={postsData.apiCallStatus} />
        )}
      </div>
      {postsData.status === "loading" && (
        <LoadingComponent apiCallStatus={postsData.status} />
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
