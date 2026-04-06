import { MainLayout } from '@/layouts/MainLayout';
import { BlogPostCard } from '@/components/BlogPostCard';
import { SectionTitle } from '@/components/SectionTitle';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';
import { blogApi, type BlogPost } from '@/lib/api';

const categories = ['All', 'Market Updates', 'Investment Guide', 'Guides', 'Market Analysis'];

export function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await blogApi.getPosts(1, 50);
        setPosts(response.items);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = posts.find(p => p.is_featured) || posts[0];
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

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
              Latest Updates
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              News & <span className="text-gold">Insights</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Stay updated with the latest news, market trends, and insights 
              from the DHA real estate market.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${selectedCategory === category
                      ? 'bg-gold text-black'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-lg uppercase tracking-wider text-gray-500 mb-6">
              Featured Article
            </h2>
            <BlogPostCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* All Posts */}
      <section ref={ref} className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={searchQuery || selectedCategory !== 'All' ? 'Search Results' : 'Latest Articles'}
            subtitle={searchQuery || selectedCategory !== 'All' ? `${filteredPosts.length} articles found` : 'All Posts'}
            centered={false}
          />

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchQuery || selectedCategory !== 'All' ? filteredPosts : regularPosts).map((post, index) => (
                <div
                  key={post.id}
                  className={`
                    transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <BlogPostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-display text-xl text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get the latest DHA real estate updates, market insights, and exclusive offers 
            delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
