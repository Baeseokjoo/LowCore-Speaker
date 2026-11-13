import SectionHeading, { HEADING_STEP } from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import './Reason.css';

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
        </div>
      </div>
    </section>
  );
}
