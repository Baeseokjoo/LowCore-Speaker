import Logo from './Logo';
import NavMenu from './NavMenu';
import './SiteHeader.css';

export default function SiteHeader({ scrolled, active, onNavigate }) {
  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <Logo
        height={28}
        onClick={(e) => {
          e.preventDefault();
          onNavigate('top');
        }}
      />
      <NavMenu label="섹션 바로가기" active={active} onNavigate={onNavigate} />
    </header>
  );
}
