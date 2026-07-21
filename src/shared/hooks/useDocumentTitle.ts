import { useEffect } from "react";

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    const defaultTitle = "ITX Phone Store";
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}
