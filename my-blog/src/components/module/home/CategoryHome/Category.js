import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import LoadingSkeleton from "pages/LoadingSkeleton";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "../post/PostItem";

const Category = () => {
  const { slug } = useParams();
  const [category, setCaterogy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const colRef = query(
      collection(db, "posts"),
      where("category.slug", "==", slug)
    );
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
        setCaterogy(results);
        setLoading(false);
      });
    });
  }, [slug]);
  const CategorySkeleton = () => {
    return (
      <div className="text-white rounded-lg select-none  caterogy ">
        <LoadingSkeleton
          width="348px"
          height="272px"
          className="rounded-xl"
        ></LoadingSkeleton>
      </div>
    );
  };
  if (!slug) return;
  return (
    <Layout>
      <div className="mt-10">
        <div className="container ">
          <Heading>Danh mục bài viết</Heading>
          <div className="grid-layout ">
            {loading && (
              <>
                <CategorySkeleton></CategorySkeleton>

                <CategorySkeleton></CategorySkeleton>

                <CategorySkeleton></CategorySkeleton>

                <CategorySkeleton></CategorySkeleton>

                <CategorySkeleton></CategorySkeleton>

                <CategorySkeleton></CategorySkeleton>
              </>
            )}
            {!loading &&
              category &&
              category.length > 0 &&
              category.map((item) => (
                <PostItem key={item.id} data={item}></PostItem>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
