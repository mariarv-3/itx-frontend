import { useEffect } from "react";
import { dictionary } from "../i18n/en";

export function useDocumentTitle(title: string | null) {
  useEffect(() => {
    const defaultTitle = dictionary.header.title;
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
}
