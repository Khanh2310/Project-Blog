import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
const InputStyles = styled.div`
  width: 100%;
  position: relative;
  input {
    width: 100%;
    padding: ${(props) =>
      props.hasIcon ? "20px 0px 20px 20px" : " 20px 0px 20px 20px"};
    background-color: ${(props) => props.theme.grayLight};
    font-weight: 500;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    border-radius: 8px;
    outline: none;
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => props.theme.brown};
  }
  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }
  .icon-eye {
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translate(100%, -40%);
    cursor: pointer;
  }
`;
const Input = ({
  name = "",
  type = "text",
  children,
  hasIcon = false,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input id={name} type={type} {...field} {...props} />
      {children}
    </InputStyles>
  );
};

export default Input;
