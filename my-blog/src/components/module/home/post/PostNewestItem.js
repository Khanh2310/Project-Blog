import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 12px;
      }
    }
    &-category {
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
      color: #6b6b6b;
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
      font-size: 16px;
      margin-bottom: 8px;
    }
    @media screen and (max-width: 1023.98px) {
      margin-bottom: 14px;
      padding-bottom: 14px;
      .post {
        &-image {
          width: 140px;
          height: 100px;
        }
      }
    }
  }
`;
const PostNewestItem = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return null;
  const date = data?.creactedAt?.seconds
    ? data?.creactedAt?.seconds * 1000
    : new Date();
  const format = new Date(date).toLocaleDateString("vi-VN");
  return (
    <PostNewestItemStyles>
      <div
        className="post-image"
        onClick={() => navigate(`/category/${data.slug}`)}
      >
        <img src={data?.image} alt="" />
      </div>
      <div className="post-content">
        <PostCategory
          to={data?.slug}
          className="post-category"
          type="secondary"
        >
          {data?.category?.name}
        </PostCategory>
        <PostTitle to={data.slug}>{data?.title}</PostTitle>
        <PostMeta date={format} author={data?.user?.name}></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;
