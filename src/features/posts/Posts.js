import { useDocumentTitle } from "../../customHooks";
import { Post } from "../../Components/Post";
import axios from "axios";
import { useEffect } from "react";
export const Posts = () => {
  useDocumentTitle("Posts");
  // useEffect(()=>{
  //   (async()=>{
  //     axios.get("")
  //   })()
  // },[])
  return (
    <div>
      <ul className="list-none">
        <Post />
      </ul>
    </div>
  );
};
