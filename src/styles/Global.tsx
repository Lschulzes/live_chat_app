import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.primary.bg};
    color: ${(props) => props.theme.primary.color};
    transition: background .25s;
  }

  body,
  input,
  button,
  textarea {
    font: 400 16px 'Roboto', sans-serif;
  }
`;
