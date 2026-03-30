# Santosh Nyaupane - 3D Portfolio Website

## Tech Stack

### Backend
- **Language**: C# (.NET 8.0)
- **Framework**: ASP.NET Core Web API
- **Database**: PostgreSQL 15
- **ORM**: Entity Framework Core 8.0.4
- **Port**: 8001

### Frontend
- **Framework**: React 19
- **3D Library**: React Three Fiber (background image fallback due to React 19 compatibility)
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Font Awesome & Lucide)
- **HTTP Client**: Axios
- **Port**: 3000

### Design
- **Theme**: Dark mode with Jewel & Luxury aesthetic
- **Colors**: 
  - Background: #0A0A0A, #121215
  - Accent: #4D9FFF (primary blue)
  - Text: #F4F4F5 (primary), #A1A1AA (secondary)
- **Fonts**: 
  - Headings: Outfit
  - Body: Manrope
- **Layout**: Asymmetric grids, generous spacing, glassmorphic surfaces

## Features

### 1. Hero Section
- Full-screen introduction with 3D geometric background
- Name, role, and compelling tagline
- Call-to-action buttons for projects and contact
- Smooth scroll animation

### 2. About Me
- Background and "What I Do" cards
- Google and Microsoft experience highlighted with company icons
- Balanced presentation of infrastructure and development work

### 3. Projects
- Asymmetric "Tetris Grid" layout (not boring 3-column grid)
- 3 seed projects:
  - Data Center Infrastructure Automation
  - Network Monitoring Dashboard
  - Hardware Lifecycle Management System
- Each project includes: title, description, image, technologies, and links

### 4. Skills & Tools
- Organized by 6 categories:
  - Programming Languages (C#, JavaScript, TypeScript, Python, Java)
  - Frontend (React)
  - Backend (Node.js, ASP.NET Core)
  - Database (PostgreSQL)
  - Infrastructure (Linux, Networking)
  - DevOps (Docker, Git)
- Animated progress bars with percentage indicators

### 5. Contact Section
- Email, phone, and location cards with icons
- Social media links (LinkedIn, GitHub)
- Simple display format (no email service integration)

### 6. Navigation
- Sticky header with glassmorphic effect
- Smooth scrolling to sections
- Desktop: visible links + CTA button
- Mobile: responsive design

## Database Schema

### Projects Table
- Id (Primary Key, Auto-increment)
- Title (string, max 200 chars)
- Description (string, max 1000 chars)
- ImageUrl (string)
- Technologies (string array)
- GithubUrl (string, nullable)
- LiveUrl (string, nullable)
- CreatedAt (DateTime)

### Skills Table
- Id (Primary Key, Auto-increment)
- Name (string, max 100 chars)
- Category (string, max 100 chars)
- Level (integer, 0-100)

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects (ordered by CreatedAt desc)
- `GET /api/projects/{id}` - Get project by ID

### Skills
- `GET /api/skills` - Get all skills (ordered by Category, Level desc)
- `GET /api/skills/categories` - Get distinct categories

## Environment Variables

### Backend (.env)
```
DATABASE_URL=Host=localhost;Database=portfolio_db;Username=portfolio_user;Password=portfolio_pass
CORS_ORIGINS=*
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://tech-portfolio-3d-10.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## Setup Instructions

### Backend
1. PostgreSQL is running on localhost
2. Database `portfolio_db` created with user `portfolio_user`
3. Entity Framework migrations applied (`dotnet ef migrations add InitialCreate`)
4. Seed data automatically populated on first run
5. Backend runs via supervisor on port 8001

### Frontend
1. Dependencies installed via `yarn` (React, Three.js, Framer Motion, etc.)
2. Tailwind CSS configured with custom colors
3. Frontend runs via supervisor on port 3000
4. Hot reload enabled for development

## Deployment Configuration

### Supervisor Config
- Backend: .NET application with DOTNET_ROOT and HOME environment variables
- Frontend: React development server with HOST=0.0.0.0
- PostgreSQL: Running as service
- MongoDB: Running (not used in this project)

### Kubernetes Ingress
- Backend routes prefixed with `/api` redirect to port 8001
- Frontend routes redirect to port 3000
- External URL: https://tech-portfolio-3d-10.preview.emergentagent.com

## Content (From CV)

### Personal Info
- **Name**: Dhakeswor Nyaupane (Santosh)
- **Email**: santoshnyaupane25@gmail.com
- **Phone**: +358 44 968 4333
- **Location**: Espoo, Finland

### Experience
1. **Google** - Data Center Technician (April 2025 - Jan 2026)
   - Large-scale private data network operations
   - Infrastructure deployment and maintenance

2. **Microsoft** - Senior Lab Operator (Sep 2021 - April 2025)
   - R&D hardware development support
   - System validation in production lab environments

3. **SSE Global Technologies** - IT Support Engineer (Sep 2020 - Sep 2021)

4. **Bhat Bhateni** - IT Support (Oct 2014 - Aug 2016)

### Education
- **Metropolia University** - B.Eng IT (Expected 2026)
- **Centria University** - B.Eng Industrial Engineering (2020)

### Certifications
- Google IT Support Professional
- Linux (Bash, Networking, Troubleshooting)
- Microsoft Azure AI & Cybersecurity Essentials
- Lean Six Sigma Green Belt

## Design Philosophy

Following the "Jewel & Luxury" archetype with Web3/Tech editorial twist:
- Dark, sophisticated backgrounds
- High-contrast typography
- Glassmorphic UI components
- Asymmetric, unexpected layouts
- Generous whitespace
- Subtle depth effects and parallax
- No generic centered layouts or simple gradients

## Notes

- React 19 has compatibility issues with @react-three/drei's MeshDistortMaterial
- Solution: Used static 3D geometric background image from design guidelines
- All backend routes must include `/api` prefix for Kubernetes ingress routing
- C# backend successfully integrated with PostgreSQL using Entity Framework Core
- Framer Motion provides smooth scroll animations and staggered entrances
