import React from "react";
import styled from "styled-components";
const LabelStyled = styled.label`
  color: ${(props) => props.theme.grayDark};
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`;
const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyled htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyled>
  );
};

export default Label;
