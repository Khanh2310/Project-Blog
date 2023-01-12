import Layout from "components/layout/Layout";
import HomeBanner from "components/module/home/HomeBanner";
import HomeFeature from "components/module/home/HomeFeature";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeNewst from "components/module/home/HomeNewst";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";
const HomePageStyles = styled.div``;
const HomePages = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", false)
    );
    onSnapshot(q, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(results);
    });
  }, []);
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewst data={post}></HomeNewst>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePages;
