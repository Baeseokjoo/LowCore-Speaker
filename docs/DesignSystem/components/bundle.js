/* @ds-bundle: {"format":4,"namespace":"LowCore","components":[{"name":"Button"},{"name":"NavMenu"},{"name":"SiteHeader"},{"name":"SectionHeading"},{"name":"NoticeBox"},{"name":"SpeakerArt"},{"name":"PlayControl"},{"name":"CompareTile"},{"name":"ModelCard"},{"name":"DetailPanel"},{"name":"Dialog"},{"name":"SiteFooter"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }
  function omit(obj, keys) {
    var out = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) < 0) out[k] = obj[k];
    return out;
  }

  /* ---------- icons ---------- */
  function IconArrowDown() {
    return h('svg', { className: 'lc-btn__icon', width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': 'true' },
      h('path', { d: 'M8 2v11M3.5 8.5 8 13l4.5-4.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }));
  }
  function IconPlay() {
    return h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': 'true' }, h('path', { d: 'M4 2.5v11l9.5-5.5z', fill: 'currentColor' }));
  }
  function IconPause() {
    return h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': 'true' },
      h('rect', { x: 3, y: 2, width: 3.5, height: 12, rx: 1, fill: 'currentColor' }),
      h('rect', { x: 9.5, y: 2, width: 3.5, height: 12, rx: 1, fill: 'currentColor' }));
  }
  function IconHeadphones() {
    return h('svg', { className: 'lc-notice__icon', width: 28, height: 28, viewBox: '0 0 28 28', 'aria-hidden': 'true' },
      h('path', { d: 'M5 17v-3a9 9 0 0 1 18 0v3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
      h('rect', { x: 4, y: 16, width: 5, height: 8, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }),
      h('rect', { x: 19, y: 16, width: 5, height: 8, rx: 2, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }));
  }
  function Symbol(p) {
    var s = p.size || 22;
    return h('svg', { width: s, height: s, viewBox: '0 0 22 22', 'aria-hidden': 'true' },
      h('circle', { cx: 11, cy: 11, r: 10, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
      h('circle', { cx: 11, cy: 11, r: 5.5, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
      h('circle', { cx: 11, cy: 11, r: 1.6, fill: 'currentColor' }));
  }
  function Wordmark(p) {
    return h('a', { className: 'lc-wordmark', href: p.href || '#top', onClick: p.onClick, 'aria-label': 'LOWCORE 처음으로' },
      h(Symbol, { size: p.size || 22 }), h('span', null, 'LOWCORE'));
  }

  /* ---------- Button ---------- */
  function Button(p) {
    var variant = p.variant || 'primary';
    var size = p.size || 'md';
    var rest = omit(p, ['variant', 'size', 'className', 'children', 'href', 'icon', 'breathe']);
    var cls = cx('lc-btn', 'lc-btn--' + variant, 'lc-btn--' + size, p.breathe && 'lc-btn--breathe', p.className);
    var kids = [h('span', { key: 't' }, p.children)];
    if (p.icon === 'arrow-down') kids.push(h(IconArrowDown, { key: 'i' }));
    if (p.href) return h('a', Object.assign({}, rest, { href: p.href, className: cls }), kids);
    return h('button', Object.assign({ type: 'button' }, rest, { className: cls }), kids);
  }

  /* ---------- NavMenu ---------- */
  function NavMenu(p) {
    var items = p.items || [];
    return h('nav', { className: cx('lc-nav', p.className), 'aria-label': p.label || '섹션 바로가기' },
      items.map(function (it, i) {
        return h('a', {
          key: i, href: it.href, className: cx('lc-nav__item', it.current && 'is-current'),
          'aria-current': it.current ? 'location' : undefined,
          onClick: p.onNavigate ? function (e) { p.onNavigate(it, e); } : undefined
        }, it.label);
      }));
  }

  /* ---------- SiteHeader ---------- */
  function SiteHeader(p) {
    return h('header', { className: cx('lc-header', p.scrolled && 'is-scrolled', p.className) },
      h(Wordmark, { onClick: p.onHome }),
      h(NavMenu, { items: p.items, onNavigate: p.onNavigate }));
  }

  /* ---------- SectionHeading ---------- */
  function SectionHeading(p) {
    return h('div', { className: cx('lc-heading', 'lc-heading--' + (p.align || 'start'), p.className) },
      p.eyebrow ? h('p', { className: 'lc-heading__eyebrow' }, p.eyebrow) : null,
      h(p.as || 'h2', { className: 'lc-heading__title', id: p.id }, p.title));
  }

  /* ---------- NoticeBox ---------- */
  function NoticeBox(p) {
    return h('div', { className: cx('lc-notice', p.className), role: 'note' },
      h(IconHeadphones),
      h('div', null,
        h('p', { className: 'lc-notice__title' }, p.title),
        p.children ? h('p', { className: 'lc-notice__body' }, p.children) : null));
  }

  /* ---------- SpeakerArt (temporary illustration) ---------- */
  var ART = {
    pc: { vb: '0 87 300 360', floor: 80, body: [100, 196, 100, 134, 10], tw: [150, 222, 6], wf: [150, 280, 32, 0, 11] },
    '5': { vb: '0 44 300 360', floor: 96, body: [86, 110, 128, 220, 12], tw: [150, 150, 16], wf: [150, 248, 50, 36, 14] },
    '8': { vb: '0 12 300 360', floor: 110, body: [66, 44, 168, 286, 14], tw: [150, 94, 18], wf: [150, 226, 68, 50, 19] }
  };
  var ART_LABEL = { pc: 'PC 스피커', '5': '5인치 모델', '8': '8인치 모델' };
  function SpeakerArt(p) {
    var a = ART[p.kind] || ART['5'];
    var b = a.body, t = a.tw, w = a.wf;
    var kids = [
      h('ellipse', { key: 'f', className: 'lc-art__floor', cx: 150, cy: 332, rx: a.floor, ry: 7 }),
      h('rect', { key: 'b', className: 'lc-art__body', x: b[0], y: b[1], width: b[2], height: b[3], rx: b[4] }),
      h('circle', { key: 't', className: 'lc-art__cone', cx: t[0], cy: t[1], r: t[2] }),
      h('circle', { key: 'w', className: 'lc-art__cone', cx: w[0], cy: w[1], r: w[2] })
    ];
    if (w[3]) kids.push(h('circle', { key: 'r', className: 'lc-art__ring', cx: w[0], cy: w[1], r: w[3] }));
    kids.push(h('circle', { key: 'c', className: 'lc-art__cap', cx: w[0], cy: w[1], r: w[4] }));
    return h('svg', {
      className: cx('lc-art', p.className), viewBox: a.vb, preserveAspectRatio: 'xMidYMid meet',
      role: p.decorative ? undefined : 'img', 'aria-hidden': p.decorative ? 'true' : undefined,
      'aria-label': p.decorative ? undefined : (p.label || ART_LABEL[p.kind] + ' 이미지')
    }, kids);
  }

  /* ---------- PlayControl ---------- */
  function PlayControl(p) {
    var pct = Math.max(0, Math.min(100, p.progress || 0));
    return h('div', { className: cx('lc-play', p.className) },
      h('button', { type: 'button', className: 'lc-play__btn', onClick: p.onToggle, 'aria-label': p.playing ? '정지' : '재생' },
        p.playing ? h(IconPause) : h(IconPlay)),
      h('div', { className: 'lc-play__track', role: 'progressbar', 'aria-label': '재생 위치', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(pct) },
        h('div', { className: 'lc-play__fill', style: { width: pct + '%' } })));
  }

  /* ---------- CompareTile ---------- */
  function CompareTile(p) {
    var state = p.state || 'idle';
    var label = p.label || ART_LABEL[p.kind];
    return h('div', { className: cx('lc-tile', 'is-' + state, p.className), style: p.style },
      h('button', { type: 'button', className: 'lc-tile__btn', onClick: p.onSelect, 'aria-pressed': state === 'selected', 'aria-label': label + ' 선택' },
        h('span', { className: 'lc-tile__label' }, label),
        h(SpeakerArt, { kind: p.kind, decorative: true })),
      state === 'selected'
        ? h(PlayControl, { className: 'lc-tile__play', playing: p.playing, progress: p.progress, onToggle: p.onToggle })
        : null);
  }

  /* ---------- ModelCard ---------- */
  function ModelCard(p) {
    return h('button', { type: 'button', className: cx('lc-card', p.className), onClick: p.onOpen, 'aria-label': p.name + ' 상세 보기', style: p.style },
      h('span', { className: 'lc-card__media' }, h(SpeakerArt, { kind: p.kind, decorative: true })),
      h('span', { className: 'lc-card__text' },
        h('span', { className: 'lc-card__name' }, p.name),
        p.children ? h('span', { className: 'lc-card__summary' }, p.children) : null));
  }

  /* ---------- DetailPanel ---------- */
  function DetailPanel(p) {
    var side = p.imageSide || 'left';
    var media = h('button', { key: 'm', type: 'button', className: 'lc-detail__media', onClick: p.onClose, 'aria-label': p.name + ' 상세 접기' },
      h(SpeakerArt, { kind: p.kind }));
    var body = h('div', { key: 'b', className: 'lc-detail__body' },
      h('p', { className: 'lc-detail__brand' }, 'LOWCORE'),
      h('h3', { className: 'lc-detail__name' }, p.name),
      h('div', { className: 'lc-detail__content' }, p.children),
      h('div', { className: 'lc-detail__actions' },
        h(Button, { variant: 'primary', onClick: p.onBuy }, p.buyLabel || '구매'),
        h(Button, { variant: 'ghost', href: p.tryHref || '#s02', onClick: p.onTry }, p.tryLabel || '체험하기')));
    return h('div', { className: cx('lc-detail', 'lc-detail--image-' + side, p.className) }, side === 'left' ? [media, body] : [body, media]);
  }

  /* ---------- Dialog ---------- */
  function Dialog(p) {
    if (!p.open) return null;
    return h('div', { className: 'lc-dialog', onClick: function (e) { if (e.target === e.currentTarget && p.onClose) p.onClose(); } },
      h('div', { className: 'lc-dialog__box', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'lc-dialog-title' },
        h('h3', { className: 'lc-dialog__title', id: 'lc-dialog-title' }, p.title),
        p.children ? h('p', { className: 'lc-dialog__body' }, p.children) : null,
        h('div', { className: 'lc-dialog__actions' },
          h(Button, { variant: 'ghost', size: 'sm', onClick: p.onClose }, p.closeLabel || '닫기'))));
  }

  /* ---------- SiteFooter ---------- */
  function SiteFooter(p) {
    return h('footer', { className: cx('lc-footer', p.className), 'aria-label': '사이트 정보' },
      h(Wordmark, { onClick: p.onHome, size: 20 }),
      h(NavMenu, { items: p.items, onNavigate: p.onNavigate, label: '푸터 섹션 바로가기' }),
      h('p', { className: 'lc-footer__copy' }, p.copyright || '© 2026 LOWCORE'));
  }

  var api = {
    Button: Button, NavMenu: NavMenu, SiteHeader: SiteHeader, SectionHeading: SectionHeading, NoticeBox: NoticeBox,
    SpeakerArt: SpeakerArt, PlayControl: PlayControl, CompareTile: CompareTile, ModelCard: ModelCard,
    DetailPanel: DetailPanel, Dialog: Dialog, SiteFooter: SiteFooter
  };
  window.LowCore = Object.assign(window.LowCore || {}, api);
})();
