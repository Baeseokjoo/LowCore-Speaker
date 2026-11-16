import { useLayoutEffect, useRef, useState } from 'react';
import SectionHeading, { HEADING_STEP } from '../components/SectionHeading';
import { prefersReducedMotion } from '../hooks/useSectionNav';
import { capture, finishAll, morph } from './modelMorph';
import useMediaQuery, { COMPACT } from '../hooks/useMediaQuery';
import Reveal, { REVEAL_DURATION, CARDS_AFTER_TEXT } from '../components/Reveal';
import useTilt, { tiltGlow } from '../hooks/useTilt';
import { MODELS } from '../data/site';
import './Models.css';

function ModelImage({ model, size }) {
  return (
    <img
      className="model-img"
      src={model.image}
      alt=""
      style={{ height: `${(size ?? model.size) * 100}%` }}
      draggable={false}
    />
  );
}

// S04 기본 상태 카드 (B03 / B04)
function ModelCard({ model, onOpen, tilt, onMove, onLeave, expanded, controls }) {
  const k = tilt;
  return (
    <button
      type="button"
      className="model-card"
      data-model={model.id}
      onClick={onOpen}
      onMouseEnter={onMove}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={`${model.name} 상세 보기`}
      aria-describedby={`summary-${model.id}`}
      aria-expanded={expanded}
      aria-controls={controls}
      style={{
        transform: `perspective(1200px) rotateX(${k ? k.rx.toFixed(2) : 0}deg) rotateY(${k ? k.ry.toFixed(2) : 0}deg)`,
        boxShadow: tiltGlow(k),
        // 호버 중: 기울기 0.08초, 빛은 바로 켜지고 지연 없이 따라감. 커서가 나가면 CSS 기본값(0.15초·0.2초)으로 돌아감
        transitionDuration: k ? '80ms, 0ms' : undefined,
      }}
    >
      <span className="model-card__media">
        <ModelImage model={model} />
      </span>
      <span className="model-card__text">
        <span className="model-card__name">{model.name}</span>
        <span id={`summary-${model.id}`} className="model-card__summary">
          {model.summary.map((line) => (
            <span key={line} className="model-card__summary-line">
              {line}
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}

// S04 펼친 상세 정보 칸 (B05 구매 · B06 체험하기)
function DetailBody({ model, onBuy, onTry }) {
  return (
    <div className="detail__body">
      <p className="detail__brand">LOWCORE</p>
      <h3 className="detail__name">{model.name}</h3>
      <dl className="detail__specs">
        {model.specs.map(([label, value]) => (
          <div key={label} className="detail__spec">
            <dt className="detail__spec-label">{label}</dt>
            <dd className="detail__spec-value">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="detail__actions">
        <button type="button" className="btn btn--primary btn--md" onClick={onBuy}>
          구매
        </button>
        <a
          href="#s02"
          className="btn btn--ghost btn--md"
          onClick={(e) => {
            e.preventDefault();
            onTry();
          }}
        >
          체험하기
        </a>
      </div>
    </div>
  );
}

function DetailMedia({ model, side, onClose }) {
  return (
    <button
      type="button"
      className={`detail__media detail__media--${side}`}
      data-model={model.id}
      onClick={onClose}
      aria-label={`${model.name} 상세 접기`}
    >
      <ModelImage model={model} size={0.8} />
    </button>
  );
}

function PushedCard({ model, direction, onSelect }) {
  return (
    <button
      type="button"
      className={`pushed-card pushed-card--${direction}`}
      data-model={model.id}
      onClick={onSelect}
      aria-label={`${model.name}로 선택 변경`}
    >
      <ModelImage model={model} size={0.8} />
    </button>
  );
}

// S04 모델 선택
export default function Models({ onBuy, onTry }) {
  const [open, setOpen] = useState(null);
  const [textShown, setTextShown] = useState(false);
  const { of: tiltOf, onMove, onLeave, reset } = useTilt();
  const sectionRef = useRef(null);
  const pending = useRef(null); // 바뀌기 직전 모습(선택될 모델 · 밀려날 모델)
  const compact = useMediaQuery(COMPACT);

  const find = (selector) => sectionRef.current?.querySelector(selector);

  const select = (id) => {
    reset();
    finishAll();
    pending.current = null;
    if (id !== null && !prefersReducedMotion()) {
      const other = id === '5' ? '8' : '5';
      pending.current =
        open === null
          ? // 기본 카드에서 펼침: 누른 카드 → 이미지 프레임, 다른 카드 → 밀려난 블러 카드
            {
              id,
              selected: capture(find(`.model-card[data-model="${id}"]`)),
              other: capture(find(`.model-card[data-model="${other}"]`)),
            }
          : // 블러 카드로 전환: 블러 카드 → 이미지 프레임, 기존 이미지 프레임 → 밀려난 블러 카드
            {
              id,
              selected: capture(find(`.pushed-card[data-model="${id}"]`)),
              other: capture(find(`.detail__media[data-model="${open}"]`)),
            };
    }
    setOpen(id);
  };
  const close = () => select(null);

  // 바뀐 화면을 그리기 전에 출발 모습 → 목적지 모습으로 자연스럽게 이어지는 움직임 실행
  useLayoutEffect(() => {
    const p = pending.current;
    pending.current = null;
    if (!p || p.id !== open) return;
    const styles = getComputedStyle(sectionRef.current);
    const opts = {
      duration: parseFloat(styles.getPropertyValue('--s04-open')) || 900,
      easing: styles.getPropertyValue('--s04-ease').trim() || 'ease',
    };
    const other = open === '5' ? '8' : '5';
    morph(p.selected, find(`.detail__media[data-model="${open}"]`), opts);
    morph(p.other, find(`.pushed-card[data-model="${other}"]`), opts);
  }, [open]);

  return (
    <section id="s04" className="models" aria-labelledby="s04-title" ref={sectionRef}>
      <div className="section-pad">
        <SectionHeading
          id="s04-title"
          eyebrow="Model"
          title="LOWCORE 모델 비교하기"
          onShow={() => setTextShown(true)}
        />
      </div>

      {/* 문구가 전부 올라온 뒤 0.3초 후 카드가 나타남. 펼침·접기는 이 묶음 안에서 바뀌어 다시 기다리지 않음 */}
      <Reveal show={textShown} delay={HEADING_STEP + REVEAL_DURATION + CARDS_AFTER_TEXT}>
      {/* 태블릿·휴대폰: 카드 2장을 세로로 두고, 누른 카드 바로 아래로 상세 정보가 펼쳐지는 아코디언 */}
      {compact && (
        <div className="models__accordion section-pad">
          {['5', '8'].map((id) => {
            const isOpen = open === id;
            return (
              <div key={id} className={`acc-item${isOpen ? ' is-open' : ''}`}>
                <ModelCard
                  model={MODELS[id]}
                  onOpen={() => setOpen(isOpen ? null : id)}
                  expanded={isOpen}
                  controls={`acc-panel-${id}`}
                />
                <div className="acc-panel" id={`acc-panel-${id}`} role="region" aria-label={`${MODELS[id].name} 상세 정보`}>
                  <div className="acc-panel__inner" inert={!isOpen}>
                    <DetailBody model={MODELS[id]} onBuy={onBuy} onTry={onTry} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!compact && open === null && (
        <div className="models__cards section-pad">
          {['5', '8'].map((id) => (
            <ModelCard
              key={id}
              model={MODELS[id]}
              onOpen={() => select(id)}
              tilt={tiltOf(id, 18)}
              onMove={onMove(id)}
              onLeave={onLeave}
            />
          ))}
        </div>
      )}

      {!compact && open === '5' && (
        <div className="models__open" key="open-5">
          <div className="models__row models__row--five">
            <div className="detail detail--open-right">
              <DetailMedia model={MODELS[5]} side="left" onClose={close} />
              <DetailBody model={MODELS[5]} onBuy={onBuy} onTry={onTry} />
            </div>
            <PushedCard model={MODELS[8]} direction="right" onSelect={() => select('8')} />
          </div>
        </div>
      )}

      {!compact && open === '8' && (
        <div className="models__open" key="open-8">
          <div className="models__row models__row--eight">
            <PushedCard model={MODELS[5]} direction="left" onSelect={() => select('5')} />
            <div className="detail detail--open-left">
              <DetailBody model={MODELS[8]} onBuy={onBuy} onTry={onTry} />
              <DetailMedia model={MODELS[8]} side="right" onClose={close} />
            </div>
          </div>
        </div>
      )}
      </Reveal>
    </section>
  );
}
