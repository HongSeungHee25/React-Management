import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider , createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography:{
    fontFamily: '"Noto Sans KR", serif',
  }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
