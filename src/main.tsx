import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { installSearchPage } from './search-page';
import { installFoodJunctionImage } from './store-images/installFoodJunctionImage';
import { installPromoCarousel } from './promo-carousel';
import './styles.css';
import './header-location.css';
import './search-bar.css';
import './search-page.css';
import './category-cards.css';
import './promo-carousel.css';
import './store-images/freshmart.css';
import './store-images/quickfix.css';
import './bottom-nav.css';
import './promo-image';
import './grocery-section';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

installSearchPage();
installFoodJunctionImage();
installPromoCarousel();
