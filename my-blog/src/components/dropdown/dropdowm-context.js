import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

function DropdownProvider(props) {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const value = { show, toggle, setShow };
  return (
    <DropdownContext.Provider value={value}>
      {props.children}
    </DropdownContext.Provider>
  );
}
function useDropdown() {
  const context = useContext(DropdownContext);
  if (typeof context === "undefined") throw new Error("Loi Provider");
  return context;
}
export { DropdownProvider, useDropdown };
