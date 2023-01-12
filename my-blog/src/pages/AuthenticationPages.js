import React from "react";
import styled from "styled-components";
const AuthenStyled = styled.div`
  min-height: 100vh;
  padding: 20px;
  width: 100%;
  .logo {
    margin: 0 auto;
    display: block;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.brown};
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .forgot-password {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 10px;
    right: 0;
    transform: translate(4%, -100%);
    a {
      text-decoration: none;
      color: ${(props) => props.theme.brown};
    }
    span {
      padding: 0 5px;
    }
  }
`;
const AuthenticationPages = ({ children }) => {
  return <AuthenStyled>{children}</AuthenStyled>;
};

export default AuthenticationPages;
