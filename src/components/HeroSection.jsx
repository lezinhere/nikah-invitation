import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const reveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0  },
};

export default function HeroSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const t = (delay) => ({ duration: 0.8, ease: 'easeOut', delay });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-28"
      style={{ zIndex: 1 }}
    >
      {/* Basmala */}
      <motion.p
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.1)}
        className="font-arabic mb-5"
        style={{ fontSize: 'clamp(1rem, 3vw, 1.35rem)', color: '#C6A769', letterSpacing: '0.04em', fontWeight: 400 }}
      >
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
      </motion.p>

      {/* Thin divider */}
      <motion.div
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.2)}
        className="divider mb-8"
        style={{ width: 48 }}
      />

      {/* Eyebrow */}
      <motion.p
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.3)}
        className="section-label mb-4"
      >
        With the grace of Allah
      </motion.p>

      {/* H1 */}
      <motion.h1
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.42)}
        className="font-cinzel"
        style={{
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          fontWeight: 500,
          letterSpacing: '0.1em',
          color: '#2B2B2B',
          lineHeight: 1,
          marginBottom: '0.2em',
        }}
      >
        Nikah
      </motion.h1>

      <motion.p
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.54)}
        className="font-cinzel"
        style={{
          fontSize: 'clamp(0.75rem, 2.5vw, 1.1rem)',
          fontWeight: 400,
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          color: '#6B6B6B',
          marginBottom: '2.5rem',
        }}
      >
        Ceremony
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.63)}
        className="divider mb-10"
      />

      {/* Hosts */}
      <motion.div
        variants={reveal} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        transition={t(0.76)}
        className="text-center"
      >
        <p className="section-label mb-3">Hosted by</p>
        <p
          className="font-playfair"
          style={{ fontSize: 'clamp(1.15rem, 3.5vw, 1.7rem)', color: '#2B2B2B', fontWeight: 400, lineHeight: 1.5 }}
        >
          Mr. &amp; Mrs. Hassan Kutty Mangalath
        </p>
        <p
          className="font-inter mt-1"
          style={{ fontSize: 'clamp(0.8rem, 2vw, 0.95rem)', color: '#6B6B6B', fontWeight: 300 }}
        >
          Kondotty, Malappuram
        </p>
      </motion.div>

      {/* Scroll hint — arrow only, appears at 2.5s */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1, ease: 'easeOut' }}
        className="absolute bottom-8"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <motion.polyline
              points="1,1 9,9 17,1"
              stroke="#C6A769"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </svg>
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
            <polyline
              points="1,1 9,9 17,1"
              stroke="#C6A769"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>

  );
}
