import json
import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.agent import Agent
from app.schemas.agent import AgentCreate, AgentUpdate


class AgentService:
    """Service class for agent operations."""
    
    @staticmethod
    def create_agent(db: Session, agent_data: AgentCreate) -> Agent:
        """Create a new agent."""
        db_agent = Agent(
            id=str(uuid.uuid4()),
            name=agent_data.name,
            title=agent_data.title,
            email=agent_data.email,
            phone=agent_data.phone,
            bio=agent_data.bio,
            image=agent_data.image,
            experience_years=agent_data.experience_years,
            specialties=json.dumps(agent_data.specialties) if agent_data.specialties else "[]",
            facebook=agent_data.facebook,
            twitter=agent_data.twitter,
            linkedin=agent_data.linkedin,
            listings_count=0,
            created_at=datetime.utcnow(),
        )
        
        db.add(db_agent)
        db.commit()
        db.refresh(db_agent)
        
        return db_agent
    
    @staticmethod
    def get_agent_by_id(db: Session, agent_id: str) -> Optional[Agent]:
        """Get agent by ID."""
        return db.query(Agent).filter(Agent.id == agent_id).first()
    
    @staticmethod
    def get_all_agents(db: Session, skip: int = 0, limit: int = 100) -> List[Agent]:
        """Get all agents."""
        return db.query(Agent).order_by(desc(Agent.created_at)).offset(skip).limit(limit).all()
    
    @staticmethod
    def update_agent(db: Session, agent_id: str, agent_data: AgentUpdate) -> Optional[Agent]:
        """Update an agent."""
        db_agent = AgentService.get_agent_by_id(db, agent_id)
        if not db_agent:
            return None
        
        update_data = agent_data.model_dump(exclude_unset=True)
        
        for field, value in update_data.items():
            if field == "specialties" and value is not None:
                setattr(db_agent, field, json.dumps(value))
            else:
                setattr(db_agent, field, value)
        
        db_agent.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(db_agent)
        
        return db_agent
    
    @staticmethod
    def delete_agent(db: Session, agent_id: str) -> bool:
        """Delete an agent."""
        db_agent = AgentService.get_agent_by_id(db, agent_id)
        if not db_agent:
            return False
        
        db.delete(db_agent)
        db.commit()
        
        return True
    
    @staticmethod
    def update_listings_count(db: Session, agent_id: str) -> None:
        """Update agent's listings count."""
        from app.models.property import Property, PropertyStatus
        
        db_agent = AgentService.get_agent_by_id(db, agent_id)
        if db_agent:
            count = db.query(Property).filter(
                Property.agent_id == agent_id,
                Property.status == PropertyStatus.ACTIVE
            ).count()
            db_agent.listings_count = count
            db.commit()
