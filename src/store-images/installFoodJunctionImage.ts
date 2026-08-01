import foodJunction from './foodJunction';

const applyFoodJunctionImage = () => {
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.store-card'));
  const card = cards.find((item) => item.querySelector('.store-details strong')?.textContent?.trim() === 'Food Junction');
  const imageWrap = card?.querySelector<HTMLElement>('.store-image-wrap');

  if (!imageWrap) return;

  const currentImage = imageWrap.querySelector<HTMLImageElement>('img.store-image');

  if (currentImage?.dataset.foodJunctionImage === 'true') {
    currentImage.style.setProperty('opacity', '1', 'important');
    return;
  }

  imageWrap.querySelectorAll('.store-image, .image-fallback').forEach((element) => element.remove());

  const image = document.createElement('img');
  image.className = 'store-image';
  image.alt = 'Food Junction';
  image.src = foodJunction;
  image.dataset.foodJunctionImage = 'true';
  image.style.setProperty('opacity', '1', 'important');
  image.style.setProperty('display', 'block', 'important');
  image.style.setProperty('width', '100%', 'important');
  image.style.setProperty('height', '100%', 'important');
  image.style.setProperty('object-fit', 'cover', 'important');

  imageWrap.style.setProperty('background-image', 'none', 'important');
  imageWrap.insertBefore(image, imageWrap.firstChild);
};

export const installFoodJunctionImage = () => {
  let frame = 0;
  const scheduleApply = () => {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(applyFoodJunctionImage);
  };

  scheduleApply();

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.body, { childList: true, subtree: true });
};
