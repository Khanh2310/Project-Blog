import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 16px;
      }
    }
    &-category {
      display: inline-block;
      padding: 8px;
      border-radius: 8px;
      color: #6b6b6b;
      font-size: 14px;
      font-weight: 600;
      background-color: #f3edff;
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #6b6b6b;
      margin-top: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 18px;
      margin-bottom: 8px;
    }
  }
`;

const PostItem = ({ data }) => {
  const navigate = useNavigate();
  if (!data || data.length <= 0) return;
  const date = data?.creactedAt?.seconds
    ? data?.creactedAt?.seconds * 1000
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VN");
  return (
    <PostItemStyles>
      <div
        className="post-image cursor-pointer"
        onClick={() => navigate(`/${data.slug}`)}
      >
        <img src={data?.image} alt="" />
      </div>
      <div
        className="post-category"
        onClick={() => navigate(`/category/${data.slug}`)}
      >
        {data?.category?.name}
      </div>
      <PostTitle className="title-related" to={data.slug}>
        {data.title}
      </PostTitle>
      <PostMeta date={formatDate} author={data.user.name}></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
