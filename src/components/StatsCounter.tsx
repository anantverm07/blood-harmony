import React, { useEffect, useState, useRef } from 'react';
import { Users, Heart, CheckCircle, Building2 } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
}

const StatsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const ref = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    { icon: <Users className="h-6 w-6" />, value: 1200, suffix: '+', label: 'Registered Donors' },
    { icon: <Heart className="h-6 w-6" />, value: 350, suffix: '+', label: 'Receivers Helped' },
    { icon: <CheckCircle className="h-6 w-6" />, value: 150, suffix: '+', label: 'Successful Matches' },
    { icon: <Building2 className="h-6 w-6" />, value: 25, suffix: '+', label: 'Partner Hospitals' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    stats.forEach((stat, index) => {
      let current = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, interval);
    });
  }, [isVisible]);

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`text-center p-6 rounded-2xl bg-card border border-border shadow-sm
            ${isVisible ? 'animate-slide-up' : 'opacity-0'}
          `}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            {stat.icon}
          </div>
          <div className={`text-3xl md:text-4xl font-bold text-foreground mb-1 ${isVisible ? 'animate-count-up' : ''}`}>
            {counts[index]}{stat.suffix}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
