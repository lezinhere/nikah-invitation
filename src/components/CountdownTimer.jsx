import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const TARGET = new Date('2026-07-11T11:00:00');

function getTimeLeft() {
  const diff = TARGET - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n) { return String(n).padStart(2, '0'); }

// ── Compact countdown box (secondary) ────────────────────
function TimeBox({ value, label, inView, delay }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
    >
      <span
        className="font-cinzel"
        style={{
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          fontWeight: 500,
          lineHeight: 1,
          color: '#2B2B2B',
          letterSpacing: '0.02em',
          display: 'block',
          padding: 'clamp(0.5rem, 2vw, 0.8rem) clamp(0.6rem, 2vw, 0.9rem)',
          background: '#F2EDE6',
          border: '1px solid rgba(198,167,105,0.15)',
          borderRadius: '3px',
          minWidth: 'clamp(52px, 12vw, 72px)',
          textAlign: 'center',
        }}
      >
        {pad(value)}
      </span>
      <span
        className="font-inter mt-1.5"
        style={{ fontSize: '0.57rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#bbb', fontWeight: 400 }}
      >
        {label}
      </span>
    </motion.div>
  );
}

const Dot = ({ inView }) => (
  <motion.span
    initial={{ opacity: 0 }}
    animate={inView ? { opacity: 1 } : {}}
    transition={{ delay: 0.4 }}
    className="self-center font-cinzel pb-5"
    style={{ fontSize: '1.1rem', color: 'rgba(198,167,105,0.4)', fontWeight: 300 }}
  >
    :
  </motion.span>
);

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft());
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative py-28 px-6" style={{ zIndex: 1, background: '#FEFCF8' }}>
      <div className="max-w-xl mx-auto text-center">

        {/* Visual separator from section above */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            width: 60,
            height: 1,
            background: 'rgba(198,167,105,0.35)',
            margin: '0 auto 2.5rem',
          }}
        />

        {/* Eyebrow */}
        <motion.p
          className="section-label mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Counting Down To
        </motion.p>

        {/* ── DATE HIGHLIGHT (primary) ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{
            background: 'linear-gradient(135deg, #FAF7F2 0%, #F5EEE4 100%)',
            border: '1px solid rgba(198,167,105,0.28)',
            borderRadius: '4px',
            padding: 'clamp(1.8rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 3rem)',
            marginBottom: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Corner accents */}
          {[
            { top: 10, left: 10 },
            { top: 10, right: 10 },
            { bottom: 10, left: 10 },
            { bottom: 10, right: 10 },
          ].map((pos, i) => (
            <svg key={i} width="12" height="12" viewBox="0 0 12 12" style={{ position: 'absolute', ...pos, opacity: 0.35 }}>
              <path
                d={
                  i === 0 ? 'M12,0 L0,0 L0,12' :
                  i === 1 ? 'M0,0 L12,0 L12,12' :
                  i === 2 ? 'M0,0 L0,12 L12,12' :
                           'M0,12 L12,12 L12,0'
                }
                fill="none" stroke="#C6A769" strokeWidth="1"
              />
            </svg>
          ))}

          {/* Day of week */}
          <p
            className="font-inter"
            style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C6A769', marginBottom: '0.6rem', fontWeight: 500 }}
          >
            Saturday
          </p>

          {/* Date — hero */}
          <p
            className="font-cinzel"
            style={{
              fontSize: 'clamp(2.2rem, 7vw, 3.8rem)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: '#2B2B2B',
              lineHeight: 1.1,
              marginBottom: '0.5rem',
            }}
          >
            11 July 2026
          </p>

          {/* Thin divider */}
          <div style={{ width: 48, height: 1, background: 'rgba(198,167,105,0.45)', margin: '0.8rem auto' }} />

          {/* Time — gold highlight */}
          <p
            className="font-cinzel"
            style={{
              fontSize: 'clamp(1.5rem, 4.5vw, 2.4rem)',
              fontWeight: 500,
              letterSpacing: '0.12em',
              color: '#C6A769',
              lineHeight: 1,
            }}
          >
            11:00 AM
          </p>

          {/* Venue reminder */}
          <p
            className="font-inter mt-3"
            style={{ fontSize: 'clamp(0.72rem, 2vw, 0.82rem)', color: '#aaa', fontWeight: 300, letterSpacing: '0.04em' }}
          >
            Airport Garden Convention Centre
          </p>
        </motion.div>

        {/* ── COUNTDOWN (secondary) ─────────────────────── */}
        <motion.p
          className="section-label mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          Time Remaining
        </motion.p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: 'clamp(0.35rem, 1.5vw, 0.7rem)', flexWrap: 'wrap' }}>
          <TimeBox value={time.days}    label="Days"    inView={inView} delay={0.55} />
          <Dot inView={inView} />
          <TimeBox value={time.hours}   label="Hours"   inView={inView} delay={0.65} />
          <Dot inView={inView} />
          <TimeBox value={time.minutes} label="Mins"    inView={inView} delay={0.75} />
          <Dot inView={inView} />
          <TimeBox value={time.seconds} label="Secs"    inView={inView} delay={0.85} />
        </div>
      </div>
    </section>
  );
}
