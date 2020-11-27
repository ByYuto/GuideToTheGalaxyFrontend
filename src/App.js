import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Router from './router/Router';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from './components/Layout/Theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
}

export default App;
