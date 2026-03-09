import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "/listings" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/agents" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const services = [
  { label: "Buy Property", href: "/listings?sale" },
  { label: "Sell Property", href: "/contact" },
  { label: "Rent Property", href: "/listings?rent" },
  { label: "Property Valuation", href: "/contact" },
  { label: "Investment Consulting", href: "/contact" },
  { label: "Transfer Services", href: "/transfer-expense" },
];

const dhaLocations = [
  { label: "DHA Lahore", href: "/listings" },
  { label: "DHA Multan", href: "/listings" },
  { label: "DHA Bahawalpur", href: "/listings" },
  { label: "DHA Quetta", href: "/listings" },
  { label: "DHA Peshawar", href: "/listings" },
  { label: "DHA Gujranwala", href: "/listings" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold tracking-tight">
                wali
              </span>
              <span className="font-accent text-gold text-xl ml-1">Estate</span>
            </a>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              DHA & Dubai | Trustworthy Real Estate Team. Your trusted partner
              in DHA real estate since 2014.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>63-MB, Phase-6, DHA Lahore</span>
              </div>
              <a
                href="tel:+923334023007"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-gold transition-colors"
              >
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span>+92 333 4023007</span>
              </a>
              <a
                href="mailto:info@waliestate.com"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-gold transition-colors"
              >
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span>info@waliestate.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-gold transition-colors underline-animation"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-gray-400 text-sm hover:text-gold transition-colors underline-animation"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* DHA Locations */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wider mb-6">
              Dealing In
            </h4>
            <ul className="space-y-3">
              {dhaLocations.map((location) => (
                <li key={location.label}>
                  <a
                    href={location.href}
                    className="text-gray-400 text-sm hover:text-gold transition-colors underline-animation"
                  >
                    {location.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} wali Estate. All rights
              reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center hover:bg-gold-dark transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
