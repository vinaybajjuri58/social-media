import { useDocumentTitle } from "../../customHooks";
import { Post } from "../../Components/Post";

export const Posts = () => {
  useDocumentTitle("Posts");
  return (
    <div>
      <ul className="list-none">
        <Post />
      </ul>
    </div>
  );
};
