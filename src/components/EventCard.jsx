import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Airport+Garden+Convention+Centre';

const MapPin = () => (
  <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 1C7.24 1 5 3.24 5 6c0 4.12 5 10 5 10s5-5.88 5-10c0-2.76-2.24-5-5-5z"/>
    <circle cx="10" cy="6" r="2"/>
  </svg>
);

const rows = [
  { label: 'Event',  value: 'Nikah Ceremony' },
  { label: 'Date',   value: 'Saturday, 11 July 2026' },
  { label: 'Time',   value: '11:00 AM' },
  { label: 'Venue',  value: 'Airport Garden Convention Centre' },
];

export default function EventCard() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-tint relative py-24 px-6" style={{ zIndex: 1 }}>
      <div className="max-w-md mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75 }}
          className="text-center mb-10"
        >
          <p className="section-label mb-3">You Are Invited</p>
          <h2
            className="section-heading"
            style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)' }}
          >
            Event Details
          </h2>
          <div className="divider mt-4" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="event-card"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{ padding: 'clamp(1.5rem, 5vw, 2.2rem)' }}
        >
          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0.85rem 0',
                borderBottom: i < rows.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
              }}
            >
              <span
                className="font-inter"
                style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#aaa', marginBottom: '0.25rem', fontWeight: 400 }}
              >
                {row.label}
              </span>
              <span
                className="font-inter"
                style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', color: '#2B2B2B', fontWeight: 400 }}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* Maps button */}
          <div className="mt-6 text-center">
            <motion.a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.6rem',
                background: 'transparent',
                color: '#C6A769',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid rgba(198,167,105,0.5)',
                borderRadius: '3px',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#C6A769';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#C6A769';
              }}
            >
              <MapPin />
              Open in Google Maps
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
