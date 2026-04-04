import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useDocumentTitle(title: string) {
  import("react").then((React) => {
    React.useEffect(() => {
      document.title = title;
    }, [title]);
  });
}
