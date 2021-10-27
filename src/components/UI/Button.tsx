import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
const ButtonButton = styled.button`
  border-radius: 8px;

  background-image: ${(props) =>
    `linear-gradient(180deg, ${props.theme.primary.item_color},${props.theme.primary.item_color_darker})`};
  cursor: pointer;
  color: #fff;
  border: none;
  height: 3rem;
  transition: filter 300ms;
  padding: 0 1rem;

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
