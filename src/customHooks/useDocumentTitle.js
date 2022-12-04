import { useEffect } from "react";
export const useDocumentTitle = (pageTitle) => {
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);
};
