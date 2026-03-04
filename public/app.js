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
const truckTotalCountEl = document.getElementById('truckTotalCount');
const truckTotalQuantityEl = document.getElementById('truckTotalQuantity');
const truckTotalAmountAllEl = document.getElementById('truckTotalAmountAll');
const truckMarkedCountEl = document.getElementById('truckMarkedCount');

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
const employeeFormTitle = document.getElementById('employeeFormTitle');
const employeeSubmitBtn = document.getElementById('employeeSubmitBtn');
const employeeCancelEditBtn = document.getElementById('employeeCancelEditBtn');
const attendanceForm = document.getElementById('attendanceForm');
const advanceForm = document.getElementById('advanceForm');
const advanceTableTbody = document.querySelector('#advanceTable tbody');
const advanceSubmitBtn = document.getElementById('advanceSubmitBtn');
const advanceCancelEditBtn = document.getElementById('advanceCancelEditBtn');
const salaryLedgerForm = document.getElementById('salaryLedgerForm');
const truckForm = document.getElementById('truckForm');
const truckCancelEditBtn = document.getElementById('truckCancelEditBtn');
const expenseForm = document.getElementById('expenseForm');
const expenseCancelEditBtn = document.getElementById('expenseCancelEditBtn');
const investmentForm = document.getElementById('investmentForm');
const chiniForm = document.getElementById('chiniForm');
const landForm = document.getElementById('landForm');
const vehicleForm = document.getElementById('vehicleForm');
const changePasswordForm = document.getElementById('changePasswordForm');

const downloadSalaryCsvBtn = document.getElementById('downloadSalaryCsv');
const toggleTruckExportOptionsBtn = document.getElementById('toggleTruckExportOptions');
const truckExportOptionsEl = document.getElementById('truckExportOptions');
const truckExportPartySelect = document.getElementById('truckExportParty');
const truckExportMaterialSelect = document.getElementById('truckExportMaterial');
const truckExportFormatSelect = document.getElementById('truckExportFormat');
const downloadTruckReportBtn = document.getElementById('downloadTruckReportBtn');
const closeTruckExportOptionsBtn = document.getElementById('closeTruckExportOptions');
const downloadAttendanceCsvBtn = document.getElementById('downloadAttendanceCsv');
const refreshAttendanceReportBtn = document.getElementById('refreshAttendanceReport');
const attendanceMonthInput = document.getElementById('attendanceMonthInput');
const employeeSearchInput = document.getElementById('employeeSearchInput');
const truckSearchInput = document.getElementById('truckSearchInput');
const truckShowMarkedOnlyInput = document.getElementById('truckShowMarkedOnly');
const salaryEmployeeSelect = document.getElementById('salaryEmployeeSelect');
const salaryMonthInput = document.getElementById('salaryMonthInput');
const salaryLedgerEmployeeSelect = document.getElementById('salaryLedgerEmployee');
const salaryLedgerSearchInput = document.getElementById('salaryLedgerSearchInput');
const salaryLedgerFromDateInput = document.getElementById('salaryLedgerFromDate');
const salaryLedgerToDateInput = document.getElementById('salaryLedgerToDate');
const salaryLedgerSalaryBeforeInput = document.getElementById('salaryLedgerSalaryBeforeInput');
const salaryLedgerPaidBeforeInput = document.getElementById('salaryLedgerPaidBeforeInput');
const salaryLedgerOpeningPendingInput = document.getElementById('salaryLedgerOpeningPendingInput');
const salaryLedgerPaidForPreviousInput = document.getElementById('salaryLedgerPaidForPreviousInput');
const salaryLedgerPaidForCurrentInput = document.getElementById('salaryLedgerPaidForCurrentInput');
const salaryLedgerAutoFillBtn = document.getElementById('salaryLedgerAutoFillBtn');
const salaryLedgerCurrentMonthBtn = document.getElementById('salaryLedgerCurrentMonthBtn');
const salaryLedgerCarryBtn = document.getElementById('salaryLedgerCarryBtn');
const salaryLedgerDownloadBtn = document.getElementById('salaryLedgerDownloadBtn');
const salaryLedgerResetBtn = document.getElementById('salaryLedgerResetBtn');
const salaryLedgerDetailForm = document.getElementById('salaryLedgerDetailForm');
const salaryLedgerDetailTableTbody = document.querySelector('#salaryLedgerDetailTable tbody');
const salaryLedgerDetailRefreshBtn = document.getElementById('salaryLedgerDetailRefreshBtn');
const salaryLedgerDetailPdfBtn = document.getElementById('salaryLedgerDetailPdfBtn');
const salaryLedgerDetailSaveBtn = document.getElementById('salaryLedgerDetailSaveBtn');
const salaryLedgerDetailCancelBtn = document.getElementById('salaryLedgerDetailCancelBtn');
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
const expenseTypeFilterInput = document.getElementById('expenseTypeFilterInput');
const expenseFilterBtn = document.getElementById('expenseFilterBtn');
const expenseClearBtn = document.getElementById('expenseClearBtn');
const expenseDownloadPdfBtn = document.getElementById('expenseDownloadPdfBtn');
const investmentDownloadPdfBtn = document.getElementById('investmentDownloadPdfBtn');
const landDownloadPdfBtn = document.getElementById('landDownloadPdfBtn');

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
let dashboardCache = null;
let attendanceReportCache = { rows: [] };
let autoRefreshTimer = null;
let expenseFilter = { dateFrom: '', dateTo: '', description: '', expenseType: '' };
let editingTruckId = null;
let editingExpenseId = null;
let editingLandId = null;
let editingEmployeeId = null;
let editingAdvanceId = null;
let editingSalaryLedgerDetailId = null;
let activeSalaryMonth = monthISO();
let billItemsState = [];
let editingBillId = null;
let refreshInFlight = null;
let lastRefreshErrorToastAt = 0;
let salaryLedgerDetailEntriesCache = [];
let salaryLedgerDetailEmployeeId = '';
let advanceRowsCache = [];
const SALARY_LEDGER_CLOSING_ADJUSTMENT_PARTICULARS = 'Closing Balance Adjustment';
const SALARY_LEDGER_CLOSING_ADJUSTMENT_NOTE_MARKER = '[AUTO_CLOSING_BALANCE]';
const SALARY_LEDGER_CLOSING_ADJUSTMENT_NOTE = `Closing balance set manually ${SALARY_LEDGER_CLOSING_ADJUSTMENT_NOTE_MARKER}`;

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

function findEmployeeById(employeeId) {
  return employeesCache.find((e) => String(e.id) === String(employeeId));
}

function normalizeIsoDateValue(value) {
  const text = String(value || '').slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : '';
}

function isoDaysInclusiveClient(startDateText, endDateText) {
  const start = normalizeIsoDateValue(startDateText);
  const end = normalizeIsoDateValue(endDateText);
  if (!start || !end) return 0;
  const startDate = new Date(`${start}T00:00:00Z`);
  const endDate = new Date(`${end}T00:00:00Z`);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || startDate > endDate) return 0;
  return Math.floor((endDate.getTime() - startDate.getTime()) / 86400000) + 1;
}

function shiftIsoDate(dateText, dayOffset) {
  const normalized = normalizeIsoDateValue(dateText);
  if (!normalized) return '';
  const base = new Date(`${normalized}T00:00:00Z`);
  if (Number.isNaN(base.getTime())) return '';
  base.setUTCDate(base.getUTCDate() + Number(dayOffset || 0));
  return base.toISOString().slice(0, 10);
}

