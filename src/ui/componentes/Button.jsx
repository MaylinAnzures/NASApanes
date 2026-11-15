import './Button.css';

export default function Button({ children, variant = 'primary', disabled, onClick }) {
  return (
    <button className={`btn btn--${variant}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}