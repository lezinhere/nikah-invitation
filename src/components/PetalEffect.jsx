import { useEffect, useRef } from 'react';

// Soft blush/rose petal tones
const PETAL_COLORS = ['#E8CFCF', '#DDB5B5', '#F3E3E3', '#D9B8B8', '#EDD8D8'];
const PETAL_COUNT = 10;

function rand(a, b) { return a + Math.random() * (b - a); }

class Petal {
  constructor(canvas, initial = false) {
    this.reset(canvas, initial);
  }

  reset(canvas, initial = false) {
    this.x     = rand(0, canvas.width);
    this.y     = initial ? rand(-100, canvas.height) : rand(-50, -8);
    this.size  = rand(7, 14);
    this.vy    = rand(0.5, 1.1);
    this.vx    = rand(-0.25, 0.25);
    this.angle = rand(0, Math.PI * 2);
    this.spin  = rand(-0.012, 0.012);
    this.sway  = rand(0.35, 0.85);
    this.swayS = rand(0.006, 0.014);
    this.swayO = rand(0, Math.PI * 2);
    this.opacity = rand(0.35, 0.6);   // increased visibility
    this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    this.t = 0;
  }

  update(canvas) {
    this.t++;
    this.y     += this.vy;
    this.x     += this.vx + Math.sin(this.swayO + this.t * this.swayS) * this.sway;
    this.angle += this.spin;
    if (this.y > canvas.height + 30 || this.x < -40 || this.x > canvas.width + 40) {
      this.reset(canvas);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    // Organic petal shape
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.bezierCurveTo( this.size * 0.55, -this.size * 0.45,  this.size * 0.75,  this.size * 0.3, 0,  this.size);
    ctx.bezierCurveTo(-this.size * 0.75,  this.size * 0.3, -this.size * 0.55, -this.size * 0.45, 0, -this.size);
    ctx.fill();
    ctx.restore();
  }
}

export default function PetalEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals = Array.from({ length: PETAL_COUNT }, () => new Petal(canvas, true));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => { p.update(canvas); p.draw(ctx); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="petal-canvas" aria-hidden="true" />;
}
