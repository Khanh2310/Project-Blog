import { useState } from "react";

export default function useToggle() {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return {
    on,
    toggle,
  };
}
