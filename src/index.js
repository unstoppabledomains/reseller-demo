import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import theme from './styles/theme';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// import './index.css';
// import './spinners.css';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
