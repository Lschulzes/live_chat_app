type ThemeStructure = {
  title: string;
  primary: {
    bg: string;
    bg_light: string;
    color: string;
    item_color: string;
    item_color_darker: string;
  };
  secondary: {
    bg: string;
    bg_light: string;
    color: string;
    color_p: string;
  };
};

export const lightTheme: ThemeStructure = {
  title: 'light',
  primary: {
    bg: '#f8f8f8',
    bg_light: '#fff',
    color: '#29292e',
    item_color: '#00a2e2',
    item_color_darker: '#0690c7',
  },
  secondary: {
    bg: '#0075b4',
    bg_light: '#1c9ee4',
    color: '#fff',
    color_p: '#f8f8f8',
  },
};

export const darkTheme: ThemeStructure = {
  title: 'dark',
  primary: {
    bg: '#333',
    bg_light: '#444',
    color: '#f8f8f8',
    item_color: '#4e4e4e',
    item_color_darker: '#3e3e3e',
  },
  secondary: {
    bg: '#222',
    bg_light: '#333',
    color: '#fff',
    color_p: '#f8f8f8',
  },
};
