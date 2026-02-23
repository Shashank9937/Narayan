#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const rootDir = path.resolve(__dirname, '..');
const jsonPath = process.env.JSON_DB_PATH
  ? path.resolve(process.env.JSON_DB_PATH)
  : path.join(rootDir, 'data', 'db.json');
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('[migrate-json-to-postgres] DATABASE_URL is required');
  process.exit(1);
}

if (!fs.existsSync(jsonPath)) {
  console.error(`[migrate-json-to-postgres] JSON DB file not found: ${jsonPath}`);
  process.exit(1);
}

let sourceDb;
try {
  sourceDb = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (err) {
  console.error(`[migrate-json-to-postgres] Failed to parse JSON DB: ${err.message}`);
  process.exit(1);
}

const nowIso = new Date().toISOString();
const todayIso = nowIso.slice(0, 10);

function arr(value) {
  return Array.isArray(value) ? value : [];
}

function text(value, fallback = '') {
  if (value == null) return fallback;
  const out = String(value).trim();
  return out || fallback;
}

function num(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function bool(value, fallback = false) {
  if (value == null) return fallback;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off', ''].includes(normalized)) return false;
  return fallback;
}

function isoDate(value, fallback = null) {
  const out = String(value || '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : fallback;
}

function isoTs(value, fallback = nowIso) {
  const ts = new Date(value || fallback);
  if (Number.isNaN(ts.getTime())) return fallback;
  return ts.toISOString();
}

function normalizeParty(value) {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === 'narayan' || normalized === 'n') return 'narayan';
  if (['maa_vaishno', 'maa', 'vaishno', 'm'].includes(normalized)) return 'maa_vaishno';
  return null;
}

function normalizeGstNo(gstNo) {
  return String(gstNo || '')
    .toUpperCase()
    .replace(/\s+/g, '')
    .trim();
}

function uid(prefix, index) {
  return `${prefix}_migrated_${index + 1}`;
}

function safeItems(rawItems, fallbackGrandTotal) {
  const items = arr(rawItems)
    .map((item) => {
      const description = text(item?.description);
      const quantity = num(item?.quantity, 0);
      const rate = num(item?.rate, 0);
      const gstPercent = Math.max(0, num(item?.gstPercent, 0));
      if (!description || quantity <= 0 || rate < 0) return null;
      const taxableValue = quantity * rate;
      const gstAmount = (taxableValue * gstPercent) / 100;
      return {
        description,
        hsnSac: text(item?.hsnSac),
        unit: text(item?.unit, 'Nos'),
        quantity,
        rate,
        gstPercent,
        taxableValue,
        gstAmount,
        lineTotal: taxableValue + gstAmount
      };
    })
    .filter(Boolean);

  if (items.length) return items;

  const fallbackAmount = Math.max(0, num(fallbackGrandTotal, 0));
  return [
    {
      description: 'Migrated Bill Item',
      hsnSac: '',
      unit: 'Nos',
      quantity: 1,
      rate: fallbackAmount,
      gstPercent: 0,
      taxableValue: fallbackAmount,
      gstAmount: 0,
      lineTotal: fallbackAmount
    }
  ];
}

async function run() {
  const pool = new Pool({ connectionString: DATABASE_URL });
  const client = await pool.connect();

  const stats = {
    users: 0,
    sessions: 0,
    employees: 0,
    attendance: 0,
    salaryAdvances: 0,
    salaryLedgers: 0,
    salaryLedgerEntries: 0,
    trucks: 0,
    expenses: 0,
    investments: 0,
    chiniExpenses: 0,
    landRecords: 0,
    vehicles: 0,
    suppliers: 0,
    supplierTransactions: 0,
    billingCompanies: 0,
    bills: 0,
    skipped: 0
  };

  try {
    await client.query('BEGIN');

    const userIds = new Set();
    for (const [index, row] of arr(sourceDb.users).entries()) {
      const id = text(row?.id, uid('user', index));
      const username = text(row?.username, `user${index + 1}`);
      const passwordHash = text(row?.passwordHash) || bcrypt.hashSync(text(row?.password, 'changeme123'), 10);
      const role = ['admin', 'accountant', 'manager'].includes(text(row?.role)) ? text(row?.role) : 'manager';
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO users (id, username, password_hash, role, created_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id)
         DO UPDATE SET username = EXCLUDED.username,
                       password_hash = EXCLUDED.password_hash,
                       role = EXCLUDED.role`,
        [id, username, passwordHash, role, createdAt]
      );
      userIds.add(id);
      stats.users += 1;
    }

    for (const row of arr(sourceDb.sessions)) {
      const token = text(row?.token);
      const userId = text(row?.userId);
      if (!token || !userId || !userIds.has(userId)) {
        stats.skipped += 1;
        continue;
      }
      const createdAt = isoTs(row?.createdAt, nowIso);
      const expiresAt = isoTs(row?.expiresAt, nowIso);

      await client.query(
        `INSERT INTO sessions (token, user_id, created_at, expires_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (token)
         DO UPDATE SET user_id = EXCLUDED.user_id,
                       created_at = EXCLUDED.created_at,
                       expires_at = EXCLUDED.expires_at`,
        [token, userId, createdAt, expiresAt]
      );
      stats.sessions += 1;
    }

    const employeeIds = new Set();
    for (const [index, row] of arr(sourceDb.employees).entries()) {
      const id = text(row?.id, uid('emp', index));
      const name = text(row?.name, `Employee ${index + 1}`);
      const role = text(row?.role, 'Worker');
      const monthlySalary = Math.max(0, num(row?.monthlySalary, 0));
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = row?.updatedAt ? isoTs(row?.updatedAt, createdAt) : null;
      const joiningDate =
        isoDate(row?.joiningDate) ||
        isoDate(row?.createdAt) ||
        todayIso;
      const active = row?.active == null ? true : bool(row?.active, true);

      await client.query(
        `INSERT INTO employees (id, name, role, monthly_salary, joining_date, active, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id)
         DO UPDATE SET name = EXCLUDED.name,
                       role = EXCLUDED.role,
                       monthly_salary = EXCLUDED.monthly_salary,
                       joining_date = EXCLUDED.joining_date,
                       active = EXCLUDED.active,
                       updated_at = EXCLUDED.updated_at`,
        [id, name, role, monthlySalary, joiningDate, active, createdAt, updatedAt]
      );
      employeeIds.add(id);
      stats.employees += 1;
    }

    for (const [index, row] of arr(sourceDb.attendance).entries()) {
      const employeeId = text(row?.employeeId);
      const date = isoDate(row?.date);
      if (!employeeId || !date || !employeeIds.has(employeeId)) {
        stats.skipped += 1;
        continue;
      }
      const id = text(row?.id, uid('att', index));
      const status = text(row?.status, 'present').toLowerCase() === 'absent' ? 'absent' : 'present';
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = row?.updatedAt ? isoTs(row?.updatedAt, createdAt) : null;

      await client.query(
        `INSERT INTO attendance (id, employee_id, date, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (employee_id, date)
         DO UPDATE SET status = EXCLUDED.status,
                       updated_at = EXCLUDED.updated_at`,
        [id, employeeId, date, status, createdAt, updatedAt]
      );
      stats.attendance += 1;
    }

    for (const [index, row] of arr(sourceDb.salaryAdvances).entries()) {
      const employeeId = text(row?.employeeId);
      const date = isoDate(row?.date);
      if (!employeeId || !date || !employeeIds.has(employeeId)) {
        stats.skipped += 1;
        continue;
      }
      const id = text(row?.id, uid('adv', index));
      const amount = Math.max(0, num(row?.amount, 0));
      const note = text(row?.note);
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO salary_advances (id, employee_id, date, amount, note, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id)
         DO UPDATE SET employee_id = EXCLUDED.employee_id,
                       date = EXCLUDED.date,
                       amount = EXCLUDED.amount,
                       note = EXCLUDED.note`,
        [id, employeeId, date, amount, note || null, createdAt]
      );
      stats.salaryAdvances += 1;
    }

    for (const [index, row] of arr(sourceDb.salaryLedgers).entries()) {
      const employeeId = text(row?.employeeId);
      if (!employeeId || !employeeIds.has(employeeId)) {
        stats.skipped += 1;
        continue;
      }

      const id = text(row?.id, uid('sld', index));
      const totalSalary = Math.max(0, num(row?.totalToGive ?? row?.totalSalary, 0));
      const amountGiven = Math.max(0, num(row?.totalPaid ?? row?.amountGiven, 0));
      const note = text(row?.note);
      const period1ToGive = Math.max(0, num(row?.period1ToGive, totalSalary));
      const period1Paid = Math.max(0, num(row?.period1Paid, amountGiven));
      const period2ToGive = Math.max(0, num(row?.period2ToGive, 0));
      const period2Paid = Math.max(0, num(row?.period2Paid, 0));
      const monthlySalaryAppliedRaw = num(row?.monthlySalaryApplied, 0);
      const monthlySalaryApplied = monthlySalaryAppliedRaw > 0 ? monthlySalaryAppliedRaw : null;
      const durationStart = isoDate(row?.durationStart || row?.sessionFrom || row?.fromDate);
      const durationEnd = isoDate(row?.durationEnd || row?.sessionTo || row?.toDate);
      const durationDaysRaw = Math.trunc(num(row?.durationDays, 0));
      const durationDays = durationDaysRaw > 0 ? durationDaysRaw : null;
      const durationMonthsRaw = num(row?.durationMonths, 0);
      const durationMonths = durationMonthsRaw > 0 ? durationMonthsRaw : null;
      const openingPending = Math.max(0, num(row?.openingPending, 0));
      const periodSalary = Math.max(0, num(row?.periodSalary, 0));
      const salaryGeneratedBefore = Math.max(0, num(row?.salaryGeneratedBefore, 0));
      const paidBefore = Math.max(0, num(row?.paidBefore, 0));
      const paidForPrevious = Math.max(0, num(row?.paidForPrevious, 0));
      const paidForCurrent = Math.max(0, num(row?.paidForCurrent, 0));
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = isoTs(row?.updatedAt, createdAt);

      await client.query(
        `INSERT INTO salary_ledgers (
            id,
            employee_id,
            total_salary,
            amount_given,
            note,
            period1_to_give,
            period1_paid,
            period2_to_give,
            period2_paid,
            monthly_salary_applied,
            duration_start,
            duration_end,
            duration_days,
            duration_months,
            opening_pending,
            period_salary,
            salary_generated_before,
            paid_before,
            paid_for_previous,
            paid_for_current,
            created_at,
            updated_at
          )
         VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9,
            $10, $11, $12, $13, $14, $15, $16,
            $17, $18, $19, $20, $21, $22
          )
         ON CONFLICT (employee_id)
         DO UPDATE SET total_salary = EXCLUDED.total_salary,
                       amount_given = EXCLUDED.amount_given,
                       note = EXCLUDED.note,
                       period1_to_give = EXCLUDED.period1_to_give,
                       period1_paid = EXCLUDED.period1_paid,
                       period2_to_give = EXCLUDED.period2_to_give,
                       period2_paid = EXCLUDED.period2_paid,
                       monthly_salary_applied = EXCLUDED.monthly_salary_applied,
                       duration_start = EXCLUDED.duration_start,
                       duration_end = EXCLUDED.duration_end,
                       duration_days = EXCLUDED.duration_days,
                       duration_months = EXCLUDED.duration_months,
                       opening_pending = EXCLUDED.opening_pending,
                       period_salary = EXCLUDED.period_salary,
                       salary_generated_before = EXCLUDED.salary_generated_before,
                       paid_before = EXCLUDED.paid_before,
                       paid_for_previous = EXCLUDED.paid_for_previous,
                       paid_for_current = EXCLUDED.paid_for_current,
                       updated_at = EXCLUDED.updated_at`,
        [
          id,
          employeeId,
          totalSalary,
          amountGiven,
          note || null,
          period1ToGive,
          period1Paid,
          period2ToGive,
          period2Paid,
          monthlySalaryApplied,
          durationStart,
          durationEnd,
          durationDays,
          durationMonths,
          openingPending,
          periodSalary,
          salaryGeneratedBefore,
          paidBefore,
          paidForPrevious,
          paidForCurrent,
          createdAt,
          updatedAt
        ]
      );
      stats.salaryLedgers += 1;
    }

    for (const [index, row] of arr(sourceDb.salaryLedgerEntries).entries()) {
      const employeeId = text(row?.employeeId);
      const date = isoDate(row?.date);
      if (!employeeId || !date || !employeeIds.has(employeeId)) {
        stats.skipped += 1;
        continue;
      }

      const id = text(row?.id, uid('slde', index));
      const particulars = text(row?.particulars, `Entry ${index + 1}`);
      const voucherType = text(row?.voucherType, 'Manual');
      const voucherNo = text(row?.voucherNo);
      const debit = Math.max(0, num(row?.debit, 0));
      const credit = Math.max(0, num(row?.credit, 0));
      const note = text(row?.note);
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = isoTs(row?.updatedAt, createdAt);

      await client.query(
        `INSERT INTO salary_ledger_entries (
            id,
            employee_id,
            date,
            particulars,
            voucher_type,
            voucher_no,
            debit,
            credit,
            note,
            created_at,
            updated_at
          )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id)
         DO UPDATE SET employee_id = EXCLUDED.employee_id,
                       date = EXCLUDED.date,
                       particulars = EXCLUDED.particulars,
                       voucher_type = EXCLUDED.voucher_type,
                       voucher_no = EXCLUDED.voucher_no,
                       debit = EXCLUDED.debit,
                       credit = EXCLUDED.credit,
                       note = EXCLUDED.note,
                       updated_at = EXCLUDED.updated_at`,
        [
          id,
          employeeId,
          date,
          particulars,
          voucherType,
          voucherNo || null,
          debit,
          credit,
          note || null,
          createdAt,
          updatedAt
        ]
      );
      stats.salaryLedgerEntries += 1;
    }

    for (const [index, row] of arr(sourceDb.trucks).entries()) {
      const id = text(row?.id, uid('trk', index));
      const date = isoDate(row?.date, todayIso);
      const truckNumber = text(row?.truckNumber || row?.vehicleNo, `TRUCK-${index + 1}`);
      const rawMaterial = text(row?.rawMaterial, 'Pellet');
      const quantity = Math.max(0, num(row?.quantity, 0));
      const pricePerQuintalRaw = num(row?.pricePerQuintal, NaN);
      const pricePerQuintal = Number.isFinite(pricePerQuintalRaw) ? pricePerQuintalRaw : null;
      const totalAmountRaw = num(row?.totalAmount, NaN);
      const totalAmount = Number.isFinite(totalAmountRaw)
        ? totalAmountRaw
        : pricePerQuintal != null
          ? pricePerQuintal * quantity
          : null;
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO trucks (
            id, date, truck_number, driver_name, raw_material, client, quantity,
            price_per_quintal, total_amount, marked, party, origin, destination, notes, created_at
          )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         ON CONFLICT (id)
         DO UPDATE SET date = EXCLUDED.date,
                       truck_number = EXCLUDED.truck_number,
                       driver_name = EXCLUDED.driver_name,
                       raw_material = EXCLUDED.raw_material,
                       client = EXCLUDED.client,
                       quantity = EXCLUDED.quantity,
                       price_per_quintal = EXCLUDED.price_per_quintal,
                       total_amount = EXCLUDED.total_amount,
                       marked = EXCLUDED.marked,
                       party = EXCLUDED.party,
                       origin = EXCLUDED.origin,
                       destination = EXCLUDED.destination,
                       notes = EXCLUDED.notes`,
        [
          id,
          date,
          truckNumber,
          text(row?.driverName) || null,
          rawMaterial,
          text(row?.client) || null,
          quantity,
          pricePerQuintal,
          totalAmount,
          bool(row?.marked, false),
          normalizeParty(row?.party),
          text(row?.origin) || null,
          text(row?.destination) || null,
          text(row?.notes) || null,
          createdAt
        ]
      );
      stats.trucks += 1;
    }

    for (const [index, row] of arr(sourceDb.expenses).entries()) {
      const id = text(row?.id, uid('exp', index));
      const date = isoDate(row?.date, todayIso);
      const description = text(row?.description, `Expense ${index + 1}`);
      const amount = Math.max(0, num(row?.amount, 0));
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO expenses (id, date, party, description, amount, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id)
         DO UPDATE SET date = EXCLUDED.date,
                       party = EXCLUDED.party,
                       description = EXCLUDED.description,
                       amount = EXCLUDED.amount`,
        [id, date, normalizeParty(row?.party), description, amount, createdAt]
      );
      stats.expenses += 1;
    }

    for (const [index, row] of arr(sourceDb.investments).entries()) {
      const id = text(row?.id, uid('inv', index));
      const date = isoDate(row?.date, todayIso);
      const party = normalizeParty(row?.party) || 'narayan';
      const amount = Math.max(0, num(row?.amount, 0));
      const note = text(row?.note);
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO investments (id, date, party, amount, note, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id)
         DO UPDATE SET date = EXCLUDED.date,
                       party = EXCLUDED.party,
                       amount = EXCLUDED.amount,
                       note = EXCLUDED.note`,
        [id, date, party, amount, note || null, createdAt]
      );
      stats.investments += 1;
    }

    for (const [index, row] of arr(sourceDb.chiniExpenses).entries()) {
      const id = text(row?.id, uid('chi', index));
      const date = isoDate(row?.date, todayIso);
      const party = normalizeParty(row?.party) || 'narayan';
      const description = text(row?.description, `Chini Expense ${index + 1}`);
      const amount = Math.max(0, num(row?.amount, 0));
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO chini_expenses (id, date, party, description, amount, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id)
         DO UPDATE SET date = EXCLUDED.date,
                       party = EXCLUDED.party,
                       description = EXCLUDED.description,
                       amount = EXCLUDED.amount`,
        [id, date, party, description, amount, createdAt]
      );
      stats.chiniExpenses += 1;
    }

    for (const [index, row] of arr(sourceDb.landRecords).entries()) {
      const id = text(row?.id, uid('land', index));
      const area = text(row?.area, `Area ${index + 1}`);
      const ownerName = text(row?.ownerName, 'Unknown');
      const amountPaid = Math.max(0, num(row?.amountPaid, 0));
      const amountToBeGiven = Math.max(0, num(row?.amountToBeGiven, 0));
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO land_records (id, area, owner_name, amount_paid, amount_to_be_given, created_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id)
         DO UPDATE SET area = EXCLUDED.area,
                       owner_name = EXCLUDED.owner_name,
                       amount_paid = EXCLUDED.amount_paid,
                       amount_to_be_given = EXCLUDED.amount_to_be_given`,
        [id, area, ownerName, amountPaid, amountToBeGiven, createdAt]
      );
      stats.landRecords += 1;
    }

    for (const [index, row] of arr(sourceDb.vehicles).entries()) {
      const id = text(row?.id, uid('veh', index));
      const vehicleName = text(row?.vehicleName, `Vehicle ${index + 1}`);
      const vehicleNumber = text(row?.vehicleNumber, `VH-${index + 1}`);
      const monthlyPrice = Math.max(0, num(row?.monthlyPrice, 0));
      const serviceDueDate = isoDate(row?.serviceDueDate);
      const lastServiceDate = isoDate(row?.lastServiceDate);
      const paymentStatus = ['pending', 'partial', 'paid'].includes(text(row?.paymentStatus).toLowerCase())
        ? text(row?.paymentStatus).toLowerCase()
        : 'pending';
      const amountPaid = Math.max(0, num(row?.amountPaid, 0));
      const note = text(row?.note);
      const createdAt = isoTs(row?.createdAt, nowIso);

      await client.query(
        `INSERT INTO vehicles (
            id, vehicle_name, vehicle_number, monthly_price, service_due_date,
            last_service_date, payment_status, amount_paid, note, created_at
          )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id)
         DO UPDATE SET vehicle_name = EXCLUDED.vehicle_name,
                       vehicle_number = EXCLUDED.vehicle_number,
                       monthly_price = EXCLUDED.monthly_price,
                       service_due_date = EXCLUDED.service_due_date,
                       last_service_date = EXCLUDED.last_service_date,
                       payment_status = EXCLUDED.payment_status,
                       amount_paid = EXCLUDED.amount_paid,
                       note = EXCLUDED.note`,
        [
          id,
          vehicleName,
          vehicleNumber,
          monthlyPrice,
          serviceDueDate,
          lastServiceDate,
          paymentStatus,
          amountPaid,
          note || null,
          createdAt
        ]
      );
      stats.vehicles += 1;
    }

    const supplierIds = new Set();
    for (const [index, row] of arr(sourceDb.suppliers).entries()) {
      const id = text(row?.id, uid('sup', index));
      const name = text(row?.name, `Supplier ${index + 1}`);
      const phone = text(row?.phone || row?.contact);
      const contact = text(row?.contact || row?.phone, `supplier-${id}`);
      const alternatePhone = text(row?.alternatePhone);
      const email = text(row?.email);
      const gstNo = normalizeGstNo(row?.gstNo);
      const address = text(row?.address);
      const materialType = text(row?.materialType);
      const paymentTerms = text(row?.paymentTerms);
      const openingBalance = num(row?.openingBalance, 0);
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = row?.updatedAt ? isoTs(row?.updatedAt, createdAt) : null;

      await client.query(
        `INSERT INTO suppliers (
            id, name, contact, phone, alternate_phone, email,
            gst_no, address, material_type, payment_terms,
            opening_balance, created_at, updated_at
          )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         ON CONFLICT (id)
         DO UPDATE SET name = EXCLUDED.name,
                       contact = EXCLUDED.contact,
                       phone = EXCLUDED.phone,
                       alternate_phone = EXCLUDED.alternate_phone,
                       email = EXCLUDED.email,
                       gst_no = EXCLUDED.gst_no,
                       address = EXCLUDED.address,
                       material_type = EXCLUDED.material_type,
                       payment_terms = EXCLUDED.payment_terms,
                       opening_balance = EXCLUDED.opening_balance,
                       updated_at = EXCLUDED.updated_at`,
        [
          id,
          name,
          contact,
          phone || null,
          alternatePhone || null,
          email || null,
          gstNo || null,
          address || null,
          materialType || null,
          paymentTerms || null,
          openingBalance,
          createdAt,
          updatedAt
        ]
      );
      supplierIds.add(id);
      stats.suppliers += 1;
    }

    for (const [index, row] of arr(sourceDb.supplierTransactions).entries()) {
      const supplierId = text(row?.supplierId);
      if (!supplierId || !supplierIds.has(supplierId)) {
        stats.skipped += 1;
        continue;
      }
      const id = text(row?.id, uid('stx', index));
      const date = isoDate(row?.date, todayIso);
      const rawType = text(row?.type).toLowerCase();
      const type = rawType === 'payment' ? 'payment' : 'truck';
      const amount = Math.max(0, num(row?.amount, 0));
      const trolleyRaw = Math.trunc(num(row?.trolleyCount, NaN));
      const trolleyCount = Number.isFinite(trolleyRaw) && trolleyRaw >= 0 ? trolleyRaw : null;
      const quantityRaw = num(row?.quantity, NaN);
      const quantity = Number.isFinite(quantityRaw) ? quantityRaw : null;
      const rateRaw = num(row?.rate, NaN);
      const rate = Number.isFinite(rateRaw) ? rateRaw : null;
      const paidNowRaw = num(row?.paidNow, NaN);
      const paidNow = Number.isFinite(paidNowRaw) ? Math.max(0, paidNowRaw) : 0;
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = row?.updatedAt ? isoTs(row?.updatedAt, createdAt) : null;

      await client.query(
        `INSERT INTO supplier_transactions (
            id, supplier_id, date, type, amount, truck_number, challan_no,
            material, trolley_count, quantity, rate, paid_now, payment_mode,
            payment_ref, note, linked_transaction_id, is_auto_payment, created_at, updated_at
          )
         VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11, $12, $13,
            $14, $15, $16, $17, $18, $19
          )
         ON CONFLICT (id)
         DO UPDATE SET supplier_id = EXCLUDED.supplier_id,
                       date = EXCLUDED.date,
                       type = EXCLUDED.type,
                       amount = EXCLUDED.amount,
                       truck_number = EXCLUDED.truck_number,
                       challan_no = EXCLUDED.challan_no,
                       material = EXCLUDED.material,
                       trolley_count = EXCLUDED.trolley_count,
                       quantity = EXCLUDED.quantity,
                       rate = EXCLUDED.rate,
                       paid_now = EXCLUDED.paid_now,
                       payment_mode = EXCLUDED.payment_mode,
                       payment_ref = EXCLUDED.payment_ref,
                       note = EXCLUDED.note,
                       linked_transaction_id = EXCLUDED.linked_transaction_id,
                       is_auto_payment = EXCLUDED.is_auto_payment,
                       updated_at = EXCLUDED.updated_at`,
        [
          id,
          supplierId,
          date,
          type,
          amount,
          text(row?.truckNumber) || null,
          text(row?.challanNo) || null,
          text(row?.material) || null,
          trolleyCount,
          quantity,
          rate,
          paidNow,
          text(row?.paymentMode) || null,
          text(row?.paymentRef) || null,
          text(row?.note) || null,
          text(row?.linkedTransactionId) || null,
          bool(row?.isAutoPayment, false),
          createdAt,
          updatedAt
        ]
      );
      stats.supplierTransactions += 1;
    }

    for (const [index, row] of arr(sourceDb.billingCompanies).entries()) {
      const gstNo = normalizeGstNo(row?.gstNo);
      if (!gstNo) {
        stats.skipped += 1;
        continue;
      }
      const id = `billco_${gstNo}`;
      const companyName = text(row?.companyName, `Company ${index + 1}`);
      const address = text(row?.address, 'Address not provided');
      const state = text(row?.state);
      const stateCode = text(row?.stateCode);
      const contactPerson = text(row?.contactPerson);
      const phone = text(row?.phone);
      const email = text(row?.email);
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = isoTs(row?.updatedAt, createdAt);

      await client.query(
        `INSERT INTO billing_companies (
            id, gst_no, company_name, address, state, state_code,
            contact_person, phone, email, created_at, updated_at
          )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (gst_no)
         DO UPDATE SET company_name = EXCLUDED.company_name,
                       address = EXCLUDED.address,
                       state = EXCLUDED.state,
                       state_code = EXCLUDED.state_code,
                       contact_person = EXCLUDED.contact_person,
                       phone = EXCLUDED.phone,
                       email = EXCLUDED.email,
                       updated_at = EXCLUDED.updated_at`,
        [
          id,
          gstNo,
          companyName,
          address,
          state || null,
          stateCode || null,
          contactPerson || null,
          phone || null,
          email || null,
          createdAt,
          updatedAt
        ]
      );
      stats.billingCompanies += 1;
    }

    for (const [index, row] of arr(sourceDb.bills).entries()) {
      const company = row?.company || {};
      const id = text(row?.id, uid('bill', index));
      const invoiceNo = text(row?.invoiceNo, `INV-${index + 1}`);
      const billDate = isoDate(row?.billDate || row?.date, todayIso);
      const dueDate = isoDate(row?.dueDate);
      const companyGstNo = normalizeGstNo(row?.companyGstNo || company?.gstNo) || 'NA';
      const companyName = text(row?.companyName || company?.companyName, 'Unknown Company');
      const companyAddress = text(row?.companyAddress || company?.address, 'Address not provided');
      const companyState = text(row?.companyState || company?.state);
      const companyStateCode = text(row?.companyStateCode || company?.stateCode);
      const contactPerson = text(row?.contactPerson || company?.contactPerson);
      const companyPhone = text(row?.companyPhone || company?.phone);
      const companyEmail = text(row?.companyEmail || company?.email);
      const placeOfSupply = text(row?.placeOfSupply);
      const reverseCharge = bool(row?.reverseCharge, false);

      const items = safeItems(row?.items, row?.grandTotal);
      const subtotalFromItems = items.reduce((sum, item) => sum + num(item.taxableValue, 0), 0);
      const totalGstFromItems = items.reduce((sum, item) => sum + num(item.gstAmount, 0), 0);
      const subtotal = num(row?.subtotal, subtotalFromItems);
      const totalGst = num(row?.totalGst, totalGstFromItems);
      const grandTotal = num(row?.grandTotal, subtotal + totalGst);

      const notes = text(row?.notes);
      const createdAt = isoTs(row?.createdAt, nowIso);
      const updatedAt = isoTs(row?.updatedAt, createdAt);

      await client.query(
        `INSERT INTO bills (
            id, invoice_no, bill_date, due_date, vehicle_no,
            company_gst_no, company_name, company_address,
            company_state, company_state_code, contact_person,
            company_phone, company_email, place_of_supply, reverse_charge,
            items, subtotal, total_gst, grand_total, notes, created_at, updated_at
          )
         VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8,
            $9, $10, $11,
            $12, $13, $14, $15,
            $16::jsonb, $17, $18, $19, $20, $21, $22
          )
         ON CONFLICT (id)
         DO UPDATE SET invoice_no = EXCLUDED.invoice_no,
                       bill_date = EXCLUDED.bill_date,
                       due_date = EXCLUDED.due_date,
                       vehicle_no = EXCLUDED.vehicle_no,
                       company_gst_no = EXCLUDED.company_gst_no,
                       company_name = EXCLUDED.company_name,
                       company_address = EXCLUDED.company_address,
                       company_state = EXCLUDED.company_state,
                       company_state_code = EXCLUDED.company_state_code,
                       contact_person = EXCLUDED.contact_person,
                       company_phone = EXCLUDED.company_phone,
                       company_email = EXCLUDED.company_email,
                       place_of_supply = EXCLUDED.place_of_supply,
                       reverse_charge = EXCLUDED.reverse_charge,
                       items = EXCLUDED.items,
                       subtotal = EXCLUDED.subtotal,
                       total_gst = EXCLUDED.total_gst,
                       grand_total = EXCLUDED.grand_total,
                       notes = EXCLUDED.notes,
                       updated_at = EXCLUDED.updated_at`,
        [
          id,
          invoiceNo,
          billDate,
          dueDate,
          text(row?.vehicleNo) || null,
          companyGstNo,
          companyName,
          companyAddress,
          companyState || null,
          companyStateCode || null,
          contactPerson || null,
          companyPhone || null,
          companyEmail || null,
          placeOfSupply || null,
          reverseCharge,
          JSON.stringify(items),
          subtotal,
          totalGst,
          grandTotal,
          notes || null,
          createdAt,
          updatedAt
        ]
      );
      stats.bills += 1;
    }

    await client.query('COMMIT');

    console.log('[migrate-json-to-postgres] Migration complete.');
    Object.entries(stats).forEach(([key, value]) => {
      console.log(`- ${key}: ${value}`);
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[migrate-json-to-postgres] Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((err) => {
  console.error('[migrate-json-to-postgres] Fatal error:', err.message);
  process.exit(1);
});
