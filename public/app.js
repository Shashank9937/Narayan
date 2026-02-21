const cardsEl = document.getElementById('cards');
const employeeGrid = document.getElementById('employeeGrid');
const salaryTbody = document.querySelector('#salaryTable tbody');
const salaryLedgerTbody = document.querySelector('#salaryLedgerTable tbody');
const truckNarayanTbody = document.querySelector('#truckTableNarayan tbody');
const truckMaaVaishnoTbody = document.querySelector('#truckTableMaaVaishno tbody');
const expenseNarayanTbody = document.querySelector('#expenseTableNarayan tbody');
const expenseMaaVaishnoTbody = document.querySelector('#expenseTableMaaVaishno tbody');
const expenseSalaryGivenTbody = document.querySelector('#expenseSalaryGivenTable tbody');
const investmentTbody = document.querySelector('#investmentTable tbody');
const chiniTbody = document.querySelector('#chiniTable tbody');
const landTbody = document.querySelector('#landTable tbody');
const vehicleTbody = document.querySelector('#vehicleTable tbody');
const attendanceReportTbody = document.querySelector('#attendanceReportTable tbody');
const supplierGrid = document.getElementById('supplierGrid');
const supplierTxTbody = document.querySelector('#supplierTxTable tbody');
const supplierListPanel = document.getElementById('supplierListPanel');
const supplierDetailPanel = document.getElementById('supplierDetailPanel');
const supplierDetailName = document.getElementById('supplierDetailName');
const backToSuppliersBtn = document.getElementById('backToSuppliersBtn');
const supTotalMaterialEl = document.getElementById('supTotalMaterial');
const supTotalPaidEl = document.getElementById('supTotalPaid');
const supTotalToGiveEl = document.getElementById('supTotalToGive');
const supPendingBalanceEl = document.getElementById('supPendingBalance');
const supplierForm = document.getElementById('supplierForm');
const txSupplierIdInput = document.getElementById('txSupplierId');
const txTypeSelect = document.getElementById('txType');
const txTruckFields = document.getElementById('txTruckFields');
const supplierTransactionForm = document.getElementById('supplierTransactionForm');
const txAmountInput = supplierTransactionForm?.querySelector('input[name="amount"]');
const txTrolleyInput = supplierTransactionForm?.querySelector('input[name="trolleyCount"]');
const txQuantityInput = supplierTransactionForm?.querySelector('input[name="quantity"]');
const txRateInput = supplierTransactionForm?.querySelector('input[name="rate"]');
const txPaidNowInput = document.getElementById('txPaidNow');
const billForm = document.getElementById('billForm');
const billItemsTbody = document.getElementById('billItemsTbody');
const addBillItemBtn = document.getElementById('addBillItemBtn');
const billGstLookupBtn = document.getElementById('billGstLookupBtn');
const billCompanyGstNoInput = document.getElementById('billCompanyGstNo');
const billCompanyNameInput = document.getElementById('billCompanyName');
const billCompanyAddressInput = document.getElementById('billCompanyAddress');
const billCompanyStateInput = document.getElementById('billCompanyState');
const billCompanyStateCodeInput = document.getElementById('billCompanyStateCode');
const billCompanyContactInput = document.getElementById('billCompanyContact');
const billCompanyPhoneInput = document.getElementById('billCompanyPhone');
const billCompanyEmailInput = document.getElementById('billCompanyEmail');
const billSubtotalEl = document.getElementById('billSubtotal');
const billTotalGstEl = document.getElementById('billTotalGst');
const billGrandTotalEl = document.getElementById('billGrandTotal');
const billTbody = document.querySelector('#billTable tbody');
const billCompanyTbody = document.querySelector('#billCompanyTable tbody');
const billSearchInput = document.getElementById('billSearchInput');
const billSubmitBtn = document.getElementById('billSubmitBtn');
const cancelBillEditBtn = document.getElementById('cancelBillEditBtn');
const truckPelletTotalEl = document.getElementById('truckPelletTotal');
const truckBriquetteTotalEl = document.getElementById('truckBriquetteTotal');
const truckPelletRevenueEl = document.getElementById('truckPelletRevenue');
const truckPelletRevenueNarayanEl = document.getElementById('truckPelletRevenueNarayan');
const truckPelletRevenueMaaVaishnoEl = document.getElementById('truckPelletRevenueMaaVaishno');
const truckBriquetteRevenueEl = document.getElementById('truckBriquetteRevenue');
const truckBriquetteRevenueNarayanEl = document.getElementById('truckBriquetteRevenueNarayan');
const truckBriquetteRevenueMaaVaishnoEl = document.getElementById('truckBriquetteRevenueMaaVaishno');

const attendanceEmployeeEl = document.getElementById('attendanceEmployee');
const advanceEmployeeEl = document.getElementById('advanceEmployee');

const loginPanel = document.getElementById('loginPanel');
const appContent = document.getElementById('appContent');
const sessionBar = document.getElementById('sessionBar');
const userMeta = document.getElementById('userMeta');
const sectionNav = document.getElementById('sectionNav');
const toastEl = document.getElementById('toast');

const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const employeeForm = document.getElementById('employeeForm');
const attendanceForm = document.getElementById('attendanceForm');
const advanceForm = document.getElementById('advanceForm');
const salaryLedgerForm = document.getElementById('salaryLedgerForm');
const truckForm = document.getElementById('truckForm');
const expenseForm = document.getElementById('expenseForm');
const expenseCancelEditBtn = document.getElementById('expenseCancelEditBtn');
const investmentForm = document.getElementById('investmentForm');
const chiniForm = document.getElementById('chiniForm');
const landForm = document.getElementById('landForm');
const vehicleForm = document.getElementById('vehicleForm');
const changePasswordForm = document.getElementById('changePasswordForm');

const downloadSalaryCsvBtn = document.getElementById('downloadSalaryCsv');
const downloadTruckCsvBtn = document.getElementById('downloadTruckCsv');
const downloadTruckPdfBtn = document.getElementById('downloadTruckPdf');
const downloadAttendanceCsvBtn = document.getElementById('downloadAttendanceCsv');
const refreshAttendanceReportBtn = document.getElementById('refreshAttendanceReport');
const attendanceMonthInput = document.getElementById('attendanceMonthInput');
const employeeSearchInput = document.getElementById('employeeSearchInput');
const truckSearchInput = document.getElementById('truckSearchInput');
const salaryEmployeeSelect = document.getElementById('salaryEmployeeSelect');
const salaryMonthInput = document.getElementById('salaryMonthInput');
const salaryLedgerEmployeeSelect = document.getElementById('salaryLedgerEmployee');
const salaryLedgerSearchInput = document.getElementById('salaryLedgerSearchInput');
const salaryLedgerAutoFillBtn = document.getElementById('salaryLedgerAutoFillBtn');
const salaryLedgerResetBtn = document.getElementById('salaryLedgerResetBtn');
const salaryEmployeeSummaryEl = document.getElementById('salaryEmployeeSummary');
const salaryOverallSummaryEl = document.getElementById('salaryOverallSummary');
const brandLink = document.getElementById('brandLink');
const darkModeToggle = document.getElementById('darkModeToggle');
const lastRefreshedWrap = document.getElementById('lastRefreshedWrap');
const lastRefreshedEl = document.getElementById('lastRefreshed');
const manualRefreshBtn = document.getElementById('manualRefreshBtn');
const expenseDateFromInput = document.getElementById('expenseDateFrom');
const expenseDateToInput = document.getElementById('expenseDateTo');
const expenseSearchInput = document.getElementById('expenseSearchInput');
const expenseFilterBtn = document.getElementById('expenseFilterBtn');
const expenseClearBtn = document.getElementById('expenseClearBtn');

let me = null;
let employeesCache = [];
let trucksCache = [];
let expensesCache = [];
let investmentsCache = [];
let chiniExpensesCache = [];
let landRecordsCache = [];
let vehiclesCache = [];
let suppliersCache = [];
let billingCompaniesCache = [];
let billsCache = [];
let activeSupplierId = null;
let salaryRowsCache = [];
let salaryLedgersCache = [];
let autoRefreshTimer = null;
let expenseFilter = { dateFrom: '', dateTo: '', description: '' };
let editingTruckId = null;
let editingExpenseId = null;
let editingLandId = null;
let activeSalaryMonth = monthISO();
let billItemsState = [];
let editingBillId = null;
let refreshInFlight = null;
let lastRefreshErrorToastAt = 0;
const LEDGER_FIXED_START = '2025-07-15';
const LEDGER_FIXED_END = '2026-01-31';
const LEDGER_LIVE_START = '2026-02-01';

