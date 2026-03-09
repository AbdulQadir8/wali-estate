import { useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/lib/api';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

export function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isFeatured = variant === 'featured';

  return (
    <article 
      className={`
        group bg-white rounded-lg overflow-hidden shadow-card hover:shadow-card-hover
        transition-all duration-500 custom-expo
        ${isFeatured ? 'flex flex-col lg:flex-row' : 'flex flex-col'}
        hover:-translate-y-1
      `}
    >
      {/* Image Container */}
      <div 
        className={`
          relative overflow-hidden img-zoom
          ${isFeatured ? 'aspect-[16/9] lg:aspect-auto lg:w-1/2 lg:min-h-[400px]' : 'aspect-[16/10]'}
        `}
      >
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        
        <img
          src={post.cover_image || '/images/blog/default.jpg'}
          alt={post.title}
          className={`
            w-full h-full object-cover transition-all duration-700
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            group-hover:scale-110
          `}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-gold text-black font-display text-xs uppercase tracking-wider">
            {post.category}
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className={`flex-1 p-6 ${isFeatured && 'lg:p-8 lg:flex lg:flex-col lg:justify-center'}`}>
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gold" />
            <span>{new Date(post.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gold" />
            <span>{post.read_time}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          className={`
            font-display font-medium text-gray-900 mb-3 
            group-hover:text-gold transition-colors duration-300
            ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-lg line-clamp-2'}
          `}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-gray-600 mb-4 ${isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Author & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {post.author_image && (
              <img
                src={post.author_image}
                alt={post.author_name}
                className="w-10 h-10 rounded-full object-cover border-2 border-gold/20"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{post.author_name}</p>
              <p className="text-xs text-gray-500">Author</p>
            </div>
          </div>
          
          <button className="flex items-center gap-2 text-gold font-display text-sm uppercase tracking-wider group/btn">
            Read More
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}
