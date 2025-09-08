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
    fontfamily: "louiscondensedregular",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    color: colors.grey600,
  },
  input: {
    borderRadius: 5,
    backgroundColor: "#fff",
    fontFace: "LouisCondensedRegular",
    fontSize: 16,
    lineHeight: 20,
    borderColor: "#e2e8f0",
    color: "#1a202c",
    borderWidth: 1,
    padding: 8,
    width: 208,
  },
  logo: { padding: 20, margin: 10 },
  title: { fontFamily: "LouisCondensedRegular", fontSize: 32 },
  link: { fontSize: 24, fontFamily: "LouisCondensedRegular", color: "003155" },
  inputText: {
    fontFamily: "LouisCondensedRegular",
    color: colors.grey900,
    fontSize: 16,
    lineHeight: 22,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 900,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#003155",
    borderRadius: 8,
    height: 37,
    justifyContent: "center",
  },
  headline3: {
    fontFamily: "LouisCondensedRegular",
    fontSize: 21,
    fontWeight: "400",
  },
  headline4: {
    color: "#4a5566",
    fontfamily: "louiscondensedregular",
    fontsize: 17,
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
  h1: { fontSize: 32, fontWeight: "bold" },
  h2: { fontSize: 24, fontWeight: "bold" },
  h3: { fontSize: 20, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "normal" },
  caption: { fontSize: 14, fontWeight: "normal" },
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
  spacing,
  typography,
  borderRadius,
  shadows,
});
