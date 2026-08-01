import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import ReactDOM from 'react-dom/client';
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Mic,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from 'lucide-react';

type SearchItem = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  category: 'Product' | 'Store' | 'Service';
  emoji: string;
  badge?: string;
  keywords: string[];
};

type OpenSearchDetail = {
  initialQuery?: string;
};

const OPEN_SEARCH_EVENT = 'buyqk:open-search';
const RECENT_SEARCHES_KEY = 'buyqk-recent-searches';

const searchItems: SearchItem[] = [
  {
    id: 'milk',
    title: 'Fresh milk',
    subtitle: 'Daily Essentials',
    meta: 'From ₹32 · 10–15 min',
    category: 'Product',
    emoji: '🥛',
    badge: 'Popular',
    keywords: ['milk', 'dairy', 'grocery', 'fresh'],
  },
  {
    id: 'vegetables',
    title: 'Fresh vegetables',
    subtitle: 'Nearby grocery stores',
    meta: 'From ₹20 · 12–18 min',
    category: 'Product',
    emoji: '🥬',
    keywords: ['vegetable', 'sabji', 'grocery', 'fresh'],
  },
  {
    id: 'biryani',
    title: 'Paneer biryani',
    subtitle: 'Food & Dining',
    meta: 'From ₹149 · 20–25 min',
    category: 'Product',
    emoji: '🍛',
    badge: 'Top rated',
    keywords: ['food', 'biryani', 'paneer', 'dinner', 'lunch'],
  },
  {
    id: 'medicine',
    title: 'Medicines near me',
    subtitle: 'Pharmacy delivery',
    meta: 'Prescription may be required',
    category: 'Store',
    emoji: '💊',
    keywords: ['medicine', 'pharmacy', 'chemist', 'tablet'],
  },
  {
    id: 'freshmart',
    title: 'FreshMart',
    subtitle: 'Grocery & daily essentials',
    meta: '4.4 ★ · 10–15 min',
    category: 'Store',
    emoji: '🛒',
    badge: 'Nearby',
    keywords: ['store', 'freshmart', 'grocery', 'essentials'],
  },
  {
    id: 'food-junction',
    title: 'Food Junction',
    subtitle: 'Meals, snacks & beverages',
    meta: '4.3 ★ · 15–20 min',
    category: 'Store',
    emoji: '🍽️',
    keywords: ['restaurant', 'food', 'snacks', 'beverage'],
  },
  {
    id: 'electrician',
    title: 'Electrician',
    subtitle: 'Home repair service',
    meta: 'Available in 25–35 min',
    category: 'Service',
    emoji: '⚡',
    keywords: ['electrician', 'repair', 'service', 'home'],
  },
  {
    id: 'plumber',
    title: 'Plumber',
    subtitle: 'Home maintenance service',
    meta: 'Available in 20–30 min',
    category: 'Service',
    emoji: '🔧',
    keywords: ['plumber', 'pipe', 'repair', 'service'],
  },
  {
    id: 'beauty',
    title: 'Beauty services at home',
    subtitle: 'Salon professionals near you',
    meta: 'Starting at ₹299',
    category: 'Service',
    emoji: '💇',
    keywords: ['beauty', 'salon', 'makeup', 'service'],
  },
];

const quickSearches = [
  { label: 'Groceries', hint: 'Daily needs', emoji: '🧺' },
  { label: 'Food', hint: 'Meals & snacks', emoji: '🍔' },
  { label: 'Medicines', hint: 'Nearby pharmacy', emoji: '💊' },
  { label: 'Services', hint: 'Home assistance', emoji: '🛠️' },
];

const trendingSearches = ['Milk', 'Paneer biryani', 'Medicines', 'Electrician', 'Fresh vegetables'];

const readRecentSearches = () => {
  try {
    const storedValue = localStorage.getItem(RECENT_SEARCHES_KEY);
    return storedValue ? (JSON.parse(storedValue) as string[]).slice(0, 5) : [];
  } catch {
    return [];
  }
};

function SearchPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(readRecentSearches);
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
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];

    return searchItems.filter((item) => {
      const searchableText = [item.title, item.subtitle, item.category, ...item.keywords]
        .join(' ')
        .toLowerCase();
      return searchableText.includes(normalizedQuery);
    });
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
      // Searching still works when storage is unavailable.
    }
  };

  const runSearch = (value: string) => {
    setQuery(value);
    saveRecentSearch(value);
    inputRef.current?.focus();
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

  if (!isOpen) return null;

  return (
    <div className="search-page-layer" role="dialog" aria-modal="true" aria-label="BuyQK search">
      <div className="search-page">
        <header className="search-page-header">
          <button className="search-back-button" type="button" onClick={() => setIsOpen(false)} aria-label="Go back">
            <ArrowLeft size={22} strokeWidth={2.2} />
          </button>
          <div>
            <h1>Search BuyQK</h1>
            <p>Products, food, medicines and services</p>
          </div>
        </header>

        <form className="search-page-form" onSubmit={handleSubmit}>
          <Search className="search-page-leading-icon" size={22} strokeWidth={2} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What do you need?"
            aria-label="Search products, stores and services"
          />
          {query && (
            <button className="search-clear-button" type="button" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={17} strokeWidth={2.2} />
            </button>
          )}
          <button className="search-ai-mic-button" type="button" aria-label="Search with QK AI or voice">
            <Mic size={21} strokeWidth={2.1} />
            <Sparkles className="search-ai-sparkle" size={11} fill="currentColor" strokeWidth={1.5} />
          </button>
        </form>

        {!normalizedQuery ? (
          <>
            {recentSearches.length > 0 && (
              <section className="search-page-section">
                <div className="search-section-heading">
                  <div>
                    <Clock3 size={18} />
                    <h2>Recent searches</h2>
                  </div>
                  <button type="button" onClick={clearRecentSearches}>Clear</button>
                </div>
                <div className="recent-search-list">
                  {recentSearches.map((search) => (
                    <button type="button" key={search} onClick={() => runSearch(search)}>
                      <Clock3 size={15} />
                      <span>{search}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="search-page-section">
              <div className="search-section-heading">
                <div>
                  <Search size={18} />
                  <h2>Quick search</h2>
                </div>
              </div>
              <div className="quick-search-grid">
                {quickSearches.map((item) => (
                  <button type="button" key={item.label} onClick={() => runSearch(item.label)}>
                    <span className="quick-search-emoji">{item.emoji}</span>
                    <span className="quick-search-copy">
                      <strong>{item.label}</strong>
                      <small>{item.hint}</small>
                    </span>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </section>

            <section className="search-page-section">
              <div className="search-section-heading">
                <div>
                  <TrendingUp size={18} />
                  <h2>Trending near you</h2>
                </div>
              </div>
              <div className="trending-search-list">
                {trendingSearches.map((search, index) => (
                  <button type="button" key={search} onClick={() => runSearch(search)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{search}</strong>
                    <TrendingUp size={16} />
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="search-page-section search-results-section">
            <div className="search-section-heading">
              <div>
                <Search size={18} />
                <h2>{results.length} {results.length === 1 ? 'result' : 'results'}</h2>
              </div>
              <span className="search-query-label">“{query.trim()}”</span>
            </div>

            {results.length > 0 ? (
              <div className="search-results-list">
                {results.map((item) => (
                  <button
                    type="button"
                    className="search-result-card"
                    key={item.id}
                    onClick={() => saveRecentSearch(item.title)}
                  >
                    <span className="search-result-image">{item.emoji}</span>
                    <span className="search-result-copy">
                      <span className="search-result-topline">
                        <strong>{item.title}</strong>
                        {item.badge && <em>{item.badge}</em>}
                      </span>
                      <small>{item.subtitle}</small>
                      <span className="search-result-meta">
                        {item.category === 'Store' ? <Star size={13} fill="currentColor" /> : <MapPin size={13} />}
                        {item.meta}
                      </span>
                    </span>
                    <ChevronRight size={19} />
                  </button>
                ))}
              </div>
            ) : (
              <div className="search-empty-state">
                <span>🔎</span>
                <h3>No matches found</h3>
                <p>Try another product, store, food item or service.</p>
                <button type="button" onClick={() => setQuery('')}>Browse suggestions</button>
              </div>
            )}
          </section>
        )}
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
