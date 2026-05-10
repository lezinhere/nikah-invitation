import { motion } from 'framer-motion';

const GOLD       = '#C6A769';
const DOOR_COLOR = '#1A1A1A';
const WALL_COLOR = '#050505';
const BEIGE      = '#1A1A1A'; // used for 3D edges and floor fade
const EASING     = [0.65, 0, 0.2, 1]; 
const DELAY      = 0.3;
const DURATION = 3.0; 

const MinimalWallPattern = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <pattern id="minimalPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.04" />
        <path d="M 40 10 L 70 40 L 40 70 L 10 40 Z" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.02" />
      </pattern>
      <linearGradient id="softGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="50%" stopColor="#C6A769" />
        <stop offset="100%" stopColor="#A88B4C" />
      </linearGradient>
    </defs>
  </svg>
);

const GeometricMotif = ({ cx, cy }) => (
  <g transform={`translate(${cx}, ${cy})`} stroke="url(#softGold)" fill="none" opacity="0.8">
    <circle r="12" strokeWidth="0.5" />
    <path d="M 0 -16 L 3 -4 L 15 0 L 3 4 L 0 16 L -3 4 L -15 0 L -3 -4 Z" strokeWidth="0.8" fill="rgba(198,167,105,0.05)" />
    <circle r="2" fill="url(#softGold)" />
  </g>
);

const LeftDoorSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 160 620" style={{ position: 'absolute', inset: 0 }}>
    <rect width="160" height="620" fill={DOOR_COLOR} />
    {/* Subtle geometric detailing on the doors */}
    <rect width="160" height="620" fill="url(#minimalPattern)" opacity="1" />
    
    <rect x="8" y="8" width="144" height="604" fill="none" stroke="url(#softGold)" strokeWidth="0.6" opacity="0.6" />
    
    <path 
      d="M 16 600 L 16 180 C 40 180 100 80 150 18 L 150 600 Z" 
      fill="none" stroke="url(#softGold)" strokeWidth="1.2" opacity="0.8" 
    />
    <path 
      d="M 22 594 L 22 182 C 44 182 100 85 144 26 L 144 594 Z" 
      fill="none" stroke="url(#softGold)" strokeWidth="0.4" opacity="0.3" 
    />

    <GeometricMotif cx="83" cy="180" />
    <GeometricMotif cx="83" cy="450" />

    {/* Center handle bar */}
    <line x1="148" y1="290" x2="148" y2="330" stroke="url(#softGold)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="148" cy="310" r="2.5" fill="url(#softGold)" />
  </svg>
);

const RightDoorSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 160 620" style={{ position: 'absolute', inset: 0 }}>
    <rect width="160" height="620" fill={DOOR_COLOR} />
    <rect width="160" height="620" fill="url(#minimalPattern)" opacity="1" />
    
    <rect x="8" y="8" width="144" height="604" fill="none" stroke="url(#softGold)" strokeWidth="0.6" opacity="0.6" />
    
    <path 
      d="M 144 600 L 144 180 C 120 180 60 80 10 18 L 10 600 Z" 
      fill="none" stroke="url(#softGold)" strokeWidth="1.2" opacity="0.8" 
    />
    <path 
      d="M 138 594 L 138 182 C 116 182 60 85 16 26 L 16 594 Z" 
      fill="none" stroke="url(#softGold)" strokeWidth="0.4" opacity="0.3" 
    />

    <GeometricMotif cx="77" cy="180" />
    <GeometricMotif cx="77" cy="450" />

    <line x1="12" y1="290" x2="12" y2="330" stroke="url(#softGold)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="310" r="2.5" fill="url(#softGold)" />
  </svg>
);

