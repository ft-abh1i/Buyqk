import { useState } from 'react';
import {
  Bell,
  ChevronDown,
  ClipboardList,
  Home,
  LocateFixed,
  MapPin,
  Mic,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  UserRound,
  Zap,
} from 'lucide-react';
import ImageWithFallback from './components/ImageWithFallback';

type Category = {
  label: string;
  image: string;
  fallback: string;
  className: string;
};

type Store = {
  name: string;
  image: string;
  fallback: string;
  badge: string;
  rating: string;
  eta: string;
  badgeClass: string;
};

const categories: Category[] = [
  {
    label: 'Daily Essentials',
    image: '/assets/categories/daily-essentials.webp',
    fallback: '🧺',
    className: 'category-card--essentials',
  },
  {
    label: 'Food & Dining',
    image: '/assets/categories/food-dining.webp',
    fallback: '🍔',
    className: 'category-card--food',
  },
  {
    label: 'Medicines',
    image: '/assets/categories/medicines.webp',
    fallback: '💊',
    className: 'category-card--medicine',
  },
  {
    label: 'Services',
    image: '/assets/categories/services.webp',
    fallback: '🛠️',
    className: 'category-card--services',
  },
  {
    label: 'Freelancers',
    image: '/assets/categories/freelancers.webp',
    fallback: '💻',
    className: 'category-card--freelancers',
  },
  {
    label: 'Beauty',
    image: '/assets/categories/beauty.webp',
    fallback: '💄',
    className: 'category-card--beauty',
  },
  {
    label: 'Kids',
    image: '/assets/categories/kids.webp',
    fallback: '🧸',
    className: 'category-card--kids',
  },
];

const stores: Store[] = [
  {
    name: 'FreshMart',
    image: '/assets/stores/freshmart.webp',
    fallback: 'FM',
    badge: '10 mins',
    rating: '4.4',
    eta: '10–15 min',
    badgeClass: 'store-badge--green',
  },
  {
    name: 'Food Junction',
    image: '/assets/stores/food-junction.webp',
    fallback: 'FJ',
    badge: '15 mins',
    rating: '4.3',
    eta: '15–20 min',
    badgeClass: 'store-badge--orange',
  },
  {
    name: 'QuickFix Services',
    image: '/assets/stores/quickfix.webp',
    fallback: 'QF',
    badge: '20 mins',
    rating: '4.6',
    eta: '20–25 min',
    badgeClass: 'store-badge--violet',
  },
];

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'ai', label: 'QK AI', icon: Sparkles },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'account', label: 'Account', icon: UserRound },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [query, setQuery] = useState('');

  return (
    <div className="page-shell">
      <div className="app-frame">
        <main className="app-content">
          <header className="top-header">
            <button className="location-control" type="button" aria-label="Change delivery location">
              <span className="location-icon-wrap">
                <MapPin size={27} strokeWidth={2.8} />
              </span>
              <span className="location-copy">
                <span className="location-kicker">Deliver to</span>
                <span className="location-name-row">
                  <strong>Ghaziabad</strong>
                  <ChevronDown size={21} strokeWidth={2.5} />
                </span>
              </span>
            </button>

            <div className="header-actions">
              <button className="round-action" type="button" aria-label="Notifications">
                <Bell size={23} strokeWidth={2.1} />
                <span className="action-badge">3</span>
              </button>
              <button className="round-action" type="button" aria-label="Cart">
                <ShoppingCart size={25} strokeWidth={2.1} />
                <span className="action-badge">2</span>
              </button>
            </div>
          </header>

          <section className="search-panel" aria-label="Search BuyQK">
            <Search className="search-leading-icon" size={27} strokeWidth={2} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, food, medicines or services"
              aria-label="Search products, food, medicines or services"
            />
            <button className="ai-search-button" type="button">
              <Sparkles size={20} fill="currentColor" strokeWidth={1.7} />
              <strong>QK AI</strong>
              <span className="ai-divider" />
              <Mic size={22} strokeWidth={2} />
            </button>
          </section>

          <section className="category-grid" aria-label="Categories">
            {categories.map((category) => (
              <button
                className={`category-card ${category.className}`}
                type="button"
                key={category.label}
              >
                <ImageWithFallback
                  className="category-image"
                  src={category.image}
                  alt={category.label}
                  fallback={category.fallback}
                />
                <span>{category.label}</span>
              </button>
            ))}

            <button className="category-card category-card--all" type="button">
              <span className="all-grid-icon" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>See All</span>
            </button>
          </section>

          <section className="promo-card" aria-label="BuyQK local delivery benefits">
            <div className="promo-glow promo-glow--one" />
            <div className="promo-glow promo-glow--two" />
            <div className="city-silhouette" aria-hidden="true" />

            <div className="promo-copy">
              <div className="promo-eyebrow">
                <MapPin size={15} fill="currentColor" />
                <span>Your Local, Your Way</span>
              </div>
              <h1>
                From Local Shops.
                <br />
                To <span>Your Doorstep.</span>
              </h1>
              <p>
                Order from nearby stores,
                <br />
                get it in 10 mins or as per your time.
              </p>
            </div>

            <ImageWithFallback
              className="delivery-rider"
              src="/assets/banner/delivery-rider.webp"
              alt="BuyQK delivery rider"
              fallback="🛵"
            />

            <div className="slider-dots" aria-hidden="true">
              <span className="active" />
              <span />
              <span />
            </div>

            <div className="benefit-strip">
              <div className="benefit-item">
                <MapPin className="benefit-icon benefit-icon--violet" size={24} fill="currentColor" />
                <span>Any Store<br />Near You</span>
              </div>
              <div className="benefit-item">
                <Zap className="benefit-icon benefit-icon--yellow" size={25} fill="currentColor" />
                <span>10 Min Delivery*<br />or Scheduled</span>
              </div>
              <div className="benefit-item">
                <LocateFixed className="benefit-icon benefit-icon--green" size={25} />
                <span>Real-Time<br />Tracking</span>
              </div>
              <div className="benefit-item">
                <ShieldCheck className="benefit-icon benefit-icon--pink" size={25} fill="currentColor" />
                <span>No Hidden<br />Markups</span>
              </div>
            </div>
          </section>

          <section className="nearby-section" aria-label="Nearby stores">
            <div className="section-title-row">
              <h2>Nearby right now</h2>
              <button type="button" className="view-all-button">
                View all <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className="store-grid">
              {stores.map((store) => (
                <button className="store-card" type="button" key={store.name}>
                  <div className="store-image-wrap">
                    <ImageWithFallback
                      className="store-image"
                      src={store.image}
                      alt={store.name}
                      fallback={store.fallback}
                    />
                    <span className={`store-badge ${store.badgeClass}`}>{store.badge}</span>
                  </div>
                  <div className="store-details">
                    <strong>{store.name}</strong>
                    <span className="store-meta">
                      <span className="rating">
                        <Star size={13} fill="currentColor" strokeWidth={1.5} />
                        {store.rating}
                      </span>
                      <i />
                      <span>{store.eta}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </main>

        <nav className="bottom-nav" aria-label="Primary navigation">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isAi = id === 'ai';
            const isActive = activeTab === id;
            return (
              <button
                className={`nav-item ${isAi ? 'nav-item--ai' : ''} ${isActive ? 'is-active' : ''}`}
                type="button"
                key={id}
                onClick={() => setActiveTab(id)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isAi ? 'ai-orb' : 'nav-icon-wrap'}>
                  <Icon size={isAi ? 26 : 23} strokeWidth={isAi ? 1.8 : 2} fill={isAi ? 'currentColor' : 'none'} />
                </span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default App;
