import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-app/firebase-config";
const Author = ({ userId = "" }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchDataUser() {
      const colRef = doc(db, "users", userId);
      const onSnapshot = await getDoc(colRef);
      setUser(onSnapshot.data());
    }
    fetchDataUser();
  }, [userId]);
  if (!userId) return null;
  return (
    <div className="author">
      <div className="author-image ">
        <img className=" flex " src={user?.avatar} alt="" />
      </div>
      <div className="author-content m-2">
        <h3 className="author-name">{user?.name}</h3>
        <p className="author-desc ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          non animi porro voluptates quibusdam optio nulla quis nihil ipsa error
          delectus temporibus nesciunt, nam officiis adipisci suscipit voluptate
          eum totam!
        </p>
      </div>
    </div>
  );
};

export default Author;
