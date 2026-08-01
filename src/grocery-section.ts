import groceryKitchenSprite from './grocery-sprite';

type GroceryCategory = {
  label: string;
  position: string;
};

const categories: GroceryCategory[] = [
  { label: 'Vegetables & Fruits', position: '2.7% 21.4%' },
  { label: 'Atta, Rice & Dal', position: '34% 21.4%' },
  { label: 'Oil, Ghee & Masala', position: '65.3% 21.4%' },
  { label: 'Dairy, Bread & Eggs', position: '96.6% 21.4%' },
  { label: 'Bakery & Biscuits', position: '2.7% 89.7%' },
  { label: 'Dry Fruits & Cereals', position: '34% 89.7%' },
  { label: 'Chicken, Meat & Fish', position: '65.3% 89.7%' },
  { label: 'Kitchenware & Appliances', position: '96.6% 89.7%' },
];

const STYLE_ID = 'buyqk-grocery-section-styles';
const SECTION_CLASS = 'grocery-kitchen-section';

const installStyles = () => {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    .nearby-section {
      display: none !important;
    }

    .${SECTION_CLASS} {
      margin-top: 17px;
    }

    .grocery-kitchen-heading {
      margin: 0 0 12px;
    }

    .grocery-kitchen-heading h2 {
      margin: 0;
      color: #ffffff;
      font-size: 22px;
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.55px;
    }

    .grocery-kitchen-heading h2 span {
      color: #ffb317;
    }

    .grocery-kitchen-underline {
      width: 55px;
      height: 4px;
      margin-top: 8px;
      border-radius: 99px;
      background: linear-gradient(90deg, #d83cff, #6139f4);
      box-shadow: 0 0 12px rgba(164, 51, 255, 0.35);
    }

    .grocery-kitchen-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
    }

    .grocery-kitchen-card {
      width: 100%;
      aspect-ratio: 0.72;
      padding: 0;
      overflow: hidden;
      border: 0;
      border-radius: 13px;
      background-color: #0a0d2e;
      background-repeat: no-repeat;
      background-size: 436% auto;
      box-shadow: 0 8px 19px rgba(0, 0, 0, 0.2);
      transition: transform 160ms ease, filter 160ms ease;
    }

    .grocery-kitchen-card:active {
      transform: scale(0.97);
      filter: brightness(1.08);
    }

    @media (max-width: 370px) {
      .grocery-kitchen-grid {
        gap: 6px;
      }

      .grocery-kitchen-card {
        border-radius: 11px;
      }

      .grocery-kitchen-heading h2 {
        font-size: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .grocery-kitchen-card {
        transition: none;
      }
    }
  `;
  document.head.appendChild(style);
};

const createSection = () => {
  const section = document.createElement('section');
  section.className = SECTION_CLASS;
  section.setAttribute('aria-label', 'Grocery and Kitchen categories');

  const heading = document.createElement('div');
  heading.className = 'grocery-kitchen-heading';
  heading.innerHTML = '<h2>Grocery &amp; <span>Kitchen</span></h2><div class="grocery-kitchen-underline" aria-hidden="true"></div>';

  const grid = document.createElement('div');
  grid.className = 'grocery-kitchen-grid';

  categories.forEach((category) => {
    const card = document.createElement('button');
    card.className = 'grocery-kitchen-card';
    card.type = 'button';
    card.setAttribute('aria-label', category.label);
    card.title = category.label;
    card.style.backgroundImage = `url("${groceryKitchenSprite}")`;
    card.style.backgroundPosition = category.position;
    grid.appendChild(card);
  });

  section.append(heading, grid);
  return section;
};

const mountGrocerySection = () => {
  installStyles();

  const nearbySection = document.querySelector<HTMLElement>('.nearby-section');
  if (!nearbySection || document.querySelector(`.${SECTION_CLASS}`)) return;

  nearbySection.insertAdjacentElement('beforebegin', createSection());
};

let mountScheduled = false;
const scheduleMount = () => {
  if (mountScheduled) return;
  mountScheduled = true;
  requestAnimationFrame(() => {
    mountScheduled = false;
    mountGrocerySection();
  });
};

scheduleMount();

const observer = new MutationObserver(scheduleMount);
observer.observe(document.body, { childList: true, subtree: true });
