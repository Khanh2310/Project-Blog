import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/scss";
import PostItem from "./PostItem";
const PostRelated = ({ categoryId = "" }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    // truy vấn bài viết liên quan
    const colRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setPost(results);
      });
    });
  }, [categoryId]);
  if (!categoryId) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      {/* <div className="grid-layout grid-layout--primary "> */}
      <Swiper grabCursor={"true"} slidesPerView={4} spaceBetween={50}>
        {post &&
          post.length > 0 &&
          post.map((item) => (
            <SwiperSlide key={item.id}>
              <PostItem key={item.id} data={item}></PostItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
    //  </div>
  );
};

export default PostRelated;
