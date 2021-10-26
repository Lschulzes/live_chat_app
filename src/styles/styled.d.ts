import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    primary: {
      bg: string;
      color: string;
    };
    secondary: {
      bg: string;
      color: string;
      color_p: string;
    };
  }
}
