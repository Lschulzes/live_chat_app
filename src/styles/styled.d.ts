import 'styled-components';
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    primary: {
      bg: string;
      bg_light: string;
      color: string;
    };
    secondary: {
      bg: string;
      bg_light: string;
      color: string;
      color_p: string;
    };
  }
}