function startOfCurrentMonthISO() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-01`;
}

function normalizeLedgerRow(row) {
  const employee = findEmployeeById(row?.employeeId);
  const monthlyFromEmployee = round2(Math.max(0, toNumber(employee?.monthlySalary, 0)));
  const monthlySalaryApplied = round2(Math.max(0, toNumber(row?.monthlySalaryApplied, monthlyFromEmployee)));
  const durationStart = normalizeIsoDateValue(row?.durationStart || row?.sessionFrom || row?.fromDate);
  const durationEnd = normalizeIsoDateValue(row?.durationEnd || row?.sessionTo || row?.toDate);
  const durationDaysFallback = isoDaysInclusiveClient(durationStart, durationEnd);
  const durationDays = Math.max(0, Math.trunc(toNumber(row?.durationDays, durationDaysFallback)));
  const durationMonths = round2(
    Math.max(0, toNumber(row?.durationMonths, durationDays > 0 ? durationDays / 30 : 0))
  );
  const periodFromDays =
    durationDays > 0 && monthlySalaryApplied > 0 ? round2((monthlySalaryApplied / 30) * durationDays) : 0;
  const periodSalary = round2(Math.max(0, toNumber(row?.periodSalary ?? row?.sessionSalary, periodFromDays)));
  const totalToGiveRaw = round2(Math.max(0, toNumber(row?.totalToGive ?? row?.totalSalary, 0)));
  const paidForPreviousRaw = round2(Math.max(0, toNumber(row?.paidForPrevious, 0)));
  const paidForCurrentRaw = round2(Math.max(0, toNumber(row?.paidForCurrent, 0)));
  const paidSplitProvided = row?.paidForPrevious != null || row?.paidForCurrent != null;
  const totalPaidThisSessionRaw = round2(
    Math.max(0, toNumber(row?.totalPaidThisSession ?? row?.sessionPaid, paidForPreviousRaw + paidForCurrentRaw))
  );
  const paidForPrevious = paidSplitProvided ? paidForPreviousRaw : totalPaidThisSessionRaw;
  const paidForCurrent = paidSplitProvided ? paidForCurrentRaw : 0;
  const totalPaidThisSession = round2(paidForPrevious + paidForCurrent);
  const salaryGeneratedBeforeFallback = Math.max(0, totalToGiveRaw - periodSalary);
  const salaryGeneratedBefore = round2(
    Math.max(0, toNumber(row?.salaryGeneratedBefore, salaryGeneratedBeforeFallback))
  );
  const paidBeforeFallback = Math.max(
    0,
    toNumber(row?.totalPaid ?? row?.amountGiven ?? 0, 0) - totalPaidThisSession
  );
  const paidBefore = round2(Math.max(0, toNumber(row?.paidBefore, paidBeforeFallback)));
  const openingPendingAuto = round2(Math.max(0, salaryGeneratedBefore - paidBefore));
  const openingPending = round2(Math.max(0, toNumber(row?.openingPending, openingPendingAuto)));
  const totalToGive = round2(salaryGeneratedBefore + periodSalary);
  const totalPaidRaw = round2(Math.max(0, toNumber(row?.totalPaid ?? row?.amountGiven, paidBefore + totalPaidThisSession)));
  const totalPaid = round2(Math.min(totalToGive, Math.max(totalPaidRaw, paidBefore + totalPaidThisSession)));
  const remaining = round2(Math.max(0, totalToGive - totalPaid));
  const currentMonthSalary = monthlyFromEmployee;
  const currentMonthAdvance = round2(Math.max(0, toNumber(row?.currentMonthAdvance, 0)));

  return {
    ...row,
    monthlySalaryApplied,
    durationStart,
    durationEnd,
    durationMonths,
    durationDays,
    salaryGeneratedBefore,
    paidBefore,
    openingPending,
    periodSalary: periodSalary > 0 ? periodSalary : round2(Math.max(0, totalToGive - salaryGeneratedBefore)),
    paidForPrevious,
    paidForCurrent,
    totalPaidThisSession,
    period1ToGive: totalToGive,
    period1Paid: totalPaid,
    period1Remaining: remaining,
    period2ToGive: 0,
    period2Paid: currentMonthAdvance,
    period2Remaining: 0,
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
  [
    attendanceForm,
    advanceForm,
    truckForm,
    expenseForm,
    investmentForm,
    chiniForm,
    vehicleForm,
    supplierTransactionForm,
    billForm
  ].forEach((form) => {
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

  setFormEnabled('employeePanel', hasPermission('employees:create') || hasPermission('employees:update'));
  setFormEnabled('attendancePanel', hasPermission('attendance:create'));
  setFormEnabled('advancePanel', hasPermission('advances:create'));
  setFormEnabled('salaryLedgerPanel', hasPermission('salaryledger:update'));
  setFormEnabled('truckPanel', hasPermission('trucks:create') || hasPermission('trucks:update'));
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

  const canExport = hasPermission('export:view');
  downloadSalaryCsvBtn.disabled = !hasPermission('export:view');
  if (toggleTruckExportOptionsBtn) toggleTruckExportOptionsBtn.disabled = !canExport;
  if (downloadTruckReportBtn) downloadTruckReportBtn.disabled = !canExport;
  if (truckExportPartySelect) truckExportPartySelect.disabled = !canExport;
  if (truckExportMaterialSelect) truckExportMaterialSelect.disabled = !canExport;
  if (truckExportFormatSelect) truckExportFormatSelect.disabled = !canExport;
  if (!canExport) {
    truckExportOptionsEl?.classList.add('hidden');
  }
  downloadAttendanceCsvBtn.disabled = !hasPermission('export:view');
}

async function api(url, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token()) headers.Authorization = `Bearer ${token()}`;
  const timeoutMs = method === 'GET' ? 30000 : 20000;
  const attempts = method === 'GET' ? 2 : 1;
  let res;
  let lastErr = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      lastErr = null;
      break;
    } catch (err) {
      clearTimeout(timeoutId);
      lastErr = err.name === 'AbortError'
        ? new Error(`Request timeout (${timeoutMs / 1000}s): ${url}`)
        : err;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 600 * attempt));
        continue;
      }
    }
  }
  if (lastErr) throw lastErr;

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
  const totalBills = Array.isArray(billsCache) ? billsCache.reduce((sum, b) => sum + toNumber(b.grandTotal, 0), 0) : 0;
  const totalExpenseAmount = Array.isArray(expensesCache) ? expensesCache.reduce((sum, r) => sum + toNumber(r.amount, 0), 0) : 0;
  const totalChini = Array.isArray(chiniExpensesCache) ? chiniExpensesCache.reduce((sum, r) => sum + toNumber(r.amount, 0), 0) : 0;
  const totalInvestStatus = Array.isArray(investmentsCache) ? investmentsCache.reduce((sum, r) => sum + toNumber(r.amount, 0), 0) : 0;
  const supplierCount = Array.isArray(suppliersCache) ? suppliersCache.length : 0;

  const sections = [
    {
      title: 'Workforce & Operations',
      items: [
        ['Active Employees', data.totalEmployees || employeesCache.length],
        ['Present Today', data.presentToday],
        ['Total Salary Setup', money(data.totalSalary)],
      ]
    },
    {
      title: 'Financials (Current/All-Time)',
      items: [
        ['Advances (Month)', money(data.totalAdvances)],
        ['Remaining Payable', money(data.totalRemaining)],
        ['Global Expenses', money(totalExpenseAmount)],
        ['Total Billed', money(totalBills)],
      ]
    },
    {
      title: 'Assets & Logistics',
      items: [
        ['Trucks (Month)', data.truckCountThisMonth],
        ['Truck Quantity', data.truckQuantityThisMonth + ' Qtnl'],
        ['Chini Expenses', money(totalChini)],
        ['Capital Investments', money(totalInvestStatus)],
      ]
    }
  ];

  cardsEl.innerHTML = sections.map(sec => `
    <div class="dashboard-segment">
      <h3 class="dashboard-segment-title">${sec.title}</h3>
      <div class="cards">
        ${sec.items.map(([label, value]) => `
          <div class="card"><div class="label">${label}</div><div class="value">${value}</div></div>
        `).join('')}
      </div>
    </div>
  `).join('');
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
  if (prevAttendance && employees.some((e) => String(e.id) === String(prevAttendance))) attendanceEmployeeEl.value = prevAttendance;
  if (prevAdvance && employees.some((e) => String(e.id) === String(prevAdvance))) advanceEmployeeEl.value = prevAdvance;
  if (salaryLedgerEmployeeSelect) {
    if (prevSalaryLedger && employees.some((e) => String(e.id) === String(prevSalaryLedger))) {
      salaryLedgerEmployeeSelect.value = prevSalaryLedger;
    } else if (employees.length > 0) {
      salaryLedgerEmployeeSelect.value = employees[0].id;
    }
  }
}

function normalizeAdvanceRow(row) {
  return {
    id: String(row?.id || ''),
    employeeId: String(row?.employeeId || ''),
    employeeName: String(row?.employeeName || ''),
    employeeRole: String(row?.employeeRole || ''),
    date: normalizeIsoDateValue(row?.date),
    amount: round2(toNumber(row?.amount, 0)),
    note: String(row?.note || '').trim()
  };
}

function resetAdvanceFormMode() {
  if (!advanceForm) return;
  editingAdvanceId = null;
  const hiddenId = advanceForm.querySelector('input[name="advanceId"]');
  if (hiddenId) hiddenId.value = '';
  if (advanceSubmitBtn) advanceSubmitBtn.textContent = 'Add Advance';
  if (advanceCancelEditBtn) advanceCancelEditBtn.classList.add('hidden');
}

function renderAdvanceRows(rows) {
  if (!advanceTableTbody) return;
  const employeeId = String(advanceEmployeeEl?.value || '').trim();
  const safeRows = (rows || [])
    .map((row) => normalizeAdvanceRow(row))
    .filter((row) => (employeeId ? String(row.employeeId) === employeeId : true))
    .sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return String(b.id || '').localeCompare(String(a.id || ''));
    });
  advanceRowsCache = safeRows;
  if (!safeRows.length) {
    advanceTableTbody.innerHTML = '<tr><td colspan="5">No advances found.</td></tr>';
    return;
  }
  const canEdit = hasPermission('advances:create');
  advanceTableTbody.innerHTML = safeRows
    .map((row) => {
      const actions = canEdit
        ? `<div class="actions">
             <button type="button" class="small warn adv-edit" data-id="${row.id}">Edit</button>
             <button type="button" class="small danger adv-del" data-id="${row.id}">Delete</button>
           </div>`
        : '-';
      return `<tr>
        <td>
          <div class="record-name">${escapeHtml(row.employeeName || row.employeeId)}</div>
          <div class="record-subtext">${escapeHtml(row.employeeRole)}</div>
        </td>
        <td>${row.date || '-'}</td>
        <td class="money">${money(row.amount)}</td>
        <td>${escapeHtml(row.note || '-')}</td>
        <td>${actions}</td>
      </tr>`;
    })
    .join('');

  if (!canEdit) return;
  advanceTableTbody.querySelectorAll('.adv-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = String(btn.getAttribute('data-id') || '');
      const row = advanceRowsCache.find((item) => String(item.id) === id);
      if (!row || !advanceForm) return;
      editingAdvanceId = id;
      const setValue = (name, value) => {
        const input = advanceForm.querySelector(`[name="${name}"]`);
        if (input) input.value = value;
      };
      setValue('advanceId', row.id);
      setValue('employeeId', row.employeeId || employeeId);
      setValue('date', row.date || todayISO());
      setValue('amount', String(round2(Math.abs(toNumber(row.amount, 0)))));
      setValue('note', row.note || '');
      if (advanceSubmitBtn) advanceSubmitBtn.textContent = 'Update Advance';
      if (advanceCancelEditBtn) advanceCancelEditBtn.classList.remove('hidden');
      advanceForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  advanceTableTbody.querySelectorAll('.adv-del').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = String(btn.getAttribute('data-id') || '');
      if (!id) return;
      if (!confirm('Delete this advance entry?')) return;
      try {
        await api(`/api/advances/${id}`, 'DELETE');
        if (editingAdvanceId === id) {
          advanceForm?.reset();
          setDefaultDates();
          resetAdvanceFormMode();
        }
        await loadAdvancesForSelectedEmployee({ silent: true });
        await refresh();
        showToast('Advance deleted');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });
}

async function loadAdvancesForSelectedEmployee({ silent = false } = {}) {
  const employeeId = String(advanceEmployeeEl?.value || '').trim();
  if (!employeeId) {
    advanceRowsCache = [];
    renderAdvanceRows([]);
    return [];
  }
  try {
    const rows = await api(`/api/advances?employeeId=${encodeURIComponent(employeeId)}`);
    renderAdvanceRows(Array.isArray(rows) ? rows : []);
    if (!silent) showToast('Advances loaded');
    return rows;
  } catch (err) {
    renderAdvanceRows([]);
    if (!silent) showToast(err.message, 'error');
    return [];
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

function resetEmployeeFormMode() {
  editingEmployeeId = null;
  if (employeeFormTitle) employeeFormTitle.textContent = 'Add Employee';
  if (employeeSubmitBtn) employeeSubmitBtn.textContent = 'Add Employee';
  if (employeeCancelEditBtn) employeeCancelEditBtn.classList.add('hidden');
}

function resetTruckFormMode() {
  editingTruckId = null;
  const submitBtn = truckForm?.querySelector('button[type="submit"]');
  if (submitBtn) submitBtn.textContent = 'Add Truck Entry';
  if (truckCancelEditBtn) truckCancelEditBtn.classList.add('hidden');
}

function enterEmployeeEditMode(employee) {
  if (!employeeForm) return;
  const nameInput = employeeForm.querySelector('input[name="name"]');
  const roleInput = employeeForm.querySelector('input[name="role"]');
  const monthlySalaryInput = employeeForm.querySelector('input[name="monthlySalary"]');
  const joiningDateInput = employeeForm.querySelector('input[name="joiningDate"]');
  if (!nameInput || !roleInput || !monthlySalaryInput || !joiningDateInput) return;

  editingEmployeeId = employee.id;
  if (employeeFormTitle) employeeFormTitle.textContent = 'Edit Employee';
  if (employeeSubmitBtn) employeeSubmitBtn.textContent = 'Update Employee';
  if (employeeCancelEditBtn) employeeCancelEditBtn.classList.remove('hidden');
  nameInput.value = employee.name || '';
  roleInput.value = employee.role || '';
  monthlySalaryInput.value = String(Number(employee.monthlySalary || 0));
  joiningDateInput.value = String(employee.joiningDate || todayISO()).slice(0, 10);
  activateSection('employeeSection');
  employeeForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const existing = employeesCache.find((e) => String(e.id) === String(id));
        if (!existing) return;
        enterEmployeeEditMode(existing);
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
               <button type="button" class="small adv-save" data-emp-id="${r.employeeId}">Update</button>
               ${advVal > 0 ? `<button type="button" class="small danger adv-del-all" data-emp-id="${r.employeeId}">Delete</button>` : ''}
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

    document.querySelectorAll('.adv-del-all').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!confirm("Are you sure you want to delete this month's advances for this employee?")) return;
        const empId = btn.getAttribute('data-emp-id');
        const input = document.querySelector(`.advances-input[data-emp-id="${empId}"]`);
        if (input) input.value = '0';
        try {
          await api('/api/advances/set', 'PUT', {
            employeeId: empId,
            month: getActiveSalaryMonth(),
            totalAdvances: 0
          });
          if (input) input.dataset.original = '0';
          await refresh();
          showToast('Advances deleted');
        } catch (err) {
          showToast(err.message, 'error');
        }
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
  if (!salaryLedgerTbody) {
    const selectedEmployeeId = getSelectedSalaryLedgerEmployeeId();
    if (selectedEmployeeId && selectedEmployeeId !== salaryLedgerDetailEmployeeId) {
      loadSalaryLedgerDetailEntries({ employeeId: selectedEmployeeId, silent: true }).catch((err) => {
        console.error('[salary-ledger-detail:load]', err);
      });
    } else {
      renderSalaryLedgerDetail();
    }
    return;
  }
  const safeRows = (rows || []).map((row) => normalizeLedgerRow(row));
  const canEdit = hasPermission('salaryledger:update');
  const totalPaidSum = safeRows.reduce((sum, r) => sum + Number(r.totalPaid || 0), 0);
  const totalToGiveSum = safeRows.reduce((sum, r) => sum + Number(r.totalToGive || 0), 0);
  const totalRemainingSum = safeRows.reduce((sum, r) => sum + Number(r.remaining || 0), 0);

  const setSummary = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(value);
  };
  setSummary('salaryLedgerTotalPaidSum', totalPaidSum);
  setSummary('salaryLedgerTotalToGiveSum', totalToGiveSum);
  setSummary('salaryLedgerTotalRemainingSum', totalRemainingSum);

  const q = (salaryLedgerSearchInput?.value || '').trim().toLowerCase();
  const tableRows = q
    ? safeRows.filter((r) => `${r.name || ''} ${r.role || ''} ${r.note || ''}`.toLowerCase().includes(q))
    : safeRows;

  salaryLedgerTbody.innerHTML = tableRows
    .map(
      (r) => {
        const ledgerDate = r.updatedAt ? String(r.updatedAt).slice(0, 10) : '-';
        const periodLabel =
          r.durationStart && r.durationEnd
            ? `${r.durationStart} to ${r.durationEnd}`
            : r.durationStart
              ? `${r.durationStart} onwards`
              : '-';
        const daysLabel = Number(r.durationDays || 0) > 0 ? String(r.durationDays) : '-';
        const actions = [
          canEdit ? `<button type="button" class="small warn sld-edit" data-emp-id="${r.employeeId}">Edit</button>` : '',
          `<button type="button" class="small sld-pdf" data-emp-id="${r.employeeId}">PDF</button>`
        ]
          .filter(Boolean)
          .join(' ');
        return `<tr>
        <td>${escapeHtml(r.name || '-')}</td>
        <td>${escapeHtml(r.role || '-')}</td>
        <td>${periodLabel}</td>
        <td>${daysLabel}</td>
        <td>${ledgerDate}</td>
        <td class="money">${money(r.salaryGeneratedBefore || 0)}</td>
        <td class="money">${money(r.paidBefore || 0)}</td>
        <td class="money">${money(r.openingPending || 0)}</td>
        <td class="money">${money(r.periodSalary || 0)}</td>
        <td class="money">${money(r.paidForPrevious || 0)}</td>
        <td class="money">${money(r.paidForCurrent || 0)}</td>
        <td class="money">${money(r.totalPaidThisSession || 0)}</td>
        <td class="money">${money(r.totalToGive || 0)}</td>
        <td class="money">${money(r.totalPaid)}</td>
        <td class="money">${money(r.remaining)}</td>
        <td>${escapeHtml(r.note || '-')}</td>
        <td>${actions ? `<div class="actions">${actions}</div>` : '-'}</td>
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
  document.querySelectorAll('.sld-pdf').forEach((btn) => {
    btn.addEventListener('click', () => {
      const empId = btn.getAttribute('data-emp-id');
      if (!empId) return;
      window.open(urlWithAuth(`/api/salary-ledgers/${empId}.pdf`), '_blank');
    });
  });
  prefillSalaryLedgerForm();
  const selectedEmployeeId = getSelectedSalaryLedgerEmployeeId();
  if (selectedEmployeeId && selectedEmployeeId !== salaryLedgerDetailEmployeeId) {
    loadSalaryLedgerDetailEntries({ employeeId: selectedEmployeeId, silent: true }).catch((err) => {
      console.error('[salary-ledger-detail:load]', err);
    });
  } else {
    renderSalaryLedgerDetail();
  }
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
  const monthlySalaryAppliedEl = salaryLedgerForm.querySelector('input[name="monthlySalaryApplied"]');
  const durationStartEl = salaryLedgerForm.querySelector('input[name="durationStart"]');
  const durationEndEl = salaryLedgerForm.querySelector('input[name="durationEnd"]');
  const salaryBeforeEl = salaryLedgerForm.querySelector('input[name="salaryGeneratedBefore"]');
  const paidBeforeEl = salaryLedgerForm.querySelector('input[name="paidBefore"]');
  const openingPendingEl = salaryLedgerForm.querySelector('input[name="openingPending"]');
  const paidForPreviousEl = salaryLedgerForm.querySelector('input[name="paidForPrevious"]');
  const paidForCurrentEl = salaryLedgerForm.querySelector('input[name="paidForCurrent"]');
  const noteEl = salaryLedgerForm.querySelector('input[name="note"]');
  if (
    !monthlySalaryAppliedEl ||
    !durationStartEl ||
    !durationEndEl ||
    !salaryBeforeEl ||
    !paidBeforeEl ||
    !openingPendingEl ||
    !paidForPreviousEl ||
    !paidForCurrentEl ||
    !noteEl
  ) {
    return;
  }

  const normalized = normalizeLedgerRow(row || { employeeId });
  const defaultMonthly = round2(Math.max(0, toNumber(employee?.monthlySalary, 0)));
  monthlySalaryAppliedEl.value = String(normalized.monthlySalaryApplied || defaultMonthly || 0);
  durationStartEl.value = normalized.durationStart || startOfCurrentMonthISO();
  durationEndEl.value = normalized.durationEnd || todayISO();
  salaryBeforeEl.value = String(round2(Math.max(0, toNumber(normalized.salaryGeneratedBefore, 0))));
  paidBeforeEl.value = String(round2(Math.max(0, toNumber(normalized.paidBefore, 0))));
  openingPendingEl.value = String(round2(Math.max(0, toNumber(normalized.openingPending, 0))));
  paidForPreviousEl.value = String(round2(Math.max(0, toNumber(normalized.paidForPrevious, 0))));
  paidForCurrentEl.value = String(round2(Math.max(0, toNumber(normalized.paidForCurrent, 0))));
  noteEl.value = String(row?.note || '');

  updateSalaryLedgerPreview();
}

