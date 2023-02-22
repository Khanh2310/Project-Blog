import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import PostCategory from "../components/module/home/post/PostCategory";
import PostMeta from "../components/module/home/post/PostMeta";
import { db } from "../firebase-app/firebase-config";
import PostImage from "./PostImage";
import parse from "html-react-parser";
import NotFoundPage from "./NotFoundPage";
import Author from "../components/author/Author";
import PostRelated from "../components/module/home/post/PostRelated";
import { useAuth } from "contexts/auth-context";
import { userRole } from "utils/contains";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 648px;
      img {
        border-radius: 20px;
      }
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-name {
      font-weight: bold;
      margin-bottom: 20px;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
      padding: 5px;
    }
    img {
      padding: 20px;
      margin: 0;
      border-radius: 10px;
    }
    @media screen and (max-width: 1023.98px) {
      padding-bottom: 40px;
      .post {
        &-header {
          flex-direction: column;
        }
        &-feature {
          height: auto;
        }
        &-heading {
          font-size: 26px;
        }
        &-content {
          margin: 40px 0;
        }
      }
      .author {
        flex-direction: column;
        &-image {
          width: 100%;
          height: auto;
        }
      }
    }
  }
`;
const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const { userInfo } = useAuth();

  useEffect(() => {
    async function fetchSlug() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("slug", "==", slug));
      onSnapshot(q, (snapsot) => {
        snapsot.forEach((doc) => {
          setPostInfo(doc && doc.data());
        });
      });
    }
    fetchSlug();
  }, [slug]);

  useEffect(() => {
    window.document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  const date = postInfo?.creactedAt?.seconds
    ? new Date(postInfo?.creactedAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  const { user } = postInfo;
  if (!slug) return <NotFoundPage></NotFoundPage>;
  if (!postInfo.title) return null;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo?.category.slug}>
                {postInfo?.category?.name}
              </PostCategory>
              <h1 className="post-heading font-bold">{postInfo.title}</h1>
              <PostMeta date={formatDate} author={user?.name}></PostMeta>
              {userInfo?.role === userRole.ADMIN && (
                <Link
                  to={`/manage/update-post?id=${postInfo.id}`}
                  className="inline-block px-4 py-2 mt-5 text-sm border border-gray-400 rounded-md"
                >
                  Edit post
                </Link>
              )}
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postInfo?.content || "")}
            </div>
            <Author userId={user.id}></Author>
          </div>
          <PostRelated categoryId={postInfo.categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
