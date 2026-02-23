# Data Safety Guide (Narayan Enterprises)

This app supports two storage modes:

- `json` (default): stores data in local files (`data/db.json`).
- `postgres`: stores data in PostgreSQL (`DATABASE_URL`).

For production safety, use `postgres`.

## 1) Local JSON Backup Command

Create timestamped snapshots of local JSON DB files:

```bash
npm run backup:json
```

This writes backups into:

- `data/backups/`

## 2) Migrate JSON Data to PostgreSQL

Before running migration:

1. Set `DATABASE_URL`.
2. Start the server once with `STORAGE_MODE=postgres` so tables are created.
3. Keep your JSON file available at `data/db.json` (or set `JSON_DB_PATH`).

Run migration:

```bash
DATABASE_URL=\"<your_postgres_url>\" npm run migrate:json-to-postgres
```

Optional custom JSON input:

```bash
DATABASE_URL=\"<your_postgres_url>\" JSON_DB_PATH=\"/path/to/db.json\" npm run migrate:json-to-postgres
```

## 3) Recommended Render Production Settings

Set these env vars on Render:

- `STORAGE_MODE=postgres`
- `DATABASE_URL=<managed postgres connection string>`

Do not use JSON mode in production if you need durable data.

## 4) Git Safety

Runtime DB files are ignored in git:

- `data/db.json`
- `data/db.backup.json`
- `data/backups/`

This prevents accidental commits of live data files.
