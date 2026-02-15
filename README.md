# Company Operations Dashboard

A secure operations app to manage:
- Employees (create, update, delete)
- Daily attendance
- Monthly attendance report
- Salary advances and remaining salary
- Truck/raw material entries and reporting
- CSV exports and PDF salary slips

## Key Upgrades Added

- Role-based auth (`admin`, `accountant`, `manager`)
- Password hashing with `bcryptjs`
- Change-password API + UI
- Employee edit/delete actions
- Monthly attendance report (table + CSV)
- Production PostgreSQL storage mode with automatic schema setup
- Local JSON fallback mode for quick start

## Demo Login Users

- `admin / admin123`
- `accountant / account123`
- `manager / manager123`

Change credentials immediately after first login.
In JSON mode, existing plain-text `password` fields are auto-migrated to hashed `passwordHash` on first app start.

## Tech

- Backend: Node.js + Express
- Auth: bcryptjs session tokens
- PDF: PDFKit
- DB Modes:
  - `json` (default, uses `data/db.json`)
  - `postgres` (set env vars below)

## Run (JSON mode - local)

1. Install Node.js (v18+ recommended).
2. Install dependencies:

```bash
npm install
```

3. Start:

```bash
npm start
```

4. Open `http://localhost:3000`

## Run (PostgreSQL mode - production)

1. Create a PostgreSQL database.
2. Set env vars:

```bash
export STORAGE_MODE=postgres
export DATABASE_URL='postgres://USER:PASSWORD@HOST:5432/DBNAME'
```

3. Start app:

```bash
npm start
```

The app auto-creates required tables on startup.

Health check endpoint:

- `GET /healthz`

## Publish (Render - fastest)

1. Push this repo to GitHub.
2. In Render, create a new `Blueprint` and select this repository.
3. Render will read `/Users/shashankmishra/Documents/New project/render.yaml` and create:
   - web service: `company-ops-dashboard`
   - postgres database: `company-ops-db`
4. Open the deployed web URL and login using demo credentials.
5. Immediately change passwords from the app UI.

## Publish (Docker)

Build and run locally/prod:

```bash
docker build -t company-ops-dashboard .
docker run -p 3000:3000 -e STORAGE_MODE=json company-ops-dashboard
```

## Important API Endpoints

- `GET /healthz`

- `POST /api/login`
- `GET /api/me`
- `POST /api/logout`
- `POST /api/change-password`

- `GET /api/employees`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

- `POST /api/attendance`
- `GET /api/attendance`
- `GET /api/attendance-report`

- `POST /api/advances`
- `GET /api/salary-summary`
- `GET /api/salary-slip/:employeeId.pdf`

- `POST /api/trucks`
- `GET /api/trucks`

- `GET /api/export/salary.csv`
- `GET /api/export/trucks.csv`
- `GET /api/export/attendance.csv`

## Permissions summary

- `admin`: full access
- `accountant`: employee create/update/delete, salary/advance, reports/exports
- `manager`: attendance + trucks + attendance report

## Production Hardening Checklist

1. Use paid Render plans for both web service and database.
2. Keep `STORAGE_MODE=postgres` in production.
3. Set strong passwords and rotate them regularly.
4. Restrict who can access admin credentials.
5. Enable Render alerts (deploy failure, service down).
6. Test `/healthz` after every deploy.
7. Keep dependencies updated monthly or quarterly.
8. Document an owner for operations and incident response.

## Backup and Recovery (PostgreSQL)

Daily backup with `pg_dump`:

```bash
pg_dump "$DATABASE_URL" > backup-$(date +%F).sql
```

Restore from backup:

```bash
psql "$DATABASE_URL" < backup-2026-02-12.sql
```

Recommended:

1. Keep 7 daily backups + 4 weekly backups.
2. Store backups outside the app server (cloud storage).
3. Run a restore test at least once per month.
