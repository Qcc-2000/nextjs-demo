import { useEffect } from "react";

const useScrollToBottom = (callback: () => void, offset = 50) => {
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight + offset) {
        console.log("scroll to bottom");

        callback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback, offset]);
};

export default useScrollToBottom;
