import { Activity, AudioLines, Radio } from 'lucide-react';
import SectionHeading, { HEADING_STEP } from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { DEVICES } from '../data/site';
import './Reason.css';

// 저음 한계 막대 눈금: 20Hz~200Hz를 로그 눈금으로 펼침(낮은 음일수록 왼쪽)
const SCALE_MIN = 20;
const SCALE_MAX = 200;
const TICKS = [20, 50, 100, 200];
const toPos = (hz) => (Math.log(hz / SCALE_MIN) / Math.log(SCALE_MAX / SCALE_MIN)) * 100;

// 본문 문장에 나온 세 가지 요소
const KEYWORDS = [
  { icon: AudioLines, label: '깊게 파고드는 저음' },
  { icon: Activity, label: '섬세하게 전달되는 진동' },
  { icon: Radio, label: '공간을 채우는 풍부한 울림' },
];

// S03 이유 설명
export default function Reason() {
  return (
    <section id="s03" className="reason section-pad" aria-labelledby="s03-title">
      <div className="reason__grid">
        <div className="reason__head">
          <SectionHeading
            id="s03-title"
            eyebrow="Why"
            title={
              <>
                소리는 왜
                <br />
                기기마다 달라질까요
              </>
            }
          />

          {/* 저음 한계 비교 막대: 각 기기가 내는 가장 낮은 소리부터 오른쪽 끝까지 채움 */}
          <Reveal as="figure" className="bass-range" delay={HEADING_STEP * 2}>
            <figcaption className="bass-range__caption">낮을수록 깊은 저음</figcaption>
            <ul className="bass-range__list">
              {DEVICES.map((d, i) => (
                <li key={d.id} className={`bass-range__row${d.id === 'pc' ? '' : ' is-lowcore'}`}>
                  <span className="bass-range__label">{d.label}</span>
                  <span
                    className="bass-range__track"
                    style={{ '--bar-start': `${toPos(d.cutoff)}%`, '--bar-delay': `${0.3 + i * 0.12}s` }}
                  >
                    <span className="bass-range__fill" />
                  </span>
                  <span className="bass-range__value" style={{ '--bar-delay': `${0.3 + i * 0.12}s` }}>
                    {d.cutoff}Hz
                  </span>
                </li>
              ))}
            </ul>
            <div className="bass-range__axis" aria-hidden="true">
              {TICKS.map((hz) => (
                <span key={hz} style={{ left: `${toPos(hz)}%` }}>
                  {hz}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="reason__body">
          <Reveal as="p" className="reason__lead" delay={HEADING_STEP * 2}>
            작은 디테일이 완성하는 사운드 LOWCORE
          </Reveal>
          <Reveal as="p" className="reason__text" delay={HEADING_STEP * 3}>
            좋은 소리는 단순히 크게 울리는 것이 아닙니다.
          </Reveal>
          <Reveal as="p" className="reason__text" delay={HEADING_STEP * 4}>
            깊게 파고드는 저음, 섬세하게 전달되는 진동, 공간을 채우는 풍부한 울림. 보이지 않는 설계의 차이가 듣는
            순간의 감동을 만들어냅니다
          </Reveal>

          {/* 본문에 나온 세 가지 요소를 항목으로 나눔 */}
          <ul className="reason__keys">
            {KEYWORDS.map(({ icon: Icon, label }, i) => (
              <Reveal as="li" key={label} className="reason__key" delay={HEADING_STEP * (5 + i)}>
                <Icon className="reason__key-icon" size={20} strokeWidth={1.75} aria-hidden="true" />
                <span>{label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
