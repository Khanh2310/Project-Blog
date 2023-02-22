import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3}; ;
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `};
  @media screen and (max-width: 1023.98px) {
    font-size: 10px;
  }
`;
const PostCategory = ({
  children,
  className = "post-category",
  type = "primary",
  to = "",
}) => {
  return (
    <PostCategoryStyles className={className} type={type}>
      <Link to={`/category/${to}`}>{children}</Link>
    </PostCategoryStyles>
  );
};

export default PostCategory;
