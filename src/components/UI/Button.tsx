import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
const ButtonButton = styled.button`
  border-radius: 8px;
  background-color: ${(props) => props.theme.secondary.bg};
  cursor: pointer;
  color: #fff;
  border: solid 1px #a8b0b0;
  height: 3rem;
  transition: filter 300ms;

  &:hover {
    filter: brightness(0.9);
  }

  &::disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <ButtonButton {...props} />;
}