function showToast(message, type = 'ok') {
  toastEl.textContent = message;
  toastEl.classList.remove('error');
  if (type === 'error') toastEl.classList.add('error');
  toastEl.classList.add('show');
  clearTimeout(showToast.tid);
  showToast.tid = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

function token() {
  return localStorage.getItem('ops_token');
}

function setToken(value) {
  if (!value) localStorage.removeItem('ops_token');
  else localStorage.setItem('ops_token', value);
}

function initDarkMode() {
  const isDark = localStorage.getItem('ops_dark') === '1';
  document.body.classList.toggle('dark-mode', isDark);
  darkModeToggle.textContent = isDark ? '☀' : '🌙';
}

function formatLastRefreshed() {
  return new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function monthISO() {
  return new Date().toISOString().slice(0, 7);
}

function round2(value) {
  return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
}

function toNumber(value, fallback = 0) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : fallback;
}

function parseIsoDate(value) {
  const text = String(value || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const [year, month, day] = text.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function overlapDays(startA, endA, startB, endB) {
  if (!startA || !endA || !startB || !endB) return 0;
  const start = startA > startB ? startA : startB;
  const end = endA < endB ? endA : endB;
  if (start > end) return 0;
  return Math.floor((end - start) / 86400000) + 1;
}

function estimateSalaryForDateRange(employee, rangeStartIso, rangeEndIso) {
  const monthlySalary = Number(employee?.monthlySalary || 0);
  if (!employee || monthlySalary <= 0) return 0;
  const rangeStart = parseIsoDate(rangeStartIso);
  const rangeEnd = parseIsoDate(rangeEndIso);
  if (!rangeStart || !rangeEnd || rangeStart > rangeEnd) return 0;
  const joiningDate = parseIsoDate(employee.joiningDate || employee.createdAt || rangeStartIso) || rangeStart;
  const effectiveStart = joiningDate > rangeStart ? joiningDate : rangeStart;
  if (effectiveStart > rangeEnd) return 0;

  let total = 0;
  let cursor = new Date(Date.UTC(effectiveStart.getUTCFullYear(), effectiveStart.getUTCMonth(), 1));
  while (cursor <= rangeEnd) {
    const year = cursor.getUTCFullYear();
    const month = cursor.getUTCMonth();
    const monthStart = new Date(Date.UTC(year, month, 1));
    const monthEnd = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = monthEnd.getUTCDate();
    const activeDays = overlapDays(effectiveStart, rangeEnd, monthStart, monthEnd);
    if (activeDays > 0) {
      total += (monthlySalary / daysInMonth) * activeDays;
    }
    cursor = new Date(Date.UTC(year, month + 1, 1));
  }
  return round2(total);
}

function estimateLedgerFixedToGive(employee) {
  return estimateSalaryForDateRange(employee, LEDGER_FIXED_START, LEDGER_FIXED_END);
}

function estimateLedgerLiveToGive(employee) {
  return estimateSalaryForDateRange(employee, LEDGER_LIVE_START, todayISO());
}

function findEmployeeById(employeeId) {
  return employeesCache.find((e) => String(e.id) === String(employeeId));
}

function hasFixedSectionValues(row) {
  return ['period1ToGive', 'period1Paid'].some((key) => {
    const value = row?.[key];
    return value != null && Number(value) !== 0;
  });
}

function normalizeLedgerRow(row) {
  const employee = findEmployeeById(row?.employeeId);
  const baseTotalToGive = Math.max(0, toNumber(row?.totalToGive ?? row?.totalSalary, 0));
  const baseTotalPaid = Math.max(0, toNumber(row?.totalPaid ?? row?.amountGiven, 0));
  const period2ToGive = round2(Math.max(0, estimateLedgerLiveToGive(employee)));
  const period2Paid = round2(Math.max(0, toNumber(row?.advancesFromFeb ?? row?.period2Paid, 0)));
  const currentMonthSalary = round2(Math.max(0, toNumber(employee?.monthlySalary, 0)));
  const currentMonthAdvance = round2(Math.max(0, toNumber(row?.currentMonthAdvance, 0)));
  let period1ToGive = Math.max(0, toNumber(row?.period1ToGive, 0));
  let period1Paid = Math.max(0, toNumber(row?.period1Paid, 0));

  if (!hasFixedSectionValues(row)) {
    if (baseTotalToGive > 0 || baseTotalPaid > 0) {
      period1ToGive = Math.max(0, round2(baseTotalToGive - period2ToGive));
      period1Paid = Math.max(0, round2(baseTotalPaid - period2Paid));
    } else {
      period1ToGive = Math.max(0, round2(estimateLedgerFixedToGive(employee)));
      period1Paid = 0;
    }
  }

  period1ToGive = round2(period1ToGive);
  period1Paid = round2(Math.min(period1Paid, period1ToGive));
  const period1Remaining = round2(Math.max(0, period1ToGive - period1Paid));
  const period2Remaining = round2(Math.max(0, period2ToGive - period2Paid));
  const totalToGive = round2(period1ToGive + period2ToGive);
  const totalPaid = round2(period1Paid + period2Paid);
  const remaining = round2(Math.max(0, totalToGive - totalPaid));

  return {
    ...row,
    period1ToGive,
    period1Paid,
    period1Remaining,
    period2ToGive,
    period2Paid,
    period2Remaining,
    currentMonthSalary,
    currentMonthAdvance,
    totalSalary: totalToGive,
    totalToGive,
    totalPaid,
    remaining
  };
}

function money(n) {
  return `₹${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

function normalizeGstNo(gstNo) {
  return String(gstNo || '').toUpperCase().replace(/\s+/g, '').trim();
}

function emptyBillItem() {
  return {
    description: '',
    hsnSac: '',
    unit: 'Nos',
    quantity: 1,
    rate: 0,
    gstPercent: 5
  };
}

function calcBillTotals(items) {
  const safeItems = Array.isArray(items) ? items : [];
  const subtotal = safeItems.reduce((sum, item) => sum + Number(item.quantity || 0) * Number(item.rate || 0), 0);
  const totalGst = safeItems.reduce(
    (sum, item) => sum + ((Number(item.quantity || 0) * Number(item.rate || 0) * Number(item.gstPercent || 0)) / 100),
    0
  );
  return {
    subtotal,
    totalGst,
    grandTotal: subtotal + totalGst
  };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function ensureAutoRefresh() {
  if (autoRefreshTimer) return;
  autoRefreshTimer = setInterval(() => {
    if (!token()) return;
    refresh().catch(() => { });
  }, 30000);
}

// Sorting logic
let currentSort = {
  tableId: null,
  colIndex: null,
  asc: true
};

function sortTable(tableId, colIndex) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const tbody = table.querySelector('tbody');
  const ths = table.querySelectorAll('th');
  const rows = Array.from(tbody.rows);

  // Toggle sort direction
  if (currentSort.tableId === tableId && currentSort.colIndex === colIndex) {
    currentSort.asc = !currentSort.asc;
  } else {
    currentSort.tableId = tableId;
    currentSort.colIndex = colIndex;
    currentSort.asc = true;
  }

  // Update header UI
  ths.forEach((th, idx) => {
    th.classList.remove('asc', 'desc');
    if (idx === colIndex) {
      th.classList.add(currentSort.asc ? 'asc' : 'desc');
    }
  });

  // Sort rows
  rows.sort((a, b) => {
    const aVal = a.cells[colIndex].textContent.trim();
    const bVal = b.cells[colIndex].textContent.trim();

    // Check if both are money/numbers
    const aNum = parseFloat(aVal.replace(/[^0-9.-]+/g, ''));
    const bNum = parseFloat(bVal.replace(/[^0-9.-]+/g, ''));

    if (!isNaN(aNum) && !isNaN(bNum) && !aVal.includes('-') && !bVal.includes('-')) { // Simple heuristic for now
      return currentSort.asc ? aNum - bNum : bNum - aNum;
    }

    return currentSort.asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  rows.forEach(row => tbody.appendChild(row));
}

function initSorting() {
  document.querySelectorAll('table').forEach(table => {
    if (!table.id) return;
    table.querySelectorAll('th').forEach((th, index) => {
      // Skip actions column usually last
      if (th.textContent.toLowerCase().includes('action')) return;

      th.classList.add('sortable');
      th.addEventListener('click', () => sortTable(table.id, index));
    });
  });
}

function setDefaultDates() {
  [attendanceForm, advanceForm, truckForm, expenseForm, investmentForm, chiniForm, vehicleForm, supplierTransactionForm, billForm].forEach((form) => {
    if (!form) return;
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.value = todayISO();
  });
  attendanceMonthInput.value = monthISO();
  if (salaryMonthInput && !salaryMonthInput.value) salaryMonthInput.value = activeSalaryMonth;
  activeSalaryMonth = getActiveSalaryMonth();
  if (expenseDateToInput && !expenseDateToInput.value) expenseDateToInput.value = todayISO();
  if (expenseDateFromInput && !expenseDateFromInput.value) {
    const d = new Date();
    d.setDate(1);
    expenseDateFromInput.value = d.toISOString().slice(0, 10);
  }
  const joiningInput = document.getElementById('employeeJoiningDate');
  if (joiningInput && !joiningInput.value) joiningInput.value = todayISO();
  if (billForm && billItemsState.length === 0) {
    billItemsState = [emptyBillItem()];
    renderBillItems();
  }
}

function getActiveSalaryMonth() {
  return salaryMonthInput?.value || activeSalaryMonth || monthISO();
}

function hasPermission(permission) {
  if (!me || !Array.isArray(me.permissions)) return false;
  return me.permissions.includes('*') || me.permissions.includes(permission);
}

function setVisibility(isLoggedIn) {
  loginPanel.classList.toggle('hidden', isLoggedIn);
  appContent.classList.toggle('hidden', !isLoggedIn);
  sessionBar.classList.toggle('hidden', !isLoggedIn);
}

function setFormEnabled(panelId, enabled) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.style.opacity = enabled ? '1' : '0.55';
  panel.querySelectorAll('input,select,button').forEach((el) => {
    el.disabled = !enabled;
  });
}

function setPanelVisible(panelId, visible) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  panel.classList.toggle('hidden', !visible);
}

function applyRoleUI() {
  const storageMode = me.storageMode ? ` | ${me.storageMode}` : '';
  userMeta.textContent = `${me.username} (${me.role}${storageMode})`;

  setFormEnabled('employeePanel', hasPermission('employees:create'));
  setFormEnabled('attendancePanel', hasPermission('attendance:create'));
  setFormEnabled('advancePanel', hasPermission('advances:create'));
  setFormEnabled('salaryLedgerPanel', hasPermission('salaryledger:update'));
  setFormEnabled('truckPanel', hasPermission('trucks:create'));
  setFormEnabled('expensePanel', hasPermission('expenses:create') || hasPermission('expenses:update'));
  setFormEnabled('investmentPanel', hasPermission('investments:create'));
  setFormEnabled('chiniPanel', hasPermission('chini:create'));
  setFormEnabled('landPanel', hasPermission('land:create'));
  setFormEnabled('vehiclePanel', hasPermission('vehicles:create'));
  setFormEnabled('supplierCreatePanel', hasPermission('suppliers:create'));
  setFormEnabled('billPanel', hasPermission('billing:create'));
  if (supplierTransactionForm) {
    const canCreateSupplierTx = hasPermission('suppliers:create');
    supplierTransactionForm.querySelectorAll('input,select,textarea,button').forEach((el) => {
      el.disabled = !canCreateSupplierTx;
    });
  }

  setPanelVisible('supplierSection', hasPermission('suppliers:view'));
  setPanelVisible('salaryPanel', hasPermission('salary:view'));
  setPanelVisible('salaryLedgerPanel', hasPermission('salaryledger:view'));
  setPanelVisible('truckReportPanel', hasPermission('trucks:view'));
  setPanelVisible('employeeListPanel', hasPermission('employees:view'));
  setPanelVisible('attendanceReportPanel', hasPermission('attendance:report'));
  setPanelVisible('expenseReportPanel', hasPermission('expenses:view'));
  setPanelVisible('expenseSalaryGivenPanel', hasPermission('salaryledger:view') || hasPermission('salary:view'));
  setPanelVisible('investmentSummaryPanel', hasPermission('investments:view'));
  setPanelVisible('chiniReportPanel', hasPermission('chini:view'));
  setPanelVisible('landReportPanel', hasPermission('land:view'));
  setPanelVisible('vehicleReportPanel', hasPermission('vehicles:view'));
  setPanelVisible('billReportPanel', hasPermission('billing:view'));
  setPanelVisible('billCompanyPanel', hasPermission('billing:view'));
  setPanelVisible('changePasswordPanel', true);

  downloadSalaryCsvBtn.disabled = !hasPermission('export:view');
  downloadTruckCsvBtn.disabled = !hasPermission('export:view');
  if (downloadTruckPdfBtn) downloadTruckPdfBtn.disabled = !hasPermission('export:view');
  downloadAttendanceCsvBtn.disabled = !hasPermission('export:view');
}

async function api(url, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token()) headers.Authorization = `Bearer ${token()}`;
  const controller = new AbortController();
  const timeoutMs = method === 'GET' ? 15000 : 20000;
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  let res;

  try {
    res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(`Request timeout (${timeoutMs / 1000}s): ${url}`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (res.status === 401) {
    setToken('');
    setVisibility(false);
    throw new Error('Session expired. Please login again.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }

  if (res.status === 204) return {};
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return res.json();
  return res.text();
}

function renderCards(data) {
  const items = [
    ['Employees', data.totalEmployees],
    ['Total Salary', money(data.totalSalary)],
    ['Total Advances (Month)', money(data.totalAdvances)],
    ['Remaining Payable', money(data.totalRemaining)],
    ['Present Today', data.presentToday],
    ['Absent Today', data.absentToday],
    ['Trucks This Month', data.truckCountThisMonth],
    ['Truck Quantity (Month)', data.truckQuantityThisMonth]
  ];

  cardsEl.innerHTML = items
    .map(
      ([label, value]) =>
        `<div class="card"><div class="label">${label}</div><div class="value">${value}</div></div>`
    )
    .join('');
}

function renderEmployeeOptions(employees) {
  const prevAttendance = attendanceEmployeeEl.value;
  const prevAdvance = advanceEmployeeEl.value;
  const prevSalaryLedger = salaryLedgerEmployeeSelect ? salaryLedgerEmployeeSelect.value : '';
  const options = employees.map((e) => `<option value="${e.id}">${e.name} (${e.role})</option>`).join('');
  attendanceEmployeeEl.innerHTML = options;
  advanceEmployeeEl.innerHTML = options;
  if (salaryLedgerEmployeeSelect) {
    salaryLedgerEmployeeSelect.innerHTML = `<option value="">Select Employee</option>${options}`;
  }
  if (prevAttendance && employees.some((e) => e.id === prevAttendance)) attendanceEmployeeEl.value = prevAttendance;
  if (prevAdvance && employees.some((e) => e.id === prevAdvance)) advanceEmployeeEl.value = prevAdvance;
  if (salaryLedgerEmployeeSelect) {
    if (prevSalaryLedger && employees.some((e) => e.id === prevSalaryLedger)) {
      salaryLedgerEmployeeSelect.value = prevSalaryLedger;
    } else if (employees.length > 0) {
      salaryLedgerEmployeeSelect.value = employees[0].id;
    }
  }
}

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function renderEmployeeRows(rows) {
  const canEdit = hasPermission('employees:update');
  const canDelete = hasPermission('employees:delete');

  if (!employeeGrid) return;

  employeeGrid.innerHTML = rows
    .map((e) => {
      const initials = getInitials(e.name);
      return `
        <div class="employee-card">
          <div class="employee-header">
            <div class="avatar">${initials}</div>
            <div class="employee-info">
              <h3>${e.name}</h3>
              <span class="role-badge">${e.role}</span>
            </div>
          </div>
          
          <div class="employee-stats">
            <div class="stat-item">
              <span class="stat-label">Monthly Salary</span>
              <span class="stat-value money">${money(e.monthlySalary)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Joined</span>
              <span class="stat-value">${e.joiningDate || '-'}</span>
            </div>
          </div>

          <div class="employee-actions">
             ${canEdit ? `<button type="button" class="small secondary emp-edit" data-id="${e.id}">Edit</button>` : ''}
             ${canDelete ? `<button type="button" class="small danger emp-del" data-id="${e.id}">Delete</button>` : ''}
             <button class="small offer-btn" onclick="downloadOfferLetter('${e.id}')">Offer Letter</button>
          </div>
        </div>
      `;
    })
    .join('');

  if (canEdit) {
    document.querySelectorAll('.emp-edit').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const existing = employeesCache.find((e) => e.id === id);
        if (!existing) return;

        const name = prompt('Employee name', existing.name);
        if (!name) return;
        const role = prompt('Role', existing.role);
        if (!role) return;
        const salaryRaw = prompt('Monthly salary', String(existing.monthlySalary));
        if (!salaryRaw) return;
        const joiningDate = prompt('Joining date (YYYY-MM-DD)', existing.joiningDate || todayISO());
        if (!joiningDate) return;

        try {
          await api(`/api/employees/${id}`, 'PUT', {
            name,
            role,
            monthlySalary: Number(salaryRaw),
            joiningDate
          });
          await refresh();
          showToast('Employee updated');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }

  if (canDelete) {
    document.querySelectorAll('.emp-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this employee? Attendance and advances will also be removed.')) return;

        try {
          await api(`/api/employees/${id}`, 'DELETE');
          await refresh();
          showToast('Employee deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderSalaryRows(rows) {
  const canSeeSlip = hasPermission('salaryslip:view');
  const canEditAdvances = hasPermission('advances:create');

  salaryTbody.innerHTML = rows
    .map(
      (r) => {
        const advVal = r.advances ?? 0;
        const salary = r.monthlySalary ?? 0;
        const remaining = Math.max(0, salary - (advVal || 0));
        const percentPaid = salary > 0 ? Math.min(100, (advVal / salary) * 100) : 0;

        // Status logic
        let statusClass = 'pending';
        let statusText = 'Pending';
        let progressClass = '';

        if (remaining === 0) {
          statusClass = 'paid';
          statusText = 'Fully Paid';
        } else if (percentPaid > 80) {
          statusClass = 'pending'; // high pending
          progressClass = 'warning';
        } else if (percentPaid === 0) {
          statusClass = 'unpaid';
          statusText = 'Unpaid';
          progressClass = 'danger';
        }

        const advancesCell = canEditAdvances
          ? `<div class="row wrap">
               <input type="number" min="0" step="0.01" class="advances-input" value="${advVal}" 
               data-emp-id="${r.employeeId}" data-salary="${salary}" data-original="${advVal}"
               placeholder="0" />
               <button type="button" class="small adv-save" data-emp-id="${r.employeeId}">Save</button>
             </div>`
          : `<span class="money">${money(advVal)}</span>`;

        return `<tr data-emp-id="${r.employeeId}">
          <td>
            <div class="record-name">${r.name}</div>
            <div class="record-subtext">${r.role}</div>
          </td>
          <td>
             <span class="status-badge ${statusClass}">${statusText}</span>
          </td>
          <td class="money">${money(salary)}</td>
          <td class="advances-cell">
            ${advancesCell}
            <div class="salary-progress-wrap" title="${percentPaid.toFixed(1)}% Paid">
               <div class="salary-progress-bar ${progressClass}" style="width: ${percentPaid}%"></div>
            </div>
          </td>
          <td class="money remaining-cell" data-salary="${salary}">${money(remaining)}</td>
          <td>${r.monthsWorked ?? '-'}</td>
          <td class="money muted-money">${money(r.totalSalaryAllTime ?? 0)}</td>
          <td class="money muted-money">${money(r.totalAdvancesAllTime ?? 0)}</td>
          <td>
             ${canSeeSlip ? `<button type="button" class="small slip-btn" data-emp-id="${r.employeeId}" title="Download Payslip">📄 Slip</button>` : '-'}
          </td>
        </tr>`;
      }
    )
    .join('');

  if (canEditAdvances) {
    const saveAdvance = async (input) => {
      const empId = input.dataset.empId;
      const original = Number(input.dataset.original) || 0;
      const entered = parseFloat(input.value);
      if (Number.isNaN(entered) || entered < 0 || entered === original) return;
      try {
        await api('/api/advances/set', 'PUT', {
          employeeId: empId,
          month: getActiveSalaryMonth(),
          totalAdvances: entered
        });
        input.dataset.original = String(entered);
        await refresh();
        showToast('Advances updated');
      } catch (err) {
        showToast(err.message, 'error');
        input.value = original;
        input.dataset.original = String(original);
      }
    };

    document.querySelectorAll('.advances-input').forEach((input) => {
      input.addEventListener('input', () => {
        const salary = Number(input.dataset.salary) || 0;
        const advances = parseFloat(input.value) || 0;
        const remaining = Math.max(0, salary - advances);
        const row = input.closest('tr');
        const remainingCell = row?.querySelector('.remaining-cell');

        // Update remaining text
        if (remainingCell) remainingCell.textContent = money(remaining);

        // Update progress bar
        const percent = salary > 0 ? Math.min(100, (advances / salary) * 100) : 0;
        const progBar = row?.querySelector('.salary-progress-bar');
        if (progBar) progBar.style.width = `${percent}%`;
      });
      input.addEventListener('blur', async () => {
        // Keep blur save for keyboard users.
        await saveAdvance(input);
      });
    });
    document.querySelectorAll('.adv-save').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const empId = btn.getAttribute('data-emp-id');
        const input = document.querySelector(`.advances-input[data-emp-id="${empId}"]`);
        if (input) await saveAdvance(input);
      });
    });
  }

  if (canSeeSlip) {
    document.querySelectorAll('.slip-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const empId = btn.getAttribute('data-emp-id');
        const url = `/api/salary-slip/${empId}.pdf?month=${getActiveSalaryMonth()}`;
        window.open(urlWithAuth(url), '_blank');
      });
    });
  }
}

function summaryStat(label, value, moneyValue = false) {
  return `<div class="summary-stat"><div class="label">${label}</div><div class="value">${moneyValue ? money(value) : value}</div></div>`;
}

function renderSalarySummaries(rows) {
  if (!salaryEmployeeSelect || !salaryEmployeeSummaryEl || !salaryOverallSummaryEl) return;

  if (!rows || rows.length === 0) {
    salaryEmployeeSelect.innerHTML = '<option value=\"\">No employees</option>';
    salaryEmployeeSummaryEl.innerHTML = '';
    salaryOverallSummaryEl.innerHTML = '';
    return;
  }

  const previous = salaryEmployeeSelect.value;
  salaryEmployeeSelect.innerHTML = rows
    .map((r) => `<option value="${r.employeeId}">${r.name}</option>`)
    .join('');
  salaryEmployeeSelect.value = rows.some((r) => r.employeeId === previous) ? previous : rows[0].employeeId;

  const selected = rows.find((r) => r.employeeId === salaryEmployeeSelect.value) || rows[0];

  salaryEmployeeSummaryEl.innerHTML = [
    summaryStat('Name', selected.name),
    summaryStat('Joining Date', selected.joiningDate || '-'),
    summaryStat('Months Worked', selected.monthsWorked ?? 0),
    summaryStat('Monthly Salary', selected.monthlySalary ?? 0, true),
    summaryStat('Total Salary (All Time)', selected.totalSalaryAllTime ?? 0, true),
    summaryStat('Total Advances (All Time)', selected.totalAdvancesAllTime ?? 0, true),
    summaryStat('Total Remaining (All Time)', selected.totalRemainingAllTime ?? 0, true)
  ].join('');

  const overall = rows.reduce(
    (acc, r) => {
      acc.monthlySalary += Number(r.monthlySalary || 0);
      acc.advancesMonth += Number(r.advances || 0);
      acc.remainingMonth += Number(r.remaining || 0);
      acc.totalSalaryAllTime += Number(r.totalSalaryAllTime || 0);
      acc.totalAdvancesAllTime += Number(r.totalAdvancesAllTime || 0);
      acc.totalRemainingAllTime += Number(r.totalRemainingAllTime || 0);
      return acc;
    },
    {
      monthlySalary: 0,
      advancesMonth: 0,
      remainingMonth: 0,
      totalSalaryAllTime: 0,
      totalAdvancesAllTime: 0,
      totalRemainingAllTime: 0
    }
  );

  salaryOverallSummaryEl.innerHTML = [
    summaryStat('Employees', rows.length),
    summaryStat('Total Monthly Salary', overall.monthlySalary, true),
    summaryStat('Advances (This Month)', overall.advancesMonth, true),
    summaryStat('Remaining (This Month)', overall.remainingMonth, true),
    summaryStat('Total Salary (All Time)', overall.totalSalaryAllTime, true),
    summaryStat('Total Advances (All Time)', overall.totalAdvancesAllTime, true),
    summaryStat('Total Remaining (All Time)', overall.totalRemainingAllTime, true)
  ].join('');
}

function renderSalaryLedgers(rows) {
  if (!salaryLedgerTbody) return;
  const safeRows = (rows || []).map((row) => normalizeLedgerRow(row));
  const canEdit = hasPermission('salaryledger:update');
  const totalPaidSum = safeRows.reduce((sum, r) => sum + Number(r.totalPaid || 0), 0);
  const totalToGiveSum = safeRows.reduce((sum, r) => sum + Number(r.totalToGive || 0), 0);
  const totalRemainingSum = safeRows.reduce((sum, r) => sum + Number(r.remaining || 0), 0);
  const period1PaidSum = safeRows.reduce((sum, r) => sum + Number(r.period1Paid || 0), 0);
  const period1ToGiveSum = safeRows.reduce((sum, r) => sum + Number(r.period1ToGive || 0), 0);
  const period2PaidSum = safeRows.reduce((sum, r) => sum + Number(r.period2Paid || 0), 0);
  const period2ToGiveSum = safeRows.reduce((sum, r) => sum + Number(r.period2ToGive || 0), 0);
  const currentMonthSalarySum = safeRows.reduce((sum, r) => sum + Number(r.currentMonthSalary || 0), 0);
  const currentMonthAdvanceSum = safeRows.reduce((sum, r) => sum + Number(r.currentMonthAdvance || 0), 0);

  const setSummary = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(value);
  };
  setSummary('salaryLedgerTotalPaidSum', totalPaidSum);
  setSummary('salaryLedgerTotalToGiveSum', totalToGiveSum);
  setSummary('salaryLedgerTotalRemainingSum', totalRemainingSum);
  setSummary('salaryLedgerPeriod1PaidSum', period1PaidSum);
  setSummary('salaryLedgerPeriod1ToGiveSum', period1ToGiveSum);
  setSummary('salaryLedgerPeriod2PaidSum', period2PaidSum);
  setSummary('salaryLedgerPeriod2ToGiveSum', period2ToGiveSum);
  setSummary('salaryLedgerCurrentMonthSalarySum', currentMonthSalarySum);
  setSummary('salaryLedgerCurrentMonthAdvanceSum', currentMonthAdvanceSum);

  const q = (salaryLedgerSearchInput?.value || '').trim().toLowerCase();
  const tableRows = q
    ? safeRows.filter((r) => `${r.name || ''} ${r.role || ''}`.toLowerCase().includes(q))
    : safeRows;

  salaryLedgerTbody.innerHTML = tableRows
    .map(
      (r) => {
        const ledgerDate = r.updatedAt ? String(r.updatedAt).slice(0, 10) : '-';
        return `<tr>
        <td>${escapeHtml(r.name || '-')}</td>
        <td>${escapeHtml(r.role || '-')}</td>
        <td>${ledgerDate}</td>
        <td class="money">${money(r.period1ToGive)}</td>
        <td class="money">${money(r.period1Paid)}</td>
        <td class="money">${money(r.period1Remaining)}</td>
        <td class="money">${money(r.currentMonthSalary)}</td>
        <td class="money">${money(r.currentMonthAdvance)}</td>
        <td class="money">${money(r.period2ToGive)}</td>
        <td class="money">${money(r.period2Paid)}</td>
        <td class="money">${money(r.period2Remaining)}</td>
        <td class="money">${money(r.totalSalary)}</td>
        <td class="money">${money(r.totalPaid)}</td>
        <td class="money">${money(r.totalToGive)}</td>
        <td class="money">${money(r.remaining)}</td>
        <td>${escapeHtml(r.note || '-')}</td>
        <td>${canEdit ? `<button type="button" class="small warn sld-edit" data-emp-id="${r.employeeId}">Edit</button>` : '-'}</td>
      </tr>`;
      }
    )
    .join('');
  if (canEdit) {
    document.querySelectorAll('.sld-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        const empId = btn.getAttribute('data-emp-id');
        if (!salaryLedgerEmployeeSelect) return;
        salaryLedgerEmployeeSelect.value = empId;
        prefillSalaryLedgerForm();
        salaryLedgerForm?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Ledger row loaded in form. Edit and click Save.');
      });
    });
  }
  prefillSalaryLedgerForm();
}

function prefillSalaryLedgerForm() {
  if (!salaryLedgerForm || !salaryLedgerEmployeeSelect) return;
  let employeeId = salaryLedgerEmployeeSelect.value;
  if (!employeeId && employeesCache[0]) {
    employeeId = employeesCache[0].id;
    salaryLedgerEmployeeSelect.value = employeeId;
  }
  const row = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  const employee = findEmployeeById(employeeId);
  const period1ToGiveEl = salaryLedgerForm.querySelector('input[name="period1ToGive"]');
  const period1PaidEl = salaryLedgerForm.querySelector('input[name="period1Paid"]');
  const noteEl = salaryLedgerForm.querySelector('input[name="note"]');
  if (!period1ToGiveEl || !period1PaidEl || !noteEl) return;

  if (row) {
    const normalized = normalizeLedgerRow(row);
    period1ToGiveEl.value = String(normalized.period1ToGive);
    period1PaidEl.value = String(normalized.period1Paid);
    noteEl.value = String(row.note || '');
  } else {
    period1ToGiveEl.value = String(estimateLedgerFixedToGive(employee) || 0);
    period1PaidEl.value = '0';
    noteEl.value = '';
  }

  updateSalaryLedgerRemainingPreview();
}

function updateSalaryLedgerRemainingPreview() {
  if (!salaryLedgerForm || !salaryLedgerEmployeeSelect) return;
  const employeeId = salaryLedgerEmployeeSelect.value;
  const selectedRow = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  const normalized = normalizeLedgerRow(selectedRow || { employeeId });
  const period1ToGiveEl = salaryLedgerForm.querySelector('input[name="period1ToGive"]');
  const period1PaidEl = salaryLedgerForm.querySelector('input[name="period1Paid"]');
  const period1PreviewEl = document.getElementById('salaryLedgerPeriod1RemainingPreview');
  const period2PreviewEl = document.getElementById('salaryLedgerPeriod2RemainingPreview');
  const period2ToGivePreviewEl = document.getElementById('salaryLedgerPeriod2ToGivePreview');
  const period2PaidPreviewEl = document.getElementById('salaryLedgerPeriod2PaidPreview');
  const currentMonthSalaryPreviewEl = document.getElementById('salaryLedgerCurrentMonthSalaryPreview');
  const currentMonthAdvancePreviewEl = document.getElementById('salaryLedgerCurrentMonthAdvancePreview');
  const computedPaidEl = document.getElementById('salaryLedgerComputedPaid');
  const computedToGiveEl = document.getElementById('salaryLedgerComputedToGive');
  const previewEl = document.getElementById('salaryLedgerRemainingPreview');
  if (!period1ToGiveEl || !period1PaidEl || !previewEl) return;
  const period1ToGive = Math.max(0, toNumber(period1ToGiveEl.value, 0));
  const period1Paid = Math.max(0, toNumber(period1PaidEl.value, 0));
  const period2ToGive = Math.max(0, toNumber(normalized.period2ToGive, 0));
  const period2Paid = Math.max(0, toNumber(normalized.period2Paid, 0));
  const currentMonthSalary = Math.max(0, toNumber(normalized.currentMonthSalary, 0));
  const currentMonthAdvance = Math.max(0, toNumber(normalized.currentMonthAdvance, 0));
  const period1Remaining = Math.max(0, round2(period1ToGive - period1Paid));
  const period2Remaining = Math.max(0, round2(period2ToGive - period2Paid));
  const totalToGive = round2(period1ToGive + period2ToGive);
  const totalPaid = round2(period1Paid + period2Paid);
  const remaining = Math.max(0, round2(totalToGive - totalPaid));
  if (period1PreviewEl) period1PreviewEl.textContent = money(period1Remaining);
  if (period2PreviewEl) period2PreviewEl.textContent = money(period2Remaining);
  if (period2ToGivePreviewEl) period2ToGivePreviewEl.textContent = money(period2ToGive);
  if (period2PaidPreviewEl) period2PaidPreviewEl.textContent = money(period2Paid);
  if (currentMonthSalaryPreviewEl) currentMonthSalaryPreviewEl.textContent = money(currentMonthSalary);
  if (currentMonthAdvancePreviewEl) currentMonthAdvancePreviewEl.textContent = money(currentMonthAdvance);
  if (computedPaidEl) computedPaidEl.textContent = money(totalPaid);
  if (computedToGiveEl) computedToGiveEl.textContent = money(totalToGive);
  previewEl.textContent = money(remaining);
}

function autoFillSalaryLedgerSections() {
  if (!salaryLedgerForm || !salaryLedgerEmployeeSelect) return;
  const employeeId = salaryLedgerEmployeeSelect.value;
  const employee = findEmployeeById(employeeId);
  if (!employee) {
    showToast('Select an employee first', 'error');
    return;
  }
  const period1ToGiveEl = salaryLedgerForm.querySelector('input[name="period1ToGive"]');
  const period1PaidEl = salaryLedgerForm.querySelector('input[name="period1Paid"]');
  if (!period1ToGiveEl || !period1PaidEl) return;

  period1ToGiveEl.value = String(estimateLedgerFixedToGive(employee) || 0);

  const existing = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  let period1Paid = 0;
  if (hasFixedSectionValues(existing)) {
    const normalized = normalizeLedgerRow(existing);
    period1Paid = normalized.period1Paid;
  }
  period1PaidEl.value = String(round2(period1Paid));
  updateSalaryLedgerRemainingPreview();
  showToast('Historical section auto-filled using monthly salary');
}

function renderAttendanceReportRows(rows) {
  attendanceReportTbody.innerHTML = rows
    .map(
      (r) =>
        `<tr>
          <td>${r.name}</td>
          <td>${r.role}</td>
          <td>${r.presentDays}</td>
          <td>${r.absentDays}</td>
          <td>${r.markedDays}</td>
        </tr>`
    )
    .join('');
}

const PARTY_LABELS = { narayan: 'Narayan', maa_vaishno: 'Maa Vaishno' };

function partyLabel(party) {
  return (party && PARTY_LABELS[party]) || '-';
}

function truckMaterialKey(material) {
  const normalized = String(material || '')
    .toLowerCase()
    .trim();
  if (['pellet', 'pellets'].includes(normalized)) return 'pellet';
  if (['briquette', 'briquettes'].includes(normalized)) return 'briquettes';
  return normalized;
}

function truckMaterialLabel(material) {
  const key = truckMaterialKey(material);
  if (key === 'pellet') return 'Pellet';
  if (key === 'briquettes') return 'Briquettes';
  return String(material || '').trim() || '-';
}

function renderTruckRows(rows) {
  const canEdit = hasPermission('trucks:update');
  const canDelete = hasPermission('trucks:delete');

  // Calculate material-specific totals (quantity and revenue)
  let pelletTotal = 0;
  let briquetteTotal = 0;
  let pelletRevenue = 0;
  let pelletRevenueNarayan = 0;
  let pelletRevenueMaaVaishno = 0;
  let briquetteRevenue = 0;
  let briquetteRevenueNarayan = 0;
  let briquetteRevenueMaaVaishno = 0;

  rows.forEach(row => {
    const qty = Number(row.quantity) || 0;
    const amount = Number(row.totalAmount) || 0;
    const material = truckMaterialKey(row.rawMaterial);
    if (material === 'pellet') {
      pelletTotal += qty;
      pelletRevenue += amount;
      if (row.party === 'narayan') pelletRevenueNarayan += amount;
      if (row.party === 'maa_vaishno') pelletRevenueMaaVaishno += amount;
    } else if (material === 'briquettes') {
      briquetteTotal += qty;
      briquetteRevenue += amount;
      if (row.party === 'narayan') briquetteRevenueNarayan += amount;
      if (row.party === 'maa_vaishno') briquetteRevenueMaaVaishno += amount;
    }
  });

  // Update material stats display
  if (truckPelletTotalEl) truckPelletTotalEl.textContent = `${pelletTotal.toFixed(2)} Qntl`;
  if (truckBriquetteTotalEl) truckBriquetteTotalEl.textContent = `${briquetteTotal.toFixed(2)} Qntl`;
  if (truckPelletRevenueEl) truckPelletRevenueEl.textContent = money(pelletRevenue);
  if (truckPelletRevenueNarayanEl) truckPelletRevenueNarayanEl.textContent = `Narayan: ${money(pelletRevenueNarayan)}`;
  if (truckPelletRevenueMaaVaishnoEl) {
    truckPelletRevenueMaaVaishnoEl.textContent = `Maa Vaishno: ${money(pelletRevenueMaaVaishno)}`;
  }
  if (truckBriquetteRevenueEl) truckBriquetteRevenueEl.textContent = money(briquetteRevenue);
  if (truckBriquetteRevenueNarayanEl) {
    truckBriquetteRevenueNarayanEl.textContent = `Narayan: ${money(briquetteRevenueNarayan)}`;
  }
  if (truckBriquetteRevenueMaaVaishnoEl) {
    truckBriquetteRevenueMaaVaishnoEl.textContent = `Maa Vaishno: ${money(briquetteRevenueMaaVaishno)}`;
  }
  const narayanTotal = rows
    .filter((t) => t.party === 'narayan' && t.totalAmount != null)
    .reduce((sum, t) => sum + Number(t.totalAmount), 0);
  const maaVaishnoTotal = rows
    .filter((t) => t.party === 'maa_vaishno' && t.totalAmount != null)
    .reduce((sum, t) => sum + Number(t.totalAmount), 0);

  const totalsEl = document.getElementById('truckPartyTotals');
  if (totalsEl) {
    totalsEl.innerHTML = `
      <div class="party-total"><span class="label">Narayan Total</span><div class="value">${money(narayanTotal)}</div></div>
      <div class="party-total"><span class="label">Maa Vaishno Total</span><div class="value">${money(maaVaishnoTotal)}</div></div>
    `;
  }

  const renderTruckTable = (tbody, partyRows) => {
    tbody.innerHTML = partyRows
      .map((t, idx) => {
        const materialKey = truckMaterialKey(t.rawMaterial);
        const materialLabel = truckMaterialLabel(t.rawMaterial);
        const customOption =
          materialKey && !['pellet', 'briquettes'].includes(materialKey)
            ? `<option value="${escapeHtml(materialLabel)}" selected>${escapeHtml(materialLabel)}</option>`
            : '';
        const materialCell = canEdit
          ? `<select class="truck-material-select" data-id="${t.id}">
              <option value="Pellet" ${materialKey === 'pellet' ? 'selected' : ''}>Pellet</option>
              <option value="Briquettes" ${materialKey === 'briquettes' ? 'selected' : ''}>Briquettes</option>
              ${customOption}
            </select>`
          : escapeHtml(materialLabel);
        return `<tr>
          <td>${idx + 1}</td>
          <td>${t.date}</td>
          <td>${t.truckNumber}</td>
          <td>${t.driverName || '-'}</td>
          <td>${materialCell}</td>
          <td>${t.quantity}</td>
          <td>${t.pricePerQuintal != null ? money(t.pricePerQuintal) : '-'}</td>
          <td>${t.totalAmount != null ? money(t.totalAmount) : '-'}</td>
          <td>${t.origin || '-'}</td>
          <td>${t.destination || '-'}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn truck-edit" data-id="${t.id}">Edit</button>` : ''}
              ${canDelete ? `<button type="button" class="small danger truck-del" data-id="${t.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`;
      })
      .join('');
  };

  const narayanRows = rows.filter((t) => t.party === 'narayan');
  const maaVaishnoRows = rows.filter((t) => t.party === 'maa_vaishno');
  renderTruckTable(truckNarayanTbody, narayanRows);
  renderTruckTable(truckMaaVaishnoTbody, maaVaishnoRows);

  if (canEdit) {
    document.querySelectorAll('.truck-material-select').forEach((select) => {
      select.addEventListener('change', async () => {
        const id = select.getAttribute('data-id');
        const current = trucksCache.find((t) => String(t.id) === String(id));
        if (!current) {
          showToast('Truck entry not found for material update', 'error');
          await refresh();
          return;
        }
        const nextMaterial = String(select.value || '').trim();
        if (!nextMaterial) return;
        const currentMaterial = truckMaterialLabel(current.rawMaterial);
        if (nextMaterial === currentMaterial) return;
        select.disabled = true;
        try {
          await api(`/api/trucks/${id}`, 'PUT', {
            date: current.date,
            truckNumber: current.truckNumber,
            driverName: current.driverName || '',
            rawMaterial: nextMaterial,
            quantity: current.quantity,
            pricePerQuintal: current.pricePerQuintal != null ? current.pricePerQuintal : undefined,
            party: current.party || 'narayan',
            origin: current.origin || '',
            destination: current.destination || '',
            notes: current.notes || ''
          });
          await refresh();
          showToast('Truck material updated');
        } catch (err) {
          select.value = currentMaterial === '-' ? 'Pellet' : currentMaterial;
          showToast(err.message, 'error');
        } finally {
          select.disabled = false;
        }
      });
    });

    document.querySelectorAll('.truck-edit').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const current = trucksCache.find((t) => String(t.id) === String(id));
        if (!current) {
          showToast('Truck entry not found for editing', 'error');
          return;
        }
        editingTruckId = id;
        truckForm.querySelector('input[name="date"]').value = current.date || '';
        truckForm.querySelector('select[name="party"]').value = current.party || 'narayan';
        truckForm.querySelector('input[name="truckNumber"]').value = current.truckNumber || '';
        truckForm.querySelector('input[name="driverName"]').value = current.driverName || '';
        truckForm.querySelector('[name="rawMaterial"]').value = truckMaterialLabel(current.rawMaterial);
        const clientInput = truckForm.querySelector('input[name="client"]');
        if (clientInput) clientInput.value = current.client || '';
        truckForm.querySelector('input[name="quantity"]').value = current.quantity != null ? String(current.quantity) : '';
        truckForm.querySelector('input[name="pricePerQuintal"]').value =
          current.pricePerQuintal != null ? String(current.pricePerQuintal) : '';
        truckForm.querySelector('input[name="origin"]').value = current.origin || '';
        truckForm.querySelector('input[name="destination"]').value = current.destination || '';
        truckForm.querySelector('input[name="notes"]').value = current.notes || '';
        const submitBtn = truckForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Truck Entry';
        updateTruckTotal();
        truckForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Truck loaded. Update fields and click "Update Truck Entry".');
      });
    });
  }

  if (canDelete) {
    document.querySelectorAll('.truck-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this truck entry?')) return;
        try {
          await api(`/api/trucks/${id}`, 'DELETE');
          await refresh();
          showToast('Truck entry deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderExpenseRows(rows) {
  const canEdit = hasPermission('expenses:update');
  const canDelete = hasPermission('expenses:delete');
  const descriptionQuery = String(expenseFilter.description || '')
    .trim()
    .toLowerCase();
  const filtered = rows.filter((e) => {
    if (expenseFilter.dateFrom && e.date < expenseFilter.dateFrom) return false;
    if (expenseFilter.dateTo && e.date > expenseFilter.dateTo) return false;
    if (descriptionQuery && !String(e.description || '').toLowerCase().includes(descriptionQuery)) return false;
    return true;
  });

  const narayanRows = filtered.filter((e) => e.party === 'narayan');
  const maaVaishnoRows = filtered.filter((e) => e.party === 'maa_vaishno');
  const narayanTotal = narayanRows.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const maaVaishnoTotal = maaVaishnoRows.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const total = narayanTotal + maaVaishnoTotal;

  const totalEl = document.getElementById('expenseTotal');
  const narayanTotalEl = document.getElementById('expenseTotalNarayan');
  const maaVaishnoTotalEl = document.getElementById('expenseTotalMaaVaishno');
  if (totalEl) totalEl.textContent = money(total);
  if (narayanTotalEl) narayanTotalEl.textContent = money(narayanTotal);
  if (maaVaishnoTotalEl) maaVaishnoTotalEl.textContent = money(maaVaishnoTotal);

  const renderExpenseTable = (tbody, partyRows) => {
    if (!tbody) return;
    tbody.innerHTML = partyRows
      .map(
        (e, idx) =>
          `<tr>
          <td>${idx + 1}</td>
          <td>${e.date}</td>
          <td>${e.description || '-'}</td>
          <td class="money">${money(e.amount)}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn exp-edit" data-id="${e.id}">Edit</button>` : ''}
              ${canDelete ? `<button type="button" class="small danger exp-del" data-id="${e.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`
      )
      .join('');
  };

  renderExpenseTable(expenseNarayanTbody, narayanRows);
  renderExpenseTable(expenseMaaVaishnoTbody, maaVaishnoRows);

  if (canEdit) {
    document.querySelectorAll('.exp-edit').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const current = expensesCache.find((e) => String(e.id) === String(id));
        if (!current) {
          showToast('Expense not found for editing', 'error');
          return;
        }
        editingExpenseId = id;
        expenseForm.querySelector('input[name="date"]').value = current.date || '';
        expenseForm.querySelector('select[name="party"]').value = current.party || 'narayan';
        expenseForm.querySelector('input[name="description"]').value = current.description || '';
        expenseForm.querySelector('input[name="amount"]').value =
          current.amount != null ? String(current.amount) : '';
        const submitBtn = expenseForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Expense';
        if (expenseCancelEditBtn) expenseCancelEditBtn.classList.remove('hidden');
        expenseForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Expense loaded. Update fields and click "Update Expense".');
      });
    });
  }

  if (canDelete) {
    document.querySelectorAll('.exp-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this expense?')) return;
        try {
          await api(`/api/expenses/${id}`, 'DELETE');
          await refresh();
          showToast('Expense deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderExpenseSalaryGiven() {
  const panel = document.getElementById('expenseSalaryGivenPanel');
  if (!panel || !expenseSalaryGivenTbody) return;
  const canViewSalaryGiven = hasPermission('salaryledger:view') || hasPermission('salary:view');
  panel.classList.toggle('hidden', !canViewSalaryGiven);
  if (!canViewSalaryGiven) return;

  const rows = (salaryLedgersCache || [])
    .map((r) => normalizeLedgerRow(r))
    .sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));

  const totals = rows.reduce(
    (acc, r) => {
      const historicalGiven = Number(r.period1Paid || 0);
      const advancesGiven = Number(r.period2Paid || 0);
      const totalGiven = historicalGiven + advancesGiven;
      const currentMonthSalary = Number(r.currentMonthSalary || 0);
      const currentMonthAdvance = Number(r.currentMonthAdvance || 0);
      const currentMonthPending = Math.max(0, currentMonthSalary - currentMonthAdvance);
      acc.historicalGiven += historicalGiven;
      acc.advancesGiven += advancesGiven;
      acc.totalGiven += totalGiven;
      acc.currentMonthSalary += currentMonthSalary;
      acc.currentMonthAdvance += currentMonthAdvance;
      acc.currentMonthPending += currentMonthPending;
      return acc;
    },
    {
      historicalGiven: 0,
      advancesGiven: 0,
      totalGiven: 0,
      currentMonthSalary: 0,
      currentMonthAdvance: 0,
      currentMonthPending: 0
    }
  );

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(value);
  };
  set('expenseSalaryLedgerPaidTotal', totals.historicalGiven);
  set('expenseSalaryAdvancePaidTotal', totals.advancesGiven);
  set('expenseSalaryGivenTotal', totals.totalGiven);
  set('expenseSalaryCurrentMonthSalaryTotal', totals.currentMonthSalary);
  set('expenseSalaryCurrentMonthAdvanceTotal', totals.currentMonthAdvance);
  set('expenseSalaryCurrentMonthPendingTotal', totals.currentMonthPending);

  expenseSalaryGivenTbody.innerHTML = rows
    .map((r, idx) => {
      const historicalGiven = Number(r.period1Paid || 0);
      const advancesGiven = Number(r.period2Paid || 0);
      const totalGiven = historicalGiven + advancesGiven;
      const currentMonthSalary = Number(r.currentMonthSalary || 0);
      const currentMonthAdvance = Number(r.currentMonthAdvance || 0);
      const currentMonthPending = Math.max(0, currentMonthSalary - currentMonthAdvance);
      return `<tr>
          <td>${idx + 1}</td>
          <td>${escapeHtml(r.name || '-')}</td>
          <td>${escapeHtml(r.role || '-')}</td>
          <td class="money">${money(historicalGiven)}</td>
          <td class="money">${money(advancesGiven)}</td>
          <td class="money">${money(totalGiven)}</td>
          <td class="money">${money(currentMonthSalary)}</td>
          <td class="money">${money(currentMonthAdvance)}</td>
          <td class="money">${money(currentMonthPending)}</td>
        </tr>`;
    })
    .join('');
}

