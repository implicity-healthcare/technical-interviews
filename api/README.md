# Wildcard API

## Setup

```
docker run -p 8099:3007 docker.io/sarazinj/mpcty-wildcard
```

## Available Endpoints
**Get Patient list**
```
Endpoint: GET http://localhost:3007/api/patients/list
Expected Response (JSON):
JSON

[
  {
    "id": "pat123",
    "name": "Eleanor Vance",
    "age": 67,
    "roomNumber": "ICU-305",
    "condition": "Stable post-op"
  },
  {
    "id": "pat456",
    "name": "John Smith",
    "age": 45,
    "roomNumber": "ER-201",
    "condition": "Under observation"
  }
  // ... (returns 10 patients)
]

```

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