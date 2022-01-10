import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/styles.css';
import { SWRConfig } from 'swr';
import { fetcher } from 'utils/fetcher';
import { App } from './App';
import './utils/i18n';

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root'),
);
