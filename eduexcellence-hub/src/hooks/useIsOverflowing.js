// hooks/useIsOverflowing.js
import { useState, useEffect } from "react";

export const useIsOverflowing = (ref) => {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [ref, ref?.current?.scrollHeight, ref?.current?.clientHeight]);

  return isOverflowing;
};
export default useIsOverflowing;