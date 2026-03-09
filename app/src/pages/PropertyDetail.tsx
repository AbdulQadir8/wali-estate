import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  MapPin, Bed, Bath, Square, Phone, Mail,
  Share2, Heart, ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';
import { propertiesApi, type Property } from '@/lib/api';

export function PropertyDetail() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get property ID from URL
  const propertyId = window.location.pathname.split('/').pop() || '';

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await propertiesApi.getPropertyById(propertyId);
        setProperty(data);
      } catch (err) {
        setError('Failed to load property details.');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
              <Square className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !property) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Property Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "The property you're looking for doesn't exist."}
            </p>
            <a href="/listings" className="btn-primary">
              Browse Listings
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span>/</span>
            <a href="/listings" className="hover:text-gold transition-colors">Listings</a>
            <span>/</span>
            <span className="text-gray-900 line-clamp-1">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="relative bg-gray-900">
        <div className="relative h-[50vh] lg:h-[60vh]">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
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

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                transition-all duration-300
                ${isLiked ? 'bg-red-500 text-white' : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'}
              `}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title & Price */}
              <div className="mb-8">
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <MapPin className="w-5 h-5 text-gold" />
                  {property.location}
                </div>
                <div className="font-display text-3xl font-bold text-gold">
                  {property.price}
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-6 p-6 bg-gray-50 rounded-xl mb-8">
                {property.bedrooms && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Bed className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bedrooms</p>
                      <p className="font-display text-xl font-bold">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Bath className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bathrooms</p>
                      <p className="font-display text-xl font-bold">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                {property.area && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center">
                      <Square className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="font-display text-xl font-bold">{property.area}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
                  Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Agent Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-24">
                <h3 className="font-display text-lg uppercase tracking-wider text-gray-900 mb-6">
                  Contact Agent
                </h3>

                {property.agent_id ? (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border-2 border-gold">
                        <Phone className="w-8 h-8 text-gold" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-gray-900">MAAN Estate Agent</p>
                        <p className="text-sm text-gray-500">Property Consultant</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <a
                        href="tel:+923334023007"
                        className="w-full btn-primary flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5" />
                        Call Agent
                      </a>
                      <button
                        onClick={() => setShowContactForm(!showContactForm)}
                        className="w-full btn-outline flex items-center justify-center gap-2"
                      >
                        <Mail className="w-5 h-5" />
                        Send Message
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3 mb-6">
                    <a
                      href="tel:+923334023007"
                      className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Call Us
                    </a>
                    <button
                      onClick={() => setShowContactForm(!showContactForm)}
                      className="w-full btn-outline flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Send Message
                    </button>
                  </div>
                )}

                {/* Contact Form */}
                {showContactForm && (
                  <form className="space-y-4 pt-6 border-t">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Your Phone</label>
                      <input 
                        type="tel" 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        placeholder="Enter your phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Message</label>
                      <textarea 
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                        rows={3}
                        placeholder="I'm interested in this property..."
                      />
                    </div>
                    <Button type="submit" className="w-full btn-primary">
                      Send Inquiry
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
