// S04 펼침·전환 움직임.
// 누르기 직전의 요소(기본 카드, 블러 카드, 펼친 이미지 프레임)를 복제해 화면에 띄우고,
// 바뀐 화면의 목적지 요소 자리·크기·테두리·블러까지 자연스럽게 바꾼 뒤 사라짐.
// 그동안 진짜 목적지 요소는 숨겨 두었다가 끝나면 보여 줌.

const running = new Set();

// 누르기 직전에 호출: 출발 요소의 모습과 자리를 기록
export function capture(el) {
  if (!el) return null;
  const cs = getComputedStyle(el);
  // 호버 틸트로 기울어진 모습 그대로 출발했다가 평평해지도록, 기울기는 따로 기억
  const transform = cs.transform && cs.transform !== 'none' ? cs.transform : 'none';
  const shadow = cs.boxShadow;
  const ghost = el.cloneNode(true);
  ghost.removeAttribute('id');
  ghost.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));

  // 자리·크기는 기울기를 뺀 원래 모습으로 잼(곧 사라질 요소라 되돌리지 않음)
  el.style.transition = 'none';
  el.style.transform = 'none';
  const img = el.querySelector('.model-img');
  return {
    ghost,
    rect: el.getBoundingClientRect(),
    transform,
    shadow,
    border: { width: cs.borderTopWidth, color: cs.borderTopColor },
    filter: cs.filter,
    imgHeight: img ? img.getBoundingClientRect().height : null,
    mediaHeight: el.querySelector('.model-card__media')?.getBoundingClientRect().height ?? null,
  };
}

// 이전 움직임이 끝나기 전에 다시 누른 경우 바로 정리
export function finishAll() {
  running.forEach((a) => a.finish());
  running.clear();
}

const px = (n) => `${n}px`;

// 화면이 바뀐 직후(그리기 전) 호출: from → to 요소로 바뀌는 움직임 실행
export function morph(from, to, { duration, easing }) {
  if (!from || !to || !to.animate) return;

  // 목적지 요소에 걸린 CSS 등장 애니메이션은 끄고 최종 모습 기준으로 잼
  to.style.animation = 'none';
  const rect = to.getBoundingClientRect();
  const cs = getComputedStyle(to);
  const toImg = to.querySelector('.model-img');
  const toImgH = toImg ? toImg.getBoundingClientRect().height : null;

  const g = from.ghost;
  Object.assign(g.style, {
    position: 'fixed',
    left: px(from.rect.left),
    top: px(from.rect.top),
    width: px(from.rect.width),
    height: px(from.rect.height),
    margin: '0',
    zIndex: '5',
    pointerEvents: 'none',
    animation: 'none',
    transition: 'none',
    willChange: 'transform, filter',
  });
  g.setAttribute('aria-hidden', 'true');
  document.body.appendChild(g);
  to.style.visibility = 'hidden';

  const timing = { duration, easing, fill: 'forwards' };
  const anims = [
    g.animate(
      [
        {
          left: px(from.rect.left),
          top: px(from.rect.top),
          width: px(from.rect.width),
          height: px(from.rect.height),
          transform: from.transform,
          boxShadow: from.shadow,
          borderWidth: from.border.width,
          borderColor: from.border.color,
          filter: from.filter,
        },
        {
          left: px(rect.left),
          top: px(rect.top),
          width: px(rect.width),
          height: px(rect.height),
          transform: 'none',
          boxShadow: cs.boxShadow,
          borderWidth: cs.borderTopWidth,
          borderColor: cs.borderTopColor,
          filter: cs.filter,
        },
      ],
      timing,
    ),
  ];

  // 기본 카드에서 출발: 이미지 칸이 카드 높이만큼 커지고, 아래 문구는 점차 사라짐
  const media = g.querySelector('.model-card__media');
  if (media && from.mediaHeight) {
    // 아래 문구 칸에 눌려 이미지 칸이 줄어들지 않게 함(줄어들면 끝에서 이미지가 튐)
    media.style.flexShrink = '0';
    anims.push(media.animate([{ height: px(from.mediaHeight) }, { height: px(rect.height) }], timing));
  }
  const text = g.querySelector('.model-card__text');
  if (text) {
    anims.push(
      text.animate([{ opacity: 1 }, { opacity: 0, offset: 0.35 }, { opacity: 0 }], {
        duration,
        easing: 'ease-out',
        fill: 'forwards',
      }),
    );
  }

  // 이미지는 처음부터 최종 크기로 두고 transform 배율로만 키움(매 프레임 다시 그리지 않아 끊김 없음)
  const img = g.querySelector('.model-img');
  if (img && toImgH && from.imgHeight) {
    img.style.height = px(toImgH);
    img.style.willChange = 'transform';
    const s = from.imgHeight / toImgH;
    anims.push(
      img.animate(
        [{ transform: `translate(-50%, -50%) scale(${s})` }, { transform: 'translate(-50%, -50%)' }],
        timing,
      ),
    );
  }

  const main = anims[0];
  anims.forEach((a) => running.add(a));
  main.finished
    .catch(() => {})
    .then(() => {
      to.style.visibility = '';
      g.remove();
      anims.forEach((a) => running.delete(a));
    });
}
