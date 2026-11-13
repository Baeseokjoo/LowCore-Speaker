import Reveal from './Reveal';
import './SectionHeading.css';

// 라벨 → 제목 순서로 스크롤 시 서서히 떠오름
export const HEADING_STEP = 0.12; // 라벨과 제목 사이 시간차(초)

// onShow: 제목이 나타나기 시작할 때 호출(뒤따르는 요소를 이어서 띄울 때 사용)
export default function SectionHeading({ id, eyebrow, title, align = 'start', onShow }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <Reveal as="p" className="section-heading__eyebrow">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" id={id} className="section-heading__title" delay={HEADING_STEP} onShow={onShow}>
        {title}
      </Reveal>
    </div>
  );
}
