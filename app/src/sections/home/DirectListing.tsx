import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const phases = [
  { id: 'phase-1-5', label: 'DHA Phase 1 to 5', href: '/listings' },
  { id: 'phase-6', label: 'DHA Phase 6', href: '/listings' },
  { id: 'phase-7', label: 'DHA Phase 7', href: '/listings' },
  { id: 'phase-8', label: 'DHA Phase 8', href: '/listings' },
  { id: 'phase-9', label: 'DHA Phase 9', href: '/listings' },
  { id: 'files', label: 'DHA Files Rate', href: '/listings' },
];

export function DirectListing() {
  const [activePhase, setActivePhase] = useState(phases[0].id);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Direct Listings"
          subtitle="Browse By Phase"
          light
        />

        <div 
          className={`
            transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {/* Phase Buttons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {phases.map((phase) => (
              <a
                key={phase.id}
                href={phase.href}
                onMouseEnter={() => setActivePhase(phase.id)}
                className={`
                  group relative overflow-hidden rounded-xl p-6
                  transition-all duration-500 custom-expo
                  ${activePhase === phase.id 
                    ? 'bg-gold text-black' 
                    : 'bg-white/5 text-white hover:bg-white/10'
                  }
                `}
              >
                {/* Background Animation */}
                <div 
                  className={`
                    absolute inset-0 bg-gold transform -translate-x-full
                    transition-transform duration-500 custom-expo
                    group-hover:translate-x-0
                    ${activePhase === phase.id ? 'translate-x-0' : ''}
                  `}
                />

                {/* Content */}
                <div className="relative z-10">
                  <span 
                    className={`
                      font-display text-lg uppercase tracking-wider
                      transition-colors duration-300
                      ${activePhase === phase.id ? 'text-black' : 'group-hover:text-black'}
                    `}
                  >
                    {phase.label}
                  </span>
                  <ArrowRight 
                    className={`
                      w-5 h-5 mt-2 transform transition-all duration-300
                      ${activePhase === phase.id 
                        ? 'translate-x-0 opacity-100 text-black' 
                        : '-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }
                    `}
                  />
                </div>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? Contact our team for personalized assistance.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center gap-2 btn-primary"
            >
              Get Personalized Assistance
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
