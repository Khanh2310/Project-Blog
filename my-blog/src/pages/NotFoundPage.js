import React from "react";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  width: 100%;
  height: auto;
  max-width: 1000px;
  margin: 100px auto;
  box-shadow: 100px 100px 100px 100px #c3c3c3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .cart {
    width: 100%;
    max-width: 400px;
  }
  .tilte {
    font-size: 10rem;
    color: #c3c3c3;
    font-weight: 900;
  }
  .NotFound-left {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    margin-left: 80px;
  }
  .button {
    padding: 10px;
  }
  .desc {
    text-align: center;
    font-weight: 500;
  }
  .desc-2 {
    font-weight: 500;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <div className="NotFound-left">
        <span className="tilte">404</span>
        <span className="desc">Look like the Van is Empty</span>
        <span className="desc-2">
          The Page you are looking for not Avaliable
        </span>
        <button className="button">Go To Home</button>
      </div>
      <div className="NotFound-right">
        <img
          src="https://cdn.dribbble.com/userupload/3963137/file/original-4a825a2a9b7081c57226a360f416db96.png?compress=1&resize=752x564"
          alt=""
          className="cart"
        />
      </div>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
