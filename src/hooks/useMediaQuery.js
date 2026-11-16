import { useEffect, useState } from 'react';

// 반응형 기준 (CSS의 @media와 같은 값)
export const PHONE = '(max-width: 767px)';
export const COMPACT = '(max-width: 1023px)'; // 태블릿 이하

const match = (query) => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches;

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => match(query));

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
