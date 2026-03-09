#!/usr/bin/env python3
"""
Quick script to add a new property via API
Usage: python add_property.py
"""

import requests
import json

# API Configuration
API_URL = "http://localhost:8000"
USERNAME = "admin"
PASSWORD = "admin123"

def login():
    """Login and get access token"""
    response = requests.post(
        f"{API_URL}/api/v1/auth/login",
        data={"username": USERNAME, "password": PASSWORD}
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        print(f"Login failed: {response.text}")
        return None

def add_property(token):
    """Add a new property"""
    headers = {"Authorization": f"Bearer {token}"}

    property_data = {
        "title": "5 Marla House in DHA Phase 6",
        "description": "Beautiful modern house with all amenities",
        "price": "PKR 35,000,000",
        "price_numeric": 35000000,
        "location": "DHA Phase 6, Lahore",
        "city": "Lahore",
        "phase": "Phase 6",
        "property_type": "sale",
        "category": "Houses",
        "bedrooms": 3,
        "bathrooms": 3,
        "area": "5 Marla",
        "images": ["/images/properties/house.jpg"],
        "features": ["Modern Design", "Parking", "Garden", "Security"],
        "is_featured": False,
        "is_hot": True,
        "is_new": True
    }

    response = requests.post(
        f"{API_URL}/api/v1/properties/",
        headers=headers,
        json=property_data
    )

    if response.status_code == 200:
        print("✅ Property added successfully!")
        print(json.dumps(response.json(), indent=2))
    else:
        print(f"❌ Failed to add property: {response.text}")

if __name__ == "__main__":
    print("🔐 Logging in...")
    token = login()

    if token:
        print("✅ Login successful!")
        print("\n📝 Adding property...")
        add_property(token)
    else:
        print("❌ Could not login")
