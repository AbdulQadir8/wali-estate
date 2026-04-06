import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function ContactCTA() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Illustration Side */}
          <div
            className={`
              relative flex items-center justify-center
              transition-all duration-1000
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}
            `}
          >
            <div className="relative w-full max-w-md">
              {/* Main Illustration */}
              <div className="relative animate-float">
                <img
                  src="/images/cta-illustration.jpg"
                  alt="Contact Us"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />

                {/* Sparkles */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gold rounded-full animate-twinkle" />
                <div className="absolute top-1/4 -left-6 w-6 h-6 bg-gold/60 rounded-full animate-twinkle animation-delay-500" />
                <div className="absolute bottom-1/4 -right-6 w-5 h-5 bg-gold/80 rounded-full animate-twinkle animation-delay-1000" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gold/10 rounded-full -z-10" />
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gold/10 rounded-full -z-10" />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`
              transition-all duration-1000 delay-200
              ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}
            `}
          >
            <span className="inline-block font-display text-sm uppercase tracking-[0.2em] text-gold mb-4">
              Get In Touch
            </span>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Would You Like To
              <br />
              <span className="text-gold">Contact Us?</span>
            </h2>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our team of experts is ready to assist you with all your real
              estate needs. Whether you're looking to buy, sell, or invest,
              we're here to help.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+923334023007"
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Phone className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call Us</p>
                  <p className="font-medium text-gray-900">+92 333 4023007</p>
                </div>
              </a>

              <a
                href="mailto:info@waliestate.com"
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Mail className="w-5 h-5 text-gold group-hover:text-black transition-colors" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <p className="font-medium text-gray-900">
                    info@waliestate.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visit Us</p>
                  <p className="font-medium text-gray-900">
                    63-MB, Phase-6, DHA Lahore
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="btn-primary flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/agents"
                className="btn-outline flex items-center justify-center gap-2"
              >
                Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
