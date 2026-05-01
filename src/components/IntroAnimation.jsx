import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Gold used ONLY inside the monogram SVG circle & initials
const GOLD = '#C6A769';

const CircleDrawSVG = () => (
  <svg
    viewBox="0 0 220 220"
    width="220"
    height="220"
    className="absolute"
    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
  >
    {/* Outer circle – stroke-draw */}
    <motion.circle
      cx="110" cy="110" r="100"
      fill="none"
      stroke={GOLD}
      strokeWidth="0.9"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
    />
    {/* Inner dashed ring */}
    <motion.circle
      cx="110" cy="110" r="88"
      fill="none"
      stroke={GOLD}
      strokeWidth="0.35"
      strokeDasharray="3 9"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.35 }}
      transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
    />
    {/* Four cardinal dots */}
    {[0, 90, 180, 270].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      return (
        <motion.circle
          key={i}
          cx={110 + 100 * Math.cos(rad)}
          cy={110 + 100 * Math.sin(rad)}
          r="2.5"
          fill={GOLD}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 0.35, delay: 1.1 + i * 0.08 }}
        />
      );
    })}
  </svg>
);

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('arabic');
  // arabic → circle → initials → hold → exit
  useEffect(() => {
    const t = [
      setTimeout(() => setPhase('circle'),   1000),
      setTimeout(() => setPhase('initials'), 2300),
      setTimeout(() => setPhase('hold'),     3400),
      setTimeout(() => setPhase('exit'),     4400),
      setTimeout(() => onComplete(),          5100),
    ];
    return () => t.forEach(clearTimeout);
  }, [onComplete]);

  const showArabic   = ['arabic','circle','initials','hold'].includes(phase);
  const showCircle   = ['circle','initials','hold'].includes(phase);
  const showInitials = ['initials','hold'].includes(phase);
  const isExiting    = phase === 'exit';

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="intro-overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* ── Basmala ── */}
          <AnimatePresence>
            {showArabic && (
              <motion.p
                key="basmala"
                className="font-arabic absolute select-none"
                style={{
                  fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)',
                  color: GOLD,
                  letterSpacing: '0.04em',
                  fontWeight: 400,
                  bottom: '100%',
                  marginBottom: '2rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{
                  opacity: showCircle ? 0.3 : 0.85,
                  filter: 'blur(0px)',
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Monogram ring ── */}
          <div className="relative" style={{ width: 220, height: 220 }}>
            <AnimatePresence>
              {showCircle && <CircleDrawSVG key="circle" />}
            </AnimatePresence>

            {/* ── F & A initials ── */}
            <AnimatePresence>
              {showInitials && (
                <motion.div
                  key="initials"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                >
                  <div className="flex items-center select-none" style={{ gap: '0.2rem' }}>
                    {/* F */}
                    <motion.span
                      className="font-cinzel-deco monogram-gradient"
                      style={{ fontSize: 'clamp(2.4rem, 7.5vw, 3.6rem)', fontWeight: 700, lineHeight: 1 }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                    >
                      F
                    </motion.span>

                    {/* & — appears last with subtle scale */}
                    <motion.span
                      className="font-playfair"
                      style={{
                        fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
                        color: GOLD,
                        opacity: 0.8,
                        fontWeight: 400,
                        marginTop: '0.4rem',
                        paddingInline: '0.15rem',
                      }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 0.8, scale: [0.9, 1.05, 1] }}
                      transition={{
                        opacity: { duration: 0.35, delay: 0.4 },
                        scale:   { duration: 0.55, delay: 0.4, times: [0, 0.55, 1] },
                      }}
                    >
                      &
                    </motion.span>

                    {/* A */}
                    <motion.span
                      className="font-cinzel-deco monogram-gradient"
                      style={{ fontSize: 'clamp(2.4rem, 7.5vw, 3.6rem)', fontWeight: 700, lineHeight: 1 }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                    >
                      A
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Tagline below monogram ── */}
          <AnimatePresence>
            {showInitials && (
              <motion.p
                key="tagline"
                className="font-inter"
                style={{
                  marginTop: '2rem',
                  fontSize: '0.7rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#9B9080',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  fontWeight: 400,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Nikah Ceremony · 11 July 2026
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
