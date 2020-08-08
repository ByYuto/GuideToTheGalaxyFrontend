import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

html, body, #root {
  height: 100%;
  width: 100%;
}
* {
  box-sizing: border-box;
}
body {
  background: #FFFFFF;
  color: #1F1F3D;
  font-family: 'Open Sans';
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1{
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 72px;
  line-height: 86px;
}

h2 {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 40px;
}

h3 {
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
}

h4 {
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
}

h5 {
  font-family: Pragati Narrow;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 19px;
  /* identical to box height */
  
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

h6 {
  font-family: Pragati Narrow;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
}

.Toastify__toast--default {
  background: #3B3B64;
  color: white;
}

.Toastify__progress-bar {
  background: #151531;
}

a {
 color: #6670F0;
 font-family: Open Sans;
 font-style: normal;
 font-weight: normal;
 font-size: 14px;
 line-height: 22px;
 text-decoration: none;

 &:hover {
  text-decoration: underlined;
 }
}

`;

export default {
  isDark: false,
  baseColors: {
    black: '#000000',
    darker: '#151531',
    dark: '#1F1F3D',
    darkMiddle: '#3B3B64',
    middle: '#9695B7',
    middleLight: '#BDBFDF',
    light: '#F6F8FF',
    white: '#FFFFFF',
  },
  accentColors: {
    primary: {
      color: '#6670F0',
      hover: '#5767F9',
      disabled: '#BDBFDF',
      text: 'white',
    },
    secondary: {
      color: '#E3BBEA',
      hover: '#CF92E5',
      text: '#1F1F3D',
    },
    darker: {
      text: '#BDBFDF',
      color: '#151531',
      textHover: 'white',
    },
  },
  borderRadius: {
    small: '8px',
    normal: '16px',
  },
  breakpoints: {
    tablet: '43em',
    small: '62em',
    large: '82em',
  },
};
