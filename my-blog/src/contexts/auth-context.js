import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfor, setUserInfo] = useState({});
  const value = { userInfor, setUserInfo };
  // reder ra DOM
  // onAuthStateChanged: lấy thông tin chúng ta đã đăng kí, hoặc đăng nhập
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const colRef = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        onSnapshot(colRef, (snapshot) => {
          snapshot.forEach((doc) => {
            setUserInfo({
              ...user,
              ...doc.data(),
            });
          });
        });
      } else {
        setUserInfo(null);
      }
    });
  }, []);
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined") throw new Error("Provider error");
  return context;
}
export { useAuth, AuthProvider };
