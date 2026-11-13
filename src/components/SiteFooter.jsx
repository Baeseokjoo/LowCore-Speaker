import Logo from './Logo';
import NavMenu from './NavMenu';
import './SiteFooter.css';

export default function SiteFooter({ onNavigate }) {
  return (
    <footer className="site-footer" aria-label="사이트 정보">
      <Logo
        height={24}
        onClick={(e) => {
          e.preventDefault();
          onNavigate('top');
        }}
      />
      <NavMenu label="푸터 섹션 바로가기" onNavigate={onNavigate} showCurrent={false} />
      <p className="site-footer__copy">© 2026 LOWCORE</p>
    </footer>
  );
}
