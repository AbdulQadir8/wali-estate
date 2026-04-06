import { MainLayout } from "@/layouts/MainLayout";
import { SectionTitle } from "@/components/SectionTitle";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Award, Users, TrendingUp, Shield, Target, Heart } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    description:
      "We believe in transparent dealings and honest advice. Your trust is our most valuable asset.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in every transaction, ensuring the best outcomes for our clients.",
  },
  {
    icon: Users,
    title: "Client First",
    description:
      "Our clients needs are at the center of everything we do. Your success is our success.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description:
      "We embrace technology and innovative solutions to provide better real estate services.",
  },
];

const stats = [
  { value: "10+", label: "Years of Excellence", icon: Award },
  { value: "500+", label: "Properties Sold", icon: TrendingUp },
  { value: "1000+", label: "Happy Clients", icon: Heart },
  { value: "50+", label: "Team Members", icon: Users },
];

export function About() {
  const { ref: heroRef, isVisible: heroVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { ref: valuesRef, isVisible: valuesVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } =
    useScrollAnimation<HTMLDivElement>();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-32 bg-gray-900 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span
              className={`
                inline-block font-display text-sm uppercase tracking-[0.3em] text-gold mb-6
                transition-all duration-1000
                ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              About Us
            </span>
            <h1
              className={`
                font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6
                transition-all duration-1000 delay-200
                ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              Your Trusted Partner in
              <span className="text-gold"> DHA Real Estate</span>
            </h1>
            <p
              className={`
                text-lg text-gray-300 leading-relaxed
                transition-all duration-1000 delay-400
                ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              Since 2014, WALI Estate has been the leading name in Lahore real
              estate and Dubai property. Recognized as the No.1 authorized
              dealer in DHA, we specialize in providing transparent, reliable,
              and timely services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionTitle
                title="Our Mission"
                subtitle="What Drives Us"
                centered={false}
              />
              <p className="text-gray-600 leading-relaxed mb-6">
                At WALI Estate, our mission is to simplify the real estate
                journey for our clients. We aim to be the most trusted and
                respected real estate company in Pakistan by delivering
                exceptional service and building lasting relationships.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We believe that everyone deserves access to accurate
                information, professional guidance, and fair deals when it comes
                to property transactions. Our team works tirelessly to ensure
                that every client receives personalized attention and expert
                advice.
              </p>
              <div className="flex items-center gap-4 p-4 bg-gold/10 rounded-xl">
                <Award className="w-10 h-10 text-gold" />
                <div>
                  <p className="font-display font-bold text-gray-900">
                    #1 Authorized Dealer
                  </p>
                  <p className="text-sm text-gray-600">In DHA Lahore</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/about-video-thumb.jpg"
                alt="MAAN Estate Office"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold text-black p-6 rounded-xl shadow-gold">
                <div className="font-display text-4xl font-bold">2014</div>
                <div className="text-sm uppercase tracking-wider">
                  Established
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Our Core Values" subtitle="What We Believe In" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className={`
                    bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-500
                    ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 lg:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`
                    text-center
                    ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-gold" />
                  </div>
                  <div className="font-display text-4xl lg:text-5xl font-bold text-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Whether you're looking to buy, sell, or invest in DHA properties,
            our team is here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Get In Touch
            </a>
            <a href="/agents" className="btn-outline">
              Meet Our Team
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
