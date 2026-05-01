import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ClosingSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 text-center"
      style={{ zIndex: 1 }}
    >
      {/* Top rule */}
      <motion.div
        className="divider mb-14"
        style={{ width: 120 }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      {/* Blessing quote */}
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.25 }}
      >
        <p
          className="font-playfair"
          style={{
            fontSize: 'clamp(1.05rem, 3vw, 1.35rem)',
            color: '#4A4A4A',
            lineHeight: 1.9,
            fontStyle: 'italic',
            fontWeight: 400,
          }}
        >
          "May Allah bless this union with love, barakah, and happiness,
          and grant them a life filled with peace and togetherness."
        </p>
      </motion.div>

      {/* Arabic dua */}
      <motion.p
        className="font-arabic mt-8"
        style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: '#C6A769', opacity: 0.85 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.85 } : {}}
        transition={{ duration: 0.8, delay: 0.55 }}
      >
        بَارَكَ اللَّهُ لَكُمَا
      </motion.p>

      {/* Footer line */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.75 }}
      >
        <div className="divider mb-7" style={{ width: 120 }} />
        <p
          className="font-inter"
          style={{ fontSize: '0.68rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#aaa', fontWeight: 400 }}
        >
          F &amp; A · 11 July 2026
        </p>
        <p
          className="font-playfair mt-3"
          style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: '#bbb', fontStyle: 'italic' }}
        >
          Wishing you were here to celebrate with us
        </p>
      </motion.div>
    </section>
  );
}
