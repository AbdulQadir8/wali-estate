from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.accounts.models import UserProfile
from apps.agents.models import Agent
from apps.blog.models import BlogPost
from apps.properties.models import Property


class Command(BaseCommand):
    help = "Seed MAAN Estate with starter admin, agents, properties, and blog posts."

    def handle(self, *args, **options):
        admin = self.seed_admin()
        agents = self.seed_agents()
        self.seed_properties(admin, agents)
        self.seed_blog_posts()
        self.stdout.write(self.style.SUCCESS("Seed data ready."))

    def seed_admin(self):
        User = get_user_model()
        user, created = User.objects.get_or_create(
            username="admin",
            defaults={
                "email": "admin@maanestate.com",
                "first_name": "MAAN Estate",
                "last_name": "Admin",
                "is_staff": True,
                "is_superuser": True,
            },
        )
        if created:
            user.set_password("admin123")
            user.save(update_fields=["password"])
        profile, _ = UserProfile.objects.get_or_create(user=user)
        if not profile.is_admin:
            profile.is_admin = True
            profile.save(update_fields=["is_admin"])
        return user

    def seed_agents(self):
        agents_data = [
            {
                "name": "Muhammad Munir Gill",
                "title": "Director of MAAN ESTATE",
                "email": "munir@maanestate.com",
                "phone": "+92 333 4023007",
                "bio": "Seasoned real estate professional with deep experience in DHA Lahore.",
                "image": "/images/agents/agent-1.jpg",
                "experience_years": "15+ Years",
                "specialties": ["DHA Phase 9 Prism", "Commercial Properties", "Investment Consulting"],
            },
            {
                "name": "Usman Ashraf Maan",
                "title": "CEO of MAAN ESTATE",
                "email": "usman@maanestate.com",
                "phone": "+92 333 4023007",
                "bio": "Luxury property and DHA Phase 8 market specialist.",
                "image": "/images/agents/agent-2.jpg",
                "experience_years": "12+ Years",
                "specialties": ["DHA Phase 8", "Luxury Properties", "Market Analysis"],
            },
        ]
        agents = []
        for data in agents_data:
            agent, _ = Agent.objects.update_or_create(email=data["email"], defaults=data)
            agents.append(agent)
        return agents

    def seed_properties(self, admin, agents):
        properties_data = [
            {
                "title": "4 + 4 Marla Corner Commercial Plot in DHA Phase 7 Block CCA6",
                "description": "Premium commercial plot located in the heart of DHA Phase 7.",
                "price": "On Call",
                "location": "DHA Phase 7, Block CCA6, Lahore",
                "phase": "Phase 7",
                "block": "CCA6",
                "property_type": "sale",
                "category": "Commercial Plots",
                "area": "8 Marla",
                "is_hot": True,
                "images": ["/images/properties/property-1.jpg"],
                "features": ["Corner Plot", "Parking Space", "Prime Location", "Commercial Zone"],
            },
            {
                "title": "2 Kanal Furnished Brand New House for Sale DHA Phase 6",
                "description": "Luxurious 2 Kanal fully furnished brand new house in DHA Phase 6.",
                "price": "On Call",
                "location": "DHA Phase 6, Lahore",
                "phase": "Phase 6",
                "property_type": "sale",
                "category": "Houses",
                "bedrooms": 5,
                "bathrooms": 6,
                "area": "2 Kanal",
                "is_hot": True,
                "is_new": True,
                "images": ["/images/properties/property-4.jpg"],
                "features": ["5 Bedrooms", "6 Bathrooms", "Fully Furnished", "Modern Design"],
            },
        ]
        for index, data in enumerate(properties_data):
            defaults = {
                **data,
                "main_image": data["images"][0],
                "created_by": admin,
                "agent": agents[index % len(agents)] if agents else None,
            }
            Property.objects.update_or_create(
                slug=data["title"].lower().replace(" ", "-")[:100],
                defaults=defaults,
            )

    def seed_blog_posts(self):
        BlogPost.objects.update_or_create(
            slug="dha-lahore-transfer-expense-2025-2026",
            defaults={
                "title": "DHA Lahore Transfer Expense 2025-2026: Complete Guide",
                "excerpt": "Get the latest updates on DHA Lahore transfer expenses.",
                "content": "<p>DHA Lahore has announced the updated transfer expense structure...</p>",
                "cover_image": "/images/blog/blog-1.jpg",
                "author_name": "Usman Ashraf Maan",
                "author_image": "/images/agents/agent-2.jpg",
                "category": "Market Updates",
                "tags": ["DHA Lahore", "Transfer Expenses", "Property Guide"],
                "read_time": "5 min read",
                "is_featured": True,
                "published_at": timezone.now(),
            },
        )
