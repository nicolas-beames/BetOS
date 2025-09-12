import { colors, lightColors, darkColors } from "./colors";

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    fontfamily: "louiscondensedregular",
  },

  button: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 14,
    fontWight: "bold",
  },

  title: { fontFamily: "LouisCondensedRegular", fontSize: 32 },

  headline3: {
    fontSize: 21,
    fontFamily: "LouisCondensedRegular",
    fontWeight: "400",
  },
  headline4: {
    fontfamily: "louiscondensedregular",
    fontsize: 17,
    fontWeight: "bold",
    lineheight: 24,
  },
  headline6: {
    fontfamily: "louiscondensedregular",
    fontsize: 14,
    lineheight: 20,
    fontweight: "500",
  },
  paragraph: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 16,
    lineHeight: 22,
  },
  h1: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 24,
    fontWeight: "bold",
  },
  h3: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 20,
    fontWeight: "600",
  },
  body: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 16,
    fontWeight: "normal",
  },
  caption: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 14,
    fontWeight: "normal",
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

export const shadows = {
  small: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const createTheme = (isDark = false) => ({
  colors: isDark ? darkColors : lightColors,
  defaultColors: colors,
  spacing,
  typography,
  borderRadius,
  shadows,
});
