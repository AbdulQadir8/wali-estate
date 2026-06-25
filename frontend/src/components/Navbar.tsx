import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Home,
  Building2,
  Map,
  Newspaper,
  Contact,
  Calculator,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  {
    label: "Listings",
    href: "/listings",
    icon: Building2,
    children: [
      { label: "For Sale", href: "/listings?sale" },
      { label: "For Rent", href: "/listings?rent" },
      { label: "All Properties", href: "/listings" },
    ],
  },
  { label: "Transfer Expense", href: "/transfer-expense", icon: Calculator },
  { label: "Updates", href: "/blog", icon: Newspaper },
  {
    label: "Maps",
    href: "/maps",
    icon: Map,
    children: [
      { label: "DHA Phase 1-5", href: "/maps/phase-1-5" },
      { label: "DHA Phase 6", href: "/maps/phase-6" },
      { label: "DHA Phase 7", href: "/maps/phase-7" },
      { label: "DHA Phase 8", href: "/maps/phase-8" },
      { label: "DHA Phase 9", href: "/maps/phase-9" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Contact,
    children: [
      { label: "Contact Us", href: "/contact" },
      { label: "Our Team", href: "/agents" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="hidden sm:flex items-center gap-6">
            <span className="text-gray-400">
              Trusted Real Estate. Since 2014.
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href="tel:+923014879005"
              className="flex items-center gap-2 hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+92 301 4879005</span>
            </a>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <a
              href="mailto:info@waliestate.com"
              className="hover:text-gold transition-colors hidden sm:inline"
            >
              info@waliestate.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`
          sticky top-0 z-50 transition-all duration-500
          ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
              : "bg-white py-4"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <span className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                WAlI
              </span>
              <span className="font-accent text-gold text-lg hidden sm:inline">
                Estate
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.children ? (
                  <DropdownMenu key={item.label}>
                    <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-display uppercase tracking-wider text-gray-700 hover:text-gold transition-colors outline-none">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-100 shadow-xl rounded-lg p-2 min-w-[180px]">
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.label} asChild>
                          <a
                            href={child.href}
                            className="px-4 py-2 text-sm text-gray-700 hover:text-gold hover:bg-gold/5 rounded-md cursor-pointer transition-colors"
                          >
                            {child.label}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 text-sm font-display uppercase tracking-wider text-gray-700 hover:text-gold transition-colors underline-animation"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a href="tel:+923014879005" className="btn-primary text-sm">
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-40 lg:hidden transition-all duration-500
          ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`
            absolute right-0 top-0 h-full w-[280px] bg-white shadow-2xl
            transform transition-transform duration-500 custom-expo
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="p-6 pt-20">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="mb-2">
                      <span className="block px-4 py-2 text-sm font-display uppercase tracking-wider text-gray-400">
                        {item.label}
                      </span>
                      <div className="ml-4 border-l-2 border-gold/30 pl-2">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-gold transition-colors"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-display uppercase tracking-wider text-gray-700 hover:text-gold hover:bg-gold/5 rounded-lg transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href="tel:+923014879005"
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
