import 'styled-components';
type ThemeItems = {
  bg: string;
  bg_light: string;
  color: string;
  item_color: string;
  item_color_darker: string;
};
declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    primary: ThemeItems;
    secondary: {
      bg: string;
      bg_light: string;
      color: string;
      color_p: string;
    };
  }
}
