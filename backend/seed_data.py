"""Seed database with initial data."""
import json
from datetime import datetime
from app.db.database import SessionLocal, init_db
from app.models.agent import Agent
from app.models.blog import BlogPost
from app.services.user_service import UserService
from app.services.agent_service import AgentService
from app.services.property_service import PropertyService
from app.services.blog_service import BlogService
from app.schemas.user import UserCreate
from app.schemas.agent import AgentCreate
from app.schemas.property import PropertyCreate, PropertyType, PropertyCategory
from app.schemas.blog import BlogPostCreate


def seed_users(db):
    """Create initial admin user."""
    print("👤 Creating admin user...")
    
    # Check if admin exists
    existing = UserService.get_user_by_username(db, "admin")
    if existing:
        print("  Admin user already exists, skipping...")
        return existing
    
    admin = UserService.create_admin_user(
        db=db,
        email="admin@maanestate.com",
        username="admin",
        password="admin123",  # Change in production!
        full_name="MAAN Estate Admin"
    )
    print(f"  Created admin: {admin.username}")
    return admin


def seed_agents(db):
    """Create initial agents."""
    print("👥 Creating agents...")
    
    agents_data = [
        {
            "name": "Muhammad Munir Gill",
            "title": "Director of MAAN ESTATE",
            "email": "munir@maanestate.com",
            "phone": "+92 333 4023007",
            "bio": "Muhammad Munir Gill is a seasoned real estate professional with over 15 years of experience in DHA Lahore property market.",
            "image": "/images/agents/agent-1.jpg",
            "experience_years": "15+ Years",
            "specialties": ["DHA Phase 9 Prism", "Commercial Properties", "Investment Consulting"],
        },
        {
            "name": "Usman Ashraf Maan",
            "title": "CEO of MAAN ESTATE",
            "email": "usman@maanestate.com",
            "phone": "+92 333 4023007",
            "bio": "Usman Ashraf Maan, CEO of MAAN ESTATE, brings a wealth of knowledge in luxury properties and DHA Phase 8 developments.",
            "image": "/images/agents/agent-2.jpg",
            "experience_years": "12+ Years",
            "specialties": ["DHA Phase 8", "Luxury Properties", "Market Analysis"],
        },
        {
            "name": "Ahmed Hassan",
            "title": "Senior Property Consultant",
            "email": "ahmed@maanestate.com",
            "phone": "+92 333 4023008",
            "bio": "Ahmed Hassan is a dedicated property consultant specializing in residential plots and houses across all DHA phases.",
            "image": "/images/agents/agent-3.jpg",
            "experience_years": "8+ Years",
            "specialties": ["Residential Plots", "Houses", "Client Relations"],
        },
        {
            "name": "Sarah Khan",
            "title": "Property Advisor",
            "email": "sarah@maanestate.com",
            "phone": "+92 333 4023009",
            "bio": "Sarah Khan specializes in commercial properties and rental management.",
            "image": "/images/agents/agent-4.jpg",
            "experience_years": "6+ Years",
            "specialties": ["Commercial Properties", "Rental Management", "Market Research"],
        },
    ]
    
    created_agents = []
    for agent_data in agents_data:
        existing = db.query(Agent).filter(Agent.name == agent_data["name"]).first()
        if existing:
            print(f"  Agent {agent_data['name']} already exists, skipping...")
            continue
        
        agent = AgentService.create_agent(db, AgentCreate(**agent_data))
        created_agents.append(agent)
        print(f"  Created agent: {agent.name}")
    
    return created_agents


