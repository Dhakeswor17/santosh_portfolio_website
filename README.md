# Here are your Instructions
# Santosh Nyaupane — Portfolio Website

A modern, full-stack portfolio website featuring interactive **3D graphics**, built with **React**, **C# ASP.NET Core**, and **PostgreSQL**.

**Live Site:** [santosh-portfolio-website-okc6.vercel.app](https://santosh-portfolio-website-okc6.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Tailwind CSS, Three.js, Framer Motion, Axios, React Router |
| **Backend** | C# ASP.NET Core 8.0, Entity Framework Core |
| **Database** | PostgreSQL |
| **Maps** | React-Leaflet, OpenStreetMap |
| **Deployment** | Vercel (frontend), Railway (backend + database) |

---

## Features

### Interactive 3D Hero Section
The landing page features a real-time 3D scene built with **Three.js**:
- 6 floating geometric shapes (sphere, cube, torus, octahedron, icosahedron) with independent rotation speeds
- 300-particle star field effect with ambient motion
- Mouse-tracking camera that creates a parallax depth effect
- Transparent WebGL canvas layered behind the content

### Portfolio Sections
- **About** — Background, experience, and professional summary
- **Projects** — 8 projects with descriptions, tech stacks, and live/GitHub links
- **Skills** — 13 skills across 6 categories with animated proficiency bars
- **Contact** — Email, phone, and location

### Live Demos
- **Network Monitoring Dashboard** (`/dashboard`) — Real-time simulated metrics: uptime, bandwidth, response time, and incident alerts
- **Barbershop Finder** (`/barbershop-finder`) — Location-based search with interactive Leaflet map and geolocation

---

## Architecture

```
┌──────────────────────┐         ┌──────────────────────────────┐
│     Vercel (CDN)     │         │         Railway              │
│                      │  HTTPS  │                              │
│   React Frontend     │────────>│   ASP.NET Core 8.0 API       │
│   Three.js           │  JSON   │         │                    │
│   Tailwind CSS       │<────────│         ▼                    │
│                      │         │   PostgreSQL Database         │
└──────────────────────┘         └──────────────────────────────┘
```

**Frontend → Backend communication:**
React components use Axios to call RESTful API endpoints. The backend URL is configured via the `REACT_APP_BACKEND_URL` environment variable on Vercel.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | All projects with descriptions, tech stacks, and links |
| GET | `/api/skills` | All skills with categories and proficiency levels |
| GET | `/api/skills/categories` | Distinct skill category names |
| GET | `/api/dashboard/metrics` | Simulated network monitoring data |
| GET | `/api/barbershop` | All barbershop listings |
| POST | `/api/barbershop/search` | Search nearby barbershops by coordinates and radius |
| GET | `/api/download/resume` | Download CV/achievements PDF |

---

## Project Structure

```
santosh_portfolio_website/
├── backend/
│   └── PortfolioApi/
│       ├── Controllers/
│       │   ├── ProjectsController.cs
│       │   ├── SkillsController.cs
│       │   ├── DashboardController.cs
│       │   ├── BarbershopController.cs
│       │   └── DownloadController.cs
│       ├── Models/
│       │   ├── Project.cs
│       │   ├── Skill.cs
│       │   ├── Barbershop.cs
│       │   └── NetworkMetrics.cs
│       ├── Data/
│       │   └── PortfolioDbContext.cs    # EF Core context + seed data
│       ├── Program.cs                   # App entry point, CORS, DI
│       ├── Dockerfile                   # Multi-stage Docker build
│       ├── railway.toml                 # Railway deployment config
│       └── PortfolioApi.csproj
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Hero.js                  # Landing section
│       │   ├── Scene3D.js               # Three.js 3D scene
│       │   ├── About.js
│       │   ├── Projects.js              # Fetches from /api/projects
│       │   ├── Skills.js                # Fetches from /api/skills
│       │   ├── Contact.js
│       │   ├── Navigation.js
│       │   ├── Footer.js
│       │   ├── Dashboard.js             # Network monitoring demo
│       │   └── BarbershopFinder.js      # Map-based search demo
│       ├── App.js                       # Routes: /, /dashboard, /barbershop-finder
│       └── index.css
└── README.md
```

---

## Database Schema

**Projects**
| Column | Type | Description |
|--------|------|-------------|
| Id | int (PK) | Auto-increment |
| Title | string | Project name |
| Description | string | Project summary |
| ImageUrl | string | Thumbnail URL |
| Technologies | string[] | Tech stack array |
| GithubUrl | string (nullable) | Repository link |
| LiveUrl | string (nullable) | Live demo link |
| CreatedAt | datetime | Timestamp |

**Skills**
| Column | Type | Description |
|--------|------|-------------|
| Id | int (PK) | Auto-increment |
| Name | string | Skill name |
| Category | string | Group (e.g., Frontend, Backend, DevOps) |
| Level | int | Proficiency percentage (0–100) |

**Barbershops**
| Column | Type | Description |
|--------|------|-------------|
| Id | int (PK) | Auto-increment |
| Name | string | Business name |
| Rating | double | Customer rating |
| PriceLevel | string | Price range |
| Latitude / Longitude | double | Coordinates |
| Address | string | Street address |

---

## Local Development Setup

### Prerequisites
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 15+](https://www.postgresql.org/download/)
- Yarn (`npm install -g yarn`)

### 1. Database Setup
```bash
# Create database and user
psql -U postgres
CREATE USER portfolio_user WITH PASSWORD 'portfolio_pass';
CREATE DATABASE portfolio_db OWNER portfolio_user;
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

### 2. Backend
```bash
cd backend/PortfolioApi

# Set environment variable
export DATABASE_URL="Host=localhost;Database=portfolio_db;Username=portfolio_user;Password=portfolio_pass"

# Restore and run
dotnet restore
dotnet run
```
Backend runs at `http://localhost:8001`. The database tables and seed data are created automatically on first run via `EnsureCreated()`.

### 3. Frontend
```bash
cd frontend

# Install dependencies
yarn install

# Set backend URL
echo "REACT_APP_BACKEND_URL=http://localhost:8001" > .env

# Start dev server
yarn start
```
Frontend runs at `http://localhost:3000`.

---

## Deployment

This project uses a **split deployment** strategy for optimal performance and cost:

### Frontend → Vercel (Free)
1. Connect GitHub repo to [Vercel](https://vercel.com)
2. Set environment variable: `REACT_APP_BACKEND_URL` = your Railway backend URL
3. Vercel auto-builds on every push to `main`

### Backend + Database → Railway (~$5/month)
1. Create a project on [Railway](https://railway.app)
2. Add a **PostgreSQL** database service
3. Add a **GitHub Repo** service → set Root Directory to `backend/PortfolioApi`
4. Add environment variables:
   - `DATABASE_URL` → Reference the PostgreSQL service variable
   - `CORS_ORIGINS` → Your Vercel frontend URL
5. Generate a public domain under Settings → Networking

See [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md) for detailed step-by-step instructions.

---

## Key Technical Decisions

| Decision | Reasoning |
|----------|-----------|
| **Three.js (vanilla) over React Three Fiber** | Vanilla Three.js via `useRef`/`useEffect` provides full control over the WebGL pipeline and avoids React 19 JSX transform compatibility issues |
| **Split deployment (Vercel + Railway)** | Vercel's CDN is optimized for static React files. Railway supports Docker containers needed for .NET and PostgreSQL |
| **Entity Framework Code-First** | Database schema defined as C# classes. Tables and seed data auto-generated — no manual SQL migration scripts needed |
| **PostgreSQL over MongoDB** | Structured, relational data (projects with categories, skills with proficiency levels) fits better in a relational database |

---

## Author

**Santosh Nyaupane**
- Network Engineer | Software Developer | Full Stack Developer
- Experience at Google and Microsoft data centers
- [GitHub](https://github.com/Dhakeswor17)
