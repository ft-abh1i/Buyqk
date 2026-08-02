import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  Heart,
  Home,
  MapPin,
  Mic,
  Plus,
  Search,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from 'lucide-react';

type OpenSearchDetail = {
  initialQuery?: string;
};

type StoreItem = {
  id: string;
  name: string;
  image: string;
  fallback: string;
  rating: string;
  reviews: string;
  eta: string;
  categories: string;
  offer: string;
};

type ProductItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  oldPrice: number;
  discount: string;
  emoji: string;
  fresh?: boolean;
  keywords: string[];
};

const OPEN_SEARCH_EVENT = 'buyqk:open-search';
const RECENT_SEARCHES_KEY = 'buyqk-recent-searches';

const defaultRecentSearches = ['milk bread fruits', 'eggs', 'atta', 'oranges', 'oil'];
const trendingSearches = ['Amul milk', 'Brown bread', 'Bananas', 'Apples', 'Curd', 'Paneer'];

const filters = [
  { id: 'near', label: 'Near me', icon: MapPin },
  { id: 'fast', label: 'Fast delivery', icon: Zap },
  { id: 'price', label: 'Best price', icon: Tag },
  { id: 'open', label: 'Open now', icon: Clock3 },
];

const stores: StoreItem[] = [
  {
    id: 'freshmart',
    name: 'FreshMart',
    image: '/assets/stores/freshmart.webp',
    fallback: 'FM',
    rating: '4.4',
    reviews: '1.2K+',
    eta: '10–15 min',
    categories: 'Grocery · Fruits · Dairy',
    offer: 'Free delivery above ₹199',
  },
  {
    id: 'food-junction',
    name: 'Food Junction',
    image: '/assets/stores/food-junction.webp',
    fallback: 'FJ',
    rating: '4.3',
    reviews: '750+',
    eta: '15–20 min',
    categories: 'Meals · Snacks · Drinks',
    offer: '₹50 OFF above ₹249',
  },
  {
    id: 'quickfix-services',
    name: 'QuickFix Services',
    image: '/assets/stores/quickfix.webp',
    fallback: 'QF',
    rating: '4.6',
    reviews: '640+',
    eta: '20–25 min',
    categories: 'Home services · Repairs',
    offer: '₹100 OFF on first booking',
  },
];

const products: ProductItem[] = [
  {
    id: 'milk',
    name: 'Amul Taaza Milk',
    unit: '1 L pouch',
    price: 54,
    oldPrice: 66,
    discount: '18% OFF',
    emoji: '🥛',
    fresh: true,
    keywords: ['milk', 'amul', 'dairy', 'fresh'],
  },
  {
    id: 'bread',
    name: 'Britannia Brown Bread',
    unit: '400 g',
    price: 36,
    oldPrice: 40,
    discount: '10% OFF',
    emoji: '🍞',
    keywords: ['bread', 'britannia', 'brown bread', 'bakery'],
  },
  {
    id: 'banana',
    name: 'Organic Bananas',
    unit: '500 g',
    price: 34,
    oldPrice: 39,
    discount: '12% OFF',
    emoji: '🍌',
    fresh: true,
    keywords: ['banana', 'bananas', 'fruit', 'organic'],
  },
  {
    id: 'paneer',
    name: 'Fresh Paneer',
    unit: '200 g',
    price: 92,
    oldPrice: 110,
    discount: '16% OFF',
    emoji: '🧀',
    fresh: true,
    keywords: ['paneer', 'dairy', 'fresh paneer'],
  },
];

const readRecentSearches = () => {
  try {
    const storedValue = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!storedValue) return defaultRecentSearches;
    const parsedValue = JSON.parse(storedValue) as string[];
    return parsedValue.length > 0 ? parsedValue.slice(0, 5) : defaultRecentSearches;
  } catch {
    return defaultRecentSearches;
  }
};

function SearchPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(readRecentSearches);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(2);
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOpenSearch = (event: Event) => {
      const detail = (event as CustomEvent<OpenSearchDetail>).detail;
      setQuery(detail?.initialQuery?.trim() ?? '');
      setIsOpen(true);
    };

    document.addEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
    return () => document.removeEventListener(OPEN_SEARCH_EVENT, handleOpenSearch);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleProducts = useMemo(() => {
    if (!normalizedQuery) return products;

    return products.filter((product) =>
      [product.name, product.unit, ...product.keywords].join(' ').toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const saveRecentSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    const updatedSearches = [
      trimmedValue,
      ...recentSearches.filter((search) => search.toLowerCase() !== trimmedValue.toLowerCase()),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    } catch {
      // Search remains usable when storage is unavailable.
    }
  };

  const runSearch = (value: string) => {
    setQuery(value);
    saveRecentSearch(value);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveRecentSearch(query);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore storage errors.
    }
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters((currentFilters) =>
      currentFilters.includes(filterId)
        ? currentFilters.filter((id) => id !== filterId)
        : [...currentFilters, filterId],
    );
  };

  const toggleLike = (productId: string) => {
    setLikedProducts((currentProducts) =>
      currentProducts.includes(productId)
        ? currentProducts.filter((id) => id !== productId)
        : [...currentProducts, productId],
    );
  };

  if (!isOpen) return null;

  return (
    <div className="search-page-layer" role="dialog" aria-modal="true" aria-label="BuyQK Explore">
      <div className="search-page">
        <header className="explore-header">
          <button className="explore-icon-button" type="button" onClick={() => setIsOpen(false)} aria-label="Go back">
            <ArrowLeft size={22} strokeWidth={2.2} />
          </button>

          <div className="explore-brand" aria-label="BuyQK">
            <span>Buy</span><strong>QK</strong>
          </div>

          <button className="explore-cart-button" type="button" aria-label={`Cart with ${cartCount} items`}>
            <ShoppingCart size={25} strokeWidth={2} />
            <span>{cartCount}</span>
          </button>
        </header>

        <form className="explore-search-form" onSubmit={handleSubmit}>
          <Search className="explore-search-icon" size={23} strokeWidth={2} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products, stores or services"
            aria-label="Search products, stores and services"
          />
          {query && (
            <button className="explore-clear-button" type="button" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={16} strokeWidth={2.2} />
            </button>
          )}
          <button className="explore-ai-button" type="button" aria-label="Search with QK AI or voice">
            <Sparkles size={18} fill="currentColor" strokeWidth={1.5} />
            <Mic size={18} strokeWidth={2} />
          </button>
        </form>

        <div className="explore-filter-row" aria-label="Search filters">
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              className={activeFilters.includes(id) ? 'is-active' : ''}
              type="button"
              key={id}
              onClick={() => toggleFilter(id)}
            >
              <Icon size={15} fill={id === 'near' && activeFilters.includes(id) ? 'currentColor' : 'none'} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {recentSearches.length > 0 && (
          <section className="explore-section">
            <div className="explore-section-heading">
              <h2>Recent searches</h2>
              <button type="button" onClick={clearRecentSearches}>Clear all</button>
            </div>
            <div className="explore-chip-row explore-chip-row--wrap">
              {recentSearches.map((search) => (
                <button type="button" key={search} onClick={() => runSearch(search)}>
                  <Clock3 size={13} />
                  <span>{search}</span>
                  <X size={13} />
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="explore-section">
          <div className="explore-section-heading">
            <h2>Trending searches</h2>
            <button type="button">View all <ChevronRight size={15} /></button>
          </div>
          <div className="explore-chip-row">
            {trendingSearches.map((search) => (
              <button type="button" key={search} onClick={() => runSearch(search)}>
                <TrendingUp size={14} />
                <span>{search}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="explore-section">
          <div className="explore-section-heading">
            <h2>Suggested stores</h2>
            <button type="button">View all <ChevronRight size={15} /></button>
          </div>
          <div className="suggested-store-row">
            {stores.map((store) => (
              <button type="button" className="suggested-store-card" key={store.id}>
                <div className="suggested-store-top">
                  <img src={store.image} alt="" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                  <span className="store-image-fallback">{store.fallback}</span>
                  <div>
                    <strong>{store.name}<em>QK</em></strong>
                    <span><Star size={12} fill="currentColor" /> {store.rating} <small>({store.reviews})</small></span>
                    <span><Clock3 size={12} /> {store.eta}</span>
                  </div>
                </div>
                <p>{store.categories}</p>
                <mark>{store.offer}</mark>
              </button>
            ))}
          </div>
        </section>

        <section className="explore-section explore-products-section">
          <div className="explore-section-heading">
            <h2>Products</h2>
            <span>{visibleProducts.length === products.length ? '120+ results' : `${visibleProducts.length} results`}</span>
          </div>

          <div className="explore-product-list">
            {visibleProducts.map((product) => (
              <article className="explore-product-card" key={product.id}>
                <div className="explore-product-visual" aria-hidden="true">{product.emoji}</div>
                <div className="explore-product-copy">
                  <strong>{product.name}</strong>
                  <span>{product.unit} {product.fresh && <em>Fresh</em>}</span>
                  <div className="explore-product-pricing">
                    <b>₹{product.price}</b>
                    <del>₹{product.oldPrice}</del>
                    <small>{product.discount}</small>
                  </div>
                </div>
                <button
                  className={`explore-like-button ${likedProducts.includes(product.id) ? 'is-liked' : ''}`}
                  type="button"
                  onClick={() => toggleLike(product.id)}
                  aria-label={`Like ${product.name}`}
                >
                  <Heart size={18} fill={likedProducts.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                <button className="explore-add-button" type="button" onClick={() => setCartCount((count) => count + 1)}>
                  <Plus size={17} /> Add
                </button>
              </article>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <div className="explore-empty-state">
              <span>🔎</span>
              <h3>No matching products</h3>
              <p>Try another product, store or service.</p>
              <button type="button" onClick={() => setQuery('')}>Browse all products</button>
            </div>
          )}
        </section>

        <nav className="explore-bottom-nav" aria-label="Explore navigation">
          <button type="button" onClick={() => setIsOpen(false)}>
            <Home size={21} />
            <span>Home</span>
          </button>
          <button className="is-active" type="button">
            <Search size={22} />
            <span>Explore</span>
          </button>
          <button className="explore-nav-ai" type="button">
            <span className="explore-nav-ai-orb"><Sparkles size={25} fill="currentColor" /></span>
            <span>QK AI</span>
          </button>
          <button type="button">
            <ClipboardList size={21} />
            <span>Orders</span>
          </button>
          <button type="button">
            <UserRound size={21} />
            <span>Account</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export function installSearchPage() {
  if (document.getElementById('buyqk-search-page-root')) return;

  const searchPageRoot = document.createElement('div');
  searchPageRoot.id = 'buyqk-search-page-root';
  document.body.appendChild(searchPageRoot);
  ReactDOM.createRoot(searchPageRoot).render(<SearchPage />);

  const openSearch = (initialQuery = '') => {
    document.dispatchEvent(
      new CustomEvent<OpenSearchDetail>(OPEN_SEARCH_EVENT, {
        detail: { initialQuery },
      }),
    );
  };

  document.addEventListener(
    'focusin',
    (event) => {
      const target = event.target as HTMLElement | null;
      const homeSearchInput = target?.closest('.search-panel input') as HTMLInputElement | null;
      if (!homeSearchInput) return;

      const initialQuery = homeSearchInput.value;
      homeSearchInput.blur();
      openSearch(initialQuery);
    },
    true,
  );

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const homeSearchPanel = target.closest('.search-panel');
    if (homeSearchPanel) {
      const input = homeSearchPanel.querySelector('input') as HTMLInputElement | null;
      openSearch(input?.value ?? '');
      return;
    }

    const navButton = target.closest('.nav-item');
    if (navButton?.textContent?.includes('Explore')) {
      openSearch();
    }
  });
}
