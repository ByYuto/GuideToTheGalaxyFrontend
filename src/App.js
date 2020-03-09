import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './components/Router/Router';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from './components/Layout/Theme';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Provider >
  );
}

export default App;