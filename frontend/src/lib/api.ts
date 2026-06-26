// API configuration and service functions

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://maan-estate-backend.onrender.com'
    : 'http://localhost:8000');

// Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: string;
  price_numeric?: number;
  location: string;
  address?: string;
  city: string;
  phase?: string;
  block?: string;
  property_type: 'sale' | 'rent';
  category: string;
  status: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  area_sqft?: number;
  is_featured: boolean;
  is_hot: boolean;
  is_new: boolean;
  images: string[];
  main_image?: string;
  features: string[];
  agent_id?: string;
  created_at: string;
  updated_at: string;
  slug?: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  image?: string;
  experience_years?: string;
  specialties: string[];
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  author_name: string;
  author_image?: string;
  category: string;
  tags: string[];
  read_time: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyFilters {
  search?: string;
  property_type?: 'sale' | 'rent';
  category?: string;
  status?: string;
  location?: string;
  phase?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  is_hot?: boolean;
  is_new?: boolean;
  is_featured?: boolean;
  page?: number;
  page_size?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Helper function to build query string
function buildQueryString(params: Record<string, any>): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.append(key, String(value));
    }
  });
  return query.toString();
}

// Auth API
export const authApi = {
  async login(credentials: LoginCredentials) {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async register(data: RegisterData) {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return response.json();
  },
};

// Properties API
export const propertiesApi = {
  async getProperties(filters?: PropertyFilters): Promise<{ items: Property[]; total: number; page: number; page_size: number }> {
    const queryString = filters ? buildQueryString(filters) : '';
    const url = `${API_BASE_URL}/api/v1/properties/${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    return response.json();
  },

  async getPropertyById(id: string): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/api/v1/properties/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    return response.json();
  },

  async getPropertyBySlug(slug: string): Promise<Property> {
    const response = await fetch(`${API_BASE_URL}/api/v1/properties/slug/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }

    return response.json();
  },

  async getFeaturedProperties(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/properties/featured`);

    if (!response.ok) {
      throw new Error('Failed to fetch featured properties');
    }

    return response.json();
  },

  async getHotProperties(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/properties/hot`);

    if (!response.ok) {
      throw new Error('Failed to fetch hot properties');
    }

    return response.json();
  },

  async getNewProperties(): Promise<Property[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/properties/new`);

    if (!response.ok) {
      throw new Error('Failed to fetch new properties');
    }

    return response.json();
  },

  async getPropertyStats() {
    const response = await fetch(`${API_BASE_URL}/api/v1/properties/stats`);

    if (!response.ok) {
      throw new Error('Failed to fetch property stats');
    }

    return response.json();
  },
};

// Agents API
export const agentsApi = {
  async getAgents(): Promise<Agent[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/agents/`);

    if (!response.ok) {
      throw new Error('Failed to fetch agents');
    }

    return response.json();
  },

  async getAgentById(id: string): Promise<Agent> {
    const response = await fetch(`${API_BASE_URL}/api/v1/agents/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch agent');
    }

    return response.json();
  },
};

// Blog API
export const blogApi = {
  async getPosts(page: number = 1, page_size: number = 10): Promise<{ items: BlogPost[]; total: number; page: number; page_size: number }> {
    const response = await fetch(`${API_BASE_URL}/api/v1/blog/?page=${page}&page_size=${page_size}`);

    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    return response.json();
  },

  async getPostById(id: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/api/v1/blog/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }

    return response.json();
  },

  async getPostBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/api/v1/blog/slug/${slug}`);

    if (!response.ok) {
      throw new Error('Failed to fetch blog post');
    }

    return response.json();
  },

  async getFeaturedPosts(): Promise<BlogPost[]> {
    const response = await fetch(`${API_BASE_URL}/api/v1/blog/featured`);

    if (!response.ok) {
      throw new Error('Failed to fetch featured posts');
    }

    return response.json();
  },
};
