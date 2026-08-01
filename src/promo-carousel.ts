const CAROUSEL_ID = 'buyqk-promo-carousel';
const SOURCE_HIDDEN_CLASS = 'promo-card--carousel-source';
const SLIDE_INTERVAL_MS = 4500;

export function installPromoCarousel() {
  const mountCarousel = () => {
    if (document.getElementById(CAROUSEL_ID)) return true;

    const sourceCard = document.querySelector<HTMLElement>('.promo-card:not(.promo-slide)');
    if (!sourceCard?.parentElement) return false;

    const carousel = document.createElement('section');
    carousel.id = CAROUSEL_ID;
    carousel.className = 'promo-carousel';
    carousel.setAttribute('aria-label', 'BuyQK offers');

    const track = document.createElement('div');
    track.className = 'promo-carousel-track';

    const localDeliverySlide = sourceCard.cloneNode(true) as HTMLElement;
    localDeliverySlide.classList.add('promo-slide', 'promo-slide--local');
    localDeliverySlide.removeAttribute('id');

    const compareSlide = document.createElement('button');
    compareSlide.type = 'button';
    compareSlide.className = 'promo-slide compare-card';
    compareSlide.setAttribute('aria-label', 'Compare nearby stores before buying');
    compareSlide.innerHTML = `
      <span class="compare-card-glow compare-card-glow--blue" aria-hidden="true"></span>
      <span class="compare-card-glow compare-card-glow--pink" aria-hidden="true"></span>

      <span class="compare-card-header">
        <span class="compare-card-copy">
          <span class="compare-card-kicker">SMART SHOPPING</span>
          <strong>Compare Before You Buy</strong>
          <small>Check price, rating and delivery time.</small>
        </span>
        <span class="compare-card-cta">Compare now <b aria-hidden="true">→</b></span>
      </span>

      <span class="compare-stores" aria-hidden="true">
        <span class="compare-store compare-store--blue">
          <span class="compare-store-top">
            <span class="compare-store-name">Store A</span>
            <span class="compare-rating">★ 4.4</span>
          </span>
          <span class="compare-store-main">
            <span class="compare-basket">🛒</span>
            <span class="compare-price">₹299</span>
          </span>
          <span class="compare-store-meta">25 min · Free delivery</span>
        </span>

        <span class="compare-vs">VS</span>

        <span class="compare-store compare-store--violet">
          <span class="compare-store-top">
            <span class="compare-store-name">Store B</span>
            <span class="compare-rating">★ 4.6</span>
          </span>
          <span class="compare-store-main">
            <span class="compare-basket">🧺</span>
            <span class="compare-price">₹285</span>
          </span>
          <span class="compare-store-meta">30 min · ₹20 delivery</span>
        </span>
      </span>
    `;

    const dots = document.createElement('div');
    dots.className = 'promo-carousel-dots';
    dots.setAttribute('aria-label', 'Choose promotional card');

    const dotButtons = [0, 1].map((index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'promo-carousel-dot';
      dot.setAttribute('aria-label', `Show promotional card ${index + 1}`);
      dots.appendChild(dot);
      return dot;
    });

    track.append(localDeliverySlide, compareSlide);
    carousel.append(track, dots);
    sourceCard.parentElement.insertBefore(carousel, sourceCard);
    sourceCard.classList.add(SOURCE_HIDDEN_CLASS);

    let activeSlide = 0;
    let intervalId: number | undefined;

    const showSlide = (index: number) => {
      activeSlide = index;
      track.classList.toggle('is-second', activeSlide === 1);
      dotButtons.forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    const stopAutoSlide = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      intervalId = window.setInterval(() => {
        showSlide(activeSlide === 0 ? 1 : 0);
      }, SLIDE_INTERVAL_MS);
    };

    dotButtons.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
        startAutoSlide();
      });
    });

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    carousel.addEventListener('focusin', stopAutoSlide);
    carousel.addEventListener('focusout', startAutoSlide);

    showSlide(0);
    startAutoSlide();
    return true;
  };

  if (mountCarousel()) return;

  const observer = new MutationObserver(() => {
    if (mountCarousel()) observer.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
