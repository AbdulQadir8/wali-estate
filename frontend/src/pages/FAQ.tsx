import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { faqs, faqCategories } from '@/data/faq';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group FAQs by category
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block font-display text-sm uppercase tracking-[0.3em] text-gold mb-6">
              Support
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Find answers to common questions about DHA properties, 
              transfer processes, and our services.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white border-b sticky top-[72px] z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      {!searchQuery && (
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {faqCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === category
                      ? 'bg-gold text-black'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Content */}
      <section ref={ref} className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedFaqs).map(([category, categoryFaqs], groupIndex) => (
                <div 
                  key={category}
                  className={`
                    transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{ transitionDelay: `${groupIndex * 100}ms` }}
                >
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm">
                      {categoryFaqs.length}
                    </span>
                    {category}
                  </h2>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {categoryFaqs.map((faq) => (
                      <AccordionItem 
                        key={faq.id} 
                        value={faq.id}
                        className="border border-gray-200 rounded-lg px-6 data-[state=open]:border-gold/50"
                      >
                        <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-gold hover:no-underline py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">
                No questions found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search query
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="btn-outline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="tel:+923334023007" className="btn-outline">
              Call Now
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
