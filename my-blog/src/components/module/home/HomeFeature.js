import Heading from "components/layout/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import PostFeatureItem from "./post/PostFeatureItem";
const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, []);

  //Feature
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Bài viết nổi bật</Heading>
        {/* <div className="grid-layout "> */}
        {/* <Swiper spaceBetween={40} slidesPerView={3} grabCursor={"true"}>
          {posts.length > 0 &&
            posts.map((post) => (
              <SwiperSlide key={post.id}>
                <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
              </SwiperSlide>
            ))}
        </Swiper> */}
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
        </div>
      </div>
      {/* </div> */}
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
