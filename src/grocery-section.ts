import groceryKitchenSprite from './grocery-sprite';

type CategoryItem = {
  label: string;
  position: string;
};

type HomeCategorySection = {
  id: string;
  ariaLabel: string;
  heading: string;
  accent: string;
  image: string;
  backgroundSize: string;
  aspectRatio: string;
  categories: CategoryItem[];
};

const standardPositions = [
  '0% 0%',
  '33.333% 0%',
  '66.667% 0%',
  '100% 0%',
  '0% 100%',
  '33.333% 100%',
  '66.667% 100%',
  '100% 100%',
];

const makeCategories = (labels: string[]): CategoryItem[] =>
  labels.map((label, index) => ({ label, position: standardPositions[index] }));

const sections: HomeCategorySection[] = [
  {
    id: 'grocery-kitchen',
    ariaLabel: 'Grocery and Kitchen categories',
    heading: 'Grocery &',
    accent: 'Kitchen',
    image: groceryKitchenSprite,
    backgroundSize: '436% auto',
    aspectRatio: '0.72',
    categories: [
      { label: 'Vegetables & Fruits', position: '2.7% 21.4%' },
      { label: 'Atta, Rice & Dal', position: '34% 21.4%' },
      { label: 'Oil, Ghee & Masala', position: '65.3% 21.4%' },
      { label: 'Dairy, Bread & Eggs', position: '96.6% 21.4%' },
      { label: 'Bakery & Biscuits', position: '2.7% 89.7%' },
      { label: 'Dry Fruits & Cereals', position: '34% 89.7%' },
      { label: 'Chicken, Meat & Fish', position: '65.3% 89.7%' },
      { label: 'Kitchenware & Appliances', position: '96.6% 89.7%' },
    ],
  },
  {
    id: 'snacks-drinks',
    ariaLabel: 'Snacks and Drinks categories',
    heading: 'Snacks &',
    accent: 'Drinks',
    image: '/assets/categories/snacks-drinks.webp',
    backgroundSize: '400% 200%',
    aspectRatio: '0.58',
    categories: makeCategories([
      'Chips & Namkeen',
      'Sweets & Chocolates',
      'Drinks & Juices',
      'Tea, Coffee & Milk Drinks',
      'Instant Food',
      'Sauces & Spreads',
      'Paan Corner',
      'Ice Creams & More',
    ]),
  },
  {
    id: 'beauty-personal-care',
    ariaLabel: 'Beauty and Personal Care categories',
    heading: 'Beauty &',
    accent: 'Personal Care',
    image: '/assets/categories/beauty-personal-care.webp',
    backgroundSize: '400% 200%',
    aspectRatio: '0.58',
    categories: makeCategories([
      'Bath & Body',
      'Hair',
      'Skin & Face',
      'Beauty & Cosmetics',
      'Feminine Hygiene',
      'Baby Care',
      'Health & Pharma',
      'Sexual Wellness',
    ]),
  },
];

const STYLE_ID = 'buyqk-home-category-section-styles';
const GROUP_ID = 'buyqk-home-category-groups';

const installStyles = () => {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .home-category-groups {
      padding-bottom: 8px;
    }

    .home-category-section {
      margin-top: 22px;
    }

    .home-category-section:first-child {
      margin-top: 17px;
    }

    .home-category-heading {
      margin: 0 0 12px;
    }

    .home-category-heading h2 {
      margin: 0;
      color: #ffffff;
      font-size: 22px;
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.55px;
    }

    .home-category-heading h2 span {
      color: #ffb317;
    }

    .home-category-underline {
      width: 55px;
      height: 4px;
      margin-top: 8px;
      border-radius: 99px;
      background: linear-gradient(90deg, #d83cff, #6139f4);
      box-shadow: 0 0 12px rgba(164, 51, 255, 0.35);
    }

    .home-category-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }

    .home-category-card {
      width: 100%;
      padding: 0;
      overflow: hidden;
      border: 0;
      border-radius: 13px;
      background-color: #080b2a;
      background-repeat: no-repeat;
      box-shadow: 0 8px 19px rgba(0, 0, 0, 0.2);
      transition: transform 160ms ease, filter 160ms ease;
    }

    .home-category-card:active {
      transform: scale(0.97);
      filter: brightness(1.08);
    }

    @media (max-width: 370px) {
      .home-category-grid {
        gap: 6px;
      }

      .home-category-card {
        border-radius: 11px;
      }

      .home-category-heading h2 {
        font-size: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .home-category-card {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);
};

const createSection = (sectionData: HomeCategorySection) => {
  const section = document.createElement('section');
  section.className = 'home-category-section';
  section.dataset.categorySection = sectionData.id;
  section.setAttribute('aria-label', sectionData.ariaLabel);

  const heading = document.createElement('div');
  heading.className = 'home-category-heading';

  const title = document.createElement('h2');
  title.append(`${sectionData.heading} `);
  const accent = document.createElement('span');
  accent.textContent = sectionData.accent;
  title.appendChild(accent);

  const underline = document.createElement('div');
  underline.className = 'home-category-underline';
  underline.setAttribute('aria-hidden', 'true');
  heading.append(title, underline);

  const grid = document.createElement('div');
  grid.className = 'home-category-grid';

  sectionData.categories.forEach((category) => {
    const card = document.createElement('button');
    card.className = 'home-category-card';
    card.type = 'button';
    card.setAttribute('aria-label', category.label);
    card.title = category.label;
    card.style.aspectRatio = sectionData.aspectRatio;
    card.style.backgroundImage = `url("${sectionData.image}")`;
    card.style.backgroundSize = sectionData.backgroundSize;
    card.style.backgroundPosition = category.position;
    grid.appendChild(card);
  });

  section.append(heading, grid);
  return section;
};

const mountCategorySections = () => {
  installStyles();

  const nearbySection = document.querySelector<HTMLElement>('.nearby-section');
  if (!nearbySection || document.getElementById(GROUP_ID)) return;

  const group = document.createElement('div');
  group.id = GROUP_ID;
  group.className = 'home-category-groups';
  sections.forEach((section) => group.appendChild(createSection(section)));
  nearbySection.insertAdjacentElement('afterend', group);
};

let mountScheduled = false;
const scheduleMount = () => {
  if (mountScheduled) return;
  mountScheduled = true;
  requestAnimationFrame(() => {
    mountScheduled = false;
    mountCategorySections();
  });
};

scheduleMount();

const observer = new MutationObserver(scheduleMount);
observer.observe(document.body, { childList: true, subtree: true });
