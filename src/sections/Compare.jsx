import { useState } from 'react';
import { Headphones } from 'lucide-react';
import MagicRings from '../components/MagicRings/MagicRings';
import SectionHeading, { HEADING_STEP } from '../components/SectionHeading';
import Reveal, { REVEAL_DURATION, CARDS_AFTER_TEXT } from '../components/Reveal';
import PlayControl from '../components/PlayControl';
import useCompareAudio from '../hooks/useCompareAudio';
import useTilt, { tiltGlow } from '../hooks/useTilt';
import useMediaQuery, { PHONE } from '../hooks/useMediaQuery';
import { DEVICES } from '../data/site';
import track from '../assets/music/music-sample.mp3';
import './Compare.css';

const GUIDE_DELAY = HEADING_STEP * 3; // 마지막 문구(안내 문구)의 시간차

// S02 비교 체험
export default function Compare() {
  const [selected, setSelected] = useState(null);
  const [textShown, setTextShown] = useState(false);
  const { playing, progress, play, stop } = useCompareAudio(track);
  const { tilt, of: tiltOf, onMove, onLeave, reset } = useTilt();
  const isPhone = useMediaQuery(PHONE);
  const selectedDevice = DEVICES.find((d) => d.id === selected);

  const pick = (id) => {
    stop();
    reset();
    setSelected((cur) => (cur === id ? null : id));
  };

  const toggle = (device) => {
    if (playing) stop();
    else play(device.cutoff);
  };

  const lookOf = (id) => {
    if (!selected) {
      const k = tiltOf(id, 24); // 최대 약 12°
      return {
        state: 'idle',
        style: {
          transform: `perspective(900px) rotateX(${k ? k.rx.toFixed(2) : 0}deg) rotateY(${k ? k.ry.toFixed(2) : 0}deg) scale(${k ? 1.02 : 1})`,
          transitionDuration: tilt ? '150ms, 400ms' : undefined,
        },
        tileStyle: { boxShadow: tiltGlow(k), borderColor: k ? 'var(--line-strong)' : undefined },
      };
    }
    return { state: selected === id ? 'selected' : 'dimmed', style: undefined, tileStyle: undefined };
  };

  return (
    <section id="s02" className="compare section-pad" aria-labelledby="s02-title">
      <div className="compare__bg" aria-hidden="true">
        <MagicRings
          color="#6E2A6B"
          colorTwo="#17466E"
          motion="ripple"
          ringCount={6}
          baseRadius={0.22}
          radiusStep={0.09}
          expansion={0.12}
          speed={0}
          intro={false}
          glow={1.2}
          lineThickness={1.5}
          opacity={0.23}
          hoverScale={1}
          hoverIntensity={0}
          parallax={0}
          clickBurst={false}
        />
      </div>

      <div className="compare__head">
        <SectionHeading id="s02-title" eyebrow="Experience" title="같은 트랙, 다른 저음" align="center" />

        <Reveal className="notice" role="note" delay={HEADING_STEP * 2}>
          <Headphones className="notice__icon" size={28} strokeWidth={1.75} aria-hidden="true" />
          <div>
            <p className="notice__title">헤드폰 착용을 권장합니다</p>
            <p className="notice__body">
              저음 차이를 정확히 비교하려면 헤드폰으로 들어 주세요. 재생 전에 볼륨을 낮게 맞춰 주세요.
            </p>
          </div>
        </Reveal>

        <Reveal as="p" className="compare__guide" delay={GUIDE_DELAY} onShow={() => setTextShown(true)}>
          모델을 선택한 뒤 재생 버튼을 누르면 음원이 재생됩니다.
        </Reveal>
      </div>

      {/* 문구가 전부 올라온 뒤 0.3초 후 이미지 3개가 함께 나타남 */}
      <Reveal className="compare__grid" show={textShown} delay={GUIDE_DELAY + REVEAL_DURATION + CARDS_AFTER_TEXT}>
        {DEVICES.map((device) => {
          const look = lookOf(device.id);
          const isSelected = look.state === 'selected';
          return (
            <div
              key={device.id}
              className={`compare-tile is-${look.state}`}
              style={look.style}
              onMouseMove={!selected ? onMove(device.id) : undefined}
              onMouseLeave={!selected ? onLeave : undefined}
            >
              <button
                type="button"
                className="compare-tile__btn"
                style={look.tileStyle}
                onClick={() => pick(device.id)}
                aria-pressed={isSelected}
                aria-label={device.ariaLabel}
              >
                <span className="compare-tile__label">{device.label}</span>
                <img
                  className="compare-tile__img"
                  src={device.image}
                  alt=""
                  style={{ height: `${device.size * 100}%` }}
                  draggable={false}
                />
              </button>
              {isSelected && !isPhone && (
                <PlayControl playing={playing} progress={progress} onToggle={() => toggle(device)} />
              )}
            </div>
          );
        })}
      </Reveal>

      {/* 휴대폰: 이미지가 작아 재생 컨트롤을 이미지 묶음 아래에 넓게 둠. 자리는 미리 잡아 두어 선택해도 화면이 밀리지 않음 */}
      {isPhone && (
        <div className="compare__controls">
          {selectedDevice && (
            <PlayControl
              inline
              playing={playing}
              progress={progress}
              onToggle={() => toggle(selectedDevice)}
              label={selectedDevice.label}
            />
          )}
        </div>
      )}
    </section>
  );
}
