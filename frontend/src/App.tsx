import { useEffect, useState } from 'react';
import { Home } from '@/pages/Home';
import { Listings } from '@/pages/Listings';
import { PropertyDetail } from '@/pages/PropertyDetail';
import { About } from '@/pages/About';
import { Agents } from '@/pages/Agents';
import { Blog } from '@/pages/Blog';
import { BlogPost } from '@/pages/BlogPost';
import { Contact } from '@/pages/Contact';
import { FAQ } from '@/pages/FAQ';
import './App.css';

// Simple router implementation
function Router() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Handle link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const href = anchor.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setPath(href);
          window.scrollTo(0, 0);
        }
      }
    };

    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Route matching
  if (path === '/' || path === '/index.html') {
    return <Home />;
  }
  
  if (path === '/listings') {
    return <Listings />;
  }
  
  if (path.startsWith('/property/')) {
    return <PropertyDetail />;
  }
  
  if (path === '/about') {
    return <About />;
  }
  
  if (path === '/agents') {
    return <Agents />;
  }
  
  if (path === '/blog') {
    return <Blog />;
  }
  
  if (path.startsWith('/blog/')) {
    return <BlogPost />;
  }
  
  if (path === '/contact') {
    return <Contact />;
  }
  
  if (path === '/faq') {
    return <FAQ />;
  }

  // 404 - Redirect to home
  return <Home />;
}

function App() {
  return <Router />;
}

export default App;
