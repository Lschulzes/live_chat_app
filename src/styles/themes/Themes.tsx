type ThemeStructure = {
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
};

export const lightTheme: ThemeStructure = {
  title: 'light',
  primary: {
    bg: '#f8f8f8',
    color: '#29292e',
  },
  secondary: {
    bg: '#835afd',
    color: '#fff',
    color_p: '#f8f8f8',
  },
};

export const darkTheme: ThemeStructure = {
  title: 'dark',
  primary: {
    bg: '#29292e',
    color: '#f8f8f8',
  },
  secondary: {
    bg: '#835afd',
    color: '#fff',
    color_p: '#f8f8f8',
  },
};
