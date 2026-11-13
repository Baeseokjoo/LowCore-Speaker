import logo from '../assets/Logo/LowCore_logo_white.png';

export default function Logo({ height = 28, onClick }) {
  return (
    <a href="#top" className="logo" onClick={onClick} aria-label="LOWCORE 처음으로">
      <img src={logo} alt="LOWCORE" height={height} style={{ height, width: 'auto' }} />
    </a>
  );
}
