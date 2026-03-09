export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  type: "sale" | "rent";
  category: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  image: string;
  images: string[];
  agent: string;
  agentImage: string;
  agentTitle: string;
  isHot?: boolean;
  isNew?: boolean;
  description: string;
  features: string[];
  date: string;
}

export const listings: Property[] = [
  {
    id: "1",
    title:
      "4 + 4 Marla Corner Front and Back Both Side Facing Parking in DHA Phase 7 Block CCA6 Lahore",
    price: "On Call",
    location: "DHA Phase 7, Block CCA6, Lahore",
    type: "sale",
    category: "Commercial Plots",
    area: "8 Marla",
    image: "/images/properties/property-1.jpg",
    images: [
      "/images/properties/property-1.jpg",
      "/images/properties/property-2.jpg",
      "/images/properties/property-3.jpg",
    ],
    agent: "Muhammad Munir Gill",
    agentImage: "/images/agents/agent-1.jpg",
    agentTitle: "Director of WALI ESTATE | DHA Lahore Phase 9 Prism Expert",
    isHot: true,
    isNew: false,
    description:
      "Premium commercial plot located in the heart of DHA Phase 7. This corner plot offers excellent visibility and access from both front and back sides. Ideal for commercial development with ample parking space.",
    features: [
      "Corner Plot",
      "Parking Space",
      "Prime Location",
      "Commercial Zone",
      "Wide Road Access",
    ],
    date: "1 year ago",
  },
  {
    id: "2",
    title: "8 Marla Commercial Plot in Block M Extension DHA Phase 5 Lahore",
    price: "On Call",
    location: "DHA Phase 5, Block M Extension, Lahore",
    type: "sale",
    category: "Commercial Plots",
    area: "8 Marla",
    image: "/images/properties/property-2.jpg",
    images: [
      "/images/properties/property-2.jpg",
      "/images/properties/property-4.jpg",
    ],
    agent: "Usman Ashraf WALI",
    agentImage: "/images/agents/agent-2.jpg",
    agentTitle: "CEO of WALI ESTATE | DHA Lahore Phase 8 Property Expert",
    isHot: false,
    isNew: false,
    description:
      "Strategic commercial plot in DHA Phase 5 Extension. Perfect for building your dream commercial project with high ROI potential.",
    features: [
      "Commercial Zone",
      "Wide Roads",
      "Utilities Available",
      "Secure Area",
    ],
    date: "1 year ago",
  },
  {
    id: "3",
    title: "1 Kanal Plot Is Available For Sale In DHA Phase 9 Block N Lahore",
    price: "On Call",
    location: "DHA Phase 9, Block N, Lahore",
    type: "sale",
    category: "Residential Plots",
    area: "1 Kanal",
    image: "/images/properties/property-3.jpg",
    images: [
      "/images/properties/property-3.jpg",
      "/images/properties/property-5.jpg",
    ],
    agent: "Muhammad Munir Gill",
    agentImage: "/images/agents/agent-1.jpg",
    agentTitle: "Director of WALI ESTATE | DHA Lahore Phase 9 Prism Expert",
    isHot: false,
    isNew: true,
    description:
      "Beautiful 1 Kanal residential plot in DHA Phase 9 Block N. Perfect location for building your dream home in one of the most prestigious areas of Lahore.",
    features: [
      "1 Kanal",
      "Residential Zone",
      "Park Facing",
      "Corner Option",
      "Development Complete",
    ],
    date: "2 months ago",
  },
  {
    id: "4",
    title: "2 Kanal Furnished Brand New House for Sale DHA Phase 6",
    price: "On Call",
    location: "DHA Phase 6, Lahore",
    type: "sale",
    category: "Houses",
    bedrooms: 5,
    bathrooms: 6,
    area: "2 Kanal",
    image: "/images/properties/property-4.jpg",
    images: [
      "/images/properties/property-4.jpg",
      "/images/properties/property-6.jpg",
      "/images/properties/property-7.jpg",
    ],
    agent: "Usman Ashraf WALI",
    agentImage: "/images/agents/agent-2.jpg",
    agentTitle: "CEO of WALI ESTATE | DHA Lahore Phase 8 Property Expert",
    isHot: true,
    isNew: true,
    description:
      "Luxurious 2 Kanal fully furnished brand new house in DHA Phase 6. State-of-the-art construction with modern amenities and premium finishes.",
    features: [
      "5 Bedrooms",
      "6 Bathrooms",
      "Fully Furnished",
      "Modern Design",
      "Swimming Pool",
      "Basement",
    ],
    date: "3 weeks ago",
  },
  {
    id: "5",
    title: "10 Marla Residential Plot in DHA Phase 8 Block S",
    price: "On Call",
    location: "DHA Phase 8, Block S, Lahore",
    type: "sale",
    category: "Residential Plots",
    area: "10 Marla",
    image: "/images/properties/property-5.jpg",
    images: [
      "/images/properties/property-5.jpg",
      "/images/properties/property-8.jpg",
    ],
    agent: "Ahmed Hassan",
    agentImage: "/images/agents/agent-3.jpg",
    agentTitle: "Senior Property Consultant | DHA Phase 8 Expert",
    isHot: false,
    isNew: false,
    description:
      "Prime 10 Marla residential plot in DHA Phase 8 Block S. Excellent location with all modern amenities nearby.",
    features: [
      "10 Marla",
      "Park View",
      "Near Commercial",
      "Development Complete",
    ],
    date: "6 months ago",
  },
  {
    id: "6",
    title: "5 Marla Commercial Plot in DHA Phase 7 Block Y",
    price: "On Call",
    location: "DHA Phase 7, Block Y, Lahore",
    type: "sale",
    category: "Commercial Plots",
    area: "5 Marla",
    image: "/images/properties/property-6.jpg",
    images: [
      "/images/properties/property-6.jpg",
      "/images/properties/property-9.jpg",
    ],
    agent: "Sarah Khan",
    agentImage: "/images/agents/agent-4.jpg",
    agentTitle: "Property Advisor | Commercial Specialist",
    isHot: true,
    isNew: false,
    description:
      "Commercial plot in the bustling Block Y of DHA Phase 7. High footfall area perfect for retail or office space.",
    features: ["5 Marla", "Main Road", "High Visibility", "Commercial Zone"],
    date: "8 months ago",
  },
  {
    id: "7",
    title: "1 Kanal House for Rent in DHA Phase 5",
    price: "PKR 250,000/month",
    location: "DHA Phase 5, Lahore",
    type: "rent",
    category: "Houses",
    bedrooms: 4,
    bathrooms: 5,
    area: "1 Kanal",
    image: "/images/properties/property-7.jpg",
    images: [
      "/images/properties/property-7.jpg",
      "/images/properties/property-10.jpg",
    ],
    agent: "Usman Ashraf WALI",
    agentImage: "/images/agents/agent-2.jpg",
    agentTitle: "CEO of WALI ESTATE | DHA Lahore Phase 8 Property Expert",
    isHot: false,
    isNew: true,
    description:
      "Elegant 1 Kanal house available for rent in DHA Phase 5. Spacious rooms with modern fittings and beautiful garden.",
    features: [
      "4 Bedrooms",
      "5 Bathrooms",
      "Garden",
      "Servant Quarters",
      "Security System",
    ],
    date: "1 month ago",
  },
  {
    id: "8",
    title: "2 Kanal Plot in DHA Phase 9 Prism Block J",
    price: "On Call",
    location: "DHA Phase 9 Prism, Block J, Lahore",
    type: "sale",
    category: "Residential Plots",
    area: "2 Kanal",
    image: "/images/properties/property-8.jpg",
    images: [
      "/images/properties/property-8.jpg",
      "/images/properties/property-1.jpg",
    ],
    agent: "Muhammad Munir Gill",
    agentImage: "/images/agents/agent-1.jpg",
    agentTitle: "Director of WALI ESTATE | DHA Lahore Phase 9 Prism Expert",
    isHot: false,
    isNew: true,
    description:
      "Premium 2 Kanal plot in DHA Phase 9 Prism Block J. Ideal for luxury home construction with wide road frontage.",
    features: [
      "2 Kanal",
      "Wide Frontage",
      "Park Facing",
      "Development in Progress",
    ],
    date: "2 weeks ago",
  },
  {
    id: "9",
    title: "4 Marla Commercial Plot in DHA Phase 6 Block C",
    price: "On Call",
    location: "DHA Phase 6, Block C, Lahore",
    type: "sale",
    category: "Commercial Plots",
    area: "4 Marla",
    image: "/images/properties/property-9.jpg",
    images: [
      "/images/properties/property-9.jpg",
      "/images/properties/property-2.jpg",
    ],
    agent: "Ahmed Hassan",
    agentImage: "/images/agents/agent-3.jpg",
    agentTitle: "Senior Property Consultant | DHA Phase 8 Expert",
    isHot: false,
    isNew: false,
    description:
      "Commercial plot in the commercial hub of DHA Phase 6. Excellent investment opportunity with high rental yield.",
    features: ["4 Marla", "Commercial Hub", "High ROI", "Established Area"],
    date: "1 year ago",
  },
  {
    id: "10",
    title: "10 Marla House for Rent in DHA Phase 8",
    price: "PKR 180,000/month",
    location: "DHA Phase 8, Lahore",
    type: "rent",
    category: "Houses",
    bedrooms: 3,
    bathrooms: 4,
    area: "10 Marla",
    image: "/images/properties/property-10.jpg",
    images: [
      "/images/properties/property-10.jpg",
      "/images/properties/property-3.jpg",
    ],
    agent: "Sarah Khan",
    agentImage: "/images/agents/agent-4.jpg",
    agentTitle: "Property Advisor | Commercial Specialist",
    isHot: true,
    isNew: false,
    description:
      "Beautifully designed 10 Marla house for rent in DHA Phase 8. Modern architecture with premium finishes.",
    features: [
      "3 Bedrooms",
      "4 Bathrooms",
      "Modern Design",
      "Garden",
      "Car Parking",
    ],
    date: "3 months ago",
  },
];

export const categories = [
  "All",
  "Residential Plots",
  "Commercial Plots",
  "Houses",
];
export const locations = [
  "All",
  "DHA Phase 5",
  "DHA Phase 6",
  "DHA Phase 7",
  "DHA Phase 8",
  "DHA Phase 9",
  "DHA Phase 9 Prism",
];
