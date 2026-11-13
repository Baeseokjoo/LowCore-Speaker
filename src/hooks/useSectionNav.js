import { useCallback, useEffect, useRef, useState } from 'react';

const SECTION_IDS = ['s02', 's03', 's04'];

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

/**
 * 헤더 메뉴의 현재 위치와 스크롤 여부를 추적한다.
 * 클릭으로 이동하는 동안에는 잠시 고정해 다른 항목으로 깜박이지 않게 한다.
 */
export default function useSectionNav() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const lockUntil = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (Date.now() < lockUntil.current) return;
      let next = null;
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) next = id;
      });
      setActive(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((id, { delay = 0, lock = 1200 } = {}) => {
    lockUntil.current = Date.now() + lock;
    setActive(id === 'top' ? null : id);
    if (delay) setTimeout(() => scrollToId(id), delay);
    else scrollToId(id);
  }, []);

  return { active, scrolled, goTo };
}
