import { useEffect, useState } from "react";

export function useDebounce(initialValue, delay) {
  const [debounce, setDebounce] = useState(initialValue);
  const timer = useEffect(() => {
    setTimeout(() => {
      setDebounce(initialValue);
    }, delay);
    return () => clearTimeout(timer);
  }, [initialValue, delay]);
  return {
    debounce,
  };
}
