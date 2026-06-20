from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    role = Column(String)
    organisation_id = Column(String, ForeignKey("organisations.id"))
    preferred_language = Column(String, default="en")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    organisation = relationship("Organisation", back_populates="users")

class Organisation(Base):
    __tablename__ = "organisations"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    subscription_plan = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    users = relationship("User", back_populates="organisation")
    sites = relationship("BusinessSite", back_populates="organisation")

class BusinessSite(Base):
    __tablename__ = "business_sites"

    id = Column(String, primary_key=True, index=True)
    organisation_id = Column(String, ForeignKey("organisations.id"))
    business_type = Column(String)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    floor_area = Column(Float)
    operating_hours = Column(String) # JSON string representation

    organisation = relationship("Organisation", back_populates="sites")
    bills = relationship("Bill", back_populates="site")
    constraints = relationship("EquipmentConstraint", back_populates="site")
    passports = relationship("FlexibilityPassport", back_populates="site")

class Bill(Base):
    __tablename__ = "bills"

    id = Column(String, primary_key=True, index=True)
    site_id = Column(String, ForeignKey("business_sites.id"))
    billing_start = Column(DateTime)
    billing_end = Column(DateTime)
    consumption_kwh = Column(Float)
    total_cost_rm = Column(Float)
    maximum_demand_kw = Column(Float, nullable=True)
    tariff = Column(String)
    verification_status = Column(String)
    document_url = Column(String, nullable=True)

    site = relationship("BusinessSite", back_populates="bills")

class EquipmentConstraint(Base):
    __tablename__ = "equipment_constraints"

    id = Column(String, primary_key=True, index=True)
    site_id = Column(String, ForeignKey("business_sites.id"))
    equipment_type = Column(String)
    criticality = Column(String)
    estimated_power_kw = Column(Float, nullable=True)
    earliest_start = Column(String, nullable=True)
    latest_finish = Column(String, nullable=True)
    maximum_delay_minutes = Column(Integer, nullable=True)
    source = Column(String)
    confidence = Column(Float)

    site = relationship("BusinessSite", back_populates="constraints")

class FlexibilityPassport(Base):
    __tablename__ = "flexibility_passports"

    id = Column(String, primary_key=True, index=True)
    site_id = Column(String, ForeignKey("business_sites.id"))
    energy_profile = Column(String)
    flexible_min_kwh = Column(Float)
    flexible_max_kwh = Column(Float)
    community_fit_score = Column(Float, nullable=True)
    confidence = Column(Float)
    data_quality = Column(String)
    version = Column(Integer)

    site = relationship("BusinessSite", back_populates="passports")

class Community(Base):
    __tablename__ = "communities"

    id = Column(String, primary_key=True, index=True)
    operator_id = Column(String)
    name = Column(String)
    solar_capacity_kwp = Column(Float)
    battery_capacity_kwh = Column(Float)
    location = Column(String)

    scenarios = relationship("OptimisationScenario", back_populates="community")

class OptimisationScenario(Base):
    __tablename__ = "optimisation_scenarios"

    id = Column(String, primary_key=True, index=True)
    community_id = Column(String, ForeignKey("communities.id"))
    mode = Column(String)
    time_resolution_minutes = Column(Integer)
    status = Column(String)
    created_by = Column(String)

    community = relationship("Community", back_populates="scenarios")

class AgentEvent(Base):
    __tablename__ = "agent_events"

    id = Column(String, primary_key=True, index=True)
    case_id = Column(String)
    agent_name = Column(String)
    input_version = Column(Integer)
    output_version = Column(Integer)
    status = Column(String)
    duration_ms = Column(Integer)
    warnings = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
