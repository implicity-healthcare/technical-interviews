# Technical Test for Senior Frontend Developer
### Total Time: Approximately 120 minutes
- Briefing & Setup (5 mins)
- Focused Coding Challenge (90 mins)
- Code Review & Conceptual Q&A (20-25 min)

### Core Skills Assessed
- Frontend Development (Angular/TypeScript)
- Data Visualization & UI (simplified)
- API Integration & Reliability (basics)

### Technologies
- Frontend: Angular (latest stable or 17+), TypeScript, RxJS
- CDS Components: Simplified guideline (focus on consistency)
- Backend API: Provided

## Part 1: Briefing & Setup (5 minutes)
- Quick overview of the test structure.
- Clarify the objective of the coding challenge.
- Explain that backend API endpoints is provided 
- Answer any immediate setup questions.

## Part 2: Focused Coding Challenge (90 minutes)
### Objective
1. Develop a "Single Patient Vital Signs Display" component in Angular. You will fetch data from provided API endpoints, display patient information, their latest vitals, and a historical trend for one vital sign.

2. Ensure your UI elements (data display sections, labels, values) have a clean, consistent, and professional look. Use simple, well-organized CSS for this. Focus on clarity and readability of the medical data. No complex UI library setup is required unless you are extremely fast with a preferred one (like Angular Material's CDK for basic structure).

3. You will be working with data for a single, predefined patient (ID: pat123). Showcase how you are able to navigate through the code and request APIs to populate your frontend component.

### Available Endpoints
**Get Patient Profile**
```
Endpoint: GET http://localhost:3007/api/patients/pat123/profile
Expected Response (JSON):
JSON

{
  "id": "pat123",
  "name": "Eleanor Vance",
  "age": 67,
  "roomNumber": "ICU-305",
  "condition": "Stable post-op"
}
```

**Get Latest Vital Signs**
```
Endpoint: GET http://localhost:3007/api/patients/pat123/vitals/latest
Expected Response (JSON):
JSON

{
  "heartRate": { "value": 72, "unit": "bpm", "status": "normal" },
  "bloodPressure": { "systolic": 125, "diastolic": 82, "unit": "mmHg", "status": "normal" },
  "spO2": { "value": 97, "unit": "%", "status": "normal" },
  "temperature": { "value": 37.1, "unit": "°C", "status": "normal" }
}
```

**Get Historical Heart Rate**
```
Endpoint: GET http://localhost:3007/api/patients/pat123/vitals/HeartRate/history
Expected Response (JSON):
JSON

[
  { "timestamp": "2024-05-28T10:00:00Z", "value": 70 },
  { "timestamp": "2024-05-28T10:05:00Z", "value": 72 },
  { "timestamp": "2024-05-28T10:10:00Z", "value": 71 },
  // ... (approx. 10-15 data points)
  { "timestamp": "2024-05-28T11:00:00Z", "value": 75 }
]
```

### Guidelines

**Angular Application Setup**  
- Extend the current application following the provided folder architecture
- Create a feature module and a component (e.g., PatientVitalDisplayComponent).

**Data Service**  
- Create an Angular service to handle fetching data from the three API endpoints.
Use Angular's HttpClient and RxJS for these asynchronous operations.

**PatientVitalDisplayComponent Implementation**
- On initialization (ngOnInit), use your service to fetch data from all three endpoints.
- Display Patient Profile: Clearly present the patient's name, age, roomNumber, and condition.
- Display Latest Vitals: Show the latest heartRate, bloodPressure, spO2, and temperature in a structured and readable format. Include units and consider visually indicating the status if time permits.
- Display Historical Heart Rate: Primary Goal (if time is tight): Display the historical heart rate data as a formatted list (e.g., "Time: [formatted timestamp], HR: [value] bpm").
- Loading & Error States: Implement a simple loading indicator (e.g., "Loading patient data...") while API calls are in progress.
- Display user-friendly error messages if any API call fails (e.g., "Failed to load patient profile.").

**TypeScript**
- Define clear TypeScript interfaces for the data structures (Profile, LatestVital, VitalValue, HistoricalDataPoint).
- Use strong typing throughout your component and service.

**Styling (CDS Guideline)**
- Apply simple, clean BEM style, SCSS to ensure data is presented clearly and professionally. Focus on readability and visual organization.

### Deliverable
- Be prepared to share your screen and walk through your code.

