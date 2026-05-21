import { useEffect, useRef } from 'react';

const BRAZIL_POINTS = [
  [0.45, 0.05], [0.55, 0.03], [0.7, 0.08], [0.82, 0.12], [0.88, 0.18],
  [0.92, 0.28], [0.9, 0.38], [0.85, 0.48], [0.82, 0.55], [0.78, 0.6],
  [0.7, 0.65], [0.65, 0.72], [0.6, 0.78], [0.55, 0.85], [0.48, 0.9],
  [0.4, 0.88], [0.35, 0.82], [0.3, 0.75], [0.25, 0.68], [0.2, 0.6],
  [0.15, 0.5], [0.12, 0.4], [0.15, 0.3], [0.2, 0.22], [0.28, 0.15],
  [0.35, 0.1], [0.45, 0.05],
];

const CITIES = [
  { name: 'SP', x: 0.55, y: 0.7, main: true },
  { name: 'RJ', x: 0.65, y: 0.65 },
  { name: 'BH', x: 0.6, y: 0.55 },
  { name: 'BSB', x: 0.5, y: 0.48 },
  { name: 'SSA', x: 0.78, y: 0.4 },
  { name: 'REC', x: 0.85, y: 0.3 },
  { name: 'FOR', x: 0.78, y: 0.2 },
  { name: 'MAN', x: 0.35, y: 0.2 },
  { name: 'POA', x: 0.45, y: 0.85 },
  { name: 'CWB', x: 0.5, y: 0.78 },
];

const ROUTES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
];

export default function RouteMapCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Draw Brazil outline
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(13, 27, 46, 0.15)';
      ctx.lineWidth = 1;
      BRAZIL_POINTS.forEach((p, i) => {
        const x = p[0] * w;
        const y = p[1] * h;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      // Fill
      ctx.fillStyle = 'rgba(24, 168, 150, 0.04)';
      ctx.fill();

      // Draw routes with animated pulses
      ROUTES.forEach(([from, to], ri) => {
        const c1 = CITIES[from];
        const c2 = CITIES[to];
        const x1 = c1.x * w, y1 = c1.y * h;
        const x2 = c2.x * w, y2 = c2.y * h;

        // Route line
        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, 'rgba(24, 168, 150, 0.7)');
        grad.addColorStop(1, 'rgba(24, 168, 150, 0.1)');
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.5;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Moving dot
        const speed = 0.001 + ri * 0.0002;
        const t = ((frame * speed + ri * 0.3) % 1);
        const dx = x1 + (x2 - x1) * t;
        const dy = y1 + (y2 - y1) * t;

        ctx.beginPath();
        ctx.fillStyle = 'rgba(249, 115, 22, 0.9)';
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.beginPath();
        const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, 8);
        glow.addColorStop(0, 'rgba(249, 115, 22, 0.4)');
        glow.addColorStop(1, 'rgba(249, 115, 22, 0)');
        ctx.fillStyle = glow;
        ctx.arc(dx, dy, 8, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw cities
      CITIES.forEach((city) => {
        const cx = city.x * w;
        const cy = city.y * h;
        const r = city.main ? 4 : 2;

        if (city.main) {
          // Pulsing ring for SP
          const pulse = Math.sin(frame * 0.03) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(24, 168, 150, ${0.2 + pulse * 0.3})`;
          ctx.lineWidth = 1;
          ctx.arc(cx, cy, r + 4 + pulse * 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.fillStyle = city.main ? '#18A896' : 'rgba(24, 168, 150, 0.5)';
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = `${city.main ? 11 : 9}px "JetBrains Mono", monospace`;
        ctx.fillStyle = city.main ? 'rgba(248, 250, 252, 0.9)' : 'rgba(248, 250, 252, 0.35)';
        ctx.fillText(city.name, cx + r + 4, cy + 3);
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
}