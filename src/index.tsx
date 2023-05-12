import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { APP_LOCALE, locales } from "./config";
import { IntlProvider } from "react-intl";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <IntlProvider locale={APP_LOCALE} messages={locales[APP_LOCALE]}>
      <App />
    </IntlProvider>
  </React.StrictMode>
);
