import { useState } from 'react';
import { MapPin, Bed, Bath, Square, Heart, Share2, Expand } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Property } from '@/lib/api';

interface PropertyCardProps {
  property: Property;
  view?: 'grid' | 'list';
}

export function PropertyCard({ property, view = 'grid' }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isGrid = view === 'grid';

  return (
    <a
      href={`/property/${property.id}`}
      className={`
        group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover
        transition-all duration-500 custom-expo
        ${isGrid ? 'flex flex-col' : 'flex flex-col md:flex-row'}
        hover:-translate-y-1
      `}
    >
      {/* Image Container */}
      <div 
        className={`
          relative overflow-hidden img-zoom
          ${isGrid ? 'aspect-[16/10]' : 'aspect-[16/10] md:aspect-square md:w-80'}
        `}
      >
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img
          src={property.main_image || property.images[0] || '/images/placeholder.jpg'}
          alt={property.title}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            group-hover:scale-110
          `}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-gold text-black font-display text-xs uppercase tracking-wider">
            For {property.property_type === 'sale' ? 'Sale' : 'Rent'}
          </Badge>
          {property.is_hot && (
            <Badge className="bg-red-500 text-white font-display text-xs uppercase tracking-wider">
              Hot
            </Badge>
          )}
          {property.is_new && (
            <Badge className="bg-green-500 text-white font-display text-xs uppercase tracking-wider">
              New
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-black/80 text-white px-4 py-2 font-display text-sm uppercase tracking-wider">
            {property.price}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center
              transition-all duration-300
              ${isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700 hover:bg-gold hover:text-black'}
            `}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-gold hover:text-black transition-all duration-300">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-gray-700 hover:bg-gold hover:text-black transition-all duration-300">
            <Expand className="w-4 h-4" />
          </button>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className={`flex-1 p-5 ${!isGrid && 'md:p-6'}`}>
        {/* Title */}
        <h3 className="font-display text-lg font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-gold transition-colors duration-300">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 text-gold" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-3 mb-4">
          {property.bedrooms && (
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Bed className="w-4 h-4 text-gold" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Bath className="w-4 h-4 text-gold" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <Square className="w-4 h-4 text-gold" />
              <span>{property.area}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {property.category}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {property.property_type === 'sale' ? 'Property' : 'Rental'}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-medium text-gray-900 line-clamp-1">{property.phase || property.city}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm pointer-events-none"
          >
            View Details
          </Button>
        </div>
      </div>
    </a>
  );
}
