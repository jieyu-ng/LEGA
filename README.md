# EnergiKita FlexOS

## An AI-Orchestrated Bill-to-Flexibility Platform for Malaysian SMEs and Community Energy Operators

> **The platform transforms existing electricity bills, basic business information and optional interval data into an Energy Flexibility Passport.**

## Team Information

**Team Name:** M&N

**Team Members:**
- Ng Jie Yu
- Loo Weiqi
- Valiant Tai  
- Min PyaePhyo 
- Gan Kai Ken 

**Track:** Track 3 — Double Dot: Smarter Resource Management



## Technologies used

### Frontend
- Next.js 16.2
- TypeScript
- Tailwind CSS
- Shadcn UI
- Recharts

### Backend
- FastAPI
- Python
- SQLAlchemy
- Pydantic
- Uvicorn
  
### Database
- SQLite (MVP)
- SQLAlchemy ORM

### AI & Optimisation Layer
- Multi-Agent Orchestration
- Document Intelligence Engine
- Energy Analysis Engine
- Flexibility Passport Engine
- Community Matching Engine
- OR-Tools Optimisation Engine
- Risk & Audit Engine

### Architecture
- Decoupled Frontend ↔ Backend
- RESTful APIs
- Real-time Agent Workflow Pipeline

---

## Challenge and Approach 
- Time Management Was Tough: We had to make some hard calls about what to build and what to leave out. Instead of trying to build ten half-working features, we focused on making one complete workflow work really well
- Mentor Feedback Changed Our Approach: About halfway through, we got some feedback from our mentor that made us rethink our architecture. So we pivoted to add more deterministic validation and audit capabilities.



## Build Instruction
`cd d:\ImagineHack2026\EnergiKita\backend`<br>
`pip install -r requirements.txt   # (If you have a requirements file)`<br>
`python -m uvicorn main:app --reload`

`cd d:\ImagineHack2026\EnergiKita\frontend`<br>
`npm install    # (Only needed if you haven't installed dependencies yet)`<br>
`npm run dev`
