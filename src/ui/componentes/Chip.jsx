import './Cards.css';
// Pastilla para cifras ("360 kg", "+15 % Energía"), fáciles de comparar de un vistazo.
export default function Chip({ children, tone = 'dark' }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}
