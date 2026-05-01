// Soft ambient blobs — neutral warm tones only, no gold backgrounds
export default function AnimatedBackground() {
  const blobs = [
    { w: 480, h: 380, top: '-8%',  left: '-12%', bg: 'rgba(230,215,195,0.22)', dur: '20s',  delay: '0s'   },
    { w: 420, h: 420, top: '28%',  right:'-12%', bg: 'rgba(220,205,185,0.16)', dur: '26s',  delay: '-7s'  },
    { w: 340, h: 340, bottom:'8%', left: '18%',  bg: 'rgba(232,207,207,0.14)', dur: '24s',  delay: '-13s' },
  ];

  return (
    <div className="blob-bg" aria-hidden="true">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="blob"
          style={{
            width:  b.w,
            height: b.h,
            top:    b.top,
            left:   b.left,
            right:  b.right,
            bottom: b.bottom,
            background: b.bg,
            animationDuration: b.dur,
            animationDelay:    b.delay,
          }}
        />
      ))}
    </div>
  );
}
