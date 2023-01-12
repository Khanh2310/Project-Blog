import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types"; // ES6
const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #6b6b6b;
  margin-top: auto;
`;
const PostMeta = ({
  date = " Mar 23",
  author = "Andiez Le",
  className = "",
}) => {
  return (
    <PostMetaStyles>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <span className="post-author">{author}</span>
    </PostMetaStyles>
  );
};

PostMeta.propTypes = {
  date: PropTypes.string,
  author: PropTypes.string,
};
export default PostMeta;
