import { useDocumentTitle } from "../../customHooks";

export const Posts = () => {
  useDocumentTitle("Posts");
  return (
    <div>
      <h2 className="text-4xl text-blue-500 text-center font-bold">Posts</h2>
    </div>
  );
};
