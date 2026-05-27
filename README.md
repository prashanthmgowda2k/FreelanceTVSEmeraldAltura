# 🏡 Nikoo Garden Estate — Landing Page

A full-stack real estate lead generation landing page.

## Tech Stack
| Layer | Technology |
|---|---|
| Frontend | Vite + React 18 + Tailwind CSS |
| Backend | Spring Boot 3 + Java 17 |
| Database | MySQL 8 |

---

## 📁 Project Structure

```
nikoo-landing/
├── frontend/          ← Vite + React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx           ← Hero with inline lead form
│   │   │   ├── StatsBar.jsx       ← Animated counters
│   │   │   ├── Configurations.jsx ← 2/3/4 BHK cards
│   │   │   ├── Amenities.jsx
│   │   │   ├── FloorPlans.jsx     ← Gated download
│   │   │   ├── Gallery.jsx        ← Gated lightbox
│   │   │   ├── Location.jsx       ← Google Maps embed
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FloatingCTA.jsx    ← Mobile sticky bar
│   │   │   └── LeadModal.jsx      ← Universal gate modal
│   │   ├── services/api.js        ← Axios + UTM capture
│   │   ├── data/constants.js      ← All dummy data
│   │   └── App.jsx                ← Lead gate orchestration
│   └── ...
└── backend/           ← Spring Boot
    └── src/main/java/com/nikoo/
        ├── NikooApplication.java
        ├── model/
        │   ├── Lead.java          ← JPA entity
        │   ├── LeadRequest.java   ← DTO with validation
        │   └── ApiResponse.java   ← Generic wrapper
        ├── repository/
        │   └── LeadRepository.java
        ├── service/
        │   └── LeadService.java
        ├── controller/
        │   └── LeadController.java
        └── config/
            ├── CorsConfig.java
            └── GlobalExceptionHandler.java
```

---

## 🚀 Setup & Run

### 1. MySQL
```bash
mysql -u root -p
# Run: backend/src/main/resources/schema.sql
```

### 2. Backend (Spring Boot)
```bash
cd backend

# Copy the sample config and set your environment values:
# cp src/main/resources/application.example.properties src/main/resources/application.properties
# Then set SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, and SPRING_DATASOURCE_PASSWORD.

mvn spring-boot:run
# Starts on http://localhost:8080
```

### 3. Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | URL | Description |
|---|---|---|
| `POST` | `/api/leads` | Submit lead (called before every CTA) |
| `GET` | `/api/leads` | Get all leads (admin) |
| `GET` | `/api/leads/by-source?source=brochure_download` | Filter by source |
| `GET` | `/api/leads/stats` | Total + today count |

### Sample POST body
```json
{
  "name": "Ravi Kumar",
  "phone": "9876543210",
  "email": "ravi@example.com",
  "configInterest": "3 BHK",
  "source": "brochure_download",
  "utmSource": "google",
  "utmCampaign": "north-bangalore-apartments",
  "gclid": "Cj0KCQ...",
  "pageUrl": "https://yourdomain.com/?utm_source=google"
}
```

---

## 🎯 Lead Gate Sources Tracked

| Source Value | Trigger |
|---|---|
| `hero_form` | Hero section callback form |
| `brochure_download` | Download Brochure button |
| `floor_plan_view` | View floor plan button |
| `gallery_view` | Gallery image click |
| `configuration_card` | "Know More" on config card |
| `site_visit` | Schedule site visit |
| `contact_section` | Contact form |
| `floating_cta` | Mobile sticky bar |

---

## ⚠️ Before Going Live

1. **Set DB credentials with environment variables** instead of committing them to `application.properties`
2. **Add authentication** to `GET /api/leads` (currently open)
3. **Replace placeholder images** with actual project photos
4. **Replace brochure PDF** in `backend/src/main/resources/static/brochure/`
5. **Add Google Maps API key** for a proper map embed
6. **Set up SMTP** in Spring Boot for email alerts on new leads
7. **Set RERA number** correctly in `frontend/src/data/constants.js`

---

## 📊 MySQL Lead Query Examples

```sql
-- Leads today
SELECT * FROM leads WHERE DATE(created_at) = CURDATE() ORDER BY created_at DESC;

-- Leads by source
SELECT source, COUNT(*) as count FROM leads GROUP BY source ORDER BY count DESC;

-- Leads from Google Ads
SELECT * FROM leads WHERE gclid IS NOT NULL AND gclid != '';

-- Export to CSV (MySQL CLI)
SELECT * FROM leads INTO OUTFILE '/tmp/leads.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n';
```