function updateSalaryLedgerPreview() {
  if (!salaryLedgerForm || !salaryLedgerEmployeeSelect) return;
  const monthlySalaryAppliedEl = salaryLedgerForm.querySelector('input[name="monthlySalaryApplied"]');
  const durationStartEl = salaryLedgerForm.querySelector('input[name="durationStart"]');
  const durationEndEl = salaryLedgerForm.querySelector('input[name="durationEnd"]');
  const salaryBeforeEl = salaryLedgerForm.querySelector('input[name="salaryGeneratedBefore"]');
  const paidBeforeEl = salaryLedgerForm.querySelector('input[name="paidBefore"]');
  const openingPendingEl = salaryLedgerForm.querySelector('input[name="openingPending"]');
  const paidForPreviousEl = salaryLedgerForm.querySelector('input[name="paidForPrevious"]');
  const paidForCurrentEl = salaryLedgerForm.querySelector('input[name="paidForCurrent"]');
  const computedDaysEl = document.getElementById('salaryLedgerComputedDays');
  const computedPeriodSalaryEl = document.getElementById('salaryLedgerComputedPeriodSalary');
  const computedPaidThisSessionEl = document.getElementById('salaryLedgerComputedPaidThisSession');
  const computedPaidEl = document.getElementById('salaryLedgerComputedPaid');
  const computedToGiveEl = document.getElementById('salaryLedgerComputedToGive');
  const previewEl = document.getElementById('salaryLedgerRemainingPreview');
  if (
    !monthlySalaryAppliedEl ||
    !durationStartEl ||
    !durationEndEl ||
    !salaryBeforeEl ||
    !paidBeforeEl ||
    !openingPendingEl ||
    !paidForPreviousEl ||
    !paidForCurrentEl ||
    !previewEl
  ) {
    return;
  }
  const monthlySalaryApplied = Math.max(0, toNumber(monthlySalaryAppliedEl.value, 0));
  const durationStart = normalizeIsoDateValue(durationStartEl.value);
  const durationEnd = normalizeIsoDateValue(durationEndEl.value);
  const durationDays = isoDaysInclusiveClient(durationStart, durationEnd);
  const employeeId = salaryLedgerEmployeeSelect?.value;
  const existing = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  const existingNormalized = normalizeLedgerRow(existing || { employeeId });
  const salaryBeforeRaw = String(salaryBeforeEl.value ?? '').trim();
  const paidBeforeRaw = String(paidBeforeEl.value ?? '').trim();
  const openingPendingRaw = String(openingPendingEl.value ?? '').trim();
  const salaryGeneratedBefore = round2(
    Math.max(0, toNumber(salaryBeforeRaw === '' ? existingNormalized.salaryGeneratedBefore : salaryBeforeRaw, 0))
  );
  const paidBefore = round2(
    Math.max(0, toNumber(paidBeforeRaw === '' ? existingNormalized.paidBefore : paidBeforeRaw, 0))
  );
  const computedOpeningPending = round2(Math.max(0, salaryGeneratedBefore - paidBefore));
  const openingPending = round2(
    Math.max(0, toNumber(openingPendingRaw === '' ? computedOpeningPending : openingPendingRaw, computedOpeningPending))
  );
  if (openingPendingRaw === '') openingPendingEl.value = String(openingPending);
  const paidForPrevious = round2(Math.max(0, toNumber(paidForPreviousEl.value, 0)));
  const paidForCurrent = round2(Math.max(0, toNumber(paidForCurrentEl.value, 0)));
  const paidThisSession = round2(paidForPrevious + paidForCurrent);
  const periodSalary = durationDays > 0 ? round2((monthlySalaryApplied / 30) * durationDays) : 0;
  const totalToGive = round2(salaryGeneratedBefore + periodSalary);
  const totalPaid = round2(paidBefore + paidThisSession);
  const remaining = Math.max(0, round2(totalToGive - totalPaid));
  if (computedDaysEl) computedDaysEl.textContent = String(durationDays || 0);
  if (computedPeriodSalaryEl) computedPeriodSalaryEl.textContent = money(periodSalary);
  if (computedPaidThisSessionEl) computedPaidThisSessionEl.textContent = money(paidThisSession);
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
  const monthlySalaryAppliedEl = salaryLedgerForm.querySelector('input[name="monthlySalaryApplied"]');
  const salaryBeforeEl = salaryLedgerForm.querySelector('input[name="salaryGeneratedBefore"]');
  const paidBeforeEl = salaryLedgerForm.querySelector('input[name="paidBefore"]');
  const openingPendingEl = salaryLedgerForm.querySelector('input[name="openingPending"]');
  if (!monthlySalaryAppliedEl || !salaryBeforeEl || !paidBeforeEl) return;
  monthlySalaryAppliedEl.value = String(round2(Math.max(0, Number(employee.monthlySalary || 0))));
  const existing = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  const normalized = normalizeLedgerRow(existing || { employeeId });
  if (salaryBeforeEl.value == null || salaryBeforeEl.value === '') {
    salaryBeforeEl.value = String(round2(Math.max(0, toNumber(normalized.salaryGeneratedBefore, 0))));
  }
  if (paidBeforeEl.value == null || paidBeforeEl.value === '') {
    paidBeforeEl.value = String(round2(Math.max(0, toNumber(normalized.paidBefore, 0))));
  }
  if (openingPendingEl && (openingPendingEl.value == null || openingPendingEl.value === '')) {
    openingPendingEl.value = String(round2(Math.max(0, toNumber(normalized.openingPending, 0))));
  }
  updateSalaryLedgerPreview();
  showToast('Monthly salary copied from employee profile');
}

