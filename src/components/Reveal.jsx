import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../hooks/useSectionNav';
import './Reveal.css';

// 화면 아래에서 30% 올라왔을 때(요소 윗부분이 화면 높이 70% 지점에 닿을 때) 한 번 나타남
const ROOT_MARGIN = '0px 0px -30% 0px';
export const REVEAL_DURATION = 0.3; // 떠오르는 시간(초) — Reveal.css와 같게 유지
export const CARDS_AFTER_TEXT = 0.1; // S02·S04: 문구가 다 올라온 뒤 카드가 나오기까지(초)

/**
 * 스크롤로 들어올 때 서서히 떠오르는 래퍼.
 * as: 렌더할 태그(기본 div)
 * delay: 나타나기 전 대기(초) — 같은 묶음 안에서 위에서부터 순서를 만들 때 사용
 * show: 넘기면 스크롤 감지 대신 이 값으로 나타남(다른 Reveal 뒤에 이어서 나올 때)
 * onShow: 스크롤 감지로 나타나기 시작한 순간 한 번 호출
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  show,
  onShow,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const controlled = show !== undefined;
  const [seen, setSeen] = useState(prefersReducedMotion);
  const onShowRef = useRef(onShow);
  useEffect(() => {
    onShowRef.current = onShow;
  });

  useEffect(() => {
    if (seen) {
      onShowRef.current?.();
      return undefined;
    }
    if (controlled) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [seen, controlled]);

  const shown = controlled ? show || seen : seen;
  const reduce = seen && prefersReducedMotion();

  return (
    <Tag
      ref={ref}
      className={`reveal${shown ? ' is-shown' : ''}${className ? ` ${className}` : ''}`}
      style={{ ...style, '--reveal-delay': `${reduce ? 0 : +delay.toFixed(3)}s` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
