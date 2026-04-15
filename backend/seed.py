import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.models.farmer import Farmer
from app.models.claim import Claim
from app.models.grievance import Grievance
from app.models.user import User
from app.utils.db import Base
from app.utils.auth import hash_password
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSession = async_sessionmaker(engine, expire_on_commit=False)

# Default test password for all seeded users: "Password123!"
DEFAULT_PASSWORD = "Password123!"

async def create_tables():
    """Create all tables from models"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)  # Drop existing tables
        await conn.run_sync(Base.metadata.create_all)  # Create fresh tables
    print("✓ Tables dropped and recreated")

farmers_data = [
    {"full_name": "Ramesh Patil", "phone": "9876500001", "village": "Latur", "district": "Latur", "state": "Maharashtra"},
    {"full_name": "Sunita Deshmukh", "phone": "9876500002", "village": "Osmanabad", "district": "Osmanabad", "state": "Maharashtra"},
    {"full_name": "Anil Yadav", "phone": "9876500003", "village": "Nanded", "district": "Nanded", "state": "Maharashtra"},
    {"full_name": "Kavita Shinde", "phone": "9876500004", "village": "Solapur", "district": "Solapur", "state": "Maharashtra"},
    {"full_name": "Manoj Jadhav", "phone": "9876500005", "village": "Pune", "district": "Pune", "state": "Maharashtra"},
    {"full_name": "Priya Kulkarni", "phone": "9876500006", "village": "Nashik", "district": "Nashik", "state": "Maharashtra"},
    {"full_name": "Suresh Waghmare", "phone": "9876500007", "village": "Amravati", "district": "Amravati", "state": "Maharashtra"},
    {"full_name": "Rekha Borde", "phone": "9876500008", "village": "Akola", "district": "Akola", "state": "Maharashtra"},
    {"full_name": "Vijay Mane", "phone": "9876500009", "village": "Kolhapur", "district": "Kolhapur", "state": "Maharashtra"},
    {"full_name": "Anita Pawar", "phone": "9876500010", "village": "Satara", "district": "Satara", "state": "Maharashtra"},
]

claims_data = [
    {"farmer_index": 0, "damage_type": "rice_blast", "description": "Rice crop severely affected", "gps_lat": "18.4088", "gps_lng": "76.5604", "status": "pending"},
    {"farmer_index": 0, "damage_type": "wheat_rust", "description": "Wheat rust detected in field", "gps_lat": "18.4090", "gps_lng": "76.5610", "status": "approved"},
    {"farmer_index": 1, "damage_type": "healthy", "description": "Routine check", "gps_lat": "18.1800", "gps_lng": "76.0400", "status": "pending"},
    {"farmer_index": 1, "damage_type": "rice_blast", "description": "Partial crop loss", "gps_lat": "18.1810", "gps_lng": "76.0410", "status": "rejected"},
    {"farmer_index": 2, "damage_type": "wheat_rust", "description": "50% crop damaged", "gps_lat": "19.1600", "gps_lng": "77.3200", "status": "approved"},
    {"farmer_index": 2, "damage_type": "rice_blast", "description": "Full field affected", "gps_lat": "19.1610", "gps_lng": "77.3210", "status": "pending"},
    {"farmer_index": 3, "damage_type": "healthy", "description": "Crop looks fine", "gps_lat": "17.6800", "gps_lng": "75.9000", "status": "approved"},
    {"farmer_index": 3, "damage_type": "wheat_rust", "description": "Early signs of rust", "gps_lat": "17.6810", "gps_lng": "75.9010", "status": "pending"},
    {"farmer_index": 4, "damage_type": "rice_blast", "description": "Severe blast damage", "gps_lat": "18.5200", "gps_lng": "73.8500", "status": "rejected"},
    {"farmer_index": 4, "damage_type": "healthy", "description": "No damage found", "gps_lat": "18.5210", "gps_lng": "73.8510", "status": "approved"},
    {"farmer_index": 5, "damage_type": "wheat_rust", "description": "Moderate rust damage", "gps_lat": "20.0000", "gps_lng": "73.7800", "status": "pending"},
    {"farmer_index": 5, "damage_type": "rice_blast", "description": "Early blast detection", "gps_lat": "20.0010", "gps_lng": "73.7810", "status": "pending"},
    {"farmer_index": 6, "damage_type": "healthy", "description": "Crop inspection passed", "gps_lat": "20.9300", "gps_lng": "77.7500", "status": "approved"},
    {"farmer_index": 6, "damage_type": "wheat_rust", "description": "Rust spreading fast", "gps_lat": "20.9310", "gps_lng": "77.7510", "status": "rejected"},
    {"farmer_index": 7, "damage_type": "rice_blast", "description": "Blast in 3 acres", "gps_lat": "20.7060", "gps_lng": "77.0080", "status": "pending"},
    {"farmer_index": 7, "damage_type": "healthy", "description": "Field inspection OK", "gps_lat": "20.7070", "gps_lng": "77.0090", "status": "approved"},
    {"farmer_index": 8, "damage_type": "wheat_rust", "description": "Rust in wheat field", "gps_lat": "16.7050", "gps_lng": "74.2433", "status": "pending"},
    {"farmer_index": 8, "damage_type": "rice_blast", "description": "Blast confirmed by officer", "gps_lat": "16.7060", "gps_lng": "74.2443", "status": "approved"},
    {"farmer_index": 9, "damage_type": "healthy", "description": "All good", "gps_lat": "17.6805", "gps_lng": "74.0183", "status": "pending"},
    {"farmer_index": 9, "damage_type": "wheat_rust", "description": "Wheat field damaged", "gps_lat": "17.6815", "gps_lng": "74.0193", "status": "rejected"},
]

grievances_data = [
    {"farmer_index": 0, "claim_index": 0, "category": "urgent", "description": "Claim pending for 3 weeks, no response"},
    {"farmer_index": 1, "claim_index": 3, "category": "urgent", "description": "Claim rejected without proper inspection"},
    {"farmer_index": 3, "claim_index": 7, "category": "normal", "description": "Request for re-inspection of field"},
    {"farmer_index": 6, "claim_index": 13, "category": "urgent", "description": "Wrongful rejection, need review"},
    {"farmer_index": 9, "claim_index": 19, "category": "normal", "description": "Delay in claim processing"},
]

async def seed():
    async with AsyncSession() as db:
        # seed users (one for each farmer)
        user_objects = []
        for i, f in enumerate(farmers_data):
            # Create email from name (e.g., "ramesh.patil@farmer.local")
            first_name = f["full_name"].split()[0].lower()
            last_name = f["full_name"].split()[-1].lower()
            email = f"{first_name}.{last_name}@farmer.local"
            
            user = User(
                full_name=f["full_name"],
                email=email,
                phone=f["phone"],
                password=hash_password(DEFAULT_PASSWORD),
                role="farmer"
            )
            db.add(user)
            user_objects.append(user)
        await db.commit()
        for u in user_objects:
            await db.refresh(u)
        print(f"✅ Seeded {len(user_objects)} users")
        
        # seed farmers (link to users)
        farmer_objects = []
        for i, f in enumerate(farmers_data):
            farmer = Farmer(
                user_id=user_objects[i].id,  # Link to corresponding user
                full_name=f["full_name"],
                phone=f["phone"],
                village=f["village"],
                district=f["district"],
                state=f["state"]
            )
            db.add(farmer)
            farmer_objects.append(farmer)
        await db.commit()
        for f in farmer_objects:
            await db.refresh(f)
        print(f"✅ Seeded {len(farmer_objects)} farmers")

        # seed claims
        claim_objects = []
        for c in claims_data:
            claim = Claim(
                farmer_id=farmer_objects[c["farmer_index"]].id,
                damage_type=c["damage_type"],
                description=c["description"],
                gps_lat=c["gps_lat"],
                gps_lng=c["gps_lng"],
                status=c["status"]
            )
            db.add(claim)
            claim_objects.append(claim)
        await db.commit()
        for c in claim_objects:
            await db.refresh(c)
        print(f"✅ Seeded {len(claim_objects)} claims")

        # seed grievances
        for g in grievances_data:
            grievance = Grievance(
                farmer_id=farmer_objects[g["farmer_index"]].id,
                claim_id=claim_objects[g["claim_index"]].id,
                category=g["category"],
                description=g["description"],
                status="open"
            )
            db.add(grievance)
        await db.commit()
        print(f"✅ Seeded {len(grievances_data)} grievances")

        # Print login credentials for testing
        print("\n📋 Test Login Credentials:")
        print("=" * 50)
        print(f"{'Email':<25} {'Password':<20}")
        print("=" * 50)
        for u in user_objects:
            print(f"{u.email:<25} {DEFAULT_PASSWORD:<20}")        
        # Create admin user
        admin_user = User(
            full_name="Admin User",
            email="admin@farmer.local",
            phone="9999999999",
            password=hash_password(DEFAULT_PASSWORD),
            role="admin"
        )
        db.add(admin_user)
        await db.commit()
        print(f"{'admin@farmer.local':<25} {DEFAULT_PASSWORD:<20}")
        print("=" * 50)
        
        print("\n🎉 Database seeded successfully!")

if __name__ == "__main__":
    async def main():
        # Create tables first
        await create_tables()
        # Then seed the data
        await seed()
    
    asyncio.run(main())