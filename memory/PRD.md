# Portfolio 3D Website - PRD

## Original Problem Statement
Design a modern, clean, and visually engaging personal portfolio 3D full stack website using React.js, C# for backend, and PostgreSQL. It should include 3D elements using React Three Fiber / Three.js. Sections: Hero, About me, Projects (3-6+ key projects), Skills, and Contact. Additional features: Network Monitoring Dashboard demo, Barbershop Finder demo, downloadable CV/Achievements, and clean GitHub export.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Shadcn UI, Three.js (vanilla), Framer Motion, React-Leaflet
- **Backend**: C# ASP.NET Core 8.0, Entity Framework Core
- **Database**: PostgreSQL
- **3D**: Three.js (vanilla imperative approach via useRef/useEffect)

## Architecture
```
/app
├── backend/PortfolioApi/
│   ├── Controllers/ (Projects, Skills, Dashboard, Barbershop, Download)
│   ├── Models/ (Project, Skill, Barbershop, NetworkMetrics)
│   ├── Data/ (PortfolioDbContext with seed data)
│   └── Program.cs
├── frontend/src/
│   ├── components/ (Hero, Scene3D, About, Projects, Skills, Contact, Dashboard, BarbershopFinder, Navigation, Footer)
│   └── App.js (Routes: /, /dashboard, /barbershop-finder)
```

## What's Implemented (Complete)
- [x] Hero section with interactive 3D Three.js background (floating shapes + particles + mouse tracking)
- [x] About section
- [x] Projects section - 8 projects from PostgreSQL DB
- [x] Skills section - 13 skills in 6 categories from PostgreSQL DB
- [x] Contact section
- [x] Navigation + Footer
- [x] Network Monitoring Dashboard demo (/dashboard)
- [x] Barbershop Finder demo with Leaflet maps (/barbershop-finder)
- [x] CV/Achievements download endpoint
- [x] Clean GitHub export archive generated

## Key API Endpoints
- GET /api/projects - All projects
- GET /api/skills - All skills
- GET /api/skills/categories - Skill categories
- GET /api/dashboard/metrics - Live metrics
- GET /api/barbershop - All barbershops
- POST /api/barbershop/search - Search nearby

## Testing Status
- Backend: 100% (15/15 tests passed) - iteration_1
- Frontend: 100% (all UI elements verified) - iteration_1
- 3D Scene: Working with vanilla Three.js (avoids @emergentbase/visual-edits compatibility issue)

## Known Technical Notes
- 3D uses vanilla Three.js (not R3F declarative JSX) because @emergentbase/visual-edits injects x-line-number attrs that break R3F's applyProps
- EF Core auto-migrations intentionally disabled in Program.cs
- Dashboard metrics and Barbershop data are MOCKED (in-memory/random)
- Pod resets may wipe dotnet/PostgreSQL - need reinstall

## Backlog
- P1: Help user with final GitHub export if needed
- P2: THREE.Clock deprecation - migrate to THREE.Timer for future compatibility
