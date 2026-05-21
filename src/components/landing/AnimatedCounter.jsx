import { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000, label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-4xl lg:text-6xl font-bold text-vv-navy tracking-tight">
        {prefix}{count}{suffix}
      </div>
      <div className="text-vv-steel text-sm lg:text-base mt-2 tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}