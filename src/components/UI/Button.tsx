import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
const ButtonButton = styled.button`
  border-radius: 8px;
  background-image: ${(props) =>
    `linear-gradient(180deg, ${props.theme.primary.item_color},${props.theme.primary.item_color_darker})`};
  cursor: pointer;
  color: ${({ theme, className }) =>
    theme.title === 'light'
      ? className === 'outlined'
        ? theme.primary.item_color
        : theme.primary.bg
      : '#fff'};
  border: none;
  height: 3rem;
  transition: filter 300ms;
  padding: 0 1rem;

  ${({ className, theme }) =>
    className === 'outlined' &&
    `
    background: transparent;
    border: solid 1px ${theme.primary.item_color};`}

  &:hover {
    filter: brightness(0.9);
  }

  &::disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

type ButtonUIType = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export default function Button({ isOutlined, ...props }: ButtonUIType) {
  return <ButtonButton {...props} className={isOutlined ? `outlined` : ''} />;
}
