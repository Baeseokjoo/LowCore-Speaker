import { useCallback, useState } from 'react';

const canHover = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const NO_GLOW = '0px 0px 70px -10px rgba(110,42,107,0), 0px 0px 28px -8px rgba(77,43,83,0)';

/** 커서 반대 방향으로 비치는 연기 빛(smoke-magenta, smoke-plum) */
export function tiltGlow(t) {
  if (!t) return NO_GLOW;
  const ox = -t.x;
  const oy = -t.y;
  return (
    `${(ox * 56).toFixed(1)}px ${(oy * 56).toFixed(1)}px 70px -10px rgba(110,42,107,0.75), ` +
    `${(ox * 22).toFixed(1)}px ${(oy * 22).toFixed(1)}px 28px -8px rgba(77,43,83,0.65)`
  );
}

/**
 * 마우스 호버 틸트. 하나의 그룹 안에서 지금 기울어진 항목 id와 커서 위치(-0.5~0.5)를 기억한다.
 * 터치 기기에서는 동작하지 않는다.
 */
export default function useTilt() {
  const [tilt, setTilt] = useState(null);

  const onMove = useCallback((id) => (e) => {
    if (!canHover()) return;
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({ id, x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  }, []);

  const onLeave = useCallback(() => setTilt(null), []);

  const of = useCallback(
    (id, max) => {
      if (!tilt || tilt.id !== id) return null;
      return { rx: -tilt.y * max, ry: tilt.x * max, x: tilt.x, y: tilt.y };
    },
    [tilt],
  );

  return { tilt, of, onMove, onLeave, reset: onLeave };
}
