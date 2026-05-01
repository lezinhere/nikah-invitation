import { motion, useInView, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useRef, useState } from 'react';

const GOLD = '#C6A769';

const reveal = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0  },
};

const ThinRule = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1.2rem auto', width: 'fit-content' }}>
    <div style={{ width: 32, height: '1px', background: 'rgba(198,167,105,0.4)' }} />
    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(198,167,105,0.55)' }} />
    <div style={{ width: 32, height: '1px', background: 'rgba(198,167,105,0.4)' }} />
  </div>
);

function PersonCard({ initial, name, lineage, house, location, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <motion.div
      ref={ref}
      variants={reveal}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.75, ease: 'easeOut', delay }}
      className="text-center"
      style={{ maxWidth: 300, margin: '0 auto' }}
    >
      <h3
        className="font-playfair"
        style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.65rem)', color: '#2B2B2B', fontWeight: 500, marginBottom: '0.25rem' }}
      >
        {name}
      </h3>
      <ThinRule />
      <p className="font-inter" style={{ fontSize: 'clamp(0.82rem, 2vw, 0.93rem)', color: '#6B6B6B', lineHeight: 1.75, fontWeight: 300 }}>
        {lineage}
      </p>
      <p className="font-inter mt-1" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)', color: '#888', fontWeight: 300 }}>
        {house}
      </p>
      <p className="font-inter mt-0.5" style={{ fontSize: 'clamp(0.72rem, 1.6vw, 0.82rem)', color: '#aaa', fontWeight: 300, letterSpacing: '0.04em' }}>
        {location}
      </p>
    </motion.div>
  );
}

// ── Scroll-driven F & A monogram ──────────────────────────
function MonogramStage({ sectionRef }) {
  const [isJoined, setIsJoined] = useState(false);

  // Track scroll within the couple section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'center 35%'],
  });

  // Spring wrap — smooth, bidirectional following
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 18, restDelta: 0.001 });

  // F slides from left to center, A slides from right to center
  const fX = useTransform(smooth, [0, 1], [-130, 0]);
  const aX = useTransform(smooth, [0, 1], [130, 0]);

  // & fades in when they're converging
  const ampOpacity = useTransform(smooth, [0.3, 0.75], [0, 1]);
  const ampScale   = useTransform(smooth, [0.3, 0.75], [0.5, 1]);

  // Circle draws around the joined monogram
  const ringPath    = useTransform(smooth, [0.6, 1.0], [0, 1]);
  const ringOpacity = useTransform(smooth, [0.6, 0.85], [0, 0.4]);

  // Detect "joined" to trigger float
  useMotionValueEvent(smooth, 'change', (v) => setIsJoined(v >= 0.82));

  const LETTER_SIZE = 'clamp(2.6rem, 8vw, 4rem)';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: 'auto', paddingTop: '0.4rem', position: 'relative' }}>
      {/* Float wrapper — activates when joined */}
      <motion.div
        style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        animate={isJoined ? { y: [0, -9, 0] } : { y: 0 }}
        transition={
          isJoined
            ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.5, ease: 'easeOut' }
        }
      >
        {/* SVG ring — draws when joined */}
        <svg
          viewBox="0 0 170 80"
          width="170"
          height="80"
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', overflow: 'visible' }}
        >
          <motion.ellipse
            cx="85" cy="40" rx="78" ry="35"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.8"
            style={{ pathLength: ringPath, opacity: ringOpacity }}
          />
        </svg>

        {/* F */}
        <motion.span
          style={{ x: fX, display: 'inline-block' }}
          className="font-cinzel-deco monogram-gradient select-none"
          aria-hidden="true"
        >
          <span style={{ fontSize: LETTER_SIZE, fontWeight: 700, lineHeight: 1 }}>F</span>
        </motion.span>

        {/* & */}
        <motion.span
          style={{ opacity: ampOpacity, scale: ampScale, display: 'inline-block', marginInline: '0.2rem' }}
          className="font-playfair select-none"
          aria-hidden="true"
        >
          <span style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', color: GOLD, fontWeight: 400, lineHeight: 1, marginTop: '0.3rem', display: 'inline-block' }}>
            &amp;
          </span>
        </motion.span>

        {/* A */}
        <motion.span
          style={{ x: aX, display: 'inline-block' }}
          className="font-cinzel-deco monogram-gradient select-none"
          aria-hidden="true"
        >
          <span style={{ fontSize: LETTER_SIZE, fontWeight: 700, lineHeight: 1 }}>A</span>
        </motion.span>
      </motion.div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────
export default function CoupleSection() {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="section-tint relative couple-section-padding px-6"
      style={{ zIndex: 1, position: 'relative' }}
    >
      {/* Heading */}
      <motion.div
        ref={titleRef}
        variants={reveal}
        initial="hidden"
        animate={titleInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.8 }}
        className="text-center couple-heading-margin"
      >
        <p className="section-label mb-3">Joining Together</p>
        <h2 className="section-heading" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)' }}>
          The Blessed Union
        </h2>
        <div className="divider mt-4" />
      </motion.div>

      {/* Couple Section Container */}
      <div className="max-w-6xl mx-auto relative w-full flex flex-col items-center">
        {/* Desktop Monogram Layer — Absolutely centered */}
        <div className="hidden md:flex absolute inset-x-0 top-0 items-start justify-center pointer-events-none" style={{ paddingTop: '0' }}>
          <div className="w-[300px] flex justify-center mt-[0.1rem]">
            <MonogramStage sectionRef={sectionRef} />
          </div>
        </div>

        {/* Grid for Cards — Centered and symmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start w-full" style={{ gap: '1.2rem 0' }}>
          {/* Bride */}
          <div className="flex justify-center md:justify-end md:pr-24 lg:pr-32">
            <PersonCard
              initial="F"
              name="Fasmin M"
              lineage="Daughter of Hassan Kutty & Shareefa"
              house="Moyalood House, Kondotty"
              location="Malappuram"
              delay={0.1}
            />
          </div>

          {/* Mobile Monogram — Appears between cards only on small screens */}
          <div className="md:hidden w-full overflow-hidden flex flex-col items-center" style={{ margin: '-0.5rem 0', padding: '20px 0' }}>
            <MonogramStage sectionRef={sectionRef} />
          </div>

          {/* Groom */}
          <div className="flex justify-center md:justify-start md:pl-24 lg:pl-32">
            <PersonCard
              initial="A"
              name="Adil Hussain"
              lineage="Son of Asif Hussain & Fousiya"
              house="Nasrin House, Thamarassery"
              location="Kozhikode"
              delay={0.2}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
