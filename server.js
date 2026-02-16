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
const STARTED_AT = new Date();

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
    'salaryledger:view',
    'salaryledger:update',
    'advances:create',
    'trucks:view',
    'trucks:update',
    'trucks:delete',
    'expenses:view',
    'expenses:create',
    'expenses:update',
    'expenses:delete',
    'investments:view',
    'investments:create',
    'investments:update',
    'investments:delete',
    'chini:view',
    'chini:create',
    'chini:delete',
    'land:view',
    'land:create',
    'land:update',
    'land:delete',
    'vehicles:view',
    'vehicles:create',
    'vehicles:update',
    'vehicles:delete',
    'export:view',
    'salaryslip:view'
  ],
  manager: [
    'dashboard:view',
    'employees:view',
    'attendance:view',
    'attendance:create',
    'attendance:report',
    'salaryledger:view',
    'salaryledger:update',
    'trucks:view',
    'trucks:create',
    'trucks:update',
    'trucks:delete',
    'expenses:view',
    'expenses:create',
    'expenses:update',
    'expenses:delete',
    'investments:view',
    'investments:create',
    'investments:update',
    'investments:delete',
    'chini:view',
    'chini:create',
    'land:view',
    'land:create',
    'land:update',
    'vehicles:view',
    'vehicles:create',
    'vehicles:update',
    'vehicles:delete'
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

function daysInMonth(year, monthIndexZeroBased) {
  return new Date(Date.UTC(year, monthIndexZeroBased + 1, 0)).getUTCDate();
}

function parseISODate(dateStr) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? null : d;
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
  if (!Array.isArray(db.salaryLedgers)) db.salaryLedgers = [];
  if (!Array.isArray(db.trucks)) db.trucks = [];
  if (!Array.isArray(db.expenses)) db.expenses = [];
  if (!Array.isArray(db.investments)) db.investments = [];
  if (!Array.isArray(db.chiniExpenses)) db.chiniExpenses = [];
  if (!Array.isArray(db.landRecords)) db.landRecords = [];
  if (!Array.isArray(db.vehicles)) db.vehicles = [];
  if (!Array.isArray(db.users) || db.users.length === 0) db.users = defaultUsers();
  if (!Array.isArray(db.sessions)) db.sessions = [];
  if (!Array.isArray(db.suppliers)) db.suppliers = [];
  if (!Array.isArray(db.supplierTransactions)) db.supplierTransactions = [];

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
    async healthCheck() {
      const db = readJsonDb();
      return {
        ok: true,
        details: {
          storage: 'json',
          employees: db.employees.length,
          sessions: db.sessions.length
        }
      };
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
      return readJsonDb().employees.map((e) => ({
        ...e,
        joiningDate: e.joiningDate || String(e.createdAt || new Date().toISOString()).slice(0, 10)
      }));
    },
    async getEmployeeById(id) {
      const db = readJsonDb();
      const e = db.employees.find((x) => x.id === id);
      if (!e) return null;
      return {
        ...e,
        joiningDate: e.joiningDate || String(e.createdAt || new Date().toISOString()).slice(0, 10)
      };
    },
    async createEmployee(data) {
      const db = readJsonDb();
      const createdAt = new Date().toISOString();
      const employee = {
        id: uid('emp'),
        name: String(data.name).trim(),
        role: String(data.role).trim(),
        monthlySalary: Number(data.monthlySalary),
        joiningDate: data.joiningDate || createdAt.slice(0, 10),
        active: true,
        createdAt
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
      employee.joiningDate = data.joiningDate || employee.joiningDate || String(employee.createdAt).slice(0, 10);
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
    async listSalaryLedgers() {
      const db = readJsonDb();
      return db.employees.map((e) => {
        const ledger = db.salaryLedgers.find((l) => l.employeeId === e.id);
        const totalSalary = Number(ledger?.totalSalary || 0);
        const amountGiven = Number(ledger?.amountGiven || 0);
        const totalToGive = Math.max(0, totalSalary - amountGiven);
        return {
          employeeId: e.id,
          name: e.name,
          role: e.role,
          totalSalary,
          amountGiven,
          totalPaid: amountGiven,
          totalToGive,
          note: ledger?.note || '',
          pending: totalToGive,
          updatedAt: ledger?.updatedAt || null
        };
      });
    },
    async upsertSalaryLedger(employeeId, totalSalary, amountGiven, note, totalToGive) {
      const db = readJsonDb();
      const paid = Number(amountGiven);
      const computedTotal =
        totalToGive != null && totalToGive !== '' ? paid + Number(totalToGive) : Number(totalSalary);
      const existing = db.salaryLedgers.find((l) => l.employeeId === employeeId);
      if (existing) {
        existing.totalSalary = computedTotal;
        existing.amountGiven = paid;
        existing.note = String(note || '').trim();
        existing.updatedAt = new Date().toISOString();
        writeJsonDb(db);
        return existing;
      }
      const row = {
        id: uid('sld'),
        employeeId,
        totalSalary: computedTotal,
        amountGiven: paid,
        note: String(note || '').trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      db.salaryLedgers.push(row);
      writeJsonDb(db);
      return row;
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

        const startMonth = String(employee.joiningDate || employee.createdAt || new Date().toISOString()).slice(0, 7);
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
        client: data.client ? String(data.client).trim() : '',
        origin: data.origin ? String(data.origin).trim() : '',
        destination: data.destination ? String(data.destination).trim() : '',
        notes: data.notes ? String(data.notes).trim() : '',
        createdAt: new Date().toISOString()
      };
      db.trucks.push(row);
      writeJsonDb(db);
      return row;
    },

    async updateTruck(id, data) {
      const db = readJsonDb();
      const truck = db.trucks.find((t) => t.id === id);
      if (!truck) return null;

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

      truck.date = data.date;
      truck.truckNumber = String(data.truckNumber).trim();
      truck.driverName = data.driverName ? String(data.driverName).trim() : '';
      truck.rawMaterial = String(data.rawMaterial).trim();
      truck.quantity = quantity;
      truck.pricePerQuintal = pricePerQuintal ?? undefined;
      truck.totalAmount = totalAmount ?? undefined;
      truck.party = party || undefined;
      truck.client = data.client ? String(data.client).trim() : '';
      truck.origin = data.origin ? String(data.origin).trim() : '';
      truck.destination = data.destination ? String(data.destination).trim() : '';
      truck.notes = data.notes ? String(data.notes).trim() : '';
      truck.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return truck;
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
      return rows
        .map((r) => ({ ...r, party: r.party || 'narayan' }))
        .sort((a, b) => (a.date < b.date ? 1 : -1));
    },
    async createExpense(data) {
      const db = readJsonDb();
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      const row = {
        id: uid('exp'),
        date: data.date,
        party,
        description: String(data.description || '').trim() || 'Expense',
        amount: Number(data.amount),
        createdAt: new Date().toISOString()
      };
      db.expenses.push(row);
      writeJsonDb(db);
      return row;
    },
    async updateExpense(id, data) {
      const db = readJsonDb();
      const expense = db.expenses.find((e) => e.id === id);
      if (!expense) return null;
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      expense.date = data.date;
      expense.party = party;
      expense.description = String(data.description || '').trim() || 'Expense';
      expense.amount = Number(data.amount);
      expense.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return expense;
    },
    async deleteExpense(id) {
      const db = readJsonDb();
      const before = db.expenses.length;
      db.expenses = db.expenses.filter((e) => e.id !== id);
      if (before === db.expenses.length) return false;
      writeJsonDb(db);
      return true;
    },
    async listInvestments(filter) {
      const db = readJsonDb();
      let rows = db.investments;
      if (filter?.dateFrom) rows = rows.filter((i) => i.date >= filter.dateFrom);
      if (filter?.dateTo) rows = rows.filter((i) => i.date <= filter.dateTo);
      return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
    },
    async createInvestment(data) {
      const db = readJsonDb();
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : null;
      const row = {
        id: uid('inv'),
        date: data.date,
        party: party || 'narayan',
        amount: Number(data.amount),
        note: String(data.note || '').trim(),
        createdAt: new Date().toISOString()
      };
      db.investments.push(row);
      writeJsonDb(db);
      return row;
    },
    async updateInvestment(id, data) {
      const db = readJsonDb();
      const investment = db.investments.find((i) => i.id === id);
      if (!investment) return null;
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      investment.date = data.date;
      investment.party = party;
      investment.amount = Number(data.amount);
      investment.note = String(data.note || '').trim();
      investment.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return investment;
    },
    async deleteInvestment(id) {
      const db = readJsonDb();
      const before = db.investments.length;
      db.investments = db.investments.filter((i) => i.id !== id);
      if (before === db.investments.length) return false;
      writeJsonDb(db);
      return true;
    },
    async listChiniExpenses(filter) {
      const db = readJsonDb();
      let rows = db.chiniExpenses;
      if (filter?.dateFrom) rows = rows.filter((e) => e.date >= filter.dateFrom);
      if (filter?.dateTo) rows = rows.filter((e) => e.date <= filter.dateTo);
      return rows.sort((a, b) => (a.date < b.date ? 1 : -1));
    },
    async createChiniExpense(data) {
      const db = readJsonDb();
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : null;
      const row = {
        id: uid('chi'),
        date: data.date,
        party: party || 'narayan',
        description: String(data.description || '').trim() || 'Chini Mill Expense',
        amount: Number(data.amount),
        createdAt: new Date().toISOString()
      };
      db.chiniExpenses.push(row);
      writeJsonDb(db);
      return row;
    },
    async deleteChiniExpense(id) {
      const db = readJsonDb();
      const before = db.chiniExpenses.length;
      db.chiniExpenses = db.chiniExpenses.filter((e) => e.id !== id);
      if (before === db.chiniExpenses.length) return false;
      writeJsonDb(db);
      return true;
    },
    async listLandRecords() {
      const db = readJsonDb();
      return db.landRecords.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    },
    async createLandRecord(data) {
      const db = readJsonDb();
      const row = {
        id: uid('land'),
        area: String(data.area || '').trim(),
        ownerName: String(data.ownerName || '').trim(),
        amountPaid: Number(data.amountPaid),
        amountToBeGiven: Number(data.amountToBeGiven),
        createdAt: new Date().toISOString()
      };
      db.landRecords.push(row);
      writeJsonDb(db);
      return row;
    },
    async updateLandRecord(id, data) {
      const db = readJsonDb();
      const record = db.landRecords.find((l) => l.id === id);
      if (!record) return null;
      record.area = String(data.area || '').trim();
      record.ownerName = String(data.ownerName || '').trim();
      record.amountPaid = Number(data.amountPaid);
      record.amountToBeGiven = Number(data.amountToBeGiven);
      record.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return record;
    },
    async listVehicles() {
      const db = readJsonDb();
      return db.vehicles.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    },
    async createVehicle(data) {
      const db = readJsonDb();
      const row = {
        id: uid('veh'),
        vehicleName: String(data.vehicleName || '').trim(),
        vehicleNumber: String(data.vehicleNumber || '').trim(),
        monthlyPrice: Number(data.monthlyPrice),
        serviceDueDate: data.serviceDueDate || '',
        lastServiceDate: data.lastServiceDate || '',
        paymentStatus: String(data.paymentStatus || 'pending').trim().toLowerCase(),
        amountPaid: Number(data.amountPaid || 0),
        note: String(data.note || '').trim(),
        createdAt: new Date().toISOString()
      };
      db.vehicles.push(row);
      writeJsonDb(db);
      return row;
    },
    async updateVehicle(id, data) {
      const db = readJsonDb();
      const vehicle = db.vehicles.find((v) => v.id === id);
      if (!vehicle) return null;
      vehicle.vehicleName = String(data.vehicleName || '').trim();
      vehicle.vehicleNumber = String(data.vehicleNumber || '').trim();
      vehicle.monthlyPrice = Number(data.monthlyPrice);
      vehicle.serviceDueDate = data.serviceDueDate || '';
      vehicle.lastServiceDate = data.lastServiceDate || '';
      vehicle.paymentStatus = String(data.paymentStatus || 'pending').trim().toLowerCase();
      vehicle.amountPaid = Number(data.amountPaid || 0);
      vehicle.note = String(data.note || '').trim();
      vehicle.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return vehicle;
    },
    async deleteVehicle(id) {
      const db = readJsonDb();
      const before = db.vehicles.length;
      db.vehicles = db.vehicles.filter((v) => v.id !== id);
      if (before === db.vehicles.length) return false;
      writeJsonDb(db);
      return true;
    },
    async deleteLandRecord(id) {
      const db = readJsonDb();
      const before = db.landRecords.length;
      db.landRecords = db.landRecords.filter((l) => l.id !== id);
      if (before === db.landRecords.length) return false;
      writeJsonDb(db);
      return true;
    },
    // Supplier Management
    async listSuppliers() {
      const db = readJsonDb();
      return db.suppliers.map(s => {
        const txs = db.supplierTransactions.filter(t => t.supplierId === s.id);
        const totalTrucks = txs.filter(t => t.type === 'truck').length;
        const totalMaterialAmount = txs.filter(t => t.type === 'truck').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const totalMaterialQuantity = txs.filter(t => t.type === 'truck').reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);
        const totalPaid = txs.filter(t => t.type === 'payment').reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const balance = totalMaterialAmount - totalPaid;
        return {
          ...s,
          totalTrucks,
          totalMaterialAmount,
          totalMaterialQuantity,
          totalPaid,
          balance
        };
      }).sort((a, b) => a.name.localeCompare(b.name));
    },
    async createSupplier(data) {
      const db = readJsonDb();
      const row = {
        id: uid('sup'),
        name: String(data.name).trim(),
        contact: String(data.contact || '').trim(),
        address: String(data.address || '').trim(),
        createdAt: new Date().toISOString()
      };
      db.suppliers.push(row);
      writeJsonDb(db);
      return row;
    },
    async updateSupplier(id, data) {
      const db = readJsonDb();
      const sup = db.suppliers.find(s => s.id === id);
      if (!sup) return null;
      sup.name = String(data.name).trim();
      sup.contact = String(data.contact || '').trim();
      sup.address = String(data.address || '').trim();
      sup.updatedAt = new Date().toISOString();
      writeJsonDb(db);
      return sup;
    },
    async deleteSupplier(id) {
      const db = readJsonDb();
      const before = db.suppliers.length;
      db.suppliers = db.suppliers.filter(s => s.id !== id);
      if (before === db.suppliers.length) return false;
      // Cascade delete transactions
      db.supplierTransactions = db.supplierTransactions.filter(t => t.supplierId !== id);
      writeJsonDb(db);
      return true;
    },
    async listSupplierTransactions(supplierId) {
      const db = readJsonDb();
      return db.supplierTransactions
        .filter(t => t.supplierId === supplierId)
        .sort((a, b) => a.date < b.date ? 1 : -1);
    },
    async createSupplierTransaction(data) {
      const db = readJsonDb();
      // data.type must be 'truck' or 'payment'
      const row = {
        id: uid('stx'),
        supplierId: data.supplierId,
        date: data.date,
        type: data.type, // 'truck' | 'payment'
        amount: Number(data.amount),
        // Optional fields for 'truck' type
        truckNumber: data.truckNumber ? String(data.truckNumber).trim() : undefined,
        material: data.material ? String(data.material).trim() : undefined,
        quantity: data.quantity ? Number(data.quantity) : undefined,
        rate: data.rate ? Number(data.rate) : undefined,
        note: data.note ? String(data.note).trim() : '',
        createdAt: new Date().toISOString()
      };
      db.supplierTransactions.push(row);
      writeJsonDb(db);
      return row;
    },
    async deleteSupplierTransaction(id) {
      const db = readJsonDb();
      const before = db.supplierTransactions.length;
      db.supplierTransactions = db.supplierTransactions.filter(t => t.id !== id);
      if (before === db.supplierTransactions.length) return false;
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
          joining_date DATE,
          active BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ
        );
        ALTER TABLE employees ADD COLUMN IF NOT EXISTS joining_date DATE;

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

        CREATE TABLE IF NOT EXISTS salary_ledgers (
          id TEXT PRIMARY KEY,
          employee_id TEXT NOT NULL UNIQUE REFERENCES employees(id) ON DELETE CASCADE,
          total_salary NUMERIC(12,2) NOT NULL DEFAULT 0,
          amount_given NUMERIC(12,2) NOT NULL DEFAULT 0,
          note TEXT,
          created_at TIMESTAMPTZ NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL
        );
        ALTER TABLE salary_ledgers ADD COLUMN IF NOT EXISTS note TEXT;

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
          party TEXT,
          description TEXT NOT NULL,
          amount NUMERIC(12,2) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL
        );
        ALTER TABLE expenses ADD COLUMN IF NOT EXISTS party TEXT;

        CREATE TABLE IF NOT EXISTS investments (
          id TEXT PRIMARY KEY,
          date DATE NOT NULL,
          party TEXT NOT NULL,
          amount NUMERIC(12,2) NOT NULL,
          note TEXT,
          created_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS chini_expenses (
          id TEXT PRIMARY KEY,
          date DATE NOT NULL,
          party TEXT NOT NULL,
          description TEXT NOT NULL,
          amount NUMERIC(12,2) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS land_records (
          id TEXT PRIMARY KEY,
          area TEXT NOT NULL,
          owner_name TEXT NOT NULL,
          amount_paid NUMERIC(12,2) NOT NULL,
          amount_to_be_given NUMERIC(12,2) NOT NULL,
          created_at TIMESTAMPTZ NOT NULL
        );

        CREATE TABLE IF NOT EXISTS vehicles (
          id TEXT PRIMARY KEY,
          vehicle_name TEXT NOT NULL,
          vehicle_number TEXT NOT NULL,
          monthly_price NUMERIC(12,2) NOT NULL,
          service_due_date DATE,
          last_service_date DATE,
          payment_status TEXT NOT NULL,
          amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0,
          note TEXT,
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
    async healthCheck() {
      await pool.query('SELECT 1');
      return {
        ok: true,
        details: {
          storage: 'postgres'
        }
      };
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
        joiningDate: r.joining_date ? String(r.joining_date).slice(0, 10) : String(r.created_at).slice(0, 10),
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
        joiningDate: r.joining_date ? String(r.joining_date).slice(0, 10) : String(r.created_at).slice(0, 10),
        active: r.active,
        createdAt: r.created_at
      };
    },
    async createEmployee(data) {
      const createdAt = new Date().toISOString();
      const row = {
        id: uid('emp'),
        name: String(data.name).trim(),
        role: String(data.role).trim(),
        monthlySalary: Number(data.monthlySalary),
        joiningDate: data.joiningDate || createdAt.slice(0, 10),
        active: true,
        createdAt
      };
      await pool.query(
        `INSERT INTO employees (id, name, role, monthly_salary, joining_date, active, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [row.id, row.name, row.role, row.monthlySalary, row.joiningDate, row.active, row.createdAt]
      );
      return row;
    },
    async updateEmployee(id, data) {
      const res = await pool.query(
        `UPDATE employees
         SET name = $2, role = $3, monthly_salary = $4, joining_date = $5, updated_at = NOW()
         WHERE id = $1
         RETURNING *`,
        [id, String(data.name).trim(), String(data.role).trim(), Number(data.monthlySalary), data.joiningDate]
      );
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        name: r.name,
        role: r.role,
        monthlySalary: Number(r.monthly_salary),
        joiningDate: r.joining_date ? String(r.joining_date).slice(0, 10) : String(r.created_at).slice(0, 10),
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
    async listSalaryLedgers() {
      const res = await pool.query(
        `SELECT e.id AS employee_id,
                e.name,
                e.role,
                COALESCE(sl.total_salary, 0) AS total_salary,
                COALESCE(sl.amount_given, 0) AS amount_given,
                COALESCE(sl.note, '') AS note,
                sl.updated_at
         FROM employees e
         LEFT JOIN salary_ledgers sl ON sl.employee_id = e.id
         ORDER BY e.name`
      );
      return res.rows.map((r) => {
        const totalSalary = Number(r.total_salary || 0);
        const amountGiven = Number(r.amount_given || 0);
        const totalToGive = Math.max(0, totalSalary - amountGiven);
        return {
          employeeId: r.employee_id,
          name: r.name,
          role: r.role,
          totalSalary,
          amountGiven,
          totalPaid: amountGiven,
          totalToGive,
          note: r.note || '',
          pending: totalToGive,
          updatedAt: r.updated_at || null
        };
      });
    },
    async upsertSalaryLedger(employeeId, totalSalary, amountGiven, note, totalToGive) {
      const paid = Number(amountGiven);
      const computedTotal =
        totalToGive != null && totalToGive !== '' ? paid + Number(totalToGive) : Number(totalSalary);
      const existing = await pool.query('SELECT id FROM salary_ledgers WHERE employee_id = $1', [employeeId]);
      if (existing.rows[0]) {
        const id = existing.rows[0].id;
        await pool.query(
          'UPDATE salary_ledgers SET total_salary = $2, amount_given = $3, note = $4, updated_at = NOW() WHERE id = $1',
          [id, computedTotal, paid, String(note || '').trim()]
        );
        return {
          id,
          employeeId,
          totalSalary: computedTotal,
          amountGiven: paid,
          note: String(note || '').trim()
        };
      }
      const row = {
        id: uid('sld'),
        employeeId,
        totalSalary: computedTotal,
        amountGiven: paid,
        note: String(note || '').trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await pool.query(
        `INSERT INTO salary_ledgers (id, employee_id, total_salary, amount_given, note, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [row.id, row.employeeId, row.totalSalary, row.amountGiven, row.note, row.createdAt, row.updatedAt]
      );
      return row;
    },
    async salaryRows(month) {
      const res = await pool.query(
        `SELECT e.id AS employee_id,
                e.name,
                e.role,
                e.monthly_salary,
                e.joining_date,
                e.created_at,
                COALESCE(SUM(CASE WHEN TO_CHAR(a.date, 'YYYY-MM') = $1 THEN a.amount ELSE 0 END), 0) AS advances,
                COALESCE(SUM(a.amount), 0) AS total_advances_all_time
         FROM employees e
         LEFT JOIN salary_advances a ON a.employee_id = e.id
         GROUP BY e.id, e.name, e.role, e.monthly_salary, e.joining_date, e.created_at
         ORDER BY e.name`,
        [month]
      );

      return res.rows.map((r) => {
        const startMonth = String(r.joining_date || r.created_at).slice(0, 7);
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
          joiningDate: r.joining_date ? String(r.joining_date).slice(0, 10) : String(r.created_at).slice(0, 10),
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
        party: r.party || 'narayan',
        description: r.description || '',
        amount: Number(r.amount),
        createdAt: r.created_at
      }));
    },
    async createExpense(data) {
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      const row = {
        id: uid('exp'),
        date: data.date,
        party,
        description: String(data.description || '').trim() || 'Expense',
        amount: Number(data.amount),
        createdAt: new Date().toISOString()
      };
      await pool.query(
        'INSERT INTO expenses (id, date, party, description, amount, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [row.id, row.date, row.party, row.description, row.amount, row.createdAt]
      );
      return row;
    },
    async updateExpense(id, data) {
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      const res = await pool.query(
        `UPDATE expenses
         SET date = $2, party = $3, description = $4, amount = $5
         WHERE id = $1
         RETURNING *`,
        [id, data.date, party, String(data.description || '').trim() || 'Expense', Number(data.amount)]
      );
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        date: String(r.date).slice(0, 10),
        party: r.party || 'narayan',
        description: r.description || '',
        amount: Number(r.amount),
        createdAt: r.created_at
      };
    },
    async deleteExpense(id) {
      const res = await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async listInvestments(filter) {
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
      const res = await pool.query(`SELECT * FROM investments ${where} ORDER BY date DESC`, values);
      return res.rows.map((r) => ({
        id: r.id,
        date: String(r.date).slice(0, 10),
        party: r.party || 'narayan',
        amount: Number(r.amount),
        note: r.note || '',
        createdAt: r.created_at
      }));
    },
    async createInvestment(data) {
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      const row = {
        id: uid('inv'),
        date: data.date,
        party,
        amount: Number(data.amount),
        note: String(data.note || '').trim(),
        createdAt: new Date().toISOString()
      };
      await pool.query(
        'INSERT INTO investments (id, date, party, amount, note, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [row.id, row.date, row.party, row.amount, row.note, row.createdAt]
      );
      return row;
    },
    async updateInvestment(id, data) {
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      const res = await pool.query(
        `UPDATE investments
         SET date = $2, party = $3, amount = $4, note = $5
         WHERE id = $1
         RETURNING *`,
        [id, data.date, party, Number(data.amount), String(data.note || '').trim()]
      );
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        date: String(r.date).slice(0, 10),
        party: r.party || 'narayan',
        amount: Number(r.amount),
        note: r.note || '',
        createdAt: r.created_at
      };
    },
    async deleteInvestment(id) {
      const res = await pool.query('DELETE FROM investments WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async listChiniExpenses(filter) {
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
      const res = await pool.query(`SELECT * FROM chini_expenses ${where} ORDER BY date DESC`, values);
      return res.rows.map((r) => ({
        id: r.id,
        date: String(r.date).slice(0, 10),
        party: r.party || 'narayan',
        description: r.description || '',
        amount: Number(r.amount),
        createdAt: r.created_at
      }));
    },
    async createChiniExpense(data) {
      const party = ['narayan', 'maa_vaishno'].includes(String(data.party || '').toLowerCase())
        ? String(data.party).toLowerCase()
        : 'narayan';
      const row = {
        id: uid('chi'),
        date: data.date,
        party,
        description: String(data.description || '').trim() || 'Chini Mill Expense',
        amount: Number(data.amount),
        createdAt: new Date().toISOString()
      };
      await pool.query(
        'INSERT INTO chini_expenses (id, date, party, description, amount, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [row.id, row.date, row.party, row.description, row.amount, row.createdAt]
      );
      return row;
    },
    async deleteChiniExpense(id) {
      const res = await pool.query('DELETE FROM chini_expenses WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async listLandRecords() {
      const res = await pool.query('SELECT * FROM land_records ORDER BY created_at DESC');
      return res.rows.map((r) => ({
        id: r.id,
        area: r.area,
        ownerName: r.owner_name,
        amountPaid: Number(r.amount_paid),
        amountToBeGiven: Number(r.amount_to_be_given),
        createdAt: r.created_at
      }));
    },
    async createLandRecord(data) {
      const row = {
        id: uid('land'),
        area: String(data.area || '').trim(),
        ownerName: String(data.ownerName || '').trim(),
        amountPaid: Number(data.amountPaid),
        amountToBeGiven: Number(data.amountToBeGiven),
        createdAt: new Date().toISOString()
      };
      await pool.query(
        'INSERT INTO land_records (id, area, owner_name, amount_paid, amount_to_be_given, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [row.id, row.area, row.ownerName, row.amountPaid, row.amountToBeGiven, row.createdAt]
      );
      return row;
    },
    async updateLandRecord(id, data) {
      const res = await pool.query(
        `UPDATE land_records
         SET area = $2, owner_name = $3, amount_paid = $4, amount_to_be_given = $5
         WHERE id = $1
         RETURNING *`,
        [id, String(data.area || '').trim(), String(data.ownerName || '').trim(), Number(data.amountPaid), Number(data.amountToBeGiven)]
      );
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        area: r.area,
        ownerName: r.owner_name,
        amountPaid: Number(r.amount_paid),
        amountToBeGiven: Number(r.amount_to_be_given),
        createdAt: r.created_at
      };
    },
    async listVehicles() {
      const res = await pool.query('SELECT * FROM vehicles ORDER BY created_at DESC');
      return res.rows.map((r) => ({
        id: r.id,
        vehicleName: r.vehicle_name,
        vehicleNumber: r.vehicle_number,
        monthlyPrice: Number(r.monthly_price),
        serviceDueDate: r.service_due_date ? String(r.service_due_date).slice(0, 10) : '',
        lastServiceDate: r.last_service_date ? String(r.last_service_date).slice(0, 10) : '',
        paymentStatus: r.payment_status,
        amountPaid: Number(r.amount_paid || 0),
        note: r.note || '',
        createdAt: r.created_at
      }));
    },
    async createVehicle(data) {
      const row = {
        id: uid('veh'),
        vehicleName: String(data.vehicleName || '').trim(),
        vehicleNumber: String(data.vehicleNumber || '').trim(),
        monthlyPrice: Number(data.monthlyPrice),
        serviceDueDate: data.serviceDueDate || null,
        lastServiceDate: data.lastServiceDate || null,
        paymentStatus: String(data.paymentStatus || 'pending').trim().toLowerCase(),
        amountPaid: Number(data.amountPaid || 0),
        note: String(data.note || '').trim(),
        createdAt: new Date().toISOString()
      };
      await pool.query(
        `INSERT INTO vehicles
         (id, vehicle_name, vehicle_number, monthly_price, service_due_date, last_service_date, payment_status, amount_paid, note, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          row.id,
          row.vehicleName,
          row.vehicleNumber,
          row.monthlyPrice,
          row.serviceDueDate,
          row.lastServiceDate,
          row.paymentStatus,
          row.amountPaid,
          row.note,
          row.createdAt
        ]
      );
      return row;
    },
    async updateVehicle(id, data) {
      const res = await pool.query(
        `UPDATE vehicles
         SET vehicle_name = $2,
             vehicle_number = $3,
             monthly_price = $4,
             service_due_date = $5,
             last_service_date = $6,
             payment_status = $7,
             amount_paid = $8,
             note = $9
         WHERE id = $1
         RETURNING *`,
        [
          id,
          String(data.vehicleName || '').trim(),
          String(data.vehicleNumber || '').trim(),
          Number(data.monthlyPrice),
          data.serviceDueDate || null,
          data.lastServiceDate || null,
          String(data.paymentStatus || 'pending').trim().toLowerCase(),
          Number(data.amountPaid || 0),
          String(data.note || '').trim()
        ]
      );
      if (!res.rows[0]) return null;
      const r = res.rows[0];
      return {
        id: r.id,
        vehicleName: r.vehicle_name,
        vehicleNumber: r.vehicle_number,
        monthlyPrice: Number(r.monthly_price),
        serviceDueDate: r.service_due_date ? String(r.service_due_date).slice(0, 10) : '',
        lastServiceDate: r.last_service_date ? String(r.last_service_date).slice(0, 10) : '',
        paymentStatus: r.payment_status,
        amountPaid: Number(r.amount_paid || 0),
        note: r.note || '',
        createdAt: r.created_at
      };
    },
    async deleteVehicle(id) {
      const res = await pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
      return res.rowCount > 0;
    },
    async deleteLandRecord(id) {
      const res = await pool.query('DELETE FROM land_records WHERE id = $1', [id]);
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

app.get('/healthz', async (_req, res) => {
  try {
    const health = await store.healthCheck();
    return res.json({
      status: 'ok',
      app: APP_NAME,
      storageMode: store.mode,
      uptimeSeconds: Math.floor((Date.now() - STARTED_AT.getTime()) / 1000),
      ...health
    });
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      status: 'degraded',
      app: APP_NAME,
      storageMode: store.mode,
      error: 'Health check failed'
    });
  }
});

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
  const { name, role, monthlySalary, joiningDate } = req.body;

  if (!name || !role || !monthlySalary) {
    return res.status(400).json({ error: 'name, role and monthlySalary are required' });
  }

  const numericSalary = Number(monthlySalary);
  if (Number.isNaN(numericSalary) || numericSalary <= 0) {
    return res.status(400).json({ error: 'monthlySalary must be a positive number' });
  }
  if (joiningDate && !/^\d{4}-\d{2}-\d{2}$/.test(String(joiningDate))) {
    return res.status(400).json({ error: 'joiningDate must be in YYYY-MM-DD format' });
  }

  try {
    const employee = await store.createEmployee({
      name,
      role,
      monthlySalary: numericSalary,
      joiningDate: joiningDate || undefined
    });
    return res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create employee' });
  }
});

app.put('/api/employees/:id', auth, requirePermission('employees:update'), async (req, res) => {
  const { name, role, monthlySalary, joiningDate } = req.body;
  if (!name || !role || !monthlySalary) {
    return res.status(400).json({ error: 'name, role and monthlySalary are required' });
  }

  const numericSalary = Number(monthlySalary);
  if (Number.isNaN(numericSalary) || numericSalary <= 0) {
    return res.status(400).json({ error: 'monthlySalary must be a positive number' });
  }
  if (joiningDate && !/^\d{4}-\d{2}-\d{2}$/.test(String(joiningDate))) {
    return res.status(400).json({ error: 'joiningDate must be in YYYY-MM-DD format' });
  }

  try {
    const updated = await store.updateEmployee(req.params.id, {
      name,
      role,
      monthlySalary: numericSalary,
      joiningDate: joiningDate || undefined
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

app.get('/api/salary-ledgers', auth, requirePermission('salaryledger:view'), async (_req, res) => {
  try {
    const rows = await store.listSalaryLedgers();
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch salary ledgers' });
  }
});

app.put('/api/salary-ledgers/:employeeId', auth, requirePermission('salaryledger:update'), async (req, res) => {
  const { totalSalary, amountGiven, totalPaid, totalToGive, note } = req.body;
  const paidRaw = totalPaid != null ? totalPaid : amountGiven;
  const toGiveRaw = totalToGive;
  const totalRaw = totalSalary;

  if (paidRaw == null && totalRaw == null) {
    return res.status(400).json({ error: 'totalPaid or totalSalary is required' });
  }
  const given = Number(paidRaw || 0);
  const total = Number(totalRaw != null ? totalRaw : given + Number(toGiveRaw || 0));
  const toGive = toGiveRaw != null ? Number(toGiveRaw) : Math.max(0, total - given);
  if (Number.isNaN(total) || total < 0 || Number.isNaN(given) || given < 0 || Number.isNaN(toGive) || toGive < 0) {
    return res.status(400).json({ error: 'totalPaid, totalToGive and totalSalary must be valid non-negative numbers' });
  }
  try {
    const employee = await store.getEmployeeById(req.params.employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const row = await store.upsertSalaryLedger(req.params.employeeId, total, given, note, toGive);
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to update salary ledger' });
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
    const [year, monthNum] = month.split('-').map(Number);
    if (!year || !monthNum || monthNum < 1 || monthNum > 12) {
      return res.status(400).json({ error: 'month must be in YYYY-MM format' });
    }

    const monthStart = `${month}-01`;
    const monthDays = daysInMonth(year, monthNum - 1);
    const monthEnd = `${month}-${String(monthDays).padStart(2, '0')}`;

    const requestedUpto = req.query.uptoDate ? String(req.query.uptoDate) : null;
    if (requestedUpto && !/^\d{4}-\d{2}-\d{2}$/.test(requestedUpto)) {
      return res.status(400).json({ error: 'uptoDate must be in YYYY-MM-DD format' });
    }

    const today = new Date();
    const todayIso = `${today.getUTCFullYear()}-${String(today.getUTCMonth() + 1).padStart(2, '0')}-${String(
      today.getUTCDate()
    ).padStart(2, '0')}`;

    // Default behavior:
    // - Current month: count from 1st to today
    // - Past/future month: count full month unless uptoDate is provided
    let periodEnd = monthEnd;
    if (requestedUpto) {
      periodEnd = requestedUpto;
    } else if (month === currentMonth()) {
      periodEnd = todayIso;
    }

    if (periodEnd < monthStart) periodEnd = monthStart;
    if (periodEnd > monthEnd) periodEnd = monthEnd;

    const startDate = parseISODate(monthStart);
    const endDate = parseISODate(periodEnd);
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Invalid period dates' });
    }

    const daysCounted = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1;
    const monthlySalary = Number(employee.monthlySalary);
    const perDaySalary = monthlySalary / monthDays;
    const proratedSalary = perDaySalary * daysCounted;
    const remaining = Math.max(0, proratedSalary - totalAdvance);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="salary-slip-${employee.name}-${month}.pdf"`);

    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    doc.pipe(res);

    const pageWidth = doc.page.width;
    const pageMargin = 40;
    const contentWidth = pageWidth - pageMargin * 2;
    const centerX = pageWidth / 2;
    const colors = {
      brand: '#0F3C8A',
      brandLight: '#EAF2FF',
      text: '#1A2538',
      muted: '#5D6A7E',
      success: '#0F9D58',
      border: '#D6DEEB'
    };

    const moneyText = (n) => `₹${Number(n).toFixed(2)}`;
    const generatedAt = new Date().toISOString();

    // Header band
    doc
      .save()
      .roundedRect(pageMargin, 30, contentWidth, 82, 12)
      .fill(colors.brandLight)
      .restore();

    // Center logo emblem
    const logoY = 46;
    doc
      .save()
      .circle(centerX, logoY + 20, 20)
      .fill(colors.brand)
      .restore();
    doc
      .fillColor('#FFFFFF')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text('NE', centerX - 12, logoY + 13, { width: 24, align: 'center' });

    doc
      .fillColor(colors.brand)
      .font('Helvetica-Bold')
      .fontSize(17)
      .text(APP_NAME, pageMargin, 78, { width: contentWidth, align: 'center' });
    doc
      .fillColor(colors.text)
      .fontSize(12)
      .font('Helvetica-Bold')
      .text('Salary Slip', pageMargin, 99, { width: contentWidth, align: 'center' });

    // Employee and period block
    let y = 130;
    doc
      .save()
      .roundedRect(pageMargin, y, contentWidth, 92, 10)
      .fill('#FFFFFF')
      .restore();
    doc
      .save()
      .roundedRect(pageMargin, y, contentWidth, 92, 10)
      .strokeColor(colors.border)
      .lineWidth(1)
      .stroke()
      .restore();

    doc.fillColor(colors.muted).fontSize(10).font('Helvetica-Bold');
    doc.text('Month', pageMargin + 14, y + 12);
    doc.text('Salary Period', pageMargin + 14, y + 38);
    doc.text('Generated', pageMargin + 14, y + 64);

    doc.text('Employee', pageMargin + contentWidth / 2, y + 12);
    doc.text('Role', pageMargin + contentWidth / 2, y + 38);
    doc.text('Days Counted', pageMargin + contentWidth / 2, y + 64);

    doc.fillColor(colors.text).font('Helvetica').fontSize(11);
    doc.text(month, pageMargin + 90, y + 12);
    doc.text(`${monthStart} to ${periodEnd}`, pageMargin + 90, y + 38);
    doc.text(generatedAt, pageMargin + 90, y + 64);

    doc.text(employee.name, pageMargin + contentWidth / 2 + 76, y + 12);
    doc.text(employee.role, pageMargin + contentWidth / 2 + 76, y + 38);
    doc.text(`${daysCounted} / ${monthDays}`, pageMargin + contentWidth / 2 + 76, y + 64);

    // Compensation summary cards
    y += 112;
    const gap = 10;
    const cardW = (contentWidth - gap) / 2;
    const cardH = 98;

    doc.save().roundedRect(pageMargin, y, cardW, cardH, 10).fill('#FFFFFF').restore();
    doc.save().roundedRect(pageMargin, y, cardW, cardH, 10).strokeColor(colors.border).stroke().restore();
    doc.save().roundedRect(pageMargin + cardW + gap, y, cardW, cardH, 10).fill('#FFFFFF').restore();
    doc
      .save()
      .roundedRect(pageMargin + cardW + gap, y, cardW, cardH, 10)
      .strokeColor(colors.border)
      .stroke()
      .restore();

    doc.fillColor(colors.brand).font('Helvetica-Bold').fontSize(11);
    doc.text('Salary Calculation', pageMargin + 12, y + 10);
    doc.fillColor(colors.text).font('Helvetica').fontSize(10.5);
    doc.text(`Monthly Salary: ${moneyText(monthlySalary)}`, pageMargin + 12, y + 32);
    doc.text(`Per Day Salary: ${moneyText(perDaySalary)}`, pageMargin + 12, y + 50);
    doc.text(`Prorated Salary: ${moneyText(proratedSalary)}`, pageMargin + 12, y + 68);

    doc.fillColor(colors.brand).font('Helvetica-Bold').fontSize(11);
    doc.text('Payment Status', pageMargin + cardW + gap + 12, y + 10);
    doc.fillColor(colors.text).font('Helvetica').fontSize(10.5);
    doc.text(`Total Advance: ${moneyText(totalAdvance)}`, pageMargin + cardW + gap + 12, y + 32);
    doc.text(`Remaining Payable: ${moneyText(remaining)}`, pageMargin + cardW + gap + 12, y + 50);
    doc.fillColor(colors.success).font('Helvetica-Bold').fontSize(12);
    doc.text(`Pending: ${moneyText(remaining)}`, pageMargin + cardW + gap + 12, y + 70);

    // Advance details section
    y += 120;
    doc.fillColor(colors.brand).font('Helvetica-Bold').fontSize(12);
    doc.text('Advance Details', pageMargin, y);
    y += 18;

    doc
      .save()
      .roundedRect(pageMargin, y, contentWidth, 24, 6)
      .fill(colors.brandLight)
      .restore();
    doc.fillColor(colors.brand).font('Helvetica-Bold').fontSize(10);
    doc.text('No.', pageMargin + 10, y + 7);
    doc.text('Date', pageMargin + 48, y + 7);
    doc.text('Amount', pageMargin + 160, y + 7);
    doc.text('Note', pageMargin + 280, y + 7);
    y += 30;

    if (advances.length === 0) {
      doc.fillColor(colors.muted).font('Helvetica').fontSize(10.5);
      doc.text('No advance transactions for this period.', pageMargin + 4, y + 2);
    } else {
      advances.forEach((a, idx) => {
        doc
          .save()
          .roundedRect(pageMargin, y - 2, contentWidth, 22, 4)
          .fill(idx % 2 === 0 ? '#FFFFFF' : '#F9FBFF')
          .restore();
        doc.fillColor(colors.text).font('Helvetica').fontSize(10);
        doc.text(String(idx + 1), pageMargin + 10, y + 4);
        doc.text(a.date, pageMargin + 48, y + 4);
        doc.text(moneyText(a.amount), pageMargin + 160, y + 4);
        doc.text(a.note || '-', pageMargin + 280, y + 4, { width: contentWidth - 290, ellipsis: true });
        y += 24;
      });
    }

    // Footer
    const footerY = doc.page.height - 46;
    doc
      .save()
      .moveTo(pageMargin, footerY - 8)
      .lineTo(pageMargin + contentWidth, footerY - 8)
      .strokeColor(colors.border)
      .stroke()
      .restore();
    doc.fillColor(colors.muted).font('Helvetica').fontSize(9);
    doc.text(`${APP_NAME} • Generated salary statement`, pageMargin, footerY, {
      width: contentWidth,
      align: 'center'
    });

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

app.put('/api/trucks/:id', auth, requirePermission('trucks:update'), async (req, res) => {
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
    const row = await store.updateTruck(req.params.id, {
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
    if (!row) return res.status(404).json({ error: 'Truck entry not found' });
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to update truck entry' });
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
  const { date, party, description, amount } = req.body;
  if (!date || !party || amount == null) {
    return res.status(400).json({ error: 'date, party and amount are required' });
  }
  const numAmount = Number(amount);
  if (Number.isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  if (!['narayan', 'maa_vaishno'].includes(String(party).toLowerCase())) {
    return res.status(400).json({ error: 'party must be narayan or maa_vaishno' });
  }
  try {
    const row = await store.createExpense({ date, party, description, amount: numAmount });
    return res.status(201).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create expense' });
  }
});

app.put('/api/expenses/:id', auth, requirePermission('expenses:update'), async (req, res) => {
  const { date, party, description, amount } = req.body;
  if (!date || !party || amount == null) {
    return res.status(400).json({ error: 'date, party and amount are required' });
  }
  const numAmount = Number(amount);
  if (Number.isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  if (!['narayan', 'maa_vaishno'].includes(String(party).toLowerCase())) {
    return res.status(400).json({ error: 'party must be narayan or maa_vaishno' });
  }
  try {
    const row = await store.updateExpense(req.params.id, { date, party, description, amount: numAmount });
    if (!row) return res.status(404).json({ error: 'Expense not found' });
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to update expense' });
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

app.get('/api/investments', auth, requirePermission('investments:view'), async (req, res) => {
  try {
    const rows = await store.listInvestments({ dateFrom: req.query.dateFrom, dateTo: req.query.dateTo });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch investments' });
  }
});

app.post('/api/investments', auth, requirePermission('investments:create'), async (req, res) => {
  const { date, party, amount, note } = req.body;
  if (!date || !party || amount == null) {
    return res.status(400).json({ error: 'date, party and amount are required' });
  }
  const numAmount = Number(amount);
  if (Number.isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  if (!['narayan', 'maa_vaishno'].includes(String(party).toLowerCase())) {
    return res.status(400).json({ error: 'party must be narayan or maa_vaishno' });
  }
  try {
    const row = await store.createInvestment({ date, party, amount: numAmount, note });
    return res.status(201).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create investment' });
  }
});

app.delete('/api/investments/:id', auth, requirePermission('investments:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteInvestment(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Investment not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete investment' });
  }
});

app.get('/api/chini-expenses', auth, requirePermission('chini:view'), async (req, res) => {
  try {
    const rows = await store.listChiniExpenses({ dateFrom: req.query.dateFrom, dateTo: req.query.dateTo });
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch chini expenses' });
  }
});

app.post('/api/chini-expenses', auth, requirePermission('chini:create'), async (req, res) => {
  const { date, party, description, amount } = req.body;
  if (!date || !party || amount == null) {
    return res.status(400).json({ error: 'date, party and amount are required' });
  }
  const numAmount = Number(amount);
  if (Number.isNaN(numAmount) || numAmount <= 0) {
    return res.status(400).json({ error: 'amount must be a positive number' });
  }
  if (!['narayan', 'maa_vaishno'].includes(String(party).toLowerCase())) {
    return res.status(400).json({ error: 'party must be narayan or maa_vaishno' });
  }
  try {
    const row = await store.createChiniExpense({ date, party, description, amount: numAmount });
    return res.status(201).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create chini expense' });
  }
});

app.delete('/api/chini-expenses/:id', auth, requirePermission('chini:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteChiniExpense(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Chini expense not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete chini expense' });
  }
});

app.get('/api/lands', auth, requirePermission('land:view'), async (_req, res) => {
  try {
    const rows = await store.listLandRecords();
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch land records' });
  }
});

app.post('/api/lands', auth, requirePermission('land:create'), async (req, res) => {
  const { area, ownerName, amountPaid, amountToBeGiven } = req.body;
  if (!area || !ownerName || amountPaid == null || amountToBeGiven == null) {
    return res.status(400).json({ error: 'area, ownerName, amountPaid and amountToBeGiven are required' });
  }
  const paid = Number(amountPaid);
  const due = Number(amountToBeGiven);
  if (Number.isNaN(paid) || paid < 0 || Number.isNaN(due) || due < 0) {
    return res.status(400).json({ error: 'amountPaid and amountToBeGiven must be valid numbers' });
  }
  try {
    const row = await store.createLandRecord({ area, ownerName, amountPaid: paid, amountToBeGiven: due });
    return res.status(201).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create land record' });
  }
});

app.put('/api/lands/:id', auth, requirePermission('land:update'), async (req, res) => {
  const { area, ownerName, amountPaid, amountToBeGiven } = req.body;
  if (!area || !ownerName || amountPaid == null || amountToBeGiven == null) {
    return res.status(400).json({ error: 'area, ownerName, amountPaid and amountToBeGiven are required' });
  }
  const paid = Number(amountPaid);
  const due = Number(amountToBeGiven);
  if (Number.isNaN(paid) || paid < 0 || Number.isNaN(due) || due < 0) {
    return res.status(400).json({ error: 'amountPaid and amountToBeGiven must be valid numbers' });
  }
  try {
    const row = await store.updateLandRecord(req.params.id, { area, ownerName, amountPaid: paid, amountToBeGiven: due });
    if (!row) return res.status(404).json({ error: 'Land record not found' });
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to update land record' });
  }
});

app.get('/api/vehicles', auth, requirePermission('vehicles:view'), async (_req, res) => {
  try {
    const rows = await store.listVehicles();
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to fetch vehicles' });
  }
});

app.post('/api/vehicles', auth, requirePermission('vehicles:create'), async (req, res) => {
  const { vehicleName, vehicleNumber, monthlyPrice, serviceDueDate, lastServiceDate, paymentStatus, amountPaid, note } =
    req.body;
  if (!vehicleName || !vehicleNumber || monthlyPrice == null) {
    return res.status(400).json({ error: 'vehicleName, vehicleNumber and monthlyPrice are required' });
  }
  const monthly = Number(monthlyPrice);
  const paid = Number(amountPaid || 0);
  if (Number.isNaN(monthly) || monthly < 0 || Number.isNaN(paid) || paid < 0) {
    return res.status(400).json({ error: 'monthlyPrice and amountPaid must be valid non-negative numbers' });
  }
  try {
    const row = await store.createVehicle({
      vehicleName,
      vehicleNumber,
      monthlyPrice: monthly,
      serviceDueDate,
      lastServiceDate,
      paymentStatus,
      amountPaid: paid,
      note
    });
    return res.status(201).json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to create vehicle' });
  }
});

app.put('/api/vehicles/:id', auth, requirePermission('vehicles:update'), async (req, res) => {
  const { vehicleName, vehicleNumber, monthlyPrice, serviceDueDate, lastServiceDate, paymentStatus, amountPaid, note } =
    req.body;
  if (!vehicleName || !vehicleNumber || monthlyPrice == null) {
    return res.status(400).json({ error: 'vehicleName, vehicleNumber and monthlyPrice are required' });
  }
  const monthly = Number(monthlyPrice);
  const paid = Number(amountPaid || 0);
  if (Number.isNaN(monthly) || monthly < 0 || Number.isNaN(paid) || paid < 0) {
    return res.status(400).json({ error: 'monthlyPrice and amountPaid must be valid non-negative numbers' });
  }
  try {
    const row = await store.updateVehicle(req.params.id, {
      vehicleName,
      vehicleNumber,
      monthlyPrice: monthly,
      serviceDueDate,
      lastServiceDate,
      paymentStatus,
      amountPaid: paid,
      note
    });
    if (!row) return res.status(404).json({ error: 'Vehicle not found' });
    return res.json(row);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to update vehicle' });
  }
});

app.delete('/api/vehicles/:id', auth, requirePermission('vehicles:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteVehicle(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Vehicle not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete vehicle' });
  }
});

app.delete('/api/lands/:id', auth, requirePermission('land:delete'), async (req, res) => {
  try {
    const deleted = await store.deleteLandRecord(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Land record not found' });
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to delete land record' });
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

// Offer Letter Generation
app.get('/api/employees/:id/offer-letter', auth, async (req, res) => {
  try {
    const employee = await store.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="offer-letter-${employee.name.replace(/\s+/g, '-')}.pdf"`);

    doc.pipe(res);

    // Header
    doc.fontSize(20).text('NARAYAN ENTERPRISES', { align: 'center' });
    doc.fontSize(10).text('Employment Offer Letter', { align: 'center' });
    doc.moveDown(2);

    // Date
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.fontSize(10).text(`Date: ${today}`, { align: 'right' });
    doc.moveDown();

    // Employee Details
    doc.fontSize(12).text(`To,`);
    doc.text(employee.name);
    doc.moveDown();

    // Salutation
    doc.text(`Dear ${employee.name},`);
    doc.moveDown();

    // Opening
    doc.fontSize(11).text('We are pleased to offer you employment with Narayan Enterprises on the following terms and conditions:');
    doc.moveDown();

    // Terms & Conditions
    doc.fontSize(12).text('1. Position and Duties');
    doc.fontSize(10).text(`You will be employed as ${employee.role || 'Employee'}. Your duties will include all tasks assigned by management from time to time.`);
    doc.moveDown();

    doc.fontSize(12).text('2. Compensation');
    doc.fontSize(10).text(`Your monthly salary will be ₹${employee.monthlySalary.toLocaleString('en-IN')} (Rupees ${numberToWords(employee.monthlySalary)} only), payable on or before the 5th of each month.`);
    doc.moveDown();

    doc.fontSize(12).text('3. Probation Period');
    doc.fontSize(10).text('You will be on probation for a period of 3 (three) months from your date of joining. During this period, either party may terminate employment with 7 days notice.');
    doc.moveDown();

    doc.fontSize(12).text('4. Working Hours');
    doc.fontSize(10).text('Your normal working hours will be as per company policy, typically 9:00 AM to 6:00 PM, Monday through Saturday, with appropriate breaks.');
    doc.moveDown();

    doc.fontSize(12).text('5. Leave Policy');
    doc.fontSize(10).text('You will be entitled to leave as per company policy. All leave must be approved by management in advance.');
    doc.moveDown();

    doc.fontSize(12).text('6. Termination');
    doc.fontSize(10).text('After successful completion of probation, either party may terminate employment by providing 30 days written notice or salary in lieu thereof.');
    doc.moveDown();

    doc.fontSize(12).text('7. Confidentiality');
    doc.fontSize(10).text('You agree to maintain strict confidentiality of all company information, trade secrets, and business dealings both during and after your employment.');
    doc.moveDown();

    doc.fontSize(12).text('8. Code of Conduct');
    doc.fontSize(10).text('You agree to abide by all company policies, rules, and regulations as communicated from time to time.');
    doc.moveDown(2);

    // Closing
    doc.fontSize(11).text('Please sign and return a copy of this letter to indicate your acceptance of these terms.');
    doc.moveDown(2);

    doc.text('Sincerely,');
    doc.moveDown(3);

    // Signature Section
    doc.fontSize(10).text('_______________________', { continued: true }).text('                    _______________________');
    doc.text('Authorized Signatory', { continued: true }).text('                    Employee Signature');
    doc.text('Narayan Enterprises', { continued: true }).text(`                    ${employee.name}`);

    doc.end();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Unable to generate offer letter' });
  }
});

// Helper function to convert number to words (simplified for Indian numbering)
function numberToWords(num) {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  if (num === 0) return 'Zero';
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '');
  if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' and ' + numberToWords(num % 100) : '');
  if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '');
  return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '');
}

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