function renderInvestmentRows(rows) {
  if (!investmentTbody) return;
  const canDelete = hasPermission('investments:delete');
  investmentTbody.innerHTML = rows
    .map(
      (r) => `<tr>
          <td>${r.date}</td>
          <td>${partyLabel(r.party)}</td>
          <td class="money">${money(r.amount)}</td>
          <td>${r.note || '-'}</td>
          <td>${canDelete ? `<button type="button" class="small danger inv-del" data-id="${r.id}">Delete</button>` : '-'}</td>
        </tr>`
    )
    .join('');

  if (canDelete) {
    document.querySelectorAll('.inv-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this investment?')) return;
        try {
          await api(`/api/investments/${id}`, 'DELETE');
          await refresh();
          showToast('Investment deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderInvestmentSummary() {
  const narayanInvestment = investmentsCache
    .filter((r) => r.party === 'narayan')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const maaInvestment = investmentsCache
    .filter((r) => r.party === 'maa_vaishno')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const narayanExpense = expensesCache
    .filter((r) => r.party === 'narayan')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const maaExpense = expensesCache
    .filter((r) => r.party === 'maa_vaishno')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const narayanTruckSales = trucksCache
    .filter((r) => r.party === 'narayan')
    .reduce((sum, r) => sum + Number(r.totalAmount || 0), 0);
  const maaTruckSales = trucksCache
    .filter((r) => r.party === 'maa_vaishno')
    .reduce((sum, r) => sum + Number(r.totalAmount || 0), 0);
  const narayanNet = narayanInvestment + narayanExpense - narayanTruckSales;
  const maaNet = maaInvestment + maaExpense - maaTruckSales;

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(value);
  };
  set('invNarayanInvestment', narayanInvestment);
  set('invNarayanExpense', narayanExpense);
  set('invNarayanTruckSales', narayanTruckSales);
  set('invNarayanNet', narayanNet);
  set('invMaaInvestment', maaInvestment);
  set('invMaaExpense', maaExpense);
  set('invMaaTruckSales', maaTruckSales);
  set('invMaaNet', maaNet);
}

function renderChiniRows(rows) {
  const canDelete = hasPermission('chini:delete');
  const narayanTotal = rows
    .filter((r) => r.party === 'narayan')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const maaVaishnoTotal = rows
    .filter((r) => r.party === 'maa_vaishno')
    .reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const totalsEl = document.getElementById('chiniPartyTotals');
  if (totalsEl) {
    totalsEl.innerHTML = `
      <div class="party-total"><span class="label">Narayan Total</span><div class="value">${money(narayanTotal)}</div></div>
      <div class="party-total"><span class="label">Maa Vaishno Total</span><div class="value">${money(maaVaishnoTotal)}</div></div>
    `;
  }

  chiniTbody.innerHTML = rows
    .map(
      (r) => `<tr>
          <td>${r.date}</td>
          <td>${partyLabel(r.party)}</td>
          <td>${r.description || '-'}</td>
          <td class="money">${money(r.amount)}</td>
          <td>${canDelete ? `<button type="button" class="small danger chi-del" data-id="${r.id}">Delete</button>` : '-'}</td>
        </tr>`
    )
    .join('');

  if (canDelete) {
    document.querySelectorAll('.chi-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this chini expense?')) return;
        try {
          await api(`/api/chini-expenses/${id}`, 'DELETE');
          await refresh();
          showToast('Chini expense deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderLandRows(rows) {
  const canEdit = hasPermission('land:update');
  const canDelete = hasPermission('land:delete');
  const totalPaid = rows.reduce((sum, r) => sum + Number(r.amountPaid || 0), 0);
  const totalRemaining = rows.reduce((sum, r) => sum + Number(r.amountToBeGiven || 0), 0);
  const totalPaidEl = document.getElementById('landTotalPaid');
  const totalEl = document.getElementById('landTotalRemaining');
  if (totalPaidEl) totalPaidEl.textContent = money(totalPaid);
  if (totalEl) totalEl.textContent = money(totalRemaining);

  landTbody.innerHTML = rows
    .map(
      (r) => `<tr>
          <td>${r.area}</td>
          <td>${r.ownerName}</td>
          <td class="money">${money(r.amountPaid)}</td>
          <td class="money">${money(r.amountToBeGiven)}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn land-edit" data-id="${r.id}">Edit</button>` : ''}
              ${canDelete ? `<button type="button" class="small danger land-del" data-id="${r.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`
    )
    .join('');

  if (canEdit) {
    document.querySelectorAll('.land-edit').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const current = landRecordsCache.find((r) => r.id === id);
        if (!current) return;
        editingLandId = id;
        landForm.querySelector('input[name="area"]').value = current.area || '';
        landForm.querySelector('input[name="ownerName"]').value = current.ownerName || '';
        landForm.querySelector('input[name="amountPaid"]').value =
          current.amountPaid != null ? String(current.amountPaid) : '';
        landForm.querySelector('input[name="amountToBeGiven"]').value =
          current.amountToBeGiven != null ? String(current.amountToBeGiven) : '';
        const submitBtn = landForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Land Record';
        landForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Land record loaded. Update values and click "Update Land Record".');
      });
    });
  }

  if (canDelete) {
    document.querySelectorAll('.land-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this land record?')) return;
        try {
          await api(`/api/lands/${id}`, 'DELETE');
          await refresh();
          showToast('Land record deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderVehicleRows(rows) {
  if (!vehicleTbody) return;
  const canEdit = hasPermission('vehicles:update');
  const canDelete = hasPermission('vehicles:delete');
  const totalMonthly = rows.reduce((sum, r) => sum + Number(r.monthlyPrice || 0), 0);
  const totalPaid = rows.reduce((sum, r) => sum + Number(r.amountPaid || 0), 0);
  const totalPending = rows.reduce((sum, r) => sum + Math.max(0, Number(r.monthlyPrice || 0) - Number(r.amountPaid || 0)), 0);
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(value);
  };
  set('vehicleMonthlyTotal', totalMonthly);
  set('vehiclePaidTotal', totalPaid);
  set('vehiclePendingTotal', totalPending);

  vehicleTbody.innerHTML = rows
    .map(
      (r) => `<tr>
          <td>${r.vehicleName}</td>
          <td>${r.vehicleNumber}</td>
          <td class="money">${money(r.monthlyPrice || 0)}</td>
          <td>${r.serviceDueDate || '-'}</td>
          <td>${r.lastServiceDate || '-'}</td>
          <td>${r.paymentStatus || '-'}</td>
          <td class="money">${money(r.amountPaid || 0)}</td>
          <td>${r.note || '-'}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn veh-edit" data-id="${r.id}">Edit</button>` : ''}
              ${canDelete ? `<button type="button" class="small danger veh-del" data-id="${r.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`
    )
    .join('');

  if (canEdit) {
    document.querySelectorAll('.veh-edit').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const current = vehiclesCache.find((v) => v.id === id);
        if (!current) return;
        const vehicleName = prompt('Vehicle Name', current.vehicleName || '');
        if (!vehicleName) return;
        const vehicleNumber = prompt('Vehicle Number', current.vehicleNumber || '');
        if (!vehicleNumber) return;
        const monthlyPrice = prompt('Monthly Price', String(current.monthlyPrice || 0));
        if (!monthlyPrice) return;
        const serviceDueDate = prompt('Service Due Date (YYYY-MM-DD)', current.serviceDueDate || '') || '';
        const lastServiceDate = prompt('Last Service Date (YYYY-MM-DD)', current.lastServiceDate || '') || '';
        const paymentStatus = prompt('Payment Status (pending/partial/paid)', current.paymentStatus || 'pending') || 'pending';
        const amountPaid = prompt('Amount Paid', String(current.amountPaid || 0)) || '0';
        const note = prompt('Note', current.note || '') || '';
        try {
          await api(`/api/vehicles/${id}`, 'PUT', {
            vehicleName,
            vehicleNumber,
            monthlyPrice,
            serviceDueDate,
            lastServiceDate,
            paymentStatus,
            amountPaid,
            note
          });
          await refresh();
          showToast('Vehicle updated');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }

  if (canDelete) {
    document.querySelectorAll('.veh-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this vehicle record?')) return;
        try {
          await api(`/api/vehicles/${id}`, 'DELETE');
          await refresh();
          showToast('Vehicle deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function fillBillCompanyFields(company) {
  if (!company) return;
  if (billCompanyGstNoInput) billCompanyGstNoInput.value = normalizeGstNo(company.gstNo || '');
  if (billCompanyNameInput) billCompanyNameInput.value = company.companyName || '';
  if (billCompanyAddressInput) billCompanyAddressInput.value = company.address || '';
  if (billCompanyStateInput) billCompanyStateInput.value = company.state || '';
  if (billCompanyStateCodeInput) billCompanyStateCodeInput.value = company.stateCode || '';
  if (billCompanyContactInput) billCompanyContactInput.value = company.contactPerson || '';
  if (billCompanyPhoneInput) billCompanyPhoneInput.value = company.phone || '';
  if (billCompanyEmailInput) billCompanyEmailInput.value = company.email || '';
}

function setBillEditingMode(isEditing) {
  if (billSubmitBtn) billSubmitBtn.textContent = isEditing ? 'Update Bill & Generate PDF' : 'Save Bill & Generate PDF';
  if (cancelBillEditBtn) cancelBillEditBtn.classList.toggle('hidden', !isEditing);
}

function resetBillFormState() {
  editingBillId = null;
  if (billForm) billForm.reset();
  billItemsState = [emptyBillItem()];
  renderBillItems();
  setDefaultDates();
  setBillEditingMode(false);
}

function loadBillIntoForm(bill) {
  if (!billForm || !bill) return;
  const company = bill.company || {};
  editingBillId = bill.id;
  billForm.querySelector('input[name="invoiceNo"]').value = bill.invoiceNo || '';
  billForm.querySelector('input[name="billDate"]').value = bill.billDate || todayISO();
  billForm.querySelector('input[name="dueDate"]').value = bill.dueDate || '';
  billForm.querySelector('input[name="vehicleNo"]').value = bill.vehicleNo || '';
  const placeInput = billForm.querySelector('input[name="placeOfSupply"]');
  if (placeInput) placeInput.value = bill.placeOfSupply || '';
  const notesInput = billForm.querySelector('textarea[name="notes"]');
  if (notesInput) notesInput.value = bill.notes || '';
  const reverseInput = billForm.querySelector('input[name="reverseCharge"]');
  if (reverseInput) reverseInput.checked = Boolean(bill.reverseCharge);
  fillBillCompanyFields(company);
  const loadedItems = Array.isArray(bill.items)
    ? bill.items.map((item) => ({
      description: item.description || '',
      hsnSac: item.hsnSac || '',
      unit: item.unit || 'Nos',
      quantity: Number(item.quantity || 0),
      rate: Number(item.rate || 0),
      gstPercent: Number(item.gstPercent || 0)
    }))
    : [];
  billItemsState = loadedItems.length ? loadedItems : [emptyBillItem()];
  renderBillItems();
  setBillEditingMode(true);
  billForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateBillTotals() {
  const totals = calcBillTotals(billItemsState);
  if (billSubtotalEl) billSubtotalEl.textContent = money(totals.subtotal);
  if (billTotalGstEl) billTotalGstEl.textContent = money(totals.totalGst);
  if (billGrandTotalEl) billGrandTotalEl.textContent = money(totals.grandTotal);
}

function renderBillItems() {
  if (!billItemsTbody) return;
  if (!billItemsState.length) billItemsState = [emptyBillItem()];

  billItemsTbody.innerHTML = billItemsState
    .map((item, index) => {
      const qty = Number(item.quantity || 0);
      const rate = Number(item.rate || 0);
      const gstPercent = Number(item.gstPercent || 0);
      const taxable = qty * rate;
      const lineTotal = taxable + (taxable * gstPercent) / 100;
      return `
        <tr data-index="${index}">
          <td>${index + 1}</td>
          <td><input class="bill-item-input" data-field="description" value="${escapeHtml(item.description || '')}" placeholder="Item description" /></td>
          <td><input class="bill-item-input" data-field="hsnSac" value="${escapeHtml(item.hsnSac || '')}" placeholder="HSN/SAC" /></td>
          <td><input class="bill-item-input" data-field="unit" value="${escapeHtml(item.unit || '')}" placeholder="Unit" /></td>
          <td><input class="bill-item-input" data-field="quantity" type="number" min="0.01" step="0.01" value="${qty}" /></td>
          <td><input class="bill-item-input" data-field="rate" type="number" min="0" step="0.01" value="${rate}" /></td>
          <td><input class="bill-item-input" data-field="gstPercent" type="number" min="0" step="0.01" value="${gstPercent}" /></td>
          <td class="money">${money(taxable)}</td>
          <td class="money">${money(lineTotal)}</td>
          <td><button type="button" class="small danger bill-item-del" data-index="${index}">Delete</button></td>
        </tr>
      `;
    })
    .join('');

  document.querySelectorAll('.bill-item-input').forEach((input) => {
    input.addEventListener('input', () => {
      const row = input.closest('tr');
      const index = Number(row?.dataset.index);
      const field = input.dataset.field;
      if (!Number.isInteger(index) || !field || !billItemsState[index]) return;
      if (['quantity', 'rate', 'gstPercent'].includes(field)) {
        billItemsState[index][field] = Number(input.value || 0);
      } else {
        billItemsState[index][field] = input.value;
      }
      const current = billItemsState[index] || emptyBillItem();
      const taxable = Number(current.quantity || 0) * Number(current.rate || 0);
      const lineTotal = taxable + (taxable * Number(current.gstPercent || 0)) / 100;
      if (row?.cells?.[7]) row.cells[7].textContent = money(taxable);
      if (row?.cells?.[8]) row.cells[8].textContent = money(lineTotal);
      updateBillTotals();
    });
  });

  document.querySelectorAll('.bill-item-del').forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      if (!Number.isInteger(index)) return;
      billItemsState = billItemsState.filter((_, i) => i !== index);
      if (!billItemsState.length) billItemsState = [emptyBillItem()];
      renderBillItems();
      updateBillTotals();
    });
  });
  updateBillTotals();
}

