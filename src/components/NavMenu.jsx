import { NAV_ITEMS } from '../data/site';
import './NavMenu.css';

export default function NavMenu({ label, active, onNavigate, showCurrent = true }) {
  return (
    <nav className="nav-menu" aria-label={label}>
      {NAV_ITEMS.map((item) => {
        const current = showCurrent && active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-menu__item${current ? ' is-current' : ''}`}
            aria-current={current ? 'location' : undefined}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(item.id);
            }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
