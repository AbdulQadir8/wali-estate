import { useEffect, useRef, useState } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionTitle({ 
  title, 
  subtitle, 
  centered = true, 
  light = false,
  className = ''
}: SectionTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      {subtitle && (
        <span 
          className={`
            inline-block font-display text-sm uppercase tracking-[0.2em] mb-3
            ${light ? 'text-gold' : 'text-gold'}
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {subtitle}
        </span>
      )}
      <h2 
        className={`
          font-display text-3xl md:text-4xl lg:text-5xl font-medium
          ${light ? 'text-white' : 'text-gray-900'}
          transition-all duration-700 delay-100
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {title}
      </h2>
      <div 
        className={`
          mt-4 flex ${centered ? 'justify-center' : 'justify-start'}
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="w-20 h-1 bg-gold rounded-full" />
      </div>
    </div>
  );
}
