"""
Portfolio API Backend Tests
Tests for C# ASP.NET Core backend with PostgreSQL
- Projects API (8 projects expected)
- Skills API (13 skills expected)
- Dashboard API (MOCKED - random data)
- Barbershop API (MOCKED - in-memory data)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestProjectsAPI:
    """Tests for /api/projects endpoints"""
    
    def test_get_all_projects(self):
        """GET /api/projects should return 8 projects"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 8, f"Expected 8 projects, got {len(data)}"
        
    def test_projects_have_required_fields(self):
        """Each project should have title, description, technologies, imageUrl"""
        response = requests.get(f"{BASE_URL}/api/projects")
        assert response.status_code == 200
        
        data = response.json()
        for project in data:
            assert "id" in project
            assert "title" in project
            assert "description" in project
            assert "technologies" in project
            assert isinstance(project["technologies"], list)
            assert "imageUrl" in project
            
    def test_get_single_project(self):
        """GET /api/projects/{id} should return a single project"""
        response = requests.get(f"{BASE_URL}/api/projects/1")
        # May return 200 or 404 depending on if project with id=1 exists
        assert response.status_code in [200, 404]
        
        if response.status_code == 200:
            data = response.json()
            assert "title" in data
            assert "description" in data


class TestSkillsAPI:
    """Tests for /api/skills endpoints"""
    
    def test_get_all_skills(self):
        """GET /api/skills should return 13 skills"""
        response = requests.get(f"{BASE_URL}/api/skills")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 13, f"Expected 13 skills, got {len(data)}"
        
    def test_skills_have_required_fields(self):
        """Each skill should have name, category, level"""
        response = requests.get(f"{BASE_URL}/api/skills")
        assert response.status_code == 200
        
        data = response.json()
        for skill in data:
            assert "id" in skill
            assert "name" in skill
            assert "category" in skill
            assert "level" in skill
            assert isinstance(skill["level"], int)
            
    def test_get_skill_categories(self):
        """GET /api/skills/categories should return distinct categories"""
        response = requests.get(f"{BASE_URL}/api/skills/categories")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 5, f"Expected at least 5 categories, got {len(data)}"
        
        # Verify expected categories exist
        expected_categories = ["Programming Languages", "Frontend", "Backend", "Database", "Infrastructure", "DevOps"]
        for cat in expected_categories:
            assert cat in data, f"Missing category: {cat}"


class TestDashboardAPI:
    """Tests for /api/dashboard endpoints (MOCKED - random data)"""
    
    def test_get_metrics(self):
        """GET /api/dashboard/metrics should return current metrics"""
        response = requests.get(f"{BASE_URL}/api/dashboard/metrics")
        assert response.status_code == 200
        
        data = response.json()
        assert "cpuUsage" in data
        assert "memoryUsage" in data
        assert "networkThroughput" in data
        assert "activeConnections" in data
        
    def test_get_metrics_history(self):
        """GET /api/dashboard/metrics/history should return historical data"""
        response = requests.get(f"{BASE_URL}/api/dashboard/metrics/history?count=12")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 12
        
    def test_get_systems(self):
        """GET /api/dashboard/systems should return system status"""
        response = requests.get(f"{BASE_URL}/api/dashboard/systems")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1
        
        for system in data:
            assert "nodeName" in system
            assert "status" in system
            assert "uptime" in system
            
    def test_get_alerts(self):
        """GET /api/dashboard/alerts should return alerts list"""
        response = requests.get(f"{BASE_URL}/api/dashboard/alerts")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)


class TestBarbershopAPI:
    """Tests for /api/barbershop endpoints (MOCKED - in-memory data)"""
    
    def test_get_all_barbershops(self):
        """GET /api/barbershop should return all barbershops"""
        response = requests.get(f"{BASE_URL}/api/barbershop")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 6, f"Expected 6 barbershops, got {len(data)}"
        
    def test_barbershops_have_required_fields(self):
        """Each barbershop should have required fields"""
        response = requests.get(f"{BASE_URL}/api/barbershop")
        assert response.status_code == 200
        
        data = response.json()
        for shop in data:
            assert "id" in shop
            assert "name" in shop
            assert "address" in shop
            assert "latitude" in shop
            assert "longitude" in shop
            assert "rating" in shop
            assert "services" in shop
            assert isinstance(shop["services"], list)
            
    def test_search_nearby_barbershops(self):
        """POST /api/barbershop/search should return nearby shops"""
        payload = {
            "latitude": 60.1699,
            "longitude": 24.9384,
            "radiusKm": 10
        }
        response = requests.post(
            f"{BASE_URL}/api/barbershop/search",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 1, "Should find at least 1 barbershop within 10km"
        
    def test_search_with_small_radius(self):
        """POST /api/barbershop/search with small radius may return fewer results"""
        payload = {
            "latitude": 60.1699,
            "longitude": 24.9384,
            "radiusKm": 1
        }
        response = requests.post(
            f"{BASE_URL}/api/barbershop/search",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        
    def test_get_single_barbershop(self):
        """GET /api/barbershop/{id} should return a single barbershop"""
        response = requests.get(f"{BASE_URL}/api/barbershop/1")
        assert response.status_code == 200
        
        data = response.json()
        assert data["id"] == 1
        assert "name" in data


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
