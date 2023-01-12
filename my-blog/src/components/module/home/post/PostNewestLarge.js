import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      /* display: inline-block;
      padding: 8px 12px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      background-color: #f3edff;
      margin-bottom: 16px; */
      margin-bottom: 8px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewestLarge = ({ data }) => {
  console.log("PostNewestLarge  data", data);
  if (!data) return;
  const date = data?.creactedAt?.senconds
    ? data?.creactedAt?.senconds * 1000
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  return (
    <PostNewestLargeStyles>
      <div className="post-image">
        <img src={data?.image} alt="" />
      </div>
      <PostCategory to={data?.slug} className="post-category">
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data.slug} size="big" className="post-title">
        {data?.title}
      </PostTitle>
      <PostMeta date={formatDate} author={data?.user?.name}></PostMeta>
    </PostNewestLargeStyles>
  );
};
export default PostNewestLarge;
