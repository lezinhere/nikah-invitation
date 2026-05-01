import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import AnimatedBackground from './components/AnimatedBackground';
import PetalEffect from './components/PetalEffect';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import CountdownTimer from './components/CountdownTimer';
import EventCard from './components/EventCard';
import ClosingSection from './components/ClosingSection';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introComplete && (
          <IntroAnimation onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeIn' }}
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
      </AnimatePresence>
    </>
  );
}