export default function DoorTransition({ onComplete }) {
  return (
    <motion.div
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 7.5, opacity: 0 }}
      transition={{ 
        scale:   { duration: DURATION + 0.3, ease: EASING, delay: DELAY },
        opacity: { duration: 0.8, ease: 'linear', delay: DELAY + DURATION - 0.4 }
      }}
      onAnimationComplete={onComplete}
    >
      <MinimalWallPattern />

      {/* Soft atmospheric haze */}
      <motion.div 
        style={{ position: 'absolute', inset: 0, zIndex: 99, background: 'radial-gradient(circle at center, rgba(198,167,105,0.05) 0%, transparent 70%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div style={{
        position: 'relative',
        width: 320, height: 620,
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}>

        {/* ── 3D Floor Perspective ── */}
        <div style={{
          position: 'absolute',
          top: '100%', left: '50%',
          width: 3000, height: 2000,
          background: `linear-gradient(to top, rgba(5,5,5,0) 0%, ${BEIGE} 100%)`,
          transformOrigin: 'top center',
          transform: 'translate3d(-50%, 0, -5px) rotateX(85deg)',
          pointerEvents: 'none',
          boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.5)',
        }}>
           {/* Floor grid / reflection lines */}
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(198,167,105,0.02) 1px, transparent 1px)', backgroundSize: '120px 120px' }} />
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(198,167,105,0.02) 1px, transparent 1px)', backgroundSize: '120px 120px' }} />
        </div>

        {/* ── Warm Light Reveal Behind Doors ── */}
        <motion.div style={{
          position: 'absolute', inset: '-50% -50% -50% -50%', transform: 'translateZ(-15px)',
          background: 'radial-gradient(ellipse 40% 70% at 50% 50%, rgba(198,167,105,0.15) 0%, rgba(198,167,105,0.02) 40%, transparent 100%)',
        }} 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: EASING }}
        />

        {/* ── The Minimal Doors (z=-5) ── */}
        <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(-5px)', transformStyle: 'preserve-3d' }}>
          
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '50%',
              transformOrigin: 'left',
              transformStyle: 'preserve-3d',
              boxShadow: 'inset -3px 0 10px rgba(0,0,0,0.01)',
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 105 }}
            transition={{ duration: DURATION, ease: EASING, delay: DELAY }}
          >
            <LeftDoorSVG />
            
            {/* ── Groom Illustration ON Left Door ── */}
            <motion.div style={{
              position: 'absolute',
              bottom: 20, left: -45,
              width: 250, height: 420,
              mixBlendMode: 'lighten', // Crucial: Must be on the motion.div to blend with the door behind it
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              opacity: 0.95,
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' } }}
            >
              <div style={{
                width: '100%', height: '100%',
                backgroundImage: "url('/groom_dark.png')",
                backgroundSize: 'contain',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                transform: 'scaleX(-1)', // Flips the groom to face RIGHT
              }} />
            </motion.div>

            <div style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: 20,
              backgroundColor: BEIGE,
              transformOrigin: 'right',
              transform: 'rotateY(-90deg)',
              borderLeft: '0.5px solid rgba(198,167,105,0.15)',
            }} />
          </motion.div>

          <motion.div
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%',
              transformOrigin: 'right',
              transformStyle: 'preserve-3d',
              boxShadow: 'inset 3px 0 10px rgba(0,0,0,0.01)',
            }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -105 }}
            transition={{ duration: DURATION, ease: EASING, delay: DELAY }}
          >
            <RightDoorSVG />

            {/* ── Bride Illustration ON Right Door ── */}
            <motion.div style={{
              position: 'absolute',
              bottom: 20, right: -45,
              width: 250, height: 420,
              mixBlendMode: 'lighten',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)',
              opacity: 0.95,
            }}
            animate={{ y: [0, -6, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
            >
              <div style={{
                width: '100%', height: '100%',
                backgroundImage: "url('/bride_dark.png')",
                backgroundSize: 'contain',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                transform: 'scaleX(-1)', // Forced CSS flip to guarantee she faces LEFT
              }} />
            </motion.div>

            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: 20,
              backgroundColor: BEIGE,
              transformOrigin: 'left',
              transform: 'rotateY(90deg)',
              borderRight: '0.5px solid rgba(198,167,105,0.15)',
            }} />
          </motion.div>
        </div>

        {/* ── Minimal Infinite Wall (z=0) ── */}
        <div style={{ position: 'absolute', inset: 0, transform: 'translateZ(0px)', pointerEvents: 'none' }}>
          
          <div style={{ position: 'absolute', top: -5000, bottom: -5000, right: '100%', width: 5000, background: WALL_COLOR }} />
          <div style={{ position: 'absolute', top: -5000, bottom: -5000, left: '100%', width: 5000, background: WALL_COLOR }} />
          <div style={{ position: 'absolute', top: -5000, bottom: '100%', left: 0, right: 0, background: WALL_COLOR }} />
          <div style={{ position: 'absolute', top: '100%', bottom: -5000, left: 0, right: 0, background: WALL_COLOR }} />
          
          <svg width="320" height="180" viewBox="0 0 320 180" style={{ position: 'absolute', top: 0, left: 0 }}>
             <path d="M 0 0 L 320 0 L 320 180 C 280 180 220 70 160 10 C 100 70 40 180 0 180 Z" fill={WALL_COLOR} />
          </svg>

          {/* Wall Pattern Overlays */}
          <div style={{ position: 'absolute', top: -5000, bottom: -5000, right: '100%', width: 5000, background: 'url(#minimalPattern)' }} />
          <div style={{ position: 'absolute', top: -5000, bottom: -5000, left: '100%', width: 5000, background: 'url(#minimalPattern)' }} />
          <div style={{ position: 'absolute', top: -5000, bottom: '100%', left: 0, right: 0, background: 'url(#minimalPattern)' }} />
          <div style={{ position: 'absolute', top: '100%', bottom: -5000, left: 0, right: 0, background: 'url(#minimalPattern)' }} />
          
          <svg width="320" height="180" viewBox="0 0 320 180" style={{ position: 'absolute', top: 0, left: 0 }}>
             <path d="M 0 0 L 320 0 L 320 180 C 280 180 220 70 160 10 C 100 70 40 180 0 180 Z" fill="url(#minimalPattern)" />
          </svg>

          {/* Arch Framing Stroke */}
          <svg width="320" height="620" viewBox="0 0 320 620" style={{ position: 'absolute', top: 0, left: 0, filter: 'drop-shadow(0px 8px 16px rgba(198,167,105,0.06))' }}>
            <path d="M 0 620 L 0 180 C 40 180 100 70 160 10 C 220 70 280 180 320 180 L 320 620" fill="none" stroke="url(#softGold)" strokeWidth="1.5" />
            <path d="M -6 620 L -6 180 C 34 180 94 70 160 -2 C 226 70 286 180 326 180 L 326 620" fill="none" stroke="url(#softGold)" strokeWidth="0.5" opacity="0.3" />
          </svg>

        </div>
      </div>
    </motion.div>
  );
}
