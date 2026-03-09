export interface Agent {
  id: string;
  name: string;
  title: string;
  image: string;
  listingsCount: number;
  phone: string;
  email: string;
  bio: string;
  specialties: string[];
  experience: string;
}

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Muhammad Munir Gill',
    title: 'Director of MAAN ESTATE',
    image: '/images/agents/agent-1.jpg',
    listingsCount: 45,
    phone: '+92 333 4023007',
    email: 'munir@maanestate.com',
    bio: 'Muhammad Munir Gill is a seasoned real estate professional with over 15 years of experience in DHA Lahore property market. As Director of MAAN ESTATE, he specializes in Phase 9 Prism and high-value commercial transactions.',
    specialties: ['DHA Phase 9 Prism', 'Commercial Properties', 'Investment Consulting'],
    experience: '15+ Years'
  },
  {
    id: '2',
    name: 'Usman Ashraf Maan',
    title: 'CEO of MAAN ESTATE',
    image: '/images/agents/agent-2.jpg',
    listingsCount: 62,
    phone: '+92 333 4023007',
    email: 'usman@maanestate.com',
    bio: 'Usman Ashraf Maan, CEO of MAAN ESTATE, brings a wealth of knowledge in luxury properties and DHA Phase 8 developments. His expertise in market analysis helps clients make informed investment decisions.',
    specialties: ['DHA Phase 8', 'Luxury Properties', 'Market Analysis'],
    experience: '12+ Years'
  },
  {
    id: '3',
    name: 'Ahmed Hassan',
    title: 'Senior Property Consultant',
    image: '/images/agents/agent-3.jpg',
    listingsCount: 38,
    phone: '+92 333 4023008',
    email: 'ahmed@maanestate.com',
    bio: 'Ahmed Hassan is a dedicated property consultant specializing in residential plots and houses across all DHA phases. His client-first approach has earned him a reputation for excellence.',
    specialties: ['Residential Plots', 'Houses', 'Client Relations'],
    experience: '8+ Years'
  },
  {
    id: '4',
    name: 'Sarah Khan',
    title: 'Property Advisor',
    image: '/images/agents/agent-4.jpg',
    listingsCount: 29,
    phone: '+92 333 4023009',
    email: 'sarah@maanestate.com',
    bio: 'Sarah Khan specializes in commercial properties and rental management. Her attention to detail and market insights make her an invaluable asset for investors and tenants alike.',
    specialties: ['Commercial Properties', 'Rental Management', 'Market Research'],
    experience: '6+ Years'
  },
  {
    id: '5',
    name: 'Ali Raza',
    title: 'Property Consultant',
    image: '/images/agents/agent-5.jpg',
    listingsCount: 24,
    phone: '+92 333 4023010',
    email: 'ali@maanestate.com',
    bio: 'Ali Raza focuses on emerging DHA developments and file trading. His up-to-date knowledge of market trends helps clients identify the best opportunities.',
    specialties: ['File Trading', 'Emerging Developments', 'Market Trends'],
    experience: '5+ Years'
  },
  {
    id: '6',
    name: 'Fatima Zahra',
    title: 'Client Relations Manager',
    image: '/images/agents/agent-6.jpg',
    listingsCount: 31,
    phone: '+92 333 4023011',
    email: 'fatima@maanestate.com',
    bio: 'Fatima Zahra excels in building lasting client relationships. She specializes in understanding client needs and matching them with the perfect properties.',
    specialties: ['Client Relations', 'Property Matching', 'After-Sales Service'],
    experience: '7+ Years'
  }
];