function setSalaryLedgerCurrentMonthRange() {
  if (salaryLedgerFromDateInput) salaryLedgerFromDateInput.value = startOfCurrentMonthISO();
  if (salaryLedgerToDateInput) salaryLedgerToDateInput.value = todayISO();
  updateSalaryLedgerPreview();
  showToast('Current month period selected');
}

function carryPreviousRemainingToNewSession() {
  if (!salaryLedgerForm || !salaryLedgerEmployeeSelect) return;
  const employeeId = salaryLedgerEmployeeSelect.value;
  if (!employeeId) {
    showToast('Select employee first', 'error');
    return;
  }
  const existing = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  const normalized = normalizeLedgerRow(existing || { employeeId });
  const nextStart = normalized.durationEnd ? shiftIsoDate(normalized.durationEnd, 1) : startOfCurrentMonthISO();
  if (salaryLedgerFromDateInput) salaryLedgerFromDateInput.value = nextStart || startOfCurrentMonthISO();
  if (salaryLedgerToDateInput) salaryLedgerToDateInput.value = todayISO();
  if (salaryLedgerSalaryBeforeInput) salaryLedgerSalaryBeforeInput.value = String(round2(Math.max(0, toNumber(normalized.totalToGive, 0))));
  if (salaryLedgerPaidBeforeInput) salaryLedgerPaidBeforeInput.value = String(round2(Math.max(0, toNumber(normalized.totalPaid, 0))));
  if (salaryLedgerOpeningPendingInput) {
    salaryLedgerOpeningPendingInput.value = String(round2(Math.max(0, toNumber(normalized.remaining, 0))));
  }
  if (salaryLedgerPaidForPreviousInput) salaryLedgerPaidForPreviousInput.value = '0';
  if (salaryLedgerPaidForCurrentInput) salaryLedgerPaidForCurrentInput.value = '0';
  updateSalaryLedgerPreview();
  showToast('Previous remaining carried to new session');
}

function getSelectedSalaryLedgerEmployeeId() {
  return String(salaryLedgerEmployeeSelect?.value || '').trim();
}

function normalizeSalaryLedgerDetailEntry(entry) {
  return {
    id: String(entry?.id || ''),
    employeeId: String(entry?.employeeId || ''),
    date: normalizeIsoDateValue(entry?.date),
    particulars: String(entry?.particulars || '').trim(),
    voucherType: String(entry?.voucherType || 'Manual').trim() || 'Manual',
    voucherNo: String(entry?.voucherNo || '').trim(),
    debit: round2(Math.max(0, toNumber(entry?.debit, 0))),
    credit: round2(Math.max(0, toNumber(entry?.credit, 0))),
    note: String(entry?.note || '').trim(),
    createdAt: String(entry?.createdAt || ''),
    updatedAt: String(entry?.updatedAt || '')
  };
}

function isSalaryLedgerClosingAdjustmentEntry(entry) {
  return (
    String(entry?.particulars || '').trim() === SALARY_LEDGER_CLOSING_ADJUSTMENT_PARTICULARS &&
    String(entry?.note || '').includes(SALARY_LEDGER_CLOSING_ADJUSTMENT_NOTE_MARKER)
  );
}

function salaryLedgerEntryBalanceDelta(entry) {
  const debit = round2(Math.max(0, toNumber(entry?.debit, 0)));
  const credit = round2(Math.max(0, toNumber(entry?.credit, 0)));
  return round2(credit - debit);
}

function getSalaryLedgerClosingAdjustmentRows(rows) {
  return (rows || []).filter((entry) => isSalaryLedgerClosingAdjustmentEntry(entry));
}

function formatSalaryLedgerDetailNote(note) {
  const clean = String(note || '').replace(SALARY_LEDGER_CLOSING_ADJUSTMENT_NOTE_MARKER, '').trim();
  return clean ? escapeHtml(clean) : '-';
}

function sortSalaryLedgerDetailEntries(rows) {
  return [...(rows || [])].sort((a, b) => {
    const aDate = String(a.date || '');
    const bDate = String(b.date || '');
    if (aDate !== bDate) return aDate.localeCompare(bDate);
    const aCreated = String(a.createdAt || '');
    const bCreated = String(b.createdAt || '');
    if (aCreated !== bCreated) return aCreated.localeCompare(bCreated);
    return String(a.id || '').localeCompare(String(b.id || ''));
  });
}

function setSalaryLedgerDetailSummary(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = money(value);
}

function resetSalaryLedgerDetailForm() {
  if (!salaryLedgerDetailForm) return;
  salaryLedgerDetailForm.reset();
  const dateInput = salaryLedgerDetailForm.querySelector('input[name="date"]');
  if (dateInput) dateInput.value = todayISO();
  const entryIdInput = salaryLedgerDetailForm.querySelector('input[name="entryId"]');
  if (entryIdInput) entryIdInput.value = '';
  editingSalaryLedgerDetailId = null;
  if (salaryLedgerDetailSaveBtn) salaryLedgerDetailSaveBtn.textContent = 'Add Entry';
  if (salaryLedgerDetailCancelBtn) salaryLedgerDetailCancelBtn.classList.add('hidden');
}

function computeSalaryLedgerDetailView(employeeId) {
  const ledgerRow = normalizeLedgerRow(
    salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId)) || { employeeId }
  );
  const openingBalance = round2(Math.max(0, toNumber(ledgerRow.openingPending, 0)));
  const entries = sortSalaryLedgerDetailEntries(
    (salaryLedgerDetailEntriesCache || [])
      .map((entry) => normalizeSalaryLedgerDetailEntry(entry))
      .filter((entry) => String(entry.employeeId) === String(employeeId))
  );

  let runningBalance = openingBalance;
  let debitSum = 0;
  let creditSum = 0;
  const rows = entries.map((entry) => {
    const debit = round2(Math.max(0, toNumber(entry.debit, 0)));
    const credit = round2(Math.max(0, toNumber(entry.credit, 0)));
    runningBalance = round2(runningBalance + credit - debit);
    debitSum = round2(debitSum + debit);
    creditSum = round2(creditSum + credit);
    return {
      ...entry,
      debit,
      credit,
      balance: runningBalance
    };
  });

  return {
    openingBalance,
    debitSum,
    creditSum,
    closingBalance: runningBalance,
    rows,
    ledgerRow
  };
}

