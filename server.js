const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const STORAGE_MODE = process.env.STORAGE_MODE === 'postgres' ? 'postgres' : 'json';
const DATABASE_URL = process.env.DATABASE_URL;
const APP_NAME = 'Narayan Enterprises';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const ROLE_PERMISSIONS = {
  admin: ['*'],
  accountant: [
    'dashboard:view',
    'employees:view',
    'employees:create',
    'employees:update',
    'employees:delete',
    'attendance:view',
    'attendance:report',
    'salary:view',
    'advances:create',
    'trucks:view',
    'trucks:delete',
    'expenses:view',
    'expenses:create',
    'expenses:delete',
    'export:view',
    'salaryslip:view'
  ],
  manager: [
    'dashboard:view',
    'employees:view',
    'attendance:view',
    'attendance:create',
    'attendance:report',
    'trucks:view',
    'trucks:create',
    'trucks:delete',
    'expenses:view',
    'expenses:create'
  ]
};

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function monthOf(dateStr) {
  return String(dateStr).slice(0, 7);
}

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function userView(user) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    permissions: ROLE_PERMISSIONS[user.role] || []
  };
}

function csvEscape(value) {
  const str = String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function defaultUsers() {
  return [
    {
      id: 'user_admin',
      username: 'admin',
      passwordHash: bcrypt.hashSync('admin123', 10),
      role: 'admin'
    },
    {
      id: 'user_acc',
      username: 'accountant',
      passwordHash: bcrypt.hashSync('account123', 10),
      role: 'accountant'
    },
    {
      id: 'user_mgr',
      username: 'manager',
      passwordHash: bcrypt.hashSync('manager123', 10),
      role: 'manager'
    }
  ];
}

function ensureDbShape(db) {
  if (!Array.isArray(db.employees)) db.employees = [];
  if (!Array.isArray(db.attendance)) db.attendance = [];
  if (!Array.isArray(db.salaryAdvances)) db.salaryAdvances = [];
  if (!Array.isArray(db.trucks)) db.trucks = [];
  if (!Array.isArray(db.expenses)) db.expenses = [];
  if (!Array.isArray(db.users) || db.users.length === 0) db.users = defaultUsers();
  if (!Array.isArray(db.sessions)) db.sessions = [];

  let changed = false;
  db.users = db.users.map((u) => {
    if (u.passwordHash) return u;
    if (u.password) {
      changed = true;
      return {
        id: u.id || uid('user'),
        username: u.username,
        passwordHash: bcrypt.hashSync(String(u.password), 10),
        role: u.role || 'manager'
      };
    }
    changed = true;
    return {
      id: u.id || uid('user'),
      username: u.username,
      passwordHash: bcrypt.hashSync('changeme123', 10),
      role: u.role || 'manager'
    };
  });

  return { db, changed };
}

function readJsonDb() {
  if (!fs.existsSync(DB_PATH)) {
    const ensured = ensureDbShape({});
    fs.writeFileSync(DB_PATH, JSON.stringify(ensured.db, null, 2));
    return ensured.db;
  }

  const raw = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const ensured = ensureDbShape(raw);
  if (ensured.changed) {
    fs.writeFileSync(DB_PATH, JSON.stringify(ensured.db, null, 2));
  }
  return ensured.db;
}

function writeJsonDb(db) {
  const ensured = ensureDbShape(db);
  fs.writeFileSync(DB_PATH, JSON.stringify(ensured.db, null, 2));
}

function jsonStore() {
  return {
    mode: 'json',
    async init() {
      readJsonDb();
    },
    async getUserByUsername(username) {
      const db = readJsonDb();
      return db.users.find((u) => u.username === username) || null;
    },
    async getUserById(id) {
      const db = readJsonDb();
      return db.users.find((u) => u.id === id) || null;
    },
    async updateUserPassword(userId, passwordHash) {
      const db = readJsonDb();
      const user = db.users.find((u) => u.id === userId);
      if (!user) return false;
      user.passwordHash = passwordHash;
      writeJsonDb(db);
      return true;
    },
    async createSession(token, userId, expiresAt) {
      const db = readJsonDb();
      db.sessions.push({ token, userId, createdAt: new Date().toISOString(), expiresAt });
      writeJsonDb(db);
    },
    async getSession(token) {
      const db = readJsonDb();
      return db.sessions.find((s) => s.token === token) || null;
    },
    async deleteSession(token) {
      const db = readJsonDb();
      db.sessions = db.sessions.filter((s) => s.token !== token);
      writeJsonDb(db);
    },
    async deleteExpiredSession(token) {
      await this.deleteSession(token);
    },
    async listEmployees() {
      return readJsonDb().employees;
    },
    async getEmployeeById(id) {
      const db = readJsonDb();
      return db.employees.find((e) => e.id === id) || null;
    },
    async createEmployee(data) {
      const db = readJsonDb();
      const employee = {
        id: uid('emp'),
        name: String(data.name).trim(),
        role: String(data.role).trim(),
        monthlySalary: Number(data.monthlySalary),
        active: true,
        createdAt: new Date().toISOString()
      };
      db.employees.push(employee);
      writeJsonDb(db);
      return employee;
    },
    async updateEmployee(id, data) {
      const db = readJsonDb();
      const employee = db.employees.find((e) => e.id === id);
      if (!employee) return null;
      employee.name = String(data.name).trim();
      employee.role = String(data.role).trim();
      employee.monthlySalary = Number(data.monthlySalary);
      employee.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return employee;
    },
    async deleteEmployee(id) {
      const db = readJsonDb();
      const before = db.employees.length;
      db.employees = db.employees.filter((e) => e.id !== id);
      if (before === db.employees.length) return false;
      db.attendance = db.attendance.filter((a) => a.employeeId !== id);
      db.salaryAdvances = db.salaryAdvances.filter((a) => a.employeeId !== id);
      writeJsonDb(db);
      return true;
    },
    async upsertAttendance(employeeId, date, status) {
      const db = readJsonDb();
      const existing = db.attendance.find((a) => a.employeeId === employeeId && a.date === date);
      if (existing) {
        existing.status = status;
        existing.updatedAt = new Date().toISOString();
        writeJsonDb(db);
        return existing;
      }

      const row = {
        id: uid('att'),
        employeeId,
        date,
        status,
        createdAt: new Date().toISOString()
      };
      db.attendance.push(row);
      writeJsonDb(db);
      return row;
    },
    async listAttendance(date) {
      const db = readJsonDb();
      if (!date) return db.attendance;
      return db.attendance.filter((a) => a.date === date);
    },
    async attendanceReport(month) {
      const db = readJsonDb();
      const rows = db.employees.map((e) => {
        const monthly = db.attendance.filter((a) => a.employeeId === e.id && monthOf(a.date) === month);
        const present = monthly.filter((m) => m.status === 'present').length;
        const absent = monthly.filter((m) => m.status === 'absent').length;
        return {
          employeeId: e.id,
          name: e.name,
          role: e.role,
          presentDays: present,
          absentDays: absent,
          markedDays: monthly.length
        };
      });
      return rows;
    },
    async createAdvance(data) {
      const db = readJsonDb();
      const row = {
        id: uid('adv'),
        employeeId: data.employeeId,
        date: data.date,
        amount: Number(data.amount),
        note: data.note ? String(data.note).trim() : '',
        createdAt: new Date().toISOString()
      };
      db.salaryAdvances.push(row);
      writeJsonDb(db);
      return row;
    },
    async getEmployeeAdvances(employeeId, month) {
      const db = readJsonDb();
      return db.salaryAdvances.filter((a) => a.employeeId === employeeId && monthOf(a.date) === month);
    },
    async setAdvancesForMonth(employeeId, month, totalAdvances) {
      const db = readJsonDb();
      const currentSum = db.salaryAdvances
        .filter((a) => a.employeeId === employeeId && monthOf(a.date) === month)
        .reduce((sum, a) => sum + Number(a.amount), 0);
      const diff = Number(totalAdvances) - currentSum;
      if (diff === 0) return { ok: true };
      const adjDate = `${month}-15`;
      const row = {
        id: uid('adv'),
        employeeId,
        date: adjDate,
        amount: diff,
        note: 'Adjustment to match entered total',
        createdAt: new Date().toISOString()
      };
      db.salaryAdvances.push(row);
      writeJsonDb(db);
      return { ok: true };
    },
    async salaryRows(month) {
      const db = readJsonDb();
      return db.employees.map((employee) => {
        const advances = db.salaryAdvances
          .filter((a) => a.employeeId === employee.id && monthOf(a.date) === month)
          .reduce((sum, a) => sum + Number(a.amount), 0);

        const totalAdvancesAllTime = db.salaryAdvances
          .filter((a) => a.employeeId === employee.id)
          .reduce((sum, a) => sum + Number(a.amount), 0);

        const startMonth = String(employee.createdAt || new Date().toISOString()).slice(0, 7);
        const [startY, startM] = startMonth.split('-').map(Number);
        const [endY, endM] = month.split('-').map(Number);
        const monthsWorked = Math.max(0, (endY - startY) * 12 + (endM - startM) + 1);
        const totalSalaryAllTime = Number(employee.monthlySalary) * monthsWorked;
        const totalRemainingAllTime = Math.max(0, totalSalaryAllTime - totalAdvancesAllTime);

        return {
          employeeId: employee.id,
          name: employee.name,
          role: employee.role,
          monthlySalary: Number(employee.monthlySalary),
          advances,
          remaining: Math.max(0, Number(employee.monthlySalary) - advances),
          monthsWorked,
          totalSalaryAllTime,
          totalAdvancesAllTime,
          totalRemainingAllTime
        };
      });
    },
    async createTruck(data) {
      const db = readJsonDb();
      const quantity = Number(data.quantity);
      const pricePerQuintal = data.pricePerQuintal != null && data.pricePerQuintal !== ''
        ? Number(data.pricePerQuintal)
        : null;
      const totalAmount = pricePerQuintal != null && !Number.isNaN(pricePerQuintal)
        ? pricePerQuintal * quantity
        : null;

      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : null;

      const row = {
        id: uid('trk'),
        date: data.date,
        truckNumber: String(data.truckNumber).trim(),
        driverName: data.driverName ? String(data.driverName).trim() : '',
        rawMaterial: String(data.rawMaterial).trim(),
        quantity,
        pricePerQuintal: pricePerQuintal ?? undefined,
        totalAmount: totalAmount ?? undefined,
        party: party || undefined,
        origin: data.origin ? String(data.origin).trim() : '',
        destination: data.destination ? String(data.destination).trim() : '',
        notes: data.notes ? String(data.notes).trim() : '',
        createdAt: new Date().toISOString()
      };
      db.trucks.push(row);
      writeJsonDb(db);
      return row;
    },
    async deleteTruck(id) {
      const db = readJsonDb();
      const before = db.trucks.length;
      db.trucks = db.trucks.filter((t) => t.id !== id);
      if (before === db.trucks.length) return false;
      writeJsonDb(db);
      return true;
    },
    async listTrucks(filter) {
      const db = readJsonDb();
      let rows = db.trucks;
      if (filter?.dateFrom) rows = rows.filter((t) => t.date >= filter.dateFrom);
      if (filter?.dateTo) rows = rows.filter((t) => t.date <= filter.dateTo);
      return rows;
    },
    async listExpenses(filter) {
      const db = readJsonDb();
      let rows = db.expenses;
      if (filter?.dateFrom) rows = rows.filter((e) => e.date >= filter.dateFrom);
      if (filter?.dateTo) rows = rows.filter((e) => e.date <= filter.dateTo);
      return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
    },
    async createExpense(data) {
      const db = readJsonDb();
      const row = {
        id: uid('exp'),
        date: data.date,
        description: String(data.description || '').trim() || 'Expense',
        amount: Number(data.amount),
        createdAt: new Date().toISOString()
      };
      db.expenses.push(row);
      writeJsonDb(db);
      return row;
    },
    async deleteExpense(id) {
      const db = readJsonDb();
      const before = db.expenses.length;
      db.expenses = db.expenses.filter((e) => e.id !== id);
      if (before === db.expenses.length) return false;
      writeJsonDb(db);
      return true;
    },
    async dashboard(month, today) {
      const db = readJsonDb();
      const totalSalary = db.employees.reduce((sum, e) => sum + Number(e.monthlySalary), 0);
      const totalAdvances = db.salaryAdvances
        .filter((a) => monthOf(a.date) === month)
        .reduce((sum, a) => sum + Number(a.amount), 0);
      const attendanceToday = db.attendance.filter((a) => a.date === today);
      const presentToday = attendanceToday.filter((a) => a.status === 'present').length;
      const absentToday = attendanceToday.filter((a) => a.status === 'absent').length;
      const trucksThisMonth = db.trucks.filter((t) => monthOf(t.date) === month);

      return {
        month,
        today,
        totalEmployees: db.employees.length,
        totalSalary,
        totalAdvances,
        totalRemaining: Math.max(0, totalSalary - totalAdvances),
        presentToday,
        absentToday,
        truckCountThisMonth: trucksThisMonth.length,
        truckQuantityThisMonth: trucksThisMonth.reduce((sum, t) => sum + Number(t.quantity), 0)
      };
    }
  };
}

function postgresStore() {
  if (!DATABASE_URL) {
    throw new Error('DATABASE_URL is required when STORAGE_MODE=postgres');
  }

  const pool = new Pool({ connectionString: DATABASE_URL });

  return {
    mode: 'postgres',
    async init() {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS sessions (
          token TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL,
          expires_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS employees (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          monthly_salary NUMERIC(12,2) NOT NULL,
          active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ
        );

        CREATE TABLE IF NOT EXISTS attendance (
          id TEXT PRIMARY KEY,
          employee_id TEXT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
          date DATE NOT NULL,
          status TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ,
          UNIQUE (employee_id, date)
        );

        CREATE TABLE IF NOT EXISTS salary_advances (
          id TEXT PRIMARY KEY,
          employee_id TEXT NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
          date DATE NOT NULL,
          amount NUMERIC(12,2) NOT NULL,
          note TEXT,
          created_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS trucks (
          id TEXT PRIMARY KEY,
          date DATE NOT NULL,
          truck_number TEXT NOT NULL,
          driver_name TEXT,
          raw_material TEXT NOT NULL,
          quantity NUMERIC(12,2) NOT NULL,
          price_per_quintal NUMERIC(12,2),
          total_amount NUMERIC(12,2),
          origin TEXT,
          destination TEXT,
          notes TEXT,
          created_at TIMESTAMPTZ NOT NULL
        );
        ALTER TABLE trucks ADD COLUMN IF NOT EXISTS price_per_quintal NUMERIC(12,2);
        ALTER TABLE trucks ADD COLUMN IF NOT EXISTS total_amount NUMERIC(12,2);
        ALTER TABLE trucks ADD COLUMN IF NOT EXISTS party TEXT;

        CREATE TABLE IF NOT EXISTS expenses (
          id TEXT PRIMARY KEY,
          date DATE NOT NULL,
          description TEXT NOT NULL,
          amount NUMERIC(12,2) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL
        );
      `);

      const countRes = await pool.query('SELECT COUNT(*)::int AS c FROM users');
      if (countRes.rows[0].c === 0) {
        const users = defaultUsers();
        for (const u of users) {
          await pool.query(
            'INSERT INTO users (id, username, password_hash, role) VALUES ($1, $2, $3, $4)',
            [u.id, u.username, u.passwordHash, u.role]
          );
        }
      }
    },
    async getUserByUsername(username) {
      const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (!res.rows[0]) return null;
      return {
        id: res.rows[0].id,
        username: res.rows[0].username,
        passwordHash: res.rows[0].password_hash,
        role: res.rows[0].role
      };
    },
    async getUserById(id) {
      const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (!res.rows[0]) return null;
      return {
        id: res.rows[0].id,
        username: res.rows[0].username,
        passwordHash: res.rows[0].password_hash,
        role: res.rows[0].role
      };
    },
    async updateUserPassword(userId, passwordHash) {
      const res = await pool.query('UPDATE users SET password_hash = $2 WHERE id = $1', [userId, passwordHash]);
      return res.rowCount > 0;
    },
    async createSession(token, userId, expiresAt) {
      await pool.query(
        'INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES ($1, $2, $3, $4)',
        [token, userId, new Date().toISOString(), expiresAt]
      );
    },
    async getSession(token) {
      const res = await pool.query('SELECT token, user_id, expires_at FROM sessions WHERE token = $1', [token]);
      if (!res.rows[0]) return null;
      return { token: res.rows[0].token, userId: res.rows[0].user_id, expiresAt: res.rows[0].expires_at };
    },
    async deleteSession(token) {
      await pool.query('DELETE FROM sessions WHERE token = $1', [token]);
    },
    async deleteExpiredSession(token) {
      await this.deleteSession(token);
    },
    async listEmployees() {
      const res = await pool.query('SELECT * FROM employees ORDER BY created_at DESC');
      return res.rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        monthlySalary: Number(r.monthly_salary),
        active: r.active,
        createdAt: r.created_at
      }));
    },
    async getEmployeeById(id) {
      const res = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        name: r.name,
        role: r.role,
        monthlySalary: Number(r.monthly_salary),
        active: r.active,
        createdAt: r.created_at
      };
    },
    async createEmployee(data) {
      const row = {
        id: uid('emp'),
        name: String(data.name).trim(),
        role: String(data.role).trim(),
        monthlySalary: Number(data.monthlySalary),
        active: true,
        createdAt: new Date().toISOString()
      };
      await pool.query(
        `INSERT INTO employees (id, name, role, monthly_salary, active, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [row.id, row.name, row.role, row.monthlySalary, row.active, row.createdAt]
      );
      return row;
    },
    async updateEmployee(id, data) {
      const res = await pool.query(
        `UPDATE employees
         SET name = $2, role = $3, monthly_salary = $4, updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [id, String(data.name).trim(), String(data.role).trim(), Number(data.monthlySalary)]
      );
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        name: r.name,
        role: r.role,
        monthlySalary: Number(r.monthly_salary),
        active: r.active,
        createdAt: r.created_at
      };
    },
    async deleteEmployee(id) {
      const res = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async upsertAttendance(employeeId, date, status) {
      const existing = await pool.query('SELECT id FROM attendance WHERE employee_id = $1 AND date = $2', [
        employeeId,
        date
      ]);

      if (existing.rows[0]) {
        const id = existing.rows[0].id;
        await pool.query('UPDATE attendance SET status = $2, updated_at = NOW() WHERE id = $1', [id, status]);
        return { id, employeeId, date, status };
      }

      const row = {
        id: uid('att'),
        employeeId,
        date,
        status,
        createdAt: new Date().toISOString()
      };
      await pool.query(
        `INSERT INTO attendance (id, employee_id, date, status, created_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [row.id, row.employeeId, row.date, row.status, row.createdAt]
      );
      return row;
    },
    async listAttendance(date) {
      let res;
      if (!date) {
        res = await pool.query('SELECT * FROM attendance ORDER BY date DESC');
      } else {
        res = await pool.query('SELECT * FROM attendance WHERE date = $1 ORDER BY created_at DESC', [date]);
      }
      return res.rows.map((r) => ({
        id: r.id,
        employeeId: r.employee_id,
        date: String(r.date).slice(0, 10),
        status: r.status,
        createdAt: r.created_at
      }));
    },
    async attendanceReport(month) {
      const res = await pool.query(
        `SELECT e.id AS employee_id,
                e.name,
                e.role,
                COALESCE(SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END), 0)::int AS present_days,
                COALESCE(SUM(CASE WHEN a.status = 'absent' THEN 1 ELSE 0 END), 0)::int AS absent_days,
                COALESCE(COUNT(a.id), 0)::int AS marked_days
         FROM employees e
         LEFT JOIN attendance a
           ON a.employee_id = e.id
          AND TO_CHAR(a.date, 'YYYY-MM') = $1
         GROUP BY e.id, e.name, e.role
         ORDER BY e.name`,
        [month]
      );

      return res.rows.map((r) => ({
        employeeId: r.employee_id,
        name: r.name,
        role: r.role,
        presentDays: r.present_days,
        absentDays: r.absent_days,
        markedDays: r.marked_days
      }));
    },
    async createAdvance(data) {
      const row = {
        id: uid('adv'),
        employeeId: data.employeeId,
        date: data.date,
        amount: Number(data.amount),
        note: data.note ? String(data.note).trim() : '',
        createdAt: new Date().toISOString()
      };
      await pool.query(
        `INSERT INTO salary_advances (id, employee_id, date, amount, note, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [row.id, row.employeeId, row.date, row.amount, row.note, row.createdAt]
      );
      return row;
    },
    async getEmployeeAdvances(employeeId, month) {
      const res = await pool.query(
        `SELECT * FROM salary_advances
         WHERE employee_id = $1
           AND TO_CHAR(date, 'YYYY-MM') = $2
         ORDER BY date ASC`,
        [employeeId, month]
      );
      return res.rows.map((r) => ({
        id: r.id,
        employeeId: r.employee_id,
        date: String(r.date).slice(0, 10),
        amount: Number(r.amount),
        note: r.note || ''
      }));
    },
    async setAdvancesForMonth(employeeId, month, totalAdvances) {
      const sumRes = await pool.query(
        `SELECT COALESCE(SUM(amount), 0) AS total
         FROM salary_advances
         WHERE employee_id = $1 AND TO_CHAR(date, 'YYYY-MM') = $2`,
        [employeeId, month]
      );
      const currentSum = Number(sumRes.rows[0].total);
      const diff = Number(totalAdvances) - currentSum;
      if (diff === 0) return { ok: true };
      const adjDate = `${month}-15`;
      const row = {
        id: uid('adv'),
        employeeId,
        date: adjDate,
        amount: diff,
        note: 'Adjustment to match entered total',
        createdAt: new Date().toISOString()
      };
      await pool.query(
        `INSERT INTO salary_advances (id, employee_id, date, amount, note, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [row.id, row.employeeId, row.date, row.amount, row.note, row.createdAt]
      );
      return { ok: true };
    },
    async salaryRows(month) {
      const res = await pool.query(
        `SELECT e.id AS employee_id,
                e.name,
                e.role,
                e.monthly_salary,
                e.created_at,
                COALESCE(SUM(CASE WHEN TO_CHAR(a.date, 'YYYY-MM') = $1 THEN a.amount ELSE 0 END), 0) AS advances,
                COALESCE(SUM(a.amount), 0) AS total_advances_all_time
         FROM employees e
         LEFT JOIN salary_advances a ON a.employee_id = e.id
         GROUP BY e.id, e.name, e.role, e.monthly_salary, e.created_at
         ORDER BY e.name`,
        [month]
      );

      return res.rows.map((r) => {
        const startMonth = String(r.created_at).slice(0, 7);
        const [startY, startM] = startMonth.split('-').map(Number);
        const [endY, endM] = month.split('-').map(Number);
        const monthsWorked = Math.max(0, (endY - startY) * 12 + (endM - startM) + 1);
        const totalSalaryAllTime = Number(r.monthly_salary) * monthsWorked;
        const totalAdvancesAllTime = Number(r.total_advances_all_time);

        return {
          employeeId: r.employee_id,
          name: r.name,
          role: r.role,
          monthlySalary: Number(r.monthly_salary),
          advances: Number(r.advances),
          remaining: Math.max(0, Number(r.monthly_salary) - Number(r.advances)),
          monthsWorked,
          totalSalaryAllTime,
          totalAdvancesAllTime,
          totalRemainingAllTime: Math.max(0, totalSalaryAllTime - totalAdvancesAllTime)
        };
      });
    },
    async createTruck(data) {
      const quantity = Number(data.quantity);
      const pricePerQuintal =
        data.pricePerQuintal != null && data.pricePerQuintal !== ''
          ? Number(data.pricePerQuintal)
          : null;
      const totalAmount =
        pricePerQuintal != null && !Number.isNaN(pricePerQuintal) ? pricePerQuintal * quantity : null;

      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : null;

      const row = {
        id: uid('trk'),
        date: data.date,
        truckNumber: String(data.truckNumber).trim(),
        driverName: data.driverName ? String(data.driverName).trim() : '',
        rawMaterial: String(data.rawMaterial).trim(),
        quantity,
        pricePerQuintal: pricePerQuintal ?? undefined,
        totalAmount: totalAmount ?? undefined,
        party: party || undefined,
        origin: data.origin ? String(data.origin).trim() : '',
        destination: data.destination ? String(data.destination).trim() : '',
        notes: data.notes ? String(data.notes).trim() : '',
        createdAt: new Date().toISOString()
      };

      await pool.query(
        `INSERT INTO trucks (
          id, date, truck_number, driver_name, raw_material, quantity, price_per_quintal, total_amount, party, origin, destination, notes, created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          row.id,
          row.date,
          row.truckNumber,
          row.driverName,
          row.rawMaterial,
          row.quantity,
          row.pricePerQuintal ?? null,
          row.totalAmount ?? null,
          row.party ?? null,
          row.origin,
          row.destination,
          row.notes,
          row.createdAt
        ]
      );

      return row;
    },
    async deleteTruck(id) {
      const res = await pool.query('DELETE FROM trucks WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async listTrucks(filter) {
      const values = [];
      let where = 'WHERE 1=1';

      if (filter?.dateFrom) {
        values.push(filter.dateFrom);
        where += ` AND date >= $${values.length}`;
      }
      if (filter?.dateTo) {
        values.push(filter.dateTo);
        where += ` AND date <= $${values.length}`;
      }

      const res = await pool.query(`SELECT * FROM trucks ${where} ORDER BY date DESC`, values);
      return res.rows.map((r) => ({
        id: r.id,
        date: String(r.date).slice(0, 10),
        truckNumber: r.truck_number,
        driverName: r.driver_name || '',
        rawMaterial: r.raw_material,
        quantity: Number(r.quantity),
        pricePerQuintal: r.price_per_quintal != null ? Number(r.price_per_quintal) : null,
        totalAmount: r.total_amount != null ? Number(r.total_amount) : null,
        party: r.party || null,
        origin: r.origin || '',
        destination: r.destination || '',
        notes: r.notes || ''
      }));
    },
    async listExpenses(filter) {
      const values = [];
      let where = 'WHERE 1=1';
      if (filter?.dateFrom) {
        values.push(filter.dateFrom);
        where += ` AND date >= $${values.length}`;
      }
      if (filter?.dateTo) {
        values.push(filter.dateTo);
        where += ` AND date <= $${values.length}`;
      }
      const res = await pool.query(`SELECT * FROM expenses ${where} ORDER BY date DESC`, values);
      return res.rows.map((r) => ({
        id: r.id,
        date: String(r.date).slice(0, 10),
        description: r.description || '',
        amount: Number(r.amount),
        createdAt: r.created_at
      }));
    },
    async createExpense(data) {
      const row = {
        id: uid('exp'),
        date: data.date,
        description: String(data.description || '').trim() || 'Expense',
        amount: Number(data.amount),
        createdAt: new Date().toISOString()
      };
      await pool.query(
        'INSERT INTO expenses (id, date, description, amount, created_at) VALUES ($1, $2, $3, $4, $5)',
        [row.id, row.date, row.description, row.amount, row.createdAt]
      );
      return row;
    },
    async deleteExpense(id) {
      const res = await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async dashboard(month, today) {
      const employeesRes = await pool.query('SELECT COUNT(*)::int AS c, COALESCE(SUM(monthly_salary), 0) AS total FROM employees');
      const advancesRes = await pool.query(
        `SELECT COALESCE(SUM(amount), 0) AS total
         FROM salary_advances
         WHERE TO_CHAR(date, 'YYYY-MM') = $1`,
        [month]
      );
      const attendanceRes = await pool.query(
        `SELECT
           COALESCE(SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END), 0)::int AS present,
           COALESCE(SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END), 0)::int AS absent
         FROM attendance
         WHERE date = $1`,
        [today]
      );
      const truckRes = await pool.query(
        `SELECT COUNT(*)::int AS c, COALESCE(SUM(quantity), 0) AS qty
         FROM trucks
         WHERE TO_CHAR(date, 'YYYY-MM') = $1`,
        [month]
      );

      const totalSalary = Number(employeesRes.rows[0].total || 0);
      const totalAdvances = Number(advancesRes.rows[0].total || 0);

      return {
        month,
        today,
        totalEmployees: employeesRes.rows[0].c,
        totalSalary,
        totalAdvances,
        totalRemaining: Math.max(0, totalSalary - totalAdvances),
        presentToday: attendanceRes.rows[0].present,
        absentToday: attendanceRes.rows[0].absent,
        truckCountThisMonth: truckRes.rows[0].c,
        truckQuantityThisMonth: Number(truckRes.rows[0].qty || 0)
      };
    }
  };
}

const store = STORAGE_MODE === 'postgres' ? postgresStore() : jsonStore();

function auth(req, res, next) {
  const tokenHeader = req.header('authorization') || '';
  const bearer = tokenHeader.startsWith('Bearer ') ? tokenHeader.slice(7) : '';
  const token = bearer || req.header('x-auth-token') || req.query.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  store
    .getSession(token)
    .then(async (session) => {
      if (!session) {
        return res.status(401).json({ error: 'Invalid session' });
      }

      if (new Date(session.expiresAt).getTime() < Date.now()) {
        await store.deleteExpiredSession(token);
        return res.status(401).json({ error: 'Session expired' });
      }

      const user = await store.getUserById(session.userId);
      if (!user) {
        return res.status(401).json({ error: 'User missing' });
      }

      req.auth = { token, user };
      return next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Auth error' });
    });
}

function requirePermission(permission) {
  return (req, res, next) => {
    const perms = ROLE_PERMISSIONS[req.auth.user.role] || [];
    if (perms.includes('*') || perms.includes(permission)) {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  };
}

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password are required' });
  }

  try {
    const user = await store.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = uid('token');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString();
    await store.createSession(token, user.id, expiresAt);

    return res.json({ token, user: userView(user), expiresAt, storageMode: store.mode });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/api/me', auth, (req, res) => {
  res.json({ ...userView(req.auth.user), storageMode: store.mode });
});

app.post('/api/logout', auth, async (req, res) => {
  try {
    await store.deleteSession(req.auth.token);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Logout failed' });
  }
});

app.post('/api/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'currentPassword and newPassword are required' });
  }

  if (String(newPassword).length < 8) {
    return res.status(400).json({ error: 'newPassword must be at least 8 characters' });
  }

  try {
    const valid = await bcrypt.compare(String(currentPassword), req.auth.user.passwordHash);
    if (!valid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    const hash = await bcrypt.hash(String(newPassword), 10);
    const updated = await store.updateUserPassword(req.auth.user.id, hash);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to change password' });
  }
});

app.get('/api/employees', auth, requirePermission('employees:view'), async (_req, res) => {
  try {
    const employees = await store.listEmployees();
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch employees' });
  }
});

app.post('/api/employees', auth, requirePermission('employees:create'), async (req, res) => {
  const { name, role, monthlySalary } = req.body;

  if (!name || !role || !monthlySalary) {
    return res.status(400).json({ error: 'name, role and monthlySalary are required' });
  }

  const numericSalary = Number(monthlySalary);
  if (Number.isNaN(numericSalary) || numericSalary <= 0) {
    return res.status(400).json({ error: 'monthlySalary must be a positive number' });
  }

  try {
    const employee = await store.createEmployee({ name, role, monthlySalary: numericSalary });
    return res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create employee' });
  }
});

app.put('/api/employees/:id', auth, requirePermission('employees:update'), async (req, res) => {
  const { name, role, monthlySalary } = req.body;
  if (!name || !role || !monthlySalary) {
    return res.status(400).json({ error: 'name, role and monthlySalary are required' });
  }

  const numericSalary = Number(monthlySalary);
  if (Number.isNaN(numericSalary) || numericSalary <= 0) {
    return res.status(400).json({ error: 'monthlySalary must be a positive number' });
  }

  try {
    const updated = await store.updateEmployee(req.params.id, {
      name,
      role,
      monthlySalary: numericSalary
    });

    if (!updated) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to update employee' });
  }
});

app.delete('/api/employees/:id', auth, requirePermission('employees:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteEmployee(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete employee' });
  }
});

app.post('/api/attendance', auth, requirePermission('attendance:create'), async (req, res) => {
  const { employeeId, date, status } = req.body;

  if (!employeeId || !date || !status) {
    return res.status(400).json({ error: 'employeeId, date, status are required' });
  }

  if (!['present', 'absent'].includes(status)) {
    return res.status(400).json({ error: 'status must be present or absent' });
  }

  try {
    const employee = await store.getEmployeeById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const attendance = await store.upsertAttendance(employeeId, date, status);
    return res.status(201).json(attendance);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to save attendance' });
  }
});

app.get('/api/attendance', auth, requirePermission('attendance:view'), async (req, res) => {
  try {
    const rows = await store.listAttendance(req.query.date);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch attendance' });
  }
});

app.get('/api/attendance-report', auth, requirePermission('attendance:report'), async (req, res) => {
  const month = req.query.month || currentMonth();
  try {
    const rows = await store.attendanceReport(month);
    return res.json({ month, rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch attendance report' });
  }
});

app.put('/api/advances/set', auth, requirePermission('advances:create'), async (req, res) => {
  const { employeeId, month, totalAdvances } = req.body;
  if (!employeeId || !month) {
    return res.status(400).json({ error: 'employeeId and month are required' });
  }
  const total = Number(totalAdvances);
  if (Number.isNaN(total) || total < 0) {
    return res.status(400).json({ error: 'totalAdvances must be a non-negative number' });
  }
  try {
    const employee = await store.getEmployeeById(employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    await store.setAdvancesForMonth(employeeId, month, total);
    const rows = await store.salaryRows(month);
    const row = rows.find((r) => r.employeeId === employeeId);
    return res.json({ ok: true, row: row || null });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to set advances' });
  }
});

app.post('/api/advances', auth, requirePermission('advances:create'), async (req, res) => {
  const { employeeId, date, amount, note } = req.body;

  if (!employeeId || !date || !amount) {
    return res.status(400).json({ error: 'employeeId, date, amount are required' });
  }

  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }

  try {
    const employee = await store.getEmployeeById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const advance = await store.createAdvance({ employeeId, date, amount: numericAmount, note });
    return res.status(201).json(advance);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create advance' });
  }
});

app.get('/api/salary-summary', auth, requirePermission('salary:view'), async (req, res) => {
  const month = req.query.month || currentMonth();
  try {
    const rows = await store.salaryRows(month);
    return res.json({ month, rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch salary summary' });
  }
});

app.get('/api/salary-slip/:employeeId.pdf', auth, requirePermission('salaryslip:view'), async (req, res) => {
  const month = req.query.month || currentMonth();

  try {
    const employee = await store.getEmployeeById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const advances = await store.getEmployeeAdvances(employee.id, month);
    const totalAdvance = advances.reduce((sum, a) => sum + Number(a.amount), 0);
    const remaining = Math.max(0, Number(employee.monthlySalary) - totalAdvance);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="salary-slip-${employee.name}-${month}.pdf"`);

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    doc.fontSize(18).text(APP_NAME);
    doc.fontSize(16).text('Salary Slip', { underline: true });
    doc.moveDown(1);
    doc.fontSize(11).text(`Generated: ${new Date().toISOString()}`);
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Month: ${month}`);
    doc.text(`Employee: ${employee.name}`);
    doc.text(`Role: ${employee.role}`);
    doc.text(`Monthly Salary: ₹${Number(employee.monthlySalary).toFixed(2)}`);
    doc.text(`Total Advance: ₹${totalAdvance.toFixed(2)}`);
    doc.text(`Remaining Payable: ₹${remaining.toFixed(2)}`);

    doc.moveDown(1);
    doc.fontSize(13).text('Advance Details');
    doc.moveDown(0.4);

    if (advances.length === 0) {
      doc.fontSize(11).text('No advance transactions for this month.');
    } else {
      advances.forEach((a, idx) => {
        doc.fontSize(11).text(
          `${idx + 1}. ${a.date} | Amount: ₹${Number(a.amount).toFixed(2)}${a.note ? ` | Note: ${a.note}` : ''}`
        );
      });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to generate salary slip' });
  }
});

app.post('/api/trucks', auth, requirePermission('trucks:create'), async (req, res) => {
  const {
    date,
    truckNumber,
    driverName,
    rawMaterial,
    quantity,
    pricePerQuintal,
    party,
    origin,
    destination,
    notes
  } = req.body;

  if (!date || !truckNumber || !rawMaterial || !quantity) {
    return res.status(400).json({ error: 'date, truckNumber, rawMaterial, quantity are required' });
  }

  const qty = Number(quantity);
  if (Number.isNaN(qty) || qty <= 0) {
    return res.status(400).json({ error: 'quantity must be a positive number' });
  }

  try {
    const truckEntry = await store.createTruck({
      date,
      truckNumber,
      driverName,
      rawMaterial,
      quantity: qty,
      pricePerQuintal: pricePerQuintal != null && pricePerQuintal !== '' ? pricePerQuintal : undefined,
      party,
      origin,
      destination,
      notes
    });

    return res.status(201).json(truckEntry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create truck entry' });
  }
});

app.get('/api/trucks', auth, requirePermission('trucks:view'), async (req, res) => {
  try {
    const rows = await store.listTrucks({ dateFrom: req.query.dateFrom, dateTo: req.query.dateTo });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch trucks' });
  }
});

app.delete('/api/trucks/:id', auth, requirePermission('trucks:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteTruck(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Truck entry not found' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete truck entry' });
  }
});

app.get('/api/expenses', auth, requirePermission('expenses:view'), async (req, res) => {
  try {
    const rows = await store.listExpenses({ dateFrom: req.query.dateFrom, dateTo: req.query.dateTo });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch expenses' });
  }
});

app.post('/api/expenses', auth, requirePermission('expenses:create'), async (req, res) => {
  const { date, description, amount } = req.body;
  if (!date || amount == null) {
    return res.status(400).json({ error: 'date and amount are required' });
  }
  const numAmount = Number(amount);
  if (Number.isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  try {
    const row = await store.createExpense({ date, description, amount: numAmount });
    return res.status(201).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create expense' });
  }
});

app.delete('/api/expenses/:id', auth, requirePermission('expenses:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteExpense(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Expense not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete expense' });
  }
});

app.get('/api/export/salary.csv', auth, requirePermission('export:view'), async (req, res) => {
  const month = req.query.month || currentMonth();

  try {
    const rows = await store.salaryRows(month);
    const header = [
      'Month',
      'Employee',
      'Role',
      'MonthlySalary',
      'Advances',
      'Remaining',
      'MonthsWorked',
      'TotalEarnedAllTime',
      'TotalAdvancesAllTime',
      'TotalRemainingAllTime'
    ];
    const lines = [header.join(',')].concat(
      rows.map((r) =>
        [
          month,
          r.name,
          r.role,
          r.monthlySalary,
          r.advances,
          r.remaining,
          r.monthsWorked ?? '',
          r.totalSalaryAllTime ?? '',
          r.totalAdvancesAllTime ?? '',
          r.totalRemainingAllTime ?? ''
        ]
          .map(csvEscape)
          .join(',')
      )
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="salary-summary-${month}.csv"`);
    return res.send(lines.join('\n'));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to export salary CSV' });
  }
});

app.get('/api/export/trucks.csv', auth, requirePermission('export:view'), async (req, res) => {
  try {
    const rows = await store.listTrucks({ dateFrom: req.query.dateFrom, dateTo: req.query.dateTo });

    const header = [
      'Date',
      'TruckNumber',
      'DriverName',
      'RawMaterial',
      'Quantity',
      'PricePerQuintal',
      'TotalAmount',
      'Party',
      'Origin',
      'Destination',
      'Notes'
    ];

    const lines = [header.join(',')].concat(
      rows.map((t) =>
        [
          t.date,
          t.truckNumber,
          t.driverName,
          t.rawMaterial,
          t.quantity,
          t.pricePerQuintal ?? '',
          t.totalAmount ?? '',
          t.party ?? '',
          t.origin,
          t.destination,
          t.notes
        ]
          .map(csvEscape)
          .join(',')
      )
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="truck-report.csv"');
    return res.send(lines.join('\n'));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to export truck CSV' });
  }
});

app.get('/api/export/attendance.csv', auth, requirePermission('export:view'), async (req, res) => {
  const month = req.query.month || currentMonth();

  try {
    const rows = await store.attendanceReport(month);
    const header = ['Month', 'Employee', 'Role', 'PresentDays', 'AbsentDays', 'MarkedDays'];
    const lines = [header.join(',')].concat(
      rows.map((r) => [month, r.name, r.role, r.presentDays, r.absentDays, r.markedDays].map(csvEscape).join(','))
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="attendance-${month}.csv"`);
    return res.send(lines.join('\n'));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to export attendance CSV' });
  }
});

app.get('/api/dashboard', auth, requirePermission('dashboard:view'), async (req, res) => {
  const month = req.query.month || currentMonth();
  const today = req.query.today || new Date().toISOString().slice(0, 10);

  try {
    const dashboard = await store.dashboard(month, today);
    return res.json(dashboard);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch dashboard' });
  }
});

store
  .init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} (storage: ${store.mode})`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize storage', err);
    process.exit(1);
  });
