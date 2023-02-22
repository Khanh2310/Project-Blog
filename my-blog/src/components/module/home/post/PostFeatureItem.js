import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 272px;
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: white;
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
      font-weight: bold;
      line-height: 1.5;
      display: block;
      font-size: 20px;
      color: white;
      bottom: 0%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    @media screen and (min-width: 1024px) {
      height: 272px;
    }
    @media screen and (max-width: 1023.98px) {
      .post {
        &-content {
          padding: 15px;
        }
      }
    }
  }
`;
const PostFeatureItem = ({ data }) => {
  const { category, user } = data;

  const date = data?.creactedAt?.seconds * 1000;
  const getDatePost = new Date(date).getDate();
  const getMonthPost = new Date(date).getMonth() + 1;
  return (
    <PostFeatureItemStyles>
      <img src={data.image} alt="unsplash" className="post-image" />
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {data.category?.name && (
            <PostCategory to={category.slug}>{category.name}</PostCategory>
          )}
          <div className="post-info">
            <span className="post-time px-2 whitespace-nowrap">{`${getDatePost} / ${getMonthPost}`}</span>
            <span className="post-dot"></span>
            <span className="post-author whitespace-nowrap">{user?.name}</span>
          </div>
        </div>
        <PostTitle title={data.slug} to={data.slug}>
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