function renderSalaryLedgerDetail() {
  if (!salaryLedgerDetailTableTbody) return;
  const employeeId = getSelectedSalaryLedgerEmployeeId();
  if (!employeeId) {
    salaryLedgerDetailTableTbody.innerHTML = '<tr><td colspan="9">Select an employee to load detailed ledger.</td></tr>';
    setSalaryLedgerDetailSummary('salaryLedgerDetailOpeningBalance', 0);
    setSalaryLedgerDetailSummary('salaryLedgerDetailDebitSum', 0);
    setSalaryLedgerDetailSummary('salaryLedgerDetailCreditSum', 0);
    setSalaryLedgerDetailSummary('salaryLedgerDetailClosingBalance', 0);
    return;
  }

  const canEdit = hasPermission('salaryledger:update');
  const view = computeSalaryLedgerDetailView(employeeId);
  setSalaryLedgerDetailSummary('salaryLedgerDetailOpeningBalance', view.openingBalance);
  setSalaryLedgerDetailSummary('salaryLedgerDetailDebitSum', view.debitSum);
  setSalaryLedgerDetailSummary('salaryLedgerDetailCreditSum', view.creditSum);
  setSalaryLedgerDetailSummary('salaryLedgerDetailClosingBalance', view.closingBalance);

  const openingDate = view.ledgerRow.durationStart || '-';
  const openingRow = `<tr class="ledger-static ledger-opening">
      <td>${openingDate}</td>
      <td>Brought Forward</td>
      <td>-</td>
      <td>-</td>
      <td class="money">-</td>
      <td class="money">-</td>
      <td class="money">${money(view.openingBalance)}</td>
      <td>-</td>
      <td>-</td>
    </tr>`;

  const entriesRows = view.rows
    .map((entry) => {
      const isClosingAdjustment = isSalaryLedgerClosingAdjustmentEntry(entry);
      const actions =
        canEdit && !isClosingAdjustment
          ? `<div class="actions">
             <button type="button" class="small warn sldd-edit" data-id="${entry.id}">Edit</button>
             <button type="button" class="small danger sldd-del" data-id="${entry.id}">Delete</button>
           </div>`
          : '-';
      return `<tr>
        <td>${entry.date || '-'}</td>
        <td>${escapeHtml(entry.particulars || '-')}</td>
        <td>${escapeHtml(entry.voucherType || '-')}</td>
        <td>${escapeHtml(entry.voucherNo || '-')}</td>
        <td class="money">${money(entry.debit)}</td>
        <td class="money">${money(entry.credit)}</td>
        <td class="money">${money(entry.balance)}</td>
        <td>${formatSalaryLedgerDetailNote(entry.note)}</td>
        <td>${actions}</td>
      </tr>`;
    })
    .join('');

  const emptyEntryRow = view.rows.length
    ? ''
    : '<tr><td colspan="9">No detailed entries yet. Add first salary/payment line.</td></tr>';

  const closingActions = canEdit
    ? `<div class="actions">
         <button type="button" class="small warn sldd-closing-edit">Edit</button>
         <button type="button" class="small danger sldd-closing-del">Delete</button>
       </div>`
    : '-';

  const closingRow = `<tr class="ledger-static ledger-closing">
      <td>-</td>
      <td><strong>Closing Balance</strong></td>
      <td>-</td>
      <td>-</td>
      <td class="money"><strong>${money(view.debitSum)}</strong></td>
      <td class="money"><strong>${money(view.creditSum)}</strong></td>
      <td class="money"><strong>${money(view.closingBalance)}</strong></td>
      <td>-</td>
      <td>${closingActions}</td>
    </tr>`;

  salaryLedgerDetailTableTbody.innerHTML = `${openingRow}${entriesRows}${emptyEntryRow}${closingRow}`;

  if (!canEdit) return;
  document.querySelectorAll('.sldd-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = String(btn.getAttribute('data-id') || '');
      const entry = view.rows.find((row) => String(row.id) === id);
      if (!entry || !salaryLedgerDetailForm) return;
      editingSalaryLedgerDetailId = id;
      const setValue = (name, value) => {
        const input = salaryLedgerDetailForm.querySelector(`[name="${name}"]`);
        if (input) input.value = value;
      };
      setValue('entryId', entry.id);
      setValue('date', entry.date || todayISO());
      setValue('particulars', entry.particulars || '');
      setValue('voucherType', entry.voucherType || 'Manual');
      setValue('voucherNo', entry.voucherNo || '');
      setValue('debit', String(entry.debit || 0));
      setValue('credit', String(entry.credit || 0));
      setValue('note', entry.note || '');
      if (salaryLedgerDetailSaveBtn) salaryLedgerDetailSaveBtn.textContent = 'Update Entry';
      if (salaryLedgerDetailCancelBtn) salaryLedgerDetailCancelBtn.classList.remove('hidden');
      salaryLedgerDetailForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  document.querySelectorAll('.sldd-del').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = String(btn.getAttribute('data-id') || '');
      if (!id) return;
      if (!confirm('Delete this detailed ledger entry?')) return;
      try {
        await api(`/api/salary-ledger-entries/${id}`, 'DELETE');
        if (editingSalaryLedgerDetailId === id) resetSalaryLedgerDetailForm();
        await loadSalaryLedgerDetailEntries({ employeeId, silent: true });
        showToast('Detailed ledger entry deleted');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });

  document.querySelectorAll('.sldd-closing-edit').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const promptDefault = String(round2(toNumber(view.closingBalance, 0)));
      const input = prompt('Enter closing balance value', promptDefault);
      if (input == null) return;
      const targetClosing = round2(toNumber(input, Number.NaN));
      if (!Number.isFinite(targetClosing)) {
        showToast('Enter a valid closing balance', 'error');
        return;
      }
      try {
        const adjustmentRows = getSalaryLedgerClosingAdjustmentRows(view.rows);
        const adjustmentDelta = round2(
          adjustmentRows.reduce((sum, row) => round2(sum + salaryLedgerEntryBalanceDelta(row)), 0)
        );
        const baseClosing = round2(view.closingBalance - adjustmentDelta);
        const requiredDelta = round2(targetClosing - baseClosing);
        const primaryAdjustment = adjustmentRows[adjustmentRows.length - 1] || null;
        const extraAdjustments = adjustmentRows.slice(0, -1);
        for (const row of extraAdjustments) {
          await api(`/api/salary-ledger-entries/${row.id}`, 'DELETE');
        }
        if (Math.abs(requiredDelta) < 0.005) {
          if (primaryAdjustment) {
            await api(`/api/salary-ledger-entries/${primaryAdjustment.id}`, 'DELETE');
            if (editingSalaryLedgerDetailId === String(primaryAdjustment.id)) resetSalaryLedgerDetailForm();
          }
        } else {
          const payload = {
            employeeId,
            date: primaryAdjustment?.date || todayISO(),
            particulars: SALARY_LEDGER_CLOSING_ADJUSTMENT_PARTICULARS,
            voucherType: 'Adjustment',
            voucherNo: 'CLOSE-BAL',
            debit: requiredDelta < 0 ? round2(Math.abs(requiredDelta)) : 0,
            credit: requiredDelta > 0 ? round2(requiredDelta) : 0,
            note: SALARY_LEDGER_CLOSING_ADJUSTMENT_NOTE
          };
          if (primaryAdjustment) {
            await api(`/api/salary-ledger-entries/${primaryAdjustment.id}`, 'PUT', payload);
          } else {
            await api('/api/salary-ledger-entries', 'POST', payload);
          }
        }
        await loadSalaryLedgerDetailEntries({ employeeId, silent: true });
        showToast('Closing balance updated');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });

  document.querySelectorAll('.sldd-closing-del').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const adjustmentRows = getSalaryLedgerClosingAdjustmentRows(view.rows);
      if (!adjustmentRows.length) {
        showToast('No custom closing balance entry found');
        return;
      }
      if (!confirm('Delete custom closing balance entry?')) return;
      try {
        for (const row of adjustmentRows) {
          await api(`/api/salary-ledger-entries/${row.id}`, 'DELETE');
          if (editingSalaryLedgerDetailId === String(row.id)) resetSalaryLedgerDetailForm();
        }
        await loadSalaryLedgerDetailEntries({ employeeId, silent: true });
        showToast('Closing balance reset');
      } catch (err) {
        showToast(err.message, 'error');
      }
    });
  });
}

