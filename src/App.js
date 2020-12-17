import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RouterApp from './router/Router';
import { ThemeProvider } from 'styled-components';
import theme, { GlobalStyle } from './components/Layout/Theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notifications from './components/Notifications';



function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RouterApp />
      </ThemeProvider>
      <Notifications />
      <ToastContainer />
    </Provider>
  );
}

export default App;
