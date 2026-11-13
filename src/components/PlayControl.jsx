import { Pause, Play } from 'lucide-react';
import './PlayControl.css';

// B10 재생/정지 + C03 플레이바
export default function PlayControl({ playing, progress, onToggle }) {
  const value = Math.round(progress);
  return (
    <div className="play-control">
      <button type="button" className="play-control__btn" onClick={onToggle} aria-label={playing ? '정지' : '재생'}>
        {playing ? (
          <Pause size={16} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
        ) : (
          <Play size={16} fill="currentColor" strokeWidth={1.75} aria-hidden="true" />
        )}
      </button>
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
