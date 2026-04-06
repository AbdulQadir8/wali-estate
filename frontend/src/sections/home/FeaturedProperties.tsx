import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/PropertyCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { propertiesApi, type Property } from '@/lib/api';

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const data = await propertiesApi.getFeaturedProperties();
        setProperties(data.slice(0, 6)); // Show max 6 properties
      } catch (err) {
        console.error('Error fetching featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  if (loading) {
    return (
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Featured Properties"
            subtitle="Handpicked Listings"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Featured Properties"
          subtitle="Handpicked Listings"
        />

        <div
          className={`
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
            transition-all duration-1000 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
          `}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/listings" className="btn-primary">
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
}
