# PlaceMux Job Service

A backend service for posting jobs with skill thresholds, generating assessment links, tracking job events, and evaluating candidate eligibility based on competency levels.

## Project Overview

This project is part of the **PlaceMux Phase 2 Industry Immersion Program**.

The service allows companies to:

* Publish jobs with skill thresholds (L1–L100)
* Generate per-job assessment links
* Track job-post events
* View all posted jobs
* Monitor job statistics
* Check candidate eligibility against job skill requirements

---

## Features

### 1. Job Posting with Skill Thresholds

* Create jobs with required skills and threshold levels.
* Store skill thresholds in the database.
* Generate assessment links for each job.

### 2. Threshold Rules Engine

* Compare candidate skill levels with job requirements.
* Determine eligibility.
* Return failed skills if thresholds are not met.

### 3. Job Supply Instrumentation

* Track total jobs.
* Track active jobs.
* Track job events.

### 4. Jobs Posted View

* View all published jobs.
* Retrieve persisted data from the database.

### 5. Event Tracking

* Record job publication events.
* Maintain audit data for analytics and reporting.

---

# Tech Stack

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL
* Supabase

## Packages Used

* express
* pg
* dotenv
* uuid
* cors
* morgan
* express-validator
* nodemon

---

# Project Structure

```text
placemux-job-service
│
├── migrations
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
│
├── .env
├── package.json
├── server.js
├── test-db.js
├── seedCompany.js
├── seedSkill.js
└── README.md
```

---

# API Endpoints

## Health Check

### GET /

Response

```json
{
  "message": "PlaceMux Job Service Running"
}
```

---

## Create Job

### POST /api/jobs

Request

```json
{
  "companyId": "11111111-1111-1111-1111-111111111111",
  "title": "AI ML Intern",
  "description": "Need AIML students",
  "location": "Bangalore",
  "skills": [
    {
      "skillId": "22222222-2222-2222-2222-222222222222",
      "threshold": 70
    }
  ]
}
```

Response

```json
{
  "success": true,
  "message": "Job published successfully",
  "jobId": "generated-job-id",
  "assessmentLink": "https://placemux.com/assessment/generated-job-id"
}
```

---

## Get All Jobs

### GET /api/jobs

Response

```json
{
  "success": true,
  "totalJobs": 1,
  "jobs": []
}
```

---

## Get Job Statistics

### GET /api/stats

Response

```json
{
  "totalJobs": 1,
  "activeJobs": 1,
  "totalJobEvents": 1
}
```

---

## Check Candidate Eligibility

### POST /api/jobs/:jobId/check

Request

```json
{
  "skills": {
    "22222222-2222-2222-2222-222222222222": 80
  }
}
```

Eligible Response

```json
{
  "eligible": true,
  "failedSkills": []
}
```

Not Eligible Response

```json
{
  "eligible": false,
  "failedSkills": [
    "22222222-2222-2222-2222-222222222222"
  ]
}
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

DB_HOST=your_supabase_host
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_database_password
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/gokulakb/placemux-job-service.git
```

Move into the project directory:

```bash
cd placemux-job-service
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

Server:

```text
http://localhost:5000
```

---

# Database Tables

* companies
* skills
* jobs
* job_skill_thresholds
* assessment_links
* job_events

---

# Definition of Done Achieved

✔ Company can publish jobs with skill thresholds.

✔ Per-job assessment links generated.

✔ Threshold rules engine implemented.

✔ Job-post events validated.

✔ Jobs-posted view live.

✔ Real data persisted in PostgreSQL (Supabase).

✔ End-to-end API demo completed.

---

# Author

K B Gokula

B.Tech – Artificial Intelligence and Machine Learning

REVA University

PlaceMux Phase 2 Industry Immersion Program
