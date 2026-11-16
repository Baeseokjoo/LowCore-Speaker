import { useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import MagicRings from '../components/MagicRings/MagicRings';
import ElectricLogo from '../components/ElectricLogo/ElectricLogo';
import FoldText from '../components/FoldText/FoldText';
import { prefersReducedMotion } from '../hooks/useSectionNav';
import useMediaQuery, { COMPACT } from '../hooks/useMediaQuery';
import logo from '../assets/Logo/LowCore_logo_white.png';
import './Hero.css';

const isStillDevice = () =>
  prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// 메인카피 2줄 → 서브카피 2줄을 위에서부터 한 줄씩 펼침.
// 서브카피 마지막 줄이 다 펼쳐지면(onComplete) 체험 시작 버튼이 서서히 나타남
const TEXT_START = 0.5; // 첫 줄 시작(초)
const LINE_GAP = 0.55; // 줄과 줄 사이 시작 간격(초)
const LINE_DURATION = 1.0; // 한 줄이 펼쳐지는 시간(초)
const FOLD = {
  splitBy: 'line',
  hinge: 'top',
  foldStyle: 'paper',
  duration: LINE_DURATION,
  stagger: LINE_GAP,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  style: { lineHeight: 'inherit', letterSpacing: 'inherit' },
};

// 모바일 3번(태블릿 포함, 1023px 이하): 문구를 더 빠르게 펼침
const MOBILE_TEXT_START = 0.3;
const MOBILE_LINE_GAP = 0.3;
const MOBILE_LINE_DURATION = 0.8;
const FOLD_MOBILE = { ...FOLD, duration: MOBILE_LINE_DURATION, stagger: MOBILE_LINE_GAP };

// 마우스 같은 정밀 포인터가 없는 기기(휴대폰·태블릿 터치)
const isTouchDevice = () => !window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const hasWebGL2 = () => {
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
};

// S01 히어로
export default function Hero({ onStart }) {
  const [ripple, setRipple] = useState(0);
  const rippleTimer = useRef(0);
  const [still] = useState(isStillDevice);
  const [electric] = useState(hasWebGL2);
  const [touch] = useState(isTouchDevice);
  const isMobile = useMediaQuery(COMPACT); // 모바일(태블릿 포함)
  const fold = isMobile ? FOLD_MOBILE : FOLD;
  const textStart = isMobile ? MOBILE_TEXT_START : TEXT_START;
  const lineGap = isMobile ? MOBILE_LINE_GAP : LINE_GAP;
  const [ctaShown, setCtaShown] = useState(false);

  const handleStart = (e) => {
    e.preventDefault();
    clearTimeout(rippleTimer.current);
    setRipple((n) => n + 1);
    rippleTimer.current = setTimeout(() => setRipple(0), 750);
    onStart();
  };

  return (
    <section id="top" className="hero" aria-label="히어로">
      <div className="hero__bg" aria-hidden="true">
        <MagicRings
          color="#6E2A6B"
          colorTwo="#17466E"
          motion="ripple"
          ringCount={6}
          baseRadius={0.22}
          radiusStep={0.09}
          expansion={0.12}
          speed={still ? 0 : 1} // 컴포넌트 기본 속도. 고리 하나가 퍼져 사라지는 데 약 6.6초
          intro={!still}
          glow={1.2}
          lineThickness={1.5}
          opacity={0.7}
          followMouse={false}
          hoverScale={still ? 1 : 1.04}
          hoverIntensity={still ? 0 : 0.35}
          parallax={still ? 0 : 0.015}
          clickBurst={false}
        />
      </div>
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__content">
        {electric ? (
          <div className="hero__brand-electric" role="img" aria-label="LOWCORE">
            <ElectricLogo
              src={logo}
              color="#edebf2"
              glowColor="#6e2a6b"
              scale={0.53} // 400×160 칸 기준. 이전 설정(250×64 칸, 0.85)과 같은 로고 크기 약 212×54px
              intensity={1}
              glow={0.15}
              fill={0}
              thickness={1.5}
              strands={2}
              bend={0.6}
              crackle={0.8}
              arcs={1}
              flicker={0.6}
              speed={1.8}
              interactive={!touch} // 모바일 2번: 터치 기기(커서 없음)에서만 커서 반응 끔. 전기 선 움직임은 유지
              cursorIntensity={0.75}
              cursorRadius={100}
            />
          </div>
        ) : (
          <img className="hero__brand" src={logo} alt="LOWCORE" height={32} />
        )}
        <h1 className="hero__title">
          <FoldText
            text={'들리지 않던 저음까지,\n작업의 기준이 되는 스피커 LOWCORE.'}
            {...fold}
            delay={textStart}
            // 모바일 4번(태블릿 포함): 메인카피가 다 펼쳐지면 버튼 등장 → 데스크톱보다 빠름
            onComplete={isMobile ? () => setCtaShown(true) : undefined}
          />
        </h1>
        <p className="hero__sub">
          <FoldText
            text={'같은 트랙을 PC 스피커와 LOWCORE로 번갈아 들으며,\n저음의 차이를 직접 확인해 보세요.'}
            {...fold}
            delay={textStart + lineGap * 2}
            onComplete={() => setCtaShown(true)}
          />
        </p>
        <div className={`hero__cta-wrap${ctaShown ? ' is-shown' : ''}`}>
          <a href="#s02" className="btn btn--primary btn--lg hero__cta" onClick={handleStart}>
            체험 시작
            <ArrowDown className="hero__cta-arrow" size={16} strokeWidth={2} aria-hidden="true" />
            {ripple > 0 && <span key={ripple} className="hero__cta-ring" aria-hidden="true" />}
          </a>
        </div>
      </div>
    </section>
  );
}