function filterBills(rows) {
  const q = (billSearchInput?.value || '').trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((bill) => {
    const company = bill.company || {};
    return `${bill.invoiceNo || ''} ${bill.billDate || ''} ${company.companyName || ''} ${company.gstNo || ''}`
      .toLowerCase()
      .includes(q);
  });
}

function renderBills(rows) {
  if (!billTbody) return;
  const canEdit = hasPermission('billing:update');
  const canDelete = hasPermission('billing:delete');
  billTbody.innerHTML = rows
    .map((bill) => {
      const company = bill.company || {};
      return `
        <tr>
          <td>${bill.billDate || '-'}</td>
          <td>${escapeHtml(bill.invoiceNo || '-')}</td>
          <td>${escapeHtml(company.companyName || '-')}</td>
          <td>${escapeHtml(company.gstNo || '-')}</td>
          <td class="money">${money(bill.subtotal || 0)}</td>
          <td class="money">${money(bill.totalGst || 0)}</td>
          <td class="money">${money(bill.grandTotal || 0)}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn bill-edit" data-id="${bill.id}">Edit</button>` : ''}
              <button type="button" class="small bill-pdf" data-id="${bill.id}">PDF</button>
              ${canDelete ? `<button type="button" class="small danger bill-del" data-id="${bill.id}">Delete</button>` : ''}
            </div>
          </td>
        </tr>
      `;
    })
    .join('');

  document.querySelectorAll('.bill-pdf').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      window.open(urlWithAuth(`/api/bills/${id}.pdf`), '_blank');
    });
  });

  if (canEdit) {
    document.querySelectorAll('.bill-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const bill = billsCache.find((row) => String(row.id) === String(id));
        if (!bill) return;
        loadBillIntoForm(bill);
        showToast('Bill loaded in form for editing');
      });
    });
  }

  if (canDelete) {
    document.querySelectorAll('.bill-del').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (!confirm('Delete this bill?')) return;
        try {
          await api(`/api/bills/${id}`, 'DELETE');
          await refresh();
          showToast('Bill deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
      });
    });
  }
}

function renderBillingCompanies(rows) {
  if (!billCompanyTbody) return;
  billCompanyTbody.innerHTML = rows
    .map(
      (company) => `<tr>
        <td>${escapeHtml(company.gstNo || '-')}</td>
        <td>${escapeHtml(company.companyName || '-')}</td>
        <td>${escapeHtml(company.contactPerson || '-')}</td>
        <td>${escapeHtml(company.phone || '-')}</td>
        <td>${escapeHtml(company.state || '-')}</td>
        <td>${escapeHtml(company.address || '-')}</td>
      </tr>`
    )
    .join('');
}

function filterEmployees(rows) {
  const q = (employeeSearchInput.value || '').trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((e) => `${e.name} ${e.role}`.toLowerCase().includes(q));
}

function filterTrucks(rows) {
  const q = (truckSearchInput.value || '').trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((t) =>
    `${t.truckNumber} ${t.driverName || ''} ${t.rawMaterial} ${partyLabel(t.party)} ${t.quantity || ''} ${t.origin || ''} ${t.destination || ''}`
      .toLowerCase()
      .includes(q)
  );
}

function urlWithAuth(url) {
  const t = token();
  if (!t) return url;
  const delim = url.includes('?') ? '&' : '?';
  return `${url}${delim}token=${encodeURIComponent(t)}`;
}

function activateSection(sectionId) {
  document.querySelectorAll('.section-view').forEach((el) => {
    el.classList.toggle('active-view', el.id === sectionId);
  });
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === sectionId);
  });
}

async function refresh() {
  if (refreshInFlight) return refreshInFlight;
  const task = (async () => {
    const month = getActiveSalaryMonth();
    const refreshErrors = [];
    const safeLoad = async (label, promise, fallback) => {
      try {
        return await promise;
      } catch (err) {
        console.error(`[refresh:${label}]`, err);
        refreshErrors.push(`${label}: ${err.message}`);
        return fallback;
      }
    };

    const requests = [
      hasPermission('dashboard:view')
        ? safeLoad('dashboard', api(`/api/dashboard?month=${month}&today=${todayISO()}`), null)
        : Promise.resolve(null),
      hasPermission('employees:view') ? safeLoad('employees', api('/api/employees'), []) : Promise.resolve([]),
      hasPermission('salary:view')
        ? safeLoad('salary', api(`/api/salary-summary?month=${month}`), { rows: [] })
        : Promise.resolve({ rows: [] }),
      hasPermission('salaryledger:view') ? safeLoad('salary-ledgers', api('/api/salary-ledgers'), []) : Promise.resolve([]),
      hasPermission('trucks:view') ? safeLoad('trucks', api('/api/trucks'), []) : Promise.resolve([]),
      hasPermission('expenses:view') ? safeLoad('expenses', api('/api/expenses'), []) : Promise.resolve([]),
      hasPermission('investments:view') ? safeLoad('investments', api('/api/investments'), []) : Promise.resolve([]),
      hasPermission('chini:view') ? safeLoad('chini', api('/api/chini-expenses'), []) : Promise.resolve([]),
      hasPermission('land:view') ? safeLoad('land', api('/api/lands'), []) : Promise.resolve([]),
      hasPermission('vehicles:view') ? safeLoad('vehicles', api('/api/vehicles'), []) : Promise.resolve([]),
      hasPermission('billing:view')
        ? safeLoad('billing-companies', api('/api/billing/companies'), [])
        : Promise.resolve([]),
      hasPermission('billing:view') ? safeLoad('bills', api('/api/bills'), []) : Promise.resolve([]),
      hasPermission('suppliers:view') ? safeLoad('suppliers', api('/api/suppliers'), []) : Promise.resolve([]),
      hasPermission('attendance:report')
        ? safeLoad('attendance-report', api(`/api/attendance-report?month=${attendanceMonthInput.value || month}`), { rows: [] })
        : Promise.resolve({ rows: [] })
    ];

    const [
      dashboard,
      employees,
      salary,
      salaryLedgers,
      trucks,
      expenses,
      investments,
      chiniExpenses,
      landRecords,
      vehicles,
      billingCompanies,
      bills,
      suppliers,
      attendanceReport
    ] = await Promise.all(requests);

    if (dashboard) {
      renderCards(dashboard);
      lastRefreshedEl.textContent = `Last refreshed: ${formatLastRefreshed()}`;
      lastRefreshedWrap.classList.toggle('hidden', !hasPermission('dashboard:view'));
    } else {
      cardsEl.innerHTML = '';
      lastRefreshedWrap.classList.add('hidden');
    }

    employeesCache = employees || [];
    trucksCache = trucks || [];
    expensesCache = expenses || [];
    investmentsCache = investments || [];
    chiniExpensesCache = chiniExpenses || [];
    landRecordsCache = landRecords || [];
    vehiclesCache = vehicles || [];
    billingCompaniesCache = billingCompanies || [];
    billsCache = bills || [];
    suppliersCache = suppliers || [];
    salaryRowsCache = (salary && salary.rows) || [];
    salaryLedgersCache = salaryLedgers || [];

    renderEmployeeOptions(employeesCache);
    renderEmployeeRows(filterEmployees(employeesCache));
    renderSalaryRows(salaryRowsCache);
    renderSalarySummaries(salaryRowsCache);
    renderSalaryLedgers(salaryLedgersCache);
    renderTruckRows(filterTrucks(trucksCache).sort((a, b) => (a.date < b.date ? 1 : -1)));
    renderExpenseRows(expensesCache);
    renderExpenseSalaryGiven();
    renderInvestmentRows(investmentsCache);
    renderInvestmentSummary();
    renderChiniRows(chiniExpensesCache);
    renderLandRows(landRecordsCache);
    renderVehicleRows(vehiclesCache);
    renderBillingCompanies(billingCompaniesCache);
    renderBills(filterBills(billsCache));
    renderSuppliers(suppliersCache);
    renderAttendanceReportRows((attendanceReport && attendanceReport.rows) || []);

    if (activeSupplierId && supplierDetailPanel && !supplierDetailPanel.classList.contains('hidden')) {
      const sup = suppliersCache.find((s) => s.id === activeSupplierId);
      if (sup) {
        safeLoad(`supplier-transactions:${activeSupplierId}`, api(`/api/suppliers/${activeSupplierId}/transactions`), [])
          .then((txs) => renderSupplierTransactions(txs, sup))
          .catch(console.error);
      }
    }

    if (refreshErrors.length) {
      const now = Date.now();
      if (now - lastRefreshErrorToastAt > 30000) {
        lastRefreshErrorToastAt = now;
        showToast(`Refresh partial: ${refreshErrors[0]}`, 'error');
      }
    }
  })();

  refreshInFlight = task;
  try {
    await task;
  } finally {
    if (refreshInFlight === task) refreshInFlight = null;
  }
}

async function bootstrapSession() {
  if (!token()) {
    setVisibility(false);
    return;
  }

  try {
    me = await api('/api/me');
    setVisibility(true);
    applyRoleUI();
    setDefaultDates();
    await refresh();
    ensureAutoRefresh();
    initSorting();
  } catch (err) {
    showToast(err.message, 'error');
    setVisibility(false);
  }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(loginForm);

  try {
    const result = await api('/api/login', 'POST', {
      username: fd.get('username'),
      password: fd.get('password')
    });

    setToken(result.token);
    me = result.user;
    me.storageMode = result.storageMode;
    setVisibility(true);
    applyRoleUI();
    setDefaultDates();
    await refresh();
    ensureAutoRefresh();
    loginForm.reset();
    showToast('Welcome to Narayan Enterprises dashboard');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

logoutBtn.addEventListener('click', async () => {
  try {
    await api('/api/logout', 'POST');
  } catch (_err) {
    // Ignore logout API failure and clear local session anyway.
  }

  setToken('');
  me = null;
  employeesCache = [];
  trucksCache = [];
  expensesCache = [];
  investmentsCache = [];
  chiniExpensesCache = [];
  landRecordsCache = [];
  vehiclesCache = [];
  billingCompaniesCache = [];
  billsCache = [];
  salaryLedgersCache = [];
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
  setVisibility(false);
  showToast('Logged out');
});

expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(expenseForm);

  try {
    const endpoint = editingExpenseId ? `/api/expenses/${editingExpenseId}` : '/api/expenses';
    const method = editingExpenseId ? 'PUT' : 'POST';
    await api(endpoint, method, {
      date: fd.get('date'),
      party: fd.get('party'),
      description: fd.get('description') || undefined,
      amount: fd.get('amount')
    });
    expenseForm.reset();
    editingExpenseId = null;
    const submitBtn = expenseForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Add Expense';
    if (expenseCancelEditBtn) expenseCancelEditBtn.classList.add('hidden');
    setDefaultDates();
    await refresh();
    showToast(method === 'PUT' ? 'Expense updated' : 'Expense added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

expenseCancelEditBtn?.addEventListener('click', () => {
  editingExpenseId = null;
  expenseForm.reset();
  const submitBtn = expenseForm.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.textContent = 'Add Expense';
  expenseCancelEditBtn.classList.add('hidden');
  setDefaultDates();
  showToast('Expense edit cancelled');
});

investmentForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(investmentForm);

  try {
    await api('/api/investments', 'POST', {
      date: fd.get('date'),
      party: fd.get('party'),
      amount: fd.get('amount'),
      note: fd.get('note') || undefined
    });
    investmentForm.reset();
    setDefaultDates();
    await refresh();
    showToast('Investment added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

chiniForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(chiniForm);
  try {
    await api('/api/chini-expenses', 'POST', {
      date: fd.get('date'),
      party: fd.get('party'),
      description: fd.get('description') || undefined,
      amount: fd.get('amount')
    });
    chiniForm.reset();
    setDefaultDates();
    await refresh();
    showToast('Chini expense added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

async function lookupBillingCompanyByGst() {
  const gstNo = normalizeGstNo(billCompanyGstNoInput?.value || '');
  if (!gstNo) {
    showToast('Enter GST number first', 'error');
    return;
  }
  if (billCompanyGstNoInput) billCompanyGstNoInput.value = gstNo;
  try {
    const result = await api(`/api/billing/companies?gstNo=${encodeURIComponent(gstNo)}`);
    if (result && result.company) {
      fillBillCompanyFields(result.company);
      if (result.source === 'online') {
        showToast('Company fetched online and saved in your system');
      } else {
        showToast('Company details loaded by GST');
      }
      return;
    }
    showToast('GST not found locally or online. Fill details manually.');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

billGstLookupBtn?.addEventListener('click', () => {
  lookupBillingCompanyByGst().catch((err) => showToast(err.message, 'error'));
});

billCompanyGstNoInput?.addEventListener('change', () => {
  const gst = normalizeGstNo(billCompanyGstNoInput.value);
  billCompanyGstNoInput.value = gst;
  if (gst.length === 15) {
    lookupBillingCompanyByGst().catch((err) => showToast(err.message, 'error'));
  }
});

addBillItemBtn?.addEventListener('click', () => {
  billItemsState.push(emptyBillItem());
  renderBillItems();
});

billForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(billForm);
  const isEditing = Boolean(editingBillId);
  const payload = {
    invoiceNo: String(fd.get('invoiceNo') || '').trim(),
    billDate: String(fd.get('billDate') || ''),
    dueDate: String(fd.get('dueDate') || ''),
    vehicleNo: String(fd.get('vehicleNo') || '').trim(),
    placeOfSupply: String(fd.get('placeOfSupply') || '').trim(),
    reverseCharge: fd.get('reverseCharge') === 'on',
    notes: String(fd.get('notes') || '').trim(),
    company: {
      gstNo: normalizeGstNo(fd.get('gstNo')),
      companyName: String(fd.get('companyName') || '').trim(),
      address: String(fd.get('address') || '').trim(),
      state: String(fd.get('state') || '').trim(),
      stateCode: String(fd.get('stateCode') || '').trim(),
      contactPerson: String(fd.get('contactPerson') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      email: String(fd.get('email') || '').trim()
    },
    items: billItemsState
      .map((item) => ({
        description: String(item.description || '').trim(),
        hsnSac: String(item.hsnSac || '').trim(),
        unit: String(item.unit || '').trim(),
        quantity: Number(item.quantity || 0),
        rate: Number(item.rate || 0),
        gstPercent: Number(item.gstPercent || 0)
      }))
      .filter((item) => item.description && item.quantity > 0 && item.rate >= 0)
  };

  if (!payload.items.length) {
    showToast('Add at least one valid bill item', 'error');
    return;
  }

  try {
    const row = isEditing
      ? await api(`/api/bills/${encodeURIComponent(editingBillId)}`, 'PUT', payload)
      : await api('/api/bills', 'POST', payload);
    resetBillFormState();
    await refresh();
    showToast(isEditing ? 'Bill updated' : 'Bill saved');
    if (row?.id) {
      window.open(urlWithAuth(`/api/bills/${row.id}.pdf`), '_blank');
    }
  } catch (err) {
    showToast(err.message, 'error');
  }
});

cancelBillEditBtn?.addEventListener('click', () => {
  resetBillFormState();
  showToast('Edit cancelled');
});

billSearchInput?.addEventListener('input', () => {
  renderBills(filterBills(billsCache));
});

// --- Supplier Management Functions ---

function setSupplierTransactionTypeUI() {
  const isTruck = (txTypeSelect?.value || 'truck') === 'truck';
  if (txTruckFields) {
    txTruckFields.classList.toggle('hidden', !isTruck);
    txTruckFields.querySelectorAll('input').forEach((el) => {
      el.disabled = !isTruck;
    });
  }
  if (txPaidNowInput) {
    txPaidNowInput.disabled = !isTruck;
    if (!isTruck) txPaidNowInput.value = '0';
  }
  if (txTrolleyInput) {
    txTrolleyInput.disabled = !isTruck;
    if (!isTruck) txTrolleyInput.value = '';
  }
}

function syncSupplierQuantityFromTrolleys() {
  if (!txTypeSelect || txTypeSelect.value !== 'truck' || !txQuantityInput) return;
  const qty = Number(txQuantityInput.value || 0);
  if (Number.isFinite(qty) && qty > 0) return;
  const trolleys = Number(txTrolleyInput?.value || 0);
  if (Number.isFinite(trolleys) && trolleys > 0) {
    txQuantityInput.value = String(trolleys);
  }
}

function autoComputeSupplierAmount() {
  if (!txAmountInput || !txTypeSelect || txTypeSelect.value !== 'truck') return;
  syncSupplierQuantityFromTrolleys();
  const qty = Number(txQuantityInput?.value || 0);
  const rate = Number(txRateInput?.value || 0);
  if (Number.isFinite(qty) && qty > 0 && Number.isFinite(rate) && rate >= 0) {
    txAmountInput.value = (qty * rate).toFixed(2);
  }
}

function renderSuppliers(rows) {
  if (!supplierGrid) return;
  const canDelete = hasPermission('suppliers:delete');
  supplierGrid.innerHTML = rows
    .map((s) => {
      const initials = getInitials(s.name);
      const totalToGive = Number(s.totalToGive != null ? s.totalToGive : Number(s.openingBalance || 0) + Number(s.totalMaterialAmount || 0));
      return `
        <div class="employee-card supplier-card" onclick="viewSupplierDetail('${s.id}')">
          <div class="employee-header">
            <div class="avatar supplier-avatar">${initials}</div>
            <div class="employee-info">
              <h3>${escapeHtml(s.name || '-')}</h3>
              <span class="role-badge supplier-role">${escapeHtml(s.materialType || 'Supplier')}</span>
            </div>
          </div>
          <div class="employee-stats">
            <div class="stat-item">
              <span class="stat-label">Phone</span>
              <span class="stat-value">${escapeHtml(s.phone || '-')}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Opening</span>
              <span class="stat-value money">${money(s.openingBalance || 0)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Material Value</span>
              <span class="stat-value money">${money(s.totalMaterialAmount || 0)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Paid</span>
              <span class="stat-value money">${money(s.totalPaid || 0)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total To Give</span>
              <span class="stat-value money">${money(totalToGive)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Pending Balance</span>
              <span class="stat-value money supplier-pending">${money(s.balance || 0)}</span>
            </div>
          </div>
          <div class="employee-actions">
            ${canDelete ? `<button class="small danger stop-prop" onclick="deleteSupplier(event, '${s.id}')">Delete</button>` : ''}
          </div>
        </div>
      `;
    })
    .join('');
}

window.viewSupplierDetail = async (id) => {
  const supplier = suppliersCache.find((s) => s.id === id);
  if (!supplier) return;
  activeSupplierId = id;
  supplierListPanel?.classList.add('hidden');
  supplierDetailPanel?.classList.remove('hidden');
  if (supplierDetailName) supplierDetailName.textContent = supplier.name;
  if (txSupplierIdInput) txSupplierIdInput.value = id;

  try {
    const txs = await api(`/api/suppliers/${id}/transactions`);
    renderSupplierTransactions(txs, supplier);
  } catch (err) {
    showToast(err.message, 'error');
  }
};

function supplierTxDetails(tx) {
  if (tx.type === 'truck') {
    const qtyText = tx.quantity != null ? tx.quantity : '-';
    const rateText = tx.rate != null ? money(tx.rate) : '-';
    const paidNowText = tx.paidNow != null ? money(tx.paidNow || 0) : money(0);
    const trolleyText = tx.trolleyCount != null ? tx.trolleyCount : '-';
    return `Truck: ${tx.truckNumber || '-'} | Challan: ${tx.challanNo || '-'} | Mat: ${tx.material || '-'} | Trolleys: ${trolleyText} | Qty: ${qtyText} | Rate: ${rateText} | Paid Now: ${paidNowText}`;
  }
  const mode = tx.paymentMode || '-';
  const ref = tx.paymentRef || '-';
  return `Mode: ${mode} | Ref: ${ref} | ${tx.note || 'Payment Entry'}`;
}

function smsReasonText(reason) {
  const key = String(reason || '').trim().toLowerCase();
  if (key === 'provider_not_configured') return 'SMS gateway not configured';
  if (key === 'phone_or_message_missing') return 'supplier phone number missing';
  if (key === 'not_requested') return 'SMS not requested';
  if (!key) return 'unknown reason';
  return key.replace(/_/g, ' ');
}

function renderSupplierTransactions(txs, supplier) {
  if (supplier) {
    if (supTotalMaterialEl) supTotalMaterialEl.textContent = money(supplier.totalMaterialAmount || 0);
    if (supTotalPaidEl) supTotalPaidEl.textContent = money(supplier.totalPaid || 0);
    const totalToGive = Number(supplier.totalToGive != null ? supplier.totalToGive : Number(supplier.openingBalance || 0) + Number(supplier.totalMaterialAmount || 0));
    if (supTotalToGiveEl) supTotalToGiveEl.textContent = money(totalToGive);
    if (supPendingBalanceEl) supPendingBalanceEl.textContent = money(supplier.balance || 0);
  }
  if (!supplierTxTbody) return;
  const canDelete = hasPermission('suppliers:delete');
  supplierTxTbody.innerHTML = (txs || [])
    .map((tx) => {
      const isTruck = tx.type === 'truck';
      const badgeClass = isTruck ? 'truck' : 'payment';
      const amountClass = isTruck ? 'danger' : 'success';
      const entryPaid = Number(tx.entryPaid != null ? tx.entryPaid : (isTruck ? tx.paidNow || 0 : tx.amount || 0));
      const entryRemaining = Number(
        tx.entryRemaining != null ? tx.entryRemaining : isTruck ? Math.max(0, Number(tx.amount || 0) - Number(tx.paidNow || 0)) : 0
      );
      const entryRemainingClass = entryRemaining > 0 ? 'tx-amount-danger' : 'tx-amount-success';
      return `
        <tr>
          <td>${escapeHtml(tx.date || '-')}</td>
          <td><span class="tx-badge ${badgeClass}">${escapeHtml(tx.type || '-')}</span></td>
          <td>${escapeHtml(supplierTxDetails(tx))}</td>
          <td class="money tx-amount-${amountClass}">${money(tx.amount || 0)}</td>
          <td class="money tx-amount-success">${money(entryPaid)}</td>
          <td class="money ${entryRemainingClass}">${money(entryRemaining)}</td>
          <td class="money">${money(tx.balanceAfter || 0)}</td>
          <td>
            <button class="small" onclick="openSupplierReceipt('${tx.id}')">Print PDF</button>
          </td>
          <td>
            ${canDelete ? `<button class="small danger" onclick="deleteSupplierTx('${tx.id}')">Del</button>` : ''}
          </td>
        </tr>
      `;
    })
    .join('');
}

window.openSupplierReceipt = (id) => {
  window.open(urlWithAuth(`/api/supplier-transactions/${id}/receipt.pdf`), '_blank');
};

window.deleteSupplier = async (e, id) => {
  e.stopPropagation();
  if (!confirm('Delete this supplier and all transactions?')) return;
  try {
    await api(`/api/suppliers/${id}`, 'DELETE');
    if (activeSupplierId === id) {
      activeSupplierId = null;
      supplierDetailPanel?.classList.add('hidden');
      supplierListPanel?.classList.remove('hidden');
    }
    await refresh();
    showToast('Supplier deleted');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

window.deleteSupplierTx = async (id) => {
  if (!confirm('Delete this transaction?')) return;
  try {
    await api(`/api/supplier-transactions/${id}`, 'DELETE');
    await refresh();
    showToast('Transaction deleted');
  } catch (err) {
    showToast(err.message, 'error');
  }
};

backToSuppliersBtn?.addEventListener('click', () => {
  activeSupplierId = null;
  supplierDetailPanel?.classList.add('hidden');
  supplierListPanel?.classList.remove('hidden');
});

txTypeSelect?.addEventListener('change', () => {
  setSupplierTransactionTypeUI();
});
txTrolleyInput?.addEventListener('input', autoComputeSupplierAmount);
txQuantityInput?.addEventListener('input', autoComputeSupplierAmount);
txRateInput?.addEventListener('input', autoComputeSupplierAmount);

supplierForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(supplierForm);
  const openingBalanceRaw = Number(fd.get('openingBalance'));
  const openingBalance = Number.isFinite(openingBalanceRaw) ? openingBalanceRaw : 0;
  try {
    await api('/api/suppliers', 'POST', {
      name: fd.get('name'),
      phone: fd.get('phone'),
      alternatePhone: fd.get('alternatePhone'),
      email: fd.get('email'),
      gstNo: fd.get('gstNo'),
      address: fd.get('address'),
      materialType: fd.get('materialType'),
      paymentTerms: fd.get('paymentTerms'),
      openingBalance
    });
    supplierForm.reset();
    const openingInput = supplierForm.querySelector('input[name="openingBalance"]');
    if (openingInput) openingInput.value = '0';
    await refresh();
    showToast('Supplier added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

supplierTransactionForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!activeSupplierId) {
    showToast('Open a supplier first', 'error');
    return;
  }
  const fd = new FormData(supplierTransactionForm);
  const toOptionalNumber = (value) => {
    if (value == null) return null;
    const text = String(value).trim();
    if (!text) return null;
    const num = Number(text);
    return Number.isFinite(num) ? num : null;
  };
  const amountNumber = toOptionalNumber(fd.get('amount'));
  const amount = amountNumber == null ? fd.get('amount') : amountNumber;
  const paidNow = toOptionalNumber(fd.get('paidNow')) ?? 0;
  const quantity = toOptionalNumber(fd.get('quantity'));
  const rate = toOptionalNumber(fd.get('rate'));
  const trolleyCount = toOptionalNumber(fd.get('trolleyCount'));
  try {
    const result = await api(`/api/suppliers/${activeSupplierId}/transactions`, 'POST', {
      date: fd.get('date'),
      type: fd.get('type'),
      amount,
      paidNow,
      truckNumber: fd.get('truckNumber'),
      challanNo: fd.get('challanNo'),
      material: fd.get('material'),
      quantity,
      rate,
      trolleyCount,
      paymentMode: fd.get('paymentMode'),
      paymentRef: fd.get('paymentRef'),
      note: fd.get('note'),
      sendSms: fd.get('sendSms') === '1'
    });
    supplierTransactionForm.reset();
    setDefaultDates();
    if (txSupplierIdInput) txSupplierIdInput.value = activeSupplierId;
    setSupplierTransactionTypeUI();
    await refresh();

    let message = result?.autoPaymentTransaction
      ? 'Material and partial payment saved'
      : 'Transaction added';
    const sms = result?.sms;
    if (sms?.ok) {
      showToast(`${message} + SMS sent`);
      return;
    }
    if (sms?.skipped) {
      if (sms.reason === 'not_requested') {
        showToast(message);
        return;
      }
      showToast(`${message} (SMS not sent: ${smsReasonText(sms.reason)})`, 'error');
      return;
    }
    if (sms && !sms.ok) {
      showToast(`${message} (SMS failed: ${smsReasonText(sms.reason)})`, 'error');
      return;
    }
    showToast(message);
  } catch (err) {
    showToast(err.message, 'error');
  }
});

setSupplierTransactionTypeUI();

landForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(landForm);
  try {
    const endpoint = editingLandId ? `/api/lands/${editingLandId}` : '/api/lands';
    const method = editingLandId ? 'PUT' : 'POST';
    await api(endpoint, method, {
      area: fd.get('area'),
      ownerName: fd.get('ownerName'),
      amountPaid: fd.get('amountPaid'),
      amountToBeGiven: fd.get('amountToBeGiven')
    });
    landForm.reset();
    editingLandId = null;
    const submitBtn = landForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Add Land Record';
    await refresh();
    showToast(method === 'PUT' ? 'Land record updated' : 'Land record added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

vehicleForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(vehicleForm);
  try {
    await api('/api/vehicles', 'POST', {
      vehicleName: fd.get('vehicleName'),
      vehicleNumber: fd.get('vehicleNumber'),
      monthlyPrice: fd.get('monthlyPrice'),
      serviceDueDate: fd.get('serviceDueDate') || undefined,
      lastServiceDate: fd.get('lastServiceDate') || undefined,
      paymentStatus: fd.get('paymentStatus') || 'pending',
      amountPaid: fd.get('amountPaid') || 0,
      note: fd.get('note') || undefined
    });
    vehicleForm.reset();
    setDefaultDates();
    await refresh();
    showToast('Vehicle track added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

changePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(changePasswordForm);

  try {
    await api('/api/change-password', 'POST', {
      currentPassword: fd.get('currentPassword'),
      newPassword: fd.get('newPassword')
    });
    changePasswordForm.reset();
    showToast('Password updated successfully');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(employeeForm);

  try {
    await api('/api/employees', 'POST', {
      name: fd.get('name'),
      role: fd.get('role'),
      monthlySalary: fd.get('monthlySalary'),
      joiningDate: fd.get('joiningDate')
    });
    employeeForm.reset();
    setDefaultDates();
    await refresh();
    showToast('Employee added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

attendanceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(attendanceForm);

  try {
    await api('/api/attendance', 'POST', {
      employeeId: fd.get('employeeId'),
      date: fd.get('date'),
      status: fd.get('status')
    });
    await refresh();
    showToast('Attendance saved');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

advanceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(advanceForm);

  try {
    await api('/api/advances', 'POST', {
      employeeId: fd.get('employeeId'),
      date: fd.get('date'),
      amount: fd.get('amount'),
      note: fd.get('note')
    });
    advanceForm.reset();
    setDefaultDates();
    await refresh();
    showToast('Advance recorded');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

salaryLedgerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(salaryLedgerForm);
  const employeeId = String(fd.get('employeeId') || '');
  const autoRow = normalizeLedgerRow(
    salaryLedgersCache.find((r) => String(r.employeeId) === employeeId) || { employeeId }
  );
  const period1ToGive = Math.max(0, toNumber(fd.get('period1ToGive'), 0));
  const period1Paid = Math.max(0, toNumber(fd.get('period1Paid'), 0));
  const period2ToGive = Math.max(0, toNumber(autoRow.period2ToGive, 0));
  const period2Paid = Math.max(0, toNumber(autoRow.period2Paid, 0));

  if (period1Paid > period1ToGive) {
    showToast('Historical section paid cannot be greater than section total to give', 'error');
    return;
  }

  const totalPaid = round2(period1Paid + period2Paid);
  const totalToGive = round2(period1ToGive + period2ToGive);
  if (totalPaid > totalToGive) {
    showToast('Total Paid cannot be greater than Total To Give', 'error');
    return;
  }
  try {
    await api(`/api/salary-ledgers/${employeeId}`, 'PUT', {
      totalSalary: totalToGive,
      totalPaid,
      totalToGive,
      period1ToGive,
      period1Paid,
      period2ToGive,
      period2Paid,
      note: fd.get('note') || ''
    });
    await refresh();
    showToast('Salary ledger updated');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

function updateTruckTotal() {
  const priceEl = document.getElementById('truckPricePerQuintal');
  const qtyInput = truckForm.querySelector('input[name="quantity"]');
  const totalEl = document.getElementById('truckTotalAmount');
  const price = parseFloat(priceEl?.value) || 0;
  const qty = parseFloat(qtyInput?.value) || 0;
  totalEl.textContent = price > 0 && qty > 0 ? money(price * qty) : '—';
}

truckForm.querySelector('input[name="quantity"]')?.addEventListener('input', updateTruckTotal);
document.getElementById('truckPricePerQuintal')?.addEventListener('input', updateTruckTotal);

truckForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(truckForm);

  try {
    const endpoint = editingTruckId ? `/api/trucks/${editingTruckId}` : '/api/trucks';
    const method = editingTruckId ? 'PUT' : 'POST';
    await api(endpoint, method, {
      date: fd.get('date'),
      party: fd.get('party') || undefined,
      truckNumber: fd.get('truckNumber'),
      driverName: fd.get('driverName'),
      rawMaterial: fd.get('rawMaterial'),
      client: fd.get('client'),
      quantity: fd.get('quantity'),
      pricePerQuintal: fd.get('pricePerQuintal') || undefined,
      origin: fd.get('origin'),
      destination: fd.get('destination'),
      notes: fd.get('notes')
    });
    truckForm.reset();
    editingTruckId = null;
    const submitBtn = truckForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Add Truck Entry';
    setDefaultDates();
    updateTruckTotal();
    await refresh();
    showToast(method === 'PUT' ? 'Truck entry updated' : 'Truck entry added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

refreshAttendanceReportBtn.addEventListener('click', async () => {
  try {
    const month = attendanceMonthInput.value || monthISO();
    const report = await api(`/api/attendance-report?month=${month}`);
    renderAttendanceReportRows(report.rows || []);
    showToast('Attendance report loaded');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

attendanceMonthInput.addEventListener('change', async () => {
  try {
    const month = attendanceMonthInput.value || monthISO();
    const report = await api(`/api/attendance-report?month=${month}`);
    renderAttendanceReportRows(report.rows || []);
  } catch (err) {
    showToast(err.message, 'error');
  }
});

employeeSearchInput.addEventListener('input', () => {
  renderEmployeeRows(filterEmployees(employeesCache));
});

truckSearchInput.addEventListener('input', () => {
  renderTruckRows(filterTrucks(trucksCache).sort((a, b) => (a.date < b.date ? 1 : -1)));
});

expenseFilterBtn?.addEventListener('click', () => {
  expenseFilter = {
    dateFrom: expenseDateFromInput?.value || '',
    dateTo: expenseDateToInput?.value || '',
    description: expenseSearchInput?.value || ''
  };
  renderExpenseRows(expensesCache);
});

expenseClearBtn?.addEventListener('click', () => {
  expenseFilter = { dateFrom: '', dateTo: '', description: '' };
  if (expenseDateFromInput) expenseDateFromInput.value = '';
  if (expenseDateToInput) expenseDateToInput.value = '';
  if (expenseSearchInput) expenseSearchInput.value = '';
  renderExpenseRows(expensesCache);
});

expenseSearchInput?.addEventListener('input', () => {
  expenseFilter = {
    ...expenseFilter,
    description: expenseSearchInput.value || ''
  };
  renderExpenseRows(expensesCache);
});

salaryEmployeeSelect?.addEventListener('change', () => {
  renderSalarySummaries(salaryRowsCache);
});

salaryLedgerEmployeeSelect?.addEventListener('change', () => {
  prefillSalaryLedgerForm();
});

salaryLedgerSearchInput?.addEventListener('input', () => {
  renderSalaryLedgers(salaryLedgersCache);
});

salaryLedgerAutoFillBtn?.addEventListener('click', () => {
  autoFillSalaryLedgerSections();
});

salaryLedgerResetBtn?.addEventListener('click', () => {
  if (!salaryLedgerForm) return;
  ['period1ToGive', 'period1Paid'].forEach((name) => {
    const input = salaryLedgerForm.querySelector(`input[name="${name}"]`);
    if (input) input.value = '0';
  });
  const noteEl = salaryLedgerForm.querySelector('input[name="note"]');
  if (noteEl) noteEl.value = '';
  updateSalaryLedgerRemainingPreview();
  showToast('Ledger form cleared');
});

salaryLedgerForm
  ?.querySelectorAll('input[name="period1ToGive"], input[name="period1Paid"]')
  ?.forEach((input) => input.addEventListener('input', updateSalaryLedgerRemainingPreview));

sectionNav.addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  activateSection(btn.getAttribute('data-target'));
});

// Download Offer Letter PDF
function downloadOfferLetter(employeeId) {
  window.open(urlWithAuth(`/api/employees/${employeeId}/offer-letter`), '_blank');
}

function downloadWithAuth(url) {
  const t = token();
  if (!t) return;

  fetch(url, {
    headers: { Authorization: `Bearer ${t}` }
  })
    .then((res) => {
      if (!res.ok) throw new Error('Download failed');
      return res.blob();
    })
    .then((blob) => {
      const a = document.createElement('a');
      const objUrl = URL.createObjectURL(blob);
      a.href = objUrl;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objUrl);
    })
    .catch((err) => showToast(err.message, 'error'));
}

function normalizeTruckPartyFilter(raw) {
  const value = String(raw || '').trim().toLowerCase();
  if (!value || value === 'all') return 'all';
  if (value === 'n' || value === 'narayan') return 'narayan';
  if (value === 'm' || value === 'maa' || value === 'maa_vaishno' || value === 'vaishno') return 'maa_vaishno';
  return null;
}

function normalizeTruckMaterialFilter(raw) {
  const value = truckMaterialKey(raw);
  if (!value || value === 'all') return 'all';
  if (value === 'pellet') return 'pellet';
  if (value === 'briquettes') return 'briquettes';
  return null;
}

function askTruckExportFilters() {
  const partyAnswer = prompt(
    'Truck report party filter?\nType: all, narayan, maa_vaishno',
    'all'
  );
  if (partyAnswer == null) return null;
  const party = normalizeTruckPartyFilter(partyAnswer);
  if (!party) {
    showToast('Invalid party. Use all, narayan, or maa_vaishno.', 'error');
    return null;
  }

  const materialAnswer = prompt(
    'Truck report material filter?\nType: all, pellet, briquettes',
    'all'
  );
  if (materialAnswer == null) return null;
  const material = normalizeTruckMaterialFilter(materialAnswer);
  if (!material) {
    showToast('Invalid material. Use all, pellet, or briquettes.', 'error');
    return null;
  }

  const params = new URLSearchParams();
  if (party !== 'all') params.set('party', party);
  if (material !== 'all') params.set('material', material);
  return params.toString();
}

downloadSalaryCsvBtn.addEventListener('click', () => {
  downloadWithAuth(`/api/export/salary.csv?month=${getActiveSalaryMonth()}`);
});

salaryMonthInput?.addEventListener('change', async () => {
  activeSalaryMonth = getActiveSalaryMonth();
  try {
    await refresh();
    showToast(`Salary month changed to ${activeSalaryMonth}`);
  } catch (err) {
    showToast(err.message, 'error');
  }
});

downloadTruckCsvBtn.addEventListener('click', () => {
  const query = askTruckExportFilters();
  if (query == null) return;
  const url = query ? `/api/export/trucks.csv?${query}` : '/api/export/trucks.csv';
  downloadWithAuth(url);
});

downloadTruckPdfBtn?.addEventListener('click', () => {
  const query = askTruckExportFilters();
  if (query == null) return;
  const url = query ? `/api/export/trucks.pdf?${query}` : '/api/export/trucks.pdf';
  downloadWithAuth(url);
});

downloadAttendanceCsvBtn.addEventListener('click', () => {
  downloadWithAuth(`/api/export/attendance.csv?month=${attendanceMonthInput.value || monthISO()}`);
});

activateSection('overviewSection');
setDefaultDates();
initDarkMode();

brandLink.addEventListener('click', (e) => {
  e.preventDefault();
  if (token()) activateSection('overviewSection');
});

darkModeToggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-mode');
  document.body.classList.toggle('dark-mode', isDark);
  darkModeToggle.textContent = isDark ? '☀' : '🌙';
  localStorage.setItem('ops_dark', isDark ? '1' : '0');
});

if (manualRefreshBtn) {
  manualRefreshBtn.addEventListener('click', () => refresh().catch((err) => showToast(err.message, 'error')));
}

bootstrapSession().catch((err) => showToast(err.message, 'error'));
