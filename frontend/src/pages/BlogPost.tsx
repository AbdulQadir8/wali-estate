import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { blogApi, type BlogPost as BlogPostType } from '@/lib/api';

export function BlogPost() {
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get slug from URL
  const slug = window.location.pathname.split('/').pop() || '';

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogApi.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError('Failed to load blog post.');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Loading article...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              {error || "The article you're looking for doesn't exist."}
            </p>
            <a href="/blog" className="btn-primary">
              Back to Blog
            </a>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Image */}
      <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src={post.cover_image || '/images/blog/default.jpg'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-gold text-black mb-4">
              {post.category}
            </Badge>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author */}
          <div className="flex items-center gap-4 pb-8 mb-8 border-b">
            {post.author_image && (
              <img
                src={post.author_image}
                alt={post.author_name}
                className="w-14 h-14 rounded-full object-cover border-2 border-gold"
              />
            )}
            <div>
              <p className="font-medium text-gray-900">{post.author_name}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-gray-500 mr-2">Share:</span>
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gold hover:text-black transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Navigation */}
      <section className="py-12 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <a
              href="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </a>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
