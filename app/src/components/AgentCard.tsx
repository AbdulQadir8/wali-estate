import { useState } from 'react';
import { Phone, Mail, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Agent } from '@/lib/api';

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 custom-expo hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden img-zoom">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img
          src={agent.image}
          alt={agent.name}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            group-hover:scale-110
          `}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Experience Badge */}
        {agent.experience_years && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-gold text-black font-display text-xs uppercase tracking-wider flex items-center gap-1">
              <Award className="w-3 h-3" />
              {agent.experience_years}
            </Badge>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Quick Contact Buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          <a 
            href={`tel:${agent.phone}`}
            className="flex-1 bg-gold text-black py-2.5 rounded-md font-display text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-dark transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
          <a 
            href={`mailto:${agent.email}`}
            className="flex-1 bg-white text-black py-2.5 rounded-md font-display text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name & Title */}
        <h3 className="font-display text-xl font-medium text-gray-900 mb-1 group-hover:text-gold transition-colors duration-300">
          {agent.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{agent.title}</p>

        {/* Bio */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {agent.bio}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-5">
          {agent.specialties.map((specialty, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button 
          className="w-full bg-black text-white hover:bg-gold hover:text-black transition-all duration-300 font-display uppercase tracking-wider"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
}