def seed_properties(db):
    """Create initial properties."""
    print("🏠 Creating properties...")
    
    # Get agents for assignment
    from app.models.agent import Agent
    agents = db.query(Agent).all()
    agent_ids = [agent.id for agent in agents] if agents else [None]
    
    properties_data = [
        {
            "title": "4 + 4 Marla Corner Commercial Plot in DHA Phase 7 Block CCA6",
            "description": "Premium commercial plot located in the heart of DHA Phase 7. This corner plot offers excellent visibility and access from both front and back sides.",
            "price": "On Call",
            "location": "DHA Phase 7, Block CCA6, Lahore",
            "city": "Lahore",
            "phase": "Phase 7",
            "block": "CCA6",
            "property_type": PropertyType.SALE,
            "category": PropertyCategory.COMMERCIAL_PLOT,
            "area": "8 Marla",
            "is_hot": True,
            "is_new": False,
            "images": ["/images/properties/property-1.jpg"],
            "features": ["Corner Plot", "Parking Space", "Prime Location", "Commercial Zone"],
        },
        {
            "title": "8 Marla Commercial Plot in Block M Extension DHA Phase 5",
            "description": "Strategic commercial plot in DHA Phase 5 Extension. Perfect for building your dream commercial project.",
            "price": "On Call",
            "location": "DHA Phase 5, Block M Extension, Lahore",
            "city": "Lahore",
            "phase": "Phase 5",
            "block": "M Extension",
            "property_type": PropertyType.SALE,
            "category": PropertyCategory.COMMERCIAL_PLOT,
            "area": "8 Marla",
            "is_hot": False,
            "is_new": False,
            "images": ["/images/properties/property-2.jpg"],
            "features": ["Commercial Zone", "Wide Roads", "Utilities Available"],
        },
        {
            "title": "1 Kanal Plot Available For Sale In DHA Phase 9 Block N",
            "description": "Beautiful 1 Kanal residential plot in DHA Phase 9 Block N. Perfect location for building your dream home.",
            "price": "On Call",
            "location": "DHA Phase 9, Block N, Lahore",
            "city": "Lahore",
            "phase": "Phase 9",
            "block": "N",
            "property_type": PropertyType.SALE,
            "category": PropertyCategory.RESIDENTIAL_PLOT,
            "area": "1 Kanal",
            "is_hot": False,
            "is_new": True,
            "images": ["/images/properties/property-3.jpg"],
            "features": ["1 Kanal", "Residential Zone", "Park Facing", "Corner Option"],
        },
        {
            "title": "2 Kanal Furnished Brand New House for Sale DHA Phase 6",
            "description": "Luxurious 2 Kanal fully furnished brand new house in DHA Phase 6. State-of-the-art construction with modern amenities.",
            "price": "On Call",
            "location": "DHA Phase 6, Lahore",
            "city": "Lahore",
            "phase": "Phase 6",
            "property_type": PropertyType.SALE,
            "category": PropertyCategory.HOUSE,
            "bedrooms": 5,
            "bathrooms": 6,
            "area": "2 Kanal",
            "is_hot": True,
            "is_new": True,
            "images": ["/images/properties/property-4.jpg"],
            "features": ["5 Bedrooms", "6 Bathrooms", "Fully Furnished", "Modern Design", "Swimming Pool"],
        },
        {
            "title": "10 Marla Residential Plot in DHA Phase 8 Block S",
            "description": "Prime 10 Marla residential plot in DHA Phase 8 Block S. Excellent location with all modern amenities nearby.",
            "price": "On Call",
            "location": "DHA Phase 8, Block S, Lahore",
            "city": "Lahore",
            "phase": "Phase 8",
            "block": "S",
            "property_type": PropertyType.SALE,
            "category": PropertyCategory.RESIDENTIAL_PLOT,
            "area": "10 Marla",
            "is_hot": False,
            "is_new": False,
            "images": ["/images/properties/property-5.jpg"],
            "features": ["10 Marla", "Park View", "Near Commercial", "Development Complete"],
        },
    ]
    
    created_properties = []
    for i, prop_data in enumerate(properties_data):
        # Assign agent
        prop_data["agent_id"] = agent_ids[i % len(agent_ids)]
        
        property_obj = PropertyService.create_property(db, PropertyCreate(**prop_data))
        created_properties.append(property_obj)
        print(f"  Created property: {property_obj.title[:50]}...")
    
    return created_properties


def seed_blog_posts(db):
    """Create initial blog posts."""
    print("📝 Creating blog posts...")
    
    posts_data = [
        {
            "title": "DHA Lahore Transfer Expense 2025-2026: Complete Guide",
            "slug": "dha-lahore-transfer-expense-2025-2026",
            "excerpt": "Get the latest updates on DHA Lahore transfer expenses for 2025-2026. Understand the fee structure and documentation requirements.",
            "content": "<p>DHA Lahore has announced the updated transfer expense structure for 2025-2026...</p>",
            "cover_image": "/images/blog/blog-1.jpg",
            "author_name": "Usman Ashraf Maan",
            "author_image": "/images/agents/agent-2.jpg",
            "category": "Market Updates",
            "tags": ["DHA Lahore", "Transfer Expenses", "Property Guide"],
            "read_time": "5 min read",
            "is_featured": True,
        },
        {
            "title": "DHA File Rates Today: Daily Market Update",
            "slug": "dha-file-rates-today",
            "excerpt": "Stay updated with daily DHA file rates. Get real-time prices for Allocation and Affidavit files across all DHA phases.",
            "content": "<p>DHA file rates fluctuate daily based on market conditions...</p>",
            "cover_image": "/images/blog/blog-2.jpg",
            "author_name": "Muhammad Munir Gill",
            "author_image": "/images/agents/agent-1.jpg",
            "category": "Market Updates",
            "tags": ["File Rates", "DHA Files", "Investment"],
            "read_time": "3 min read",
            "is_featured": False,
        },
        {
            "title": "Why Invest in DHA Phase 9 Prism?",
            "slug": "why-invest-dha-phase-9-prism",
            "excerpt": "Discover the top reasons why DHA Phase 9 Prism is the hottest investment destination in Lahore real estate.",
            "content": "<p>DHA Phase 9 Prism has emerged as one of the most promising investment opportunities...</p>",
            "cover_image": "/images/blog/blog-3.jpg",
            "author_name": "Ahmed Hassan",
            "author_image": "/images/agents/agent-3.jpg",
            "category": "Investment Guide",
            "tags": ["Phase 9 Prism", "Investment", "DHA Lahore"],
            "read_time": "6 min read",
            "is_featured": True,
        },
    ]
    
    created_posts = []
    for post_data in posts_data:
        existing = BlogService.get_post_by_slug(db, post_data["slug"])
        if existing:
            print(f"  Blog post '{post_data['title']}' already exists, skipping...")
            continue
        
        post = BlogService.create_post(db, BlogPostCreate(**post_data))
        created_posts.append(post)
        print(f"  Created blog post: {post.title}")
    
    return created_posts


def main():
    """Main seed function."""
    print("🌱 Seeding database...")
    print("=" * 50)
    
    # Initialize database
    init_db()
    
    # Create session
    db = SessionLocal()
    
    try:
        # Seed data
        seed_users(db)
        seed_agents(db)
        seed_properties(db)
        seed_blog_posts(db)
        
        print("=" * 50)
        print("✅ Database seeded successfully!")
        print("\nDefault credentials:")
        print("  Username: admin")
        print("  Password: admin123")
        print("\n⚠️  IMPORTANT: Change the default password in production!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
