import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './styled.d';
import { ThemeProvider } from 'styled-components';

import './styles/globals.css';
import App from './App';
import { SbCallsProvider } from './lib/sendbird-calls';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SbCallsProvider appId="">
      <ThemeProvider theme={{ isWidget: false }}>
        <App/>
      </ThemeProvider>
    </SbCallsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
