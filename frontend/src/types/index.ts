// Re-export all types from data files
export type { Property } from '@/data/listings';
export type { Agent } from '@/data/agents';
export type { BlogPost } from '@/data/blog';
export type { FAQ } from '@/data/faq';

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Component prop types
export interface SectionProps {
  className?: string;
  id?: string;
}

export interface AnimationProps {
  delay?: number;
  duration?: number;
  className?: string;
}
