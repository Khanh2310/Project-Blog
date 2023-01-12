import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types"; // ES6
import { Loading } from "../loading";
const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 25px;
  justify-content: center;
  align-items: center;
  line-height: 1;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  margin: 0 auto;
  display: block;
  color: white;
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: white;
      background: ${(props) => props.theme.bgButton};
      width: 50%;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      background: #18c4d7;
      color: white
      width: 100%; 
    };
    `};
  ${(props) =>
    props.kind === "secondary2" &&
    css`
      color: white;
      background: ${(props) => props.theme.bgButton};
      width: 100%;
    `};

  outline: none;
  border: none;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  kind = "secondary",
  ...props
}) => {
  // tạo 1 biến để chúng ta lấy props từ bên kia truyền vào
  const { isLoading, to } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink
        to={to}
        style={{ display: "inline-block", textDecoration: "none" }}
      >
        <ButtonStyles kind={kind} onClick={onClick} {...props} type={type}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles kind={kind} onClick={onClick} {...props} type={type}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
