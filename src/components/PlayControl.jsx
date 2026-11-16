import { Pause, Play } from 'lucide-react';
import './PlayControl.css';

// B10 재생/정지 + C03 플레이바
// inline: 이미지 안이 아니라 일반 흐름에 놓을 때(휴대폰). label: 지금 선택된 기기 이름
export default function PlayControl({ playing, progress, onToggle, inline = false, label }) {
  const value = Math.round(progress);
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
      <div
        className="play-control__track"
        role="progressbar"
        aria-label="재생 위치"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div className="play-control__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
