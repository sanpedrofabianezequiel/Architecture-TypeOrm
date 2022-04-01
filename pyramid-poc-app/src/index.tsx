import React from 'react';
import ReactDOM from 'react-dom';
import PrimeReact from 'primereact/api';
import 'normalize.css/normalize.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {SWRConfiguration, SWRConfig} from "swr";
import {makeSWRGlobalFetcher} from "./platform/api";

PrimeReact.ripple = true;

const swrConfig: SWRConfiguration = {
  fetcher: makeSWRGlobalFetcher(),
  shouldRetryOnError: false,
};

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={swrConfig}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
