import part0 from './part0';
import part1 from './part1';
import part2 from './part2';
import part3 from './part3';
import part4 from './part4';

const promoImage = `data:image/webp;base64,${part0}${part1}${part2}${part3}${part4}`;

const styleId = 'buyqk-promo-image-style';
const previousStyle = document.getElementById(styleId);
previousStyle?.remove();

const style = document.createElement('style');
style.id = styleId;
style.textContent = `
  .promo-card {
    height: auto !important;
    aspect-ratio: 16 / 9;
    margin-top: 9px;
    border: 0 !important;
    border-radius: 0 !important;
    background-image: url("${promoImage}") !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: contain !important;
    box-shadow: none !important;
  }

  .promo-card > * {
    display: none !important;
  }
`;

document.head.appendChild(style);

export default promoImage;