async function loadSalaryLedgerDetailEntries({ employeeId, silent = false } = {}) {
  const selectedEmployeeId = String(employeeId || getSelectedSalaryLedgerEmployeeId()).trim();
  if (!selectedEmployeeId) {
    salaryLedgerDetailEmployeeId = '';
    salaryLedgerDetailEntriesCache = [];
    resetSalaryLedgerDetailForm();
    renderSalaryLedgerDetail();
    return [];
  }
  const rows = await api(`/api/salary-ledger-entries?employeeId=${encodeURIComponent(selectedEmployeeId)}`);
  salaryLedgerDetailEntriesCache = Array.isArray(rows)
    ? rows.map((row) => normalizeSalaryLedgerDetailEntry(row))
    : [];
  salaryLedgerDetailEmployeeId = selectedEmployeeId;
  if (
    editingSalaryLedgerDetailId &&
    !salaryLedgerDetailEntriesCache.some((entry) => String(entry.id) === String(editingSalaryLedgerDetailId))
  ) {
    resetSalaryLedgerDetailForm();
  }
  renderSalaryLedgerDetail();
  if (!silent) showToast('Detailed ledger loaded');
  return salaryLedgerDetailEntriesCache;
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
  const normalizedRows = (rows || []).map((row) => ({
    ...row,
    party: row.party || 'narayan',
    client: row.client || '',
    marked: Boolean(row.marked)
  }));

  const normalizeTruckAmount = (row) => {
    const directAmount = Number(row.totalAmount);
    if (Number.isFinite(directAmount)) return directAmount;
    const qty = Number(row.quantity) || 0;
    const rate = Number(row.pricePerQuintal) || 0;
    return qty * rate;
  };

  const totalTruckCount = normalizedRows.length;
  const markedTruckCount = normalizedRows.reduce((sum, row) => sum + Number(Boolean(row.marked)), 0);
  const totalTruckQuantity = normalizedRows.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);
  const totalTruckAmount = normalizedRows.reduce((sum, row) => sum + normalizeTruckAmount(row), 0);

  let pelletTotal = 0;
  let briquetteTotal = 0;
  let pelletRevenue = 0;
  let pelletRevenueNarayan = 0;
  let pelletRevenueMaaVaishno = 0;
  let briquetteRevenue = 0;
  let briquetteRevenueNarayan = 0;
  let briquetteRevenueMaaVaishno = 0;

  normalizedRows.forEach((row) => {
    const qty = Number(row.quantity) || 0;
    const amount = normalizeTruckAmount(row);
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

  if (truckTotalCountEl) truckTotalCountEl.textContent = String(totalTruckCount);
  if (truckMarkedCountEl) truckMarkedCountEl.textContent = String(markedTruckCount);
  if (truckTotalQuantityEl) truckTotalQuantityEl.textContent = `${totalTruckQuantity.toFixed(2)} Qntl`;
  if (truckTotalAmountAllEl) truckTotalAmountAllEl.textContent = money(totalTruckAmount);
  if (truckPelletTotalEl) truckPelletTotalEl.textContent = `${pelletTotal.toFixed(2)} Qntl`;
  if (truckBriquetteTotalEl) truckBriquetteTotalEl.textContent = `${briquetteTotal.toFixed(2)} Qntl`;
  if (truckPelletRevenueEl) truckPelletRevenueEl.textContent = money(pelletRevenue);
  if (truckPelletRevenueNarayanEl) truckPelletRevenueNarayanEl.textContent = `Narayan: ${money(pelletRevenueNarayan)}`;
  if (truckPelletRevenueMaaVaishnoEl) truckPelletRevenueMaaVaishnoEl.textContent = `Maa Vaishno: ${money(pelletRevenueMaaVaishno)}`;
  if (truckBriquetteRevenueEl) truckBriquetteRevenueEl.textContent = money(briquetteRevenue);
  if (truckBriquetteRevenueNarayanEl) truckBriquetteRevenueNarayanEl.textContent = `Narayan: ${money(briquetteRevenueNarayan)}`;
  if (truckBriquetteRevenueMaaVaishnoEl) truckBriquetteRevenueMaaVaishnoEl.textContent = `Maa Vaishno: ${money(briquetteRevenueMaaVaishno)}`;

  const narayanTotal = normalizedRows
    .filter((t) => t.party === 'narayan' && t.totalAmount != null)
    .reduce((sum, t) => sum + Number(t.totalAmount), 0);
  const maaVaishnoTotal = normalizedRows
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
        const customOption = materialKey && !['pellet', 'briquettes'].includes(materialKey)
          ? `<option value="${escapeHtml(materialLabel)}" selected>${escapeHtml(materialLabel)}</option>`
          : '';
        const materialCell = canEdit
          ? `<select class="truck-material-select" data-id="${t.id}">
              <option value="Pellet" ${materialKey === 'pellet' ? 'selected' : ''}>Pellet</option>
              <option value="Briquettes" ${materialKey === 'briquettes' ? 'selected' : ''}>Briquettes</option>
              ${customOption}
            </select>`
          : escapeHtml(materialLabel);
        return `<tr class="${t.marked ? 'truck-marked-row' : ''}">
          <td>${idx + 1}</td>
          <td>${t.date}</td>
          <td>${escapeHtml(t.truckNumber || '-')}</td>
          <td>${escapeHtml(t.driverName || '-')}</td>
          <td>${materialCell}</td>
          <td>${escapeHtml(t.client || '-')}</td>
          <td>${t.quantity}</td>
          <td>${t.pricePerQuintal != null ? money(t.pricePerQuintal) : '-'}</td>
          <td>${t.totalAmount != null ? money(t.totalAmount) : '-'}</td>
          <td>${escapeHtml(t.origin || '-')}</td>
          <td>${escapeHtml(t.destination || '-')}</td>
          <td>${escapeHtml(t.notes || '-')}</td>
          <td>${normalizeTruckMarkedText(Boolean(t.marked))}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn truck-edit" data-id="${t.id}">Edit</button>` : ''}
              ${canEdit ? `<button type="button" class="small secondary truck-mark" data-id="${t.id}">${normalizeTruckMarkLabel(Boolean(t.marked))}</button>` : ''}
              ${canDelete ? `<button type="button" class="small danger truck-del" data-id="${t.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`;
      })
      .join('');
  };

  const narayanRows = normalizedRows.filter((t) => t.party === 'narayan');
  const maaVaishnoRows = normalizedRows.filter((t) => t.party === 'maa_vaishno');
  renderTruckTable(truckNarayanTbody, narayanRows);
  renderTruckTable(truckMaaVaishnoTbody, maaVaishnoRows);

  if (canEdit) {
    document.querySelectorAll('.truck-material-select').forEach((select) => {
      select.addEventListener('change', async () => {
        const id = select.getAttribute('data-id');
        const current = findTruckById(id);
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
            client: current.client || '',
            quantity: current.quantity,
            pricePerQuintal: current.pricePerQuintal != null ? current.pricePerQuintal : undefined,
            marked: Boolean(current.marked),
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
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const current = findTruckById(id);
        if (!current) {
          showToast('Truck entry not found for editing', 'error');
          return;
        }
        editingTruckId = id;
        truckForm.querySelector('input[name="date"]').value = current.date || '';
        truckForm.querySelector('select[name="party"]').value = current.party || 'narayan';
        truckForm.querySelector('input[name="truckNumber"]').value = current.truckNumber || '';
        truckForm.querySelector('input[name="driverName"]').value = current.driverName || '';
        const materialSelect = truckForm.querySelector('[name="rawMaterial"]');
        if (materialSelect) {
          const label = truckMaterialLabel(current.rawMaterial);
          materialSelect.value = ['Pellet', 'Briquettes'].includes(label) ? label : 'Pellet';
        }
        const clientInput = truckForm.querySelector('input[name="client"]');
        if (clientInput) clientInput.value = current.client || '';
        truckForm.querySelector('input[name="quantity"]').value = current.quantity != null ? String(current.quantity) : '';
        truckForm.querySelector('input[name="pricePerQuintal"]').value = current.pricePerQuintal != null ? String(current.pricePerQuintal) : '';
        truckForm.querySelector('input[name="origin"]').value = current.origin || '';
        truckForm.querySelector('input[name="destination"]').value = current.destination || '';
        truckForm.querySelector('input[name="notes"]').value = current.notes || '';
        const submitBtn = truckForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Update Truck Entry';
        if (truckCancelEditBtn) truckCancelEditBtn.classList.remove('hidden');
        updateTruckTotal();
        truckForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        showToast('Truck loaded. Update fields and click "Update Truck Entry".');
      });
    });

    document.querySelectorAll('.truck-mark').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const current = findTruckById(id);
        if (!current) {
          showToast('Truck entry not found for marking', 'error');
          return;
        }
        const nextMarked = !Boolean(current.marked);
        btn.disabled = true;
        try {
          await api(`/api/trucks/${id}/mark`, 'PUT', { marked: nextMarked });
          await refresh();
          showToast(normalizeTruckMarkActionText(nextMarked));
        } catch (err) {
          showToast(err.message, 'error');
        } finally {
          btn.disabled = false;
        }
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
  const typeQuery = String(expenseFilter.expenseType || '')
    .trim()
    .toLowerCase();
  const filtered = rows.filter((e) => {
    if (expenseFilter.dateFrom && e.date < expenseFilter.dateFrom) return false;
    if (expenseFilter.dateTo && e.date > expenseFilter.dateTo) return false;
    if (descriptionQuery && !String(e.description || '').toLowerCase().includes(descriptionQuery)) return false;
    if (typeQuery && !String(e.expenseType || '').toLowerCase().includes(typeQuery)) return false;
    return true;
  });

  const typeTotals = {};
  rows.forEach(e => {
    const t = String(e.expenseType || 'Uncategorized').trim();
    typeTotals[t] = (typeTotals[t] || 0) + Number(e.amount || 0);
  });
  const breakdownEl = document.getElementById('expenseTypeBreakdown');
  if (breakdownEl) {
    if (Object.keys(typeTotals).length === 0) {
      breakdownEl.innerHTML = '<div class="summary-stat"><div class="label">No Data</div></div>';
    } else {
      breakdownEl.innerHTML = Object.entries(typeTotals)
        .sort((a, b) => b[1] - a[1])
        .map(([type, amount]) => `
          <div class="summary-stat">
            <div class="label">${escapeHtml(type)}</div>
            <div class="value">${money(amount)}</div>
          </div>
        `).join('');
    }
  }

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
          <td>${escapeHtml(e.expenseType || '-')}</td>
          <td>${escapeHtml(e.description || '-')}</td>
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
        expenseForm.querySelector('input[name="expenseType"]').value = current.expenseType || '';
        expenseForm.querySelector('input[name="description"]').value = current.description || '';
        expenseForm.querySelector('input[name="amount"]').value = current.amount != null ? String(current.amount) : '';
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
  const totalAmtSum = rows.reduce((sum, r) => sum + Number(r.totalAmount || 0), 0);
  const totalPending = rows.reduce((sum, r) => sum + Math.max(0, Number(r.totalAmount || 0) - Number(r.amountPaid || 0)), 0);

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = money(value);
  };
  set('vehicleMonthlyTotal', totalAmtSum);
  set('vehiclePaidTotal', totalPaid);
  set('vehiclePendingTotal', totalPending);

  vehicleTbody.innerHTML = rows
    .map((r) => {
      const remaining = Math.max(0, Number(r.totalAmount || 0) - Number(r.amountPaid || 0));
      return `<tr>
          <td><div class="record-name">${r.vehicleName}</div></td>
          <td>
            <div class="record-subtext fw-600">${r.startDate || '-'}</div>
            <div class="record-subtext">to</div>
            <div class="record-subtext fw-600">${r.endDate || '-'}</div>
          </td>
          <td class="money">${money(r.monthlyPrice || 0)}</td>
          <td class="money">${money(r.totalAmount || 0)}</td>
          <td class="money">${money(r.amountPaid || 0)}</td>
          <td class="money danger-text">${money(remaining)}</td>
          <td>
            <div class="record-subtext">Due: ${r.serviceDueDate || '-'}</div>
            <div class="record-subtext">Last: ${r.lastServiceDate || '-'}</div>
          </td>
          <td><span class="status-badge ${r.paymentStatus === 'paid' ? 'paid' : r.paymentStatus === 'partial' ? 'pending' : 'unpaid'}">${r.paymentStatus || 'pending'}</span></td>
          <td>${r.note || '-'}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button type="button" class="small warn veh-edit" data-id="${r.id}">Edit</button>` : ''}
              ${canDelete ? `<button type="button" class="small danger veh-del" data-id="${r.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`;
    })
    .join('');

  if (canEdit) {
    document.querySelectorAll('.veh-edit').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const current = vehiclesCache.find((v) => v.id === id);
        if (!current) return;
        editingVehicleId = id;
        vehicleForm.elements['vehicleName'].value = current.vehicleName || '';
        vehicleForm.elements['vehicleNumber'].value = current.vehicleNumber || '';
        vehicleForm.elements['monthlyPrice'].value = current.monthlyPrice || '';
        vehicleForm.elements['startDate'].value = current.startDate || '';
        vehicleForm.elements['endDate'].value = current.endDate || '';
        vehicleForm.elements['totalAmount'].value = current.totalAmount || '';
        vehicleForm.elements['serviceDueDate'].value = current.serviceDueDate || '';
        vehicleForm.elements['lastServiceDate'].value = current.lastServiceDate || '';
        vehicleForm.elements['paymentStatus'].value = current.paymentStatus || 'pending';
        vehicleForm.elements['amountPaid'].value = current.amountPaid || '0';
        vehicleForm.elements['note'].value = current.note || '';

        const submitBtn = vehicleForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Save Changes';
        const cancelBtn = vehicleForm.querySelector('.warn');
        if (cancelBtn) cancelBtn.classList.remove('hidden');
        window.scrollTo({ top: document.getElementById('vehiclePanel').offsetTop - 80, behavior: 'smooth' });
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
  let filtered = rows;
  if (truckShowMarkedOnlyInput?.checked) {
    filtered = filtered.filter((t) => Boolean(t.marked));
  }
  if (!q) return filtered;
  return filtered.filter((t) =>
    `${t.truckNumber} ${t.driverName || ''} ${t.rawMaterial} ${partyLabel(t.party)} ${t.client || ''} ${t.quantity || ''} ${t.origin || ''} ${t.destination || ''} ${t.notes || ''}`
      .toLowerCase()
      .includes(q)
  );
}

function sortTrucksForDisplay(rows) {
  return [...rows].sort((a, b) => {
    const markedDelta = Number(Boolean(b.marked)) - Number(Boolean(a.marked));
    if (markedDelta !== 0) return markedDelta;
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    const aTime = String(a.updatedAt || a.createdAt || '');
    const bTime = String(b.updatedAt || b.createdAt || '');
    if (aTime !== bTime) return aTime < bTime ? 1 : -1;
    return String(a.id || '').localeCompare(String(b.id || ''));
  });
}

function getVisibleTruckRows() {
  return sortTrucksForDisplay(filterTrucks(trucksCache));
}

function renderVisibleTrucks() {
  renderTruckRows(getVisibleTruckRows());
}

function normalizeTruckMarkedText(marked) {
  return marked ? 'Yes' : 'No';
}

function normalizeTruckMarkLabel(marked) {
  return marked ? 'Unmark' : 'Mark';
}

function normalizeTruckMarkActionText(marked) {
  return marked ? 'Truck unmarked' : 'Truck marked';
}

function findTruckById(id) {
  return trucksCache.find((t) => String(t.id) === String(id));
}

