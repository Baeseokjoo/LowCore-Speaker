import { useRef } from 'react';
import { Pause, Play } from 'lucide-react';
import './PlayControl.css';

// B10 재생/정지 + C03 플레이바
// inline: 이미지 안이 아니라 일반 흐름에 놓을 때(휴대폰). label: 지금 선택된 기기 이름
// onSeek(0~100): 플레이바를 누르거나 끌면 그 위치로 이동. 키보드 ←→ 5%, Home/End (2026-11-17)
const KEY_STEP = 5;

export default function PlayControl({ playing, progress, onToggle, onSeek, inline = false, label }) {
  const value = Math.round(progress);
  const dragging = useRef(false);

  const seekAt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    onSeek?.(((e.clientX - r.left) / r.width) * 100);
  };
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    seekAt(e);
  };
  const onPointerMove = (e) => {
    if (dragging.current) seekAt(e);
  };
  const onPointerEnd = (e) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };
  const onKeyDown = (e) => {
    const next = {
      ArrowLeft: progress - KEY_STEP,
      ArrowDown: progress - KEY_STEP,
      ArrowRight: progress + KEY_STEP,
      ArrowUp: progress + KEY_STEP,
      Home: 0,
      End: 100,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onSeek?.(next);
  };
  return (
    <div className={`play-control${inline ? ' play-control--inline' : ''}`}>
      <button
        type="button"
        className="play-control__btn"
        onClick={onToggle}
        aria-label={`${label ? `${label} ` : ''}${playing ? '정지' : '재생'}`}
      >
        {playing ? (
          <Pause size={16} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Play size={16} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>
      {label && (
        <span className="play-control__label" aria-hidden="true">
          {label}
        </span>
      )}
      {/* 보이는 선은 4px, 누를 수 있는 높이는 44px */}
      <div
        className="play-control__seek"
        role="slider"
        tabIndex={0}
        aria-label="재생 위치"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value}%`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onKeyDown={onKeyDown}
      >
        <div className="play-control__track">
          <div className="play-control__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
