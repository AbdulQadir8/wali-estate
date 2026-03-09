import { useState } from 'react';
import { Play, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  'Daily updates on Allocation and Affidavit File Prices',
  'Latest Balloting Results and market insights',
  'Updated Drone Videos, Maps, and Transfer Expenses',
  'Availability of Plots, Houses for Sale, Files Rates',
  'Strong presence in the Dubai Real Estate market',
];

export function About() {
  const [showVideo, setShowVideo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video/Image Side */}
          <div 
            className={`
              relative transition-all duration-1000
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
              
              <img
                src="/images/about-video-thumb.jpg"
                alt="MAAN Estate Property"
                className={`
                  w-full h-full object-cover transition-all duration-700
                  ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                `}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Play Button */}
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-gold">
                  <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                </div>
              </button>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold/10 rounded-full -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold/10 rounded-full -z-10" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:right-8 bg-gold text-black p-6 rounded-xl shadow-gold">
              <div className="font-display text-4xl font-bold">10+</div>
              <div className="text-sm uppercase tracking-wider">Years</div>
            </div>
          </div>

          {/* Content Side */}
          <div 
            className={`
              transition-all duration-1000 delay-200
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
            `}
          >
            <SectionTitle
              title="Real Estate | DHA Experts in Lahore"
              subtitle="Who We Are"
              centered={false}
            />

            <div className="space-y-4 mb-8">
              <p className="text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">#1 Authorized Real Estate Dealer</span> – 
                DHA Lahore & Dubai Property Experts. Maan Estate is the leading name in 
                Lahore real estate and Dubai property.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Recognized as the No.1 authorized dealer in DHA, we specialize in 
                Files Rates, Today File Price, Affidavit, Allocation, and Plots for Sale 
                across all major DHA phases.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              <h4 className="font-display text-lg uppercase tracking-wider text-gray-900 mb-4">
                What We Do:
              </h4>
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-600 italic mb-8">
              Connect with Maan Estate – Your reliable partner in real estate investment, 
              house buying, and DHA file rates.
            </p>

            <a href="/about" className="btn-primary inline-flex items-center gap-2">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ×
            </button>
            <div className="w-full h-full flex items-center justify-center text-white">
              <p className="text-lg">Video Player Placeholder</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