function clearTruckEditState(message) {
  if (truckForm) truckForm.reset();
  resetTruckFormMode();
  setDefaultDates();
  updateTruckTotal();
  if (message) showToast(message);
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
    const isActive = btn.getAttribute('data-target') === sectionId;
    btn.classList.toggle('active', isActive);
    if (isActive) {
      const titleEl = document.getElementById('currentSectionTitle');
      if (titleEl) titleEl.textContent = btn.textContent.trim();
    }
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
        ? safeLoad('dashboard', api(`/api/dashboard?month=${month}&today=${todayISO()}`), dashboardCache)
        : Promise.resolve(null),
      hasPermission('employees:view')
        ? safeLoad('employees', api('/api/employees'), employeesCache)
        : Promise.resolve([]),
      hasPermission('salary:view')
        ? safeLoad('salary', api(`/api/salary-summary?month=${month}`), { rows: salaryRowsCache })
        : Promise.resolve({ rows: [] }),
      hasPermission('salaryledger:view')
        ? safeLoad('salary-ledgers', api('/api/salary-ledgers'), salaryLedgersCache)
        : Promise.resolve([]),
      hasPermission('trucks:view') ? safeLoad('trucks', api('/api/trucks'), trucksCache) : Promise.resolve([]),
      hasPermission('expenses:view') ? safeLoad('expenses', api('/api/expenses'), expensesCache) : Promise.resolve([]),
      hasPermission('investments:view')
        ? safeLoad('investments', api('/api/investments'), investmentsCache)
        : Promise.resolve([]),
      hasPermission('chini:view') ? safeLoad('chini', api('/api/chini-expenses'), chiniExpensesCache) : Promise.resolve([]),
      hasPermission('land:view') ? safeLoad('land', api('/api/lands'), landRecordsCache) : Promise.resolve([]),
      hasPermission('vehicles:view') ? safeLoad('vehicles', api('/api/vehicles'), vehiclesCache) : Promise.resolve([]),
      hasPermission('billing:view')
        ? safeLoad('billing-companies', api('/api/billing/companies'), billingCompaniesCache)
        : Promise.resolve([]),
      hasPermission('billing:view') ? safeLoad('bills', api('/api/bills'), billsCache) : Promise.resolve([]),
      hasPermission('suppliers:view') ? safeLoad('suppliers', api('/api/suppliers'), suppliersCache) : Promise.resolve([]),
      hasPermission('attendance:report')
        ? safeLoad(
          'attendance-report',
          api(`/api/attendance-report?month=${attendanceMonthInput.value || month}`),
          attendanceReportCache
        )
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

    if (dashboard && hasPermission('dashboard:view')) {
      dashboardCache = dashboard;
      renderCards(dashboard);
      lastRefreshedEl.textContent = `Last refreshed: ${formatLastRefreshed()}`;
      lastRefreshedWrap.classList.toggle('hidden', !hasPermission('dashboard:view'));
    } else if (!hasPermission('dashboard:view')) {
      cardsEl.innerHTML = '';
      lastRefreshedWrap.classList.add('hidden');
    }

    employeesCache = Array.isArray(employees) ? employees : employeesCache;
    trucksCache = Array.isArray(trucks) ? trucks : trucksCache;
    expensesCache = Array.isArray(expenses) ? expenses : expensesCache;
    investmentsCache = Array.isArray(investments) ? investments : investmentsCache;
    chiniExpensesCache = Array.isArray(chiniExpenses) ? chiniExpenses : chiniExpensesCache;
    landRecordsCache = Array.isArray(landRecords) ? landRecords : landRecordsCache;
    vehiclesCache = Array.isArray(vehicles) ? vehicles : vehiclesCache;
    billingCompaniesCache = Array.isArray(billingCompanies) ? billingCompanies : billingCompaniesCache;
    billsCache = Array.isArray(bills) ? bills : billsCache;
    suppliersCache = Array.isArray(suppliers) ? suppliers : suppliersCache;
    salaryRowsCache = salary && Array.isArray(salary.rows) ? salary.rows : salaryRowsCache;
    salaryLedgersCache = Array.isArray(salaryLedgers) ? salaryLedgers : salaryLedgersCache;
    attendanceReportCache = attendanceReport && Array.isArray(attendanceReport.rows)
      ? attendanceReport
      : attendanceReportCache;

    renderEmployeeOptions(employeesCache);
    await loadAdvancesForSelectedEmployee({ silent: true });
    renderEmployeeRows(filterEmployees(employeesCache));
    renderSalaryRows(salaryRowsCache);
    renderSalarySummaries(salaryRowsCache);
    renderSalaryLedgers(salaryLedgersCache);
    renderVisibleTrucks();
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
    renderAttendanceReportRows(attendanceReportCache.rows || []);

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
    resetEmployeeFormMode();
    resetTruckFormMode();
    resetAdvanceFormMode();
    setDefaultDates();
    resetSalaryLedgerDetailForm();
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
    resetEmployeeFormMode();
    resetTruckFormMode();
    setDefaultDates();
    resetSalaryLedgerDetailForm();
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
  salaryLedgerDetailEntriesCache = [];
  salaryLedgerDetailEmployeeId = '';
  dashboardCache = null;
  attendanceReportCache = { rows: [] };
  resetSalaryLedgerDetailForm();
  resetEmployeeFormMode();
  resetTruckFormMode();
  if (employeeForm) employeeForm.reset();
  if (truckForm) truckForm.reset();
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
      expenseType: fd.get('expenseType') || undefined,
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

let editingVehicleId = null;

vehicleForm?.addEventListener('input', () => {
  const vStart = vehicleForm.elements['startDate'].value;
  const vEnd = vehicleForm.elements['endDate'].value;
  const vMonthly = Number(vehicleForm.elements['monthlyPrice'].value || 0);
  const vTotalAmtEl = vehicleForm.elements['totalAmount'];

  if (vStart && vEnd && vMonthly > 0) {
    const start = new Date(vStart);
    const end = new Date(vEnd);
    if (end >= start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
      const amt = (vMonthly / 30) * diffDays;
      vTotalAmtEl.value = amt.toFixed(2);
      return;
    }
  }
  // Don't clear manual overrides unless desired, but auto-calculate normally runs over it
});

const vehicleCancelEditBtn = document.getElementById('vehicleCancelEditBtn');
if (vehicleCancelEditBtn) {
  vehicleCancelEditBtn.addEventListener('click', () => {
    editingVehicleId = null;
    vehicleForm.reset();
    vehicleCancelEditBtn.classList.add('hidden');
    const submitBtn = vehicleForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Add Vehicle Track';
  });
}

vehicleForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(vehicleForm);
  try {
    const endpoint = editingVehicleId ? `/api/vehicles/${editingVehicleId}` : '/api/vehicles';
    const method = editingVehicleId ? 'PUT' : 'POST';
    await api(endpoint, method, {
      vehicleName: fd.get('vehicleName'),
      vehicleNumber: fd.get('vehicleNumber'),
      monthlyPrice: fd.get('monthlyPrice'),
      startDate: fd.get('startDate') || undefined,
      endDate: fd.get('endDate') || undefined,
      totalAmount: fd.get('totalAmount') || undefined,
      serviceDueDate: fd.get('serviceDueDate') || undefined,
      lastServiceDate: fd.get('lastServiceDate') || undefined,
      paymentStatus: fd.get('paymentStatus') || 'pending',
      amountPaid: fd.get('amountPaid') || 0,
      note: fd.get('note') || undefined
    });
    vehicleForm.reset();
    editingVehicleId = null;
    if (vehicleCancelEditBtn) vehicleCancelEditBtn.classList.add('hidden');
    const submitBtn = vehicleForm.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.textContent = 'Add Vehicle Track';
    setDefaultDates();
    await refresh();
    showToast(method === 'PUT' ? 'Vehicle updated' : 'Vehicle track added');
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
    const endpoint = editingEmployeeId ? `/api/employees/${editingEmployeeId}` : '/api/employees';
    const method = editingEmployeeId ? 'PUT' : 'POST';
    await api(endpoint, method, {
      name: fd.get('name'),
      role: fd.get('role'),
      monthlySalary: fd.get('monthlySalary'),
      joiningDate: fd.get('joiningDate')
    });
    employeeForm.reset();
    resetEmployeeFormMode();
    setDefaultDates();
    await refresh();
    showToast(method === 'PUT' ? 'Employee updated' : 'Employee added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

employeeCancelEditBtn?.addEventListener('click', () => {
  editingEmployeeId = null;
  employeeForm.reset();
  resetEmployeeFormMode();
  setDefaultDates();
  showToast('Employee edit cancelled');
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
  const advanceId = String(fd.get('advanceId') || '').trim();
  const employeeId = String(fd.get('employeeId') || '').trim();
  const date = normalizeIsoDateValue(fd.get('date'));
  const amount = round2(Math.max(0, toNumber(fd.get('amount'), 0)));
  const note = String(fd.get('note') || '').trim();

  if (!employeeId || !date || amount <= 0) {
    showToast('Employee, valid date and amount are required', 'error');
    return;
  }

  try {
    const endpoint = advanceId ? `/api/advances/${advanceId}` : '/api/advances';
    const method = advanceId ? 'PUT' : 'POST';
    await api(endpoint, method, {
      employeeId,
      date,
      amount,
      note
    });
    const selectedEmployeeId = employeeId;
    advanceForm.reset();
    if (advanceEmployeeEl) advanceEmployeeEl.value = selectedEmployeeId;
    setDefaultDates();
    resetAdvanceFormMode();
    await loadAdvancesForSelectedEmployee({ silent: true });
    await refresh();
    showToast(advanceId ? 'Advance updated' : 'Advance recorded');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

advanceEmployeeEl?.addEventListener('change', () => {
  if (editingAdvanceId) {
    advanceForm?.reset();
    setDefaultDates();
    resetAdvanceFormMode();
  }
  loadAdvancesForSelectedEmployee({ silent: true }).catch((err) => {
    console.error('[advances:load]', err);
  });
});

advanceCancelEditBtn?.addEventListener('click', () => {
  advanceForm?.reset();
  setDefaultDates();
  resetAdvanceFormMode();
});

salaryLedgerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(salaryLedgerForm);
  const employeeId = String(fd.get('employeeId') || '');
  const monthlySalaryApplied = round2(Math.max(0, toNumber(fd.get('monthlySalaryApplied'), 0)));
  const durationStart = normalizeIsoDateValue(fd.get('durationStart'));
  const durationEnd = normalizeIsoDateValue(fd.get('durationEnd'));
  const durationDays = isoDaysInclusiveClient(durationStart, durationEnd);
  const salaryBeforeRaw = String(fd.get('salaryGeneratedBefore') ?? '').trim();
  const paidBeforeRaw = String(fd.get('paidBefore') ?? '').trim();
  const openingPendingRaw = String(fd.get('openingPending') ?? '').trim();
  const paidForPrevious = round2(Math.max(0, toNumber(fd.get('paidForPrevious'), 0)));
  const paidForCurrent = round2(Math.max(0, toNumber(fd.get('paidForCurrent'), 0)));
  const paidThisSession = round2(paidForPrevious + paidForCurrent);
  const existing = salaryLedgersCache.find((r) => String(r.employeeId) === String(employeeId));
  const existingNormalized = normalizeLedgerRow(existing || { employeeId });
  const salaryGeneratedBefore = round2(
    Math.max(0, toNumber(salaryBeforeRaw === '' ? existingNormalized.salaryGeneratedBefore : salaryBeforeRaw, 0))
  );
  const paidBefore = round2(
    Math.max(0, toNumber(paidBeforeRaw === '' ? existingNormalized.paidBefore : paidBeforeRaw, 0))
  );
  const autoOpeningPending = round2(Math.max(0, salaryGeneratedBefore - paidBefore));
  const openingPending = round2(
    Math.max(0, toNumber(openingPendingRaw === '' ? autoOpeningPending : openingPendingRaw, autoOpeningPending))
  );
  if (!employeeId) {
    showToast('Select employee', 'error');
    return;
  }
  if (monthlySalaryApplied <= 0) {
    showToast('Monthly salary must be greater than 0', 'error');
    return;
  }
  if (!durationStart || !durationEnd || durationDays <= 0) {
    showToast('Choose valid from/to dates', 'error');
    return;
  }
  if (paidBefore > salaryGeneratedBefore) {
    showToast('Previous paid cannot be greater than previous salary', 'error');
    return;
  }
  const periodSalary = round2((monthlySalaryApplied / 30) * durationDays);
  const totalToGive = round2(salaryGeneratedBefore + periodSalary);
  const totalPaid = round2(paidBefore + paidThisSession);
  if (totalPaid > totalToGive) {
    showToast('Total paid till date cannot be greater than total salary till date', 'error');
    return;
  }
  try {
    await api(`/api/salary-ledgers/${employeeId}`, 'PUT', {
      totalSalary: totalToGive,
      totalPaid,
      totalToGive,
      monthlySalaryApplied,
      durationStart,
      durationEnd,
      durationDays,
      salaryGeneratedBefore: salaryBeforeRaw === '' ? undefined : salaryGeneratedBefore,
      paidBefore: paidBeforeRaw === '' ? undefined : paidBefore,
      openingPending: openingPendingRaw === '' ? undefined : openingPending,
      paidForPrevious,
      paidForCurrent,
      periodSalary,
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
    clearTruckEditState();
    await refresh();
    showToast(method === 'PUT' ? 'Truck entry updated' : 'Truck entry added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

truckCancelEditBtn?.addEventListener('click', () => {
  clearTruckEditState('Truck edit cancelled');
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
  renderVisibleTrucks();
});

truckShowMarkedOnlyInput?.addEventListener('change', () => {
  renderVisibleTrucks();
});

expenseFilterBtn?.addEventListener('click', () => {
  expenseFilter = {
    dateFrom: expenseDateFromInput?.value || '',
    dateTo: expenseDateToInput?.value || '',
    description: expenseSearchInput?.value || '',
    expenseType: expenseTypeFilterInput?.value || ''
  };
  renderExpenseRows(expensesCache);
});

expenseClearBtn?.addEventListener('click', () => {
  expenseFilter = { dateFrom: '', dateTo: '', description: '', expenseType: '' };
  if (expenseDateFromInput) expenseDateFromInput.value = '';
  if (expenseDateToInput) expenseDateToInput.value = '';
  if (expenseSearchInput) expenseSearchInput.value = '';
  if (expenseTypeFilterInput) expenseTypeFilterInput.value = '';
  renderExpenseRows(expensesCache);
});

expenseSearchInput?.addEventListener('input', () => {
  expenseFilter = {
    ...expenseFilter,
    description: expenseSearchInput.value || ''
  };
  renderExpenseRows(expensesCache);
});

expenseTypeFilterInput?.addEventListener('input', () => {
  expenseFilter = {
    ...expenseFilter,
    expenseType: expenseTypeFilterInput.value || ''
  };
  renderExpenseRows(expensesCache);
});

salaryEmployeeSelect?.addEventListener('change', () => {
  renderSalarySummaries(salaryRowsCache);
});

salaryLedgerEmployeeSelect?.addEventListener('change', () => {
  prefillSalaryLedgerForm();
  resetSalaryLedgerDetailForm();
  loadSalaryLedgerDetailEntries({ employeeId: getSelectedSalaryLedgerEmployeeId(), silent: true }).catch((err) =>
    showToast(err.message, 'error')
  );
});

salaryLedgerSearchInput?.addEventListener('input', () => {
  renderSalaryLedgers(salaryLedgersCache);
});

salaryLedgerAutoFillBtn?.addEventListener('click', () => {
  autoFillSalaryLedgerSections();
});

salaryLedgerCurrentMonthBtn?.addEventListener('click', () => {
  setSalaryLedgerCurrentMonthRange();
});

salaryLedgerCarryBtn?.addEventListener('click', () => {
  carryPreviousRemainingToNewSession();
});

salaryLedgerDownloadBtn?.addEventListener('click', () => {
  const employeeId = salaryLedgerEmployeeSelect?.value;
  if (!employeeId) {
    showToast('Select employee first', 'error');
    return;
  }
  window.open(urlWithAuth(`/api/salary-ledgers/${employeeId}.pdf`), '_blank');
});

salaryLedgerDetailRefreshBtn?.addEventListener('click', async () => {
  try {
    await loadSalaryLedgerDetailEntries({ employeeId: getSelectedSalaryLedgerEmployeeId(), silent: false });
  } catch (err) {
    showToast(err.message, 'error');
  }
});

salaryLedgerDetailPdfBtn?.addEventListener('click', () => {
  const employeeId = getSelectedSalaryLedgerEmployeeId();
  if (!employeeId) {
    showToast('Select employee first', 'error');
    return;
  }
  window.open(urlWithAuth(`/api/salary-ledgers/${employeeId}/statement.pdf`), '_blank');
});

salaryLedgerDetailCancelBtn?.addEventListener('click', () => {
  resetSalaryLedgerDetailForm();
});

salaryLedgerDetailForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const employeeId = getSelectedSalaryLedgerEmployeeId();
  if (!employeeId) {
    showToast('Select employee first', 'error');
    return;
  }
  const fd = new FormData(salaryLedgerDetailForm);
  const entryId = String(fd.get('entryId') || '').trim();
  const date = normalizeIsoDateValue(fd.get('date'));
  const particulars = String(fd.get('particulars') || '').trim();
  const voucherType = String(fd.get('voucherType') || 'Manual').trim() || 'Manual';
  const voucherNo = String(fd.get('voucherNo') || '').trim();
  const debit = round2(Math.max(0, toNumber(fd.get('debit'), 0)));
  const credit = round2(Math.max(0, toNumber(fd.get('credit'), 0)));
  const note = String(fd.get('note') || '').trim();

  if (!date) {
    showToast('Enter a valid date', 'error');
    return;
  }
  if (!particulars) {
    showToast('Particulars are required', 'error');
    return;
  }
  if (debit <= 0 && credit <= 0) {
    showToast('Enter debit or credit amount', 'error');
    return;
  }

  const payload = {
    employeeId,
    date,
    particulars,
    voucherType,
    voucherNo,
    debit,
    credit,
    note
  };

  try {
    if (entryId) {
      await api(`/api/salary-ledger-entries/${entryId}`, 'PUT', payload);
    } else {
      await api('/api/salary-ledger-entries', 'POST', payload);
    }
    await loadSalaryLedgerDetailEntries({ employeeId, silent: true });
    resetSalaryLedgerDetailForm();
    showToast(entryId ? 'Detailed entry updated' : 'Detailed entry added');
  } catch (err) {
    showToast(err.message, 'error');
  }
});

salaryLedgerResetBtn?.addEventListener('click', () => {
  if (!salaryLedgerForm) return;
  const salaryBeforeInput = salaryLedgerForm.querySelector('input[name="salaryGeneratedBefore"]');
  const paidBeforeInput = salaryLedgerForm.querySelector('input[name="paidBefore"]');
  const openingPendingInput = salaryLedgerForm.querySelector('input[name="openingPending"]');
  const paidForPreviousInput = salaryLedgerForm.querySelector('input[name="paidForPrevious"]');
  const paidForCurrentInput = salaryLedgerForm.querySelector('input[name="paidForCurrent"]');
  if (salaryBeforeInput) salaryBeforeInput.value = '0';
  if (paidBeforeInput) paidBeforeInput.value = '0';
  if (openingPendingInput) openingPendingInput.value = '';
  if (paidForPreviousInput) paidForPreviousInput.value = '0';
  if (paidForCurrentInput) paidForCurrentInput.value = '0';
  const startEl = salaryLedgerForm.querySelector('input[name="durationStart"]');
  const endEl = salaryLedgerForm.querySelector('input[name="durationEnd"]');
  if (startEl) startEl.value = startOfCurrentMonthISO();
  if (endEl) endEl.value = todayISO();
  const noteEl = salaryLedgerForm.querySelector('input[name="note"]');
  if (noteEl) noteEl.value = '';
  updateSalaryLedgerPreview();
  showToast('Ledger form cleared');
});

salaryLedgerForm
  ?.querySelectorAll(
    'input[name="monthlySalaryApplied"], input[name="durationStart"], input[name="durationEnd"], input[name="salaryGeneratedBefore"], input[name="paidBefore"], input[name="openingPending"], input[name="paidForPrevious"], input[name="paidForCurrent"]'
  )
  ?.forEach((input) => {
    input.addEventListener('input', updateSalaryLedgerPreview);
    input.addEventListener('change', updateSalaryLedgerPreview);
  });

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

function buildTruckExportParams() {
  const party = normalizeTruckPartyFilter(truckExportPartySelect?.value || 'narayan');
  const material = normalizeTruckMaterialFilter(truckExportMaterialSelect?.value || 'pellet');
  if (!party) {
    showToast('Invalid party filter', 'error');
    return null;
  }
  if (!material) {
    showToast('Invalid material filter', 'error');
    return null;
  }
  if (party === 'all' && material === 'all') {
    showToast('Please choose party or material filter. Full export is blocked.', 'error');
    return null;
  }
  const params = new URLSearchParams();
  if (party !== 'all') params.set('party', party);
  if (material !== 'all') params.set('material', material);
  return params.toString();
}

function buildExpensePdfExportParams() {
  const params = new URLSearchParams();
  const dateFrom = String(expenseDateFromInput?.value || expenseFilter.dateFrom || '').trim();
  const dateTo = String(expenseDateToInput?.value || expenseFilter.dateTo || '').trim();
  const description = String(expenseSearchInput?.value || expenseFilter.description || '').trim();
  const expenseType = String(expenseTypeFilterInput?.value || expenseFilter.expenseType || '').trim();
  if (dateFrom) params.set('dateFrom', dateFrom);
  if (dateTo) params.set('dateTo', dateTo);
  if (description) params.set('description', description);
  if (expenseType) params.set('expenseType', expenseType);
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

toggleTruckExportOptionsBtn?.addEventListener('click', () => {
  truckExportOptionsEl?.classList.toggle('hidden');
});

closeTruckExportOptionsBtn?.addEventListener('click', () => {
  truckExportOptionsEl?.classList.add('hidden');
});

downloadTruckReportBtn?.addEventListener('click', () => {
  const query = buildTruckExportParams();
  if (query == null) return;
  const format = String(truckExportFormatSelect?.value || 'csv').trim().toLowerCase() === 'pdf' ? 'pdf' : 'csv';
  const base = format === 'pdf' ? '/api/export/trucks.pdf' : '/api/export/trucks.csv';
  const url = query ? `${base}?${query}` : base;
  downloadWithAuth(url);
  showToast(`Truck ${format.toUpperCase()} download started`);
});

downloadAttendanceCsvBtn.addEventListener('click', () => {
  downloadWithAuth(`/api/export/attendance.csv?month=${attendanceMonthInput.value || monthISO()}`);
});

expenseDownloadPdfBtn?.addEventListener('click', () => {
  const query = buildExpensePdfExportParams();
  const url = query ? `/api/export/expenses.pdf?${query}` : '/api/export/expenses.pdf';
  downloadWithAuth(url);
  showToast('Expense PDF download started');
});

investmentDownloadPdfBtn?.addEventListener('click', () => {
  downloadWithAuth('/api/export/investments.pdf');
  showToast('Investment PDF download started');
});

landDownloadPdfBtn?.addEventListener('click', () => {
  downloadWithAuth('/api/export/land.pdf');
  showToast('Land PDF download started');
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
