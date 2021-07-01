import { useDocumentTitle } from "../../customHooks";
import { Post } from "../../Components/Post";

export const Posts = () => {
  useDocumentTitle("Posts");
  return (
    <div className="w-full">
      <ul className="list-none">
        <Post />
      </ul>
    </div>
  );
};
