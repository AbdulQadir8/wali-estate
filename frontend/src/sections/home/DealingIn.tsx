import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SectionTitle } from '@/components/SectionTitle';

const dhaLocations = [
  {
    name: 'DHA Lahore',
    description: 'The flagship DHA community with phases 1-9 Prism',
    image: '/images/properties/property-4.jpg',
    href: '/listings',
  },
  {
    name: 'DHA Multan',
    description: 'Premium living in South Punjab',
    image: '/images/blog/blog-5.jpg',
    href: '/listings',
  },
  {
    name: 'DHA Bahawalpur',
    description: 'Emerging real estate destination',
    image: '/images/properties/property-3.jpg',
    href: '/listings',
  },
  {
    name: 'DHA Quetta',
    description: 'Strategic investment opportunity',
    image: '/images/properties/property-1.jpg',
    href: '/listings',
  },
  {
    name: 'DHA Peshawar',
    description: 'Gateway to northern opportunities',
    image: '/images/properties/property-2.jpg',
    href: '/listings',
  },
  {
    name: 'DHA Gujranwala',
    description: 'Industrial city premium living',
    image: '/images/properties/property-5.jpg',
    href: '/listings',
  },
];

export function DealingIn() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Marquee Text */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="animate-marquee whitespace-nowrap">
          <span className="font-display text-[200px] font-bold mx-8">DEALING IN</span>
          <span className="font-display text-[200px] font-bold mx-8">DEALING IN</span>
          <span className="font-display text-[200px] font-bold mx-8">DEALING IN</span>
          <span className="font-display text-[200px] font-bold mx-8">DEALING IN</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          title="Dealing In"
          subtitle="Our Coverage"
        />

        {/* Locations Grid - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dhaLocations.map((location, index) => (
            <a
              key={location.name}
              href={location.href}
              className={`
                group relative overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover
                transition-all duration-500 custom-expo
                ${index % 2 === 1 ? 'lg:mt-10' : ''}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
              `}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                  {location.name}
                </h3>
                <p className="text-white/70 text-sm">
                  {location.description}
                </p>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-gold transition-colors duration-500 rounded-2xl" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
