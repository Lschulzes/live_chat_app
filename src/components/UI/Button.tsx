import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
const ButtonButton = styled.button`
  border-radius: 8px;
  background-color: ${(props) => props.theme.secondary.bg_light};
  cursor: pointer;
  color: #fff;
  /* border: dotted 1px #f0f0f0; */
  border: none;
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
