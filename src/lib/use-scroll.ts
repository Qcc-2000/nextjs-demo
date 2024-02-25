import { useEffect, useState } from "react";

const useScrollToBottom = (
  callback: () => void,
  offset = 20,
  debounceDelay = 500
) => {
  const [debounced, setDebounced] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (!debounced && scrollHeight - scrollTop <= clientHeight + offset) {
        setDebounced(true);
        console.log("start debounced");
        callback();

        timeoutId = setTimeout(() => {
          console.log("debounced timeout");
          setDebounced(false);
        }, debounceDelay);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      console.log("timeout:", timeoutId);
      //clearTimeout(timeoutId);
    };
  }, [callback, offset, debounceDelay]);
};

export default useScrollToBottom;
