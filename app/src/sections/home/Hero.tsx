import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury Interior"
          className="w-full h-[120%] object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Subtitle */}
        <span
          className={`
            inline-block font-display text-sm uppercase tracking-[0.3em] text-gold mb-6
            transition-all duration-1000 delay-300
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          WALI Estate
        </span>

        {/* Main Title */}
        <h1
          className={`
            font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight
            transition-all duration-1000 delay-500
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          YOUR TRUSTED PARTNER
          <br />
          <span className="text-gold">IN DHA REAL ESTATE</span>
        </h1>

        {/* Description */}
        <p
          className={`
            text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed
            transition-all duration-1000 delay-700
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          Delivering verified properties, accurate prices, and expert
          consultancy for confident investment decisions in DHA Lahore and
          beyond.
        </p>

        {/* CTA Buttons */}
        <div
          className={`
            flex flex-col sm:flex-row items-center justify-center gap-4
            transition-all duration-1000 delay-900
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          <a
            href="/listings"
            className="group btn-primary flex items-center gap-2 text-base"
          >
            Explore Listings
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/contact"
            className="btn-secondary flex items-center gap-2 text-base bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
          >
            <Phone className="w-5 h-5" />
            Contact Us
          </a>
        </div>

        {/* Stats */}
        <div
          className={`
            mt-16 grid grid-cols-2 md:grid-cols-4 gap-8
            transition-all duration-1000 delay-1100
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
          `}
        >
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Properties Sold" },
            { value: "1000+", label: "Happy Clients" },
            { value: "6", label: "DHA Locations" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Contact Bar */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-20
          flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3
          border border-white/20
          transition-all duration-1000 delay-1300
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <a
          href="tel:+923334023007"
          className="flex items-center gap-2 text-white hover:text-gold transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="text-sm font-medium">Call: 0333-4023007</span>
        </a>
        <span className="text-white/30">|</span>
        <a
          href="https://wa.me/923334023007"
          className="flex items-center gap-2 text-white hover:text-green-400 transition-colors"
        >
          <span className="text-sm font-medium">WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
