import { useCallback, useRef, useState } from 'react';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Dialog from './components/Dialog';
import Hero from './sections/Hero';
import Compare from './sections/Compare';
import Reason from './sections/Reason';
import Models from './sections/Models';
import useSectionNav, { prefersReducedMotion } from './hooks/useSectionNav';

function App() {
  const { active, scrolled, goTo } = useSectionNav();
  const [dialogOpen, setDialogOpen] = useState(false);
  const returnFocus = useRef(null);

  const openDialog = (e) => {
    returnFocus.current = e.currentTarget;
    setDialogOpen(true);
  };

  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    returnFocus.current?.focus();
  }, []);

  return (
    <div className="page">
      <SiteHeader scrolled={scrolled} active={active} onNavigate={goTo} />
      <main>
        <Hero onStart={() => goTo('s02', { delay: prefersReducedMotion() ? 0 : 220, lock: 1500 })} />
        <Compare />
        <Reason />
        <Models onBuy={openDialog} onTry={() => goTo('s02')} />
      </main>
      <SiteFooter onNavigate={goTo} />

      <Dialog open={dialogOpen} title="준비 중입니다" onClose={closeDialog}>
        구매 기능은 아직 준비 중입니다. <span className="note">[안내창 문구 미정]</span>
      </Dialog>
    </div>
  );
}

export default App;
