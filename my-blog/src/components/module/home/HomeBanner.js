import { Button } from "components/button";
import React from "react";
import styled from "styled-components";
const HomeBannerStyles = styled.div`
  min-height: 500px;
  background-color: #f6f6f6;
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .banner-content {
    max-width: 600px;
    /* padding-left: 59px; */
  }
  .banner-heading {
    font-size: 48px;
    user-select: none;

    margin-bottom: 20px;
  }
  .banner-desc {
    line-height: 1.75;
    user-select: none;
  }
  .banner-image {
    width: 100%;
  }
  .banner-image img {
    /* width: 500px; */
    width: 100%;
    user-select: none;
  }
  .btn {
    margin-top: 50px;
    user-select: none;
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
      }
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Cow Blogging</h1>
            <span className="banner-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi.
            </span>
            <div className="btn">
              <Button kind="primary" to="/sign-in">
                Get started
              </Button>
            </div>
          </div>
          <div className="banner-image">
            <img
              src="https://cdn.dribbble.com/userupload/4110842/file/original-2ab43b0e5f734a7dae03f39719d650e5.png?compress=1&resize=752x752"
              alt=""
            />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
