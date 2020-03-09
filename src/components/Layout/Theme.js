import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
body {
  background: #FFFFFF;
  color: #1F1F3D;
  font-family: 'Open Sans';
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


`

export default {
  isDark: false,
  baseColors: {
    darker: "#151531",
    dark: "#1F1F3D",
    darkMiddle: "#3B3B64",
    middle: "#9695B7",
    middleLight: "#BDBFDF",
    light: "#F6F8FF;",
  },
  accentColors: {
    primary: {
      color: "#6670F0",
      hover: "#5767F9;",
      disabled: "#BDBFDF",
      text: "white",
    },
    secondary: {
      color: "#E3BBEA",
      hover: "#CF92E5",
      text: "#1F1F3D",
      disabled: "#BDBFDF"
    },
  },
  borderRadius: {
    small: "8px",
    normal: "16px",
  }
}