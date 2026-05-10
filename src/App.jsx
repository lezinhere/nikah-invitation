import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroAnimation   from './components/IntroAnimation';
import DoorTransition   from './components/DoorTransition';
import AnimatedBackground from './components/AnimatedBackground';
import PetalEffect      from './components/PetalEffect';
import HeroSection      from './components/HeroSection';
import CoupleSection    from './components/CoupleSection';
import CountdownTimer   from './components/CountdownTimer';
import EventCard        from './components/EventCard';
import ClosingSection   from './components/ClosingSection';

// Phase order:  'intro' → 'door' → 'main'
export default function App() {
  const [phase, setPhase] = useState('intro');

  return (
    <>
      {/* Dark background layer to prevent white flash during transition */}
      <motion.div
        style={{ position: 'fixed', inset: 0, backgroundColor: '#050505', zIndex: -1 }}
        animate={{ opacity: phase === 'main' ? 0 : 1 }}
        transition={{ duration: 2 }}
      />

      {/* 1 ── Monogram intro */}
      <AnimatePresence>
        {phase === 'intro' && (
          <IntroAnimation onComplete={() => setPhase('door')} />
        )}
      </AnimatePresence>

      {/* 2 ── Arch double-door transition */}
      <AnimatePresence>
        {phase === 'door' && (
          <DoorTransition onComplete={() => setPhase('main')} />
        )}
      </AnimatePresence>

      {/* 3 ── Main invitation (pre-mounted during door phase so it's
               visible behind the doors as they open) */}
      {phase !== 'intro' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 2.6, ease: [0.65, 0, 0.2, 1], delay: 0.2 }}
        >
          {/* Ambient layers */}
          <AnimatedBackground />
          <PetalEffect />

          {/* Page */}
          <main style={{ position: 'relative', zIndex: 1 }}>
            {/* Hero — default bg (#FAF7F2) */}
            <HeroSection />

            {/* Couple — section-tint (#F2EDE6) handled inside component */}
            <CoupleSection />

            {/* Countdown — default bg */}
            <CountdownTimer />

            {/* Event card — section-tint handled inside component */}
            <EventCard />

            {/* Closing — default bg */}
            <ClosingSection />
          </main>
        </motion.div>
      )}
    </>
  );
}
