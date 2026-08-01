import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { installSearchPage } from './search-page';
import './styles.css';
import './header-location.css';
import './search-bar.css';
import './search-page.css';
import './category-cards.css';
import './bottom-nav.css';
import './promo-image';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

installSearchPage();
