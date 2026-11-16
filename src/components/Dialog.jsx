import { useEffect, useRef } from 'react';
import './Dialog.css';

// B05 구매 → '준비 중' 안내창. 닫기 버튼·Esc·바깥 클릭으로 닫는다.
export default function Dialog({ open, title, children, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog" onClick={onClose}>
      <div
        className="dialog__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="dialog__title">
          {title}
        </h3>
        {children && <div className="dialog__body">{children}</div>}
        <button ref={closeRef} type="button" className="btn btn--ghost btn--sm dialog__close" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
