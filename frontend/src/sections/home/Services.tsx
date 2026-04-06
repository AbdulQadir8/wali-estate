import { useState } from 'react';
import { ShoppingCart, Tag, Key, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  {
    id: 'buy',
    title: 'BUY',
    subtitle: 'What you buy in buying properties?',
    description: 'Find your dream property with our extensive listings of residential and commercial plots, houses, and files across all DHA phases.',
    icon: ShoppingCart,
    href: '/listings?sale',
    color: 'from-gold to-gold-dark',
  },
  {
    id: 'sell',
    title: 'SELL',
    subtitle: 'What you sell in selling properties?',
    description: 'Get the best value for your property with our expert valuation and marketing services. We connect you with genuine buyers.',
    icon: Tag,
    href: '/contact',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'rent',
    title: 'RENT',
    subtitle: 'What you rent in rental properties?',
    description: 'Discover premium rental properties or list your property for rent. We handle tenant screening and rental management.',
    icon: Key,
    href: '/listings?rent',
    color: 'from-gold to-gold-dark',
  },
];

export function Services() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Our Services"
          subtitle="Services"
        />

        {/* Services Grid - Accordion Style */}
        <div 
          className={`
            flex flex-col lg:flex-row gap-4 min-h-[500px]
            transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeService === service.id;
            const isOtherActive = activeService && activeService !== service.id;

            return (
              <div
                key={service.id}
                className={`
                  relative overflow-hidden rounded-2xl cursor-pointer
                  transition-all duration-500 custom-expo
                  ${isActive ? 'lg:flex-[3]' : isOtherActive ? 'lg:flex-[0.5]' : 'lg:flex-1'}
                `}
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background */}
                <div 
                  className={`
                    absolute inset-0 bg-gradient-to-br ${service.color}
                    transition-transform duration-700
                    ${isActive ? 'scale-105' : 'scale-100'}
                  `}
                />

                {/* Content */}
                <div className="relative h-full min-h-[400px] lg:min-h-[500px] p-8 flex flex-col justify-between text-white">
                  {/* Top */}
                  <div>
                    {/* Icon */}
                    <div 
                      className={`
                        w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm 
                        flex items-center justify-center mb-6
                        transition-all duration-500
                        ${isActive ? 'rotate-[360deg] scale-110' : ''}
                      `}
                    >
                      <Icon className="w-8 h-8" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-4xl lg:text-5xl font-bold mb-2">
                      {service.title}
                    </h3>

                    {/* Subtitle - Always visible */}
                    <p className="text-white/80 text-sm uppercase tracking-wider">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Bottom - Description (shows on hover/expand) */}
                  <div 
                    className={`
                      transition-all duration-500
                      ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 lg:opacity-0'}
                    `}
                  >
                    <p className="text-white/90 mb-6 leading-relaxed max-w-md">
                      {service.description}
                    </p>
                    <a 
                      href={service.href}
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-display uppercase tracking-wider text-sm hover:bg-gold transition-colors"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Decorative Pattern */}
                <div 
                  className={`
                    absolute top-0 right-0 w-64 h-64 
                    bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2
                    transition-transform duration-700
                    ${isActive ? 'scale-150' : 'scale-100'}
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
