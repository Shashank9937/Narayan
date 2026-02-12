const cardsEl = document.getElementById('cards');
const salaryTbody = document.querySelector('#salaryTable tbody');
const salaryLedgerTbody = document.querySelector('#salaryLedgerTable tbody');
const truckTbody = document.querySelector('#truckTable tbody');
const expenseTbody = document.querySelector('#expenseTable tbody');
const chiniTbody = document.querySelector('#chiniTable tbody');
const landTbody = document.querySelector('#landTable tbody');
const employeeTbody = document.querySelector('#employeeTable tbody');
const attendanceReportTbody = document.querySelector('#attendanceReportTable tbody');

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
const chiniForm = document.getElementById('chiniForm');
const landForm = document.getElementById('landForm');
const changePasswordForm = document.getElementById('changePasswordForm');

const downloadSalaryCsvBtn = document.getElementById('downloadSalaryCsv');
const downloadTruckCsvBtn = document.getElementById('downloadTruckCsv');
const downloadAttendanceCsvBtn = document.getElementById('downloadAttendanceCsv');
const refreshAttendanceReportBtn = document.getElementById('refreshAttendanceReport');
const attendanceMonthInput = document.getElementById('attendanceMonthInput');
const employeeSearchInput = document.getElementById('employeeSearchInput');
const truckSearchInput = document.getElementById('truckSearchInput');
const salaryEmployeeSelect = document.getElementById('salaryEmployeeSelect');
const salaryLedgerEmployeeSelect = document.getElementById('salaryLedgerEmployee');
const salaryEmployeeSummaryEl = document.getElementById('salaryEmployeeSummary');
const salaryOverallSummaryEl = document.getElementById('salaryOverallSummary');
const brandLink = document.getElementById('brandLink');
const darkModeToggle = document.getElementById('darkModeToggle');
const lastRefreshedWrap = document.getElementById('lastRefreshedWrap');
const lastRefreshedEl = document.getElementById('lastRefreshed');
const manualRefreshBtn = document.getElementById('manualRefreshBtn');

let me = null;
let employeesCache = [];
let trucksCache = [];
let expensesCache = [];
let chiniExpensesCache = [];
let landRecordsCache = [];
let salaryRowsCache = [];
let salaryLedgersCache = [];
let autoRefreshTimer = null;

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

function money(n) {
  return `₹${Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
}

function ensureAutoRefresh() {
  if (autoRefreshTimer) return;
  autoRefreshTimer = setInterval(() => {
    if (!token()) return;
    refresh().catch(() => {});
  }, 30000);
}

function setDefaultDates() {
  [attendanceForm, advanceForm, truckForm, expenseForm, chiniForm].forEach((form) => {
    if (!form) return;
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.value = todayISO();
  });
  attendanceMonthInput.value = monthISO();
  const joiningInput = document.getElementById('employeeJoiningDate');
  if (joiningInput && !joiningInput.value) joiningInput.value = todayISO();
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
  setFormEnabled('expensePanel', hasPermission('expenses:create'));
  setFormEnabled('chiniPanel', hasPermission('chini:create'));
  setFormEnabled('landPanel', hasPermission('land:create'));

  setPanelVisible('salaryPanel', hasPermission('salary:view'));
  setPanelVisible('salaryLedgerPanel', hasPermission('salaryledger:view'));
  setPanelVisible('truckReportPanel', hasPermission('trucks:view'));
  setPanelVisible('employeeListPanel', hasPermission('employees:view'));
  setPanelVisible('attendanceReportPanel', hasPermission('attendance:report'));
  setPanelVisible('expenseReportPanel', hasPermission('expenses:view'));
  setPanelVisible('chiniReportPanel', hasPermission('chini:view'));
  setPanelVisible('landReportPanel', hasPermission('land:view'));
  setPanelVisible('changePasswordPanel', true);

  downloadSalaryCsvBtn.disabled = !hasPermission('export:view');
  downloadTruckCsvBtn.disabled = !hasPermission('export:view');
  downloadAttendanceCsvBtn.disabled = !hasPermission('export:view');
}

async function api(url, method = 'GET', body) {
  const headers = { 'Content-Type': 'application/json' };
  if (token()) headers.Authorization = `Bearer ${token()}`;

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  if (res.status === 401) {
    setToken('');
    setVisibility(false);
    throw new Error('Session expired. Please login again.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error || 'Request failed');
  }

  return res.json();
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
  const options = employees.map((e) => `<option value="${e.id}">${e.name} (${e.role})</option>`).join('');
  attendanceEmployeeEl.innerHTML = options;
  advanceEmployeeEl.innerHTML = options;
  if (salaryLedgerEmployeeSelect) salaryLedgerEmployeeSelect.innerHTML = options;
}

function renderEmployeeRows(rows) {
  const canEdit = hasPermission('employees:update');
  const canDelete = hasPermission('employees:delete');

  employeeTbody.innerHTML = rows
    .map(
      (e) =>
        `<tr>
          <td>${e.name}</td>
          <td>${e.role}</td>
          <td class="money">${money(e.monthlySalary)}</td>
          <td>
            <div class="actions">
              ${canEdit ? `<button class="small warn emp-edit" data-id="${e.id}">Edit</button>` : ''}
              ${canDelete ? `<button class="small danger emp-del" data-id="${e.id}">Delete</button>` : ''}
              ${!canEdit && !canDelete ? '-' : ''}
            </div>
          </td>
        </tr>`
    )
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
        const advancesCell = canEditAdvances
          ? `<input type="number" min="0" step="0.01" class="advances-input" value="${advVal}" 
               data-emp-id="${r.employeeId}" data-salary="${salary}" data-original="${advVal}"
               placeholder="0" />`
          : `<span class="money">${money(advVal)}</span>`;
        return `<tr data-emp-id="${r.employeeId}">
          <td>${r.name}</td>
          <td>${r.role}</td>
          <td>${r.joiningDate || '-'}</td>
          <td class="money">${money(salary)}</td>
          <td class="advances-cell">${advancesCell}</td>
          <td class="money remaining-cell" data-salary="${salary}">${money(remaining)}</td>
          <td>${r.monthsWorked ?? '-'}</td>
          <td class="money">${money(r.totalSalaryAllTime ?? 0)}</td>
          <td class="money">${money(r.totalAdvancesAllTime ?? 0)}</td>
          <td class="money">${money(r.totalRemainingAllTime ?? 0)}</td>
          <td>${
            canSeeSlip
              ? `<button class="small slip-btn" data-emp-id="${r.employeeId}">PDF Slip</button>`
              : '-'
          }</td>
        </tr>`;
      }
    )
    .join('');

  if (canEditAdvances) {
    document.querySelectorAll('.advances-input').forEach((input) => {
      input.addEventListener('input', () => {
        const salary = Number(input.dataset.salary) || 0;
        const advances = parseFloat(input.value) || 0;
        const remaining = Math.max(0, salary - advances);
        const row = input.closest('tr');
        const remainingCell = row?.querySelector('.remaining-cell');
        if (remainingCell) remainingCell.textContent = money(remaining);
      });
      input.addEventListener('blur', async () => {
        const empId = input.dataset.empId;
        const original = Number(input.dataset.original) || 0;
        const entered = parseFloat(input.value);
        if (Number.isNaN(entered) || entered < 0 || entered === original) return;
        try {
          await api('/api/advances/set', 'PUT', {
            employeeId: empId,
            month: monthISO(),
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
      });
    });
  }

  if (canSeeSlip) {
    document.querySelectorAll('.slip-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const empId = btn.getAttribute('data-emp-id');
        const url = `/api/salary-slip/${empId}.pdf?month=${monthISO()}`;
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
  salaryLedgerTbody.innerHTML = (rows || [])
    .map(
      (r) => `<tr>
        <td>${r.name}</td>
        <td>${r.role}</td>
        <td class="money">${money(r.totalSalary || 0)}</td>
        <td class="money">${money(r.amountGiven || 0)}</td>
        <td class="money">${money(r.pending || 0)}</td>
      </tr>`
    )
    .join('');
  prefillSalaryLedgerForm();
}

function prefillSalaryLedgerForm() {
  if (!salaryLedgerForm || !salaryLedgerEmployeeSelect) return;
  const employeeId = salaryLedgerEmployeeSelect.value;
  const row = salaryLedgersCache.find((r) => r.employeeId === employeeId);
  const totalEl = salaryLedgerForm.querySelector('input[name="totalSalary"]');
  const givenEl = salaryLedgerForm.querySelector('input[name="amountGiven"]');
  if (!totalEl || !givenEl) return;
  totalEl.value = row ? Number(row.totalSalary || 0) : '';
  givenEl.value = row ? Number(row.amountGiven || 0) : '';
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

function renderTruckRows(rows) {
  const canDelete = hasPermission('trucks:delete');
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

  truckTbody.innerHTML = rows
    .map(
      (t) =>
        `<tr>
          <td>${t.date}</td>
          <td>${partyLabel(t.party)}</td>
          <td>${t.truckNumber}</td>
          <td>${t.driverName || '-'}</td>
          <td>${t.rawMaterial}</td>
          <td>${t.quantity}</td>
          <td>${t.pricePerQuintal != null ? money(t.pricePerQuintal) : '-'}</td>
          <td>${t.totalAmount != null ? money(t.totalAmount) : '-'}</td>
          <td>${t.origin || '-'}</td>
          <td>${t.destination || '-'}</td>
          <td>${canDelete ? `<button class="small danger truck-del" data-id="${t.id}">Delete</button>` : '-'}</td>
        </tr>`
    )
    .join('');

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
  const canDelete = hasPermission('expenses:delete');
  const total = rows.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const totalEl = document.getElementById('expenseTotal');
  if (totalEl) totalEl.textContent = money(total);

  expenseTbody.innerHTML = rows
    .map(
      (e) =>
        `<tr>
          <td>${e.date}</td>
          <td>${e.description || '-'}</td>
          <td class="money">${money(e.amount)}</td>
          <td>
            ${canDelete ? `<button class="small danger exp-del" data-id="${e.id}">Delete</button>` : '-'}
          </td>
        </tr>`
    )
    .join('');

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
          <td>${canDelete ? `<button class="small danger chi-del" data-id="${r.id}">Delete</button>` : '-'}</td>
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
  const canDelete = hasPermission('land:delete');
  const totalRemaining = rows.reduce((sum, r) => sum + Number(r.amountToBeGiven || 0), 0);
  const totalEl = document.getElementById('landTotalRemaining');
  if (totalEl) totalEl.textContent = money(totalRemaining);

  landTbody.innerHTML = rows
    .map(
      (r) => `<tr>
          <td>${r.area}</td>
          <td>${r.ownerName}</td>
          <td class="money">${money(r.amountPaid)}</td>
          <td class="money">${money(r.amountToBeGiven)}</td>
          <td>${canDelete ? `<button class="small danger land-del" data-id="${r.id}">Delete</button>` : '-'}</td>
        </tr>`
    )
    .join('');

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

function filterEmployees(rows) {
  const q = (employeeSearchInput.value || '').trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((e) => `${e.name} ${e.role}`.toLowerCase().includes(q));
}

function filterTrucks(rows) {
  const q = (truckSearchInput.value || '').trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((t) =>
    `${t.truckNumber} ${t.driverName || ''} ${t.rawMaterial} ${partyLabel(t.party)} ${t.origin || ''} ${t.destination || ''}`
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
  const month = monthISO();

  const requests = [
    hasPermission('dashboard:view') ? api(`/api/dashboard?month=${month}&today=${todayISO()}`) : Promise.resolve(null),
    hasPermission('employees:view') ? api('/api/employees') : Promise.resolve([]),
    hasPermission('salary:view') ? api(`/api/salary-summary?month=${month}`) : Promise.resolve({ rows: [] }),
    hasPermission('salaryledger:view') ? api('/api/salary-ledgers') : Promise.resolve([]),
    hasPermission('trucks:view') ? api('/api/trucks') : Promise.resolve([]),
    hasPermission('expenses:view') ? api('/api/expenses') : Promise.resolve([]),
    hasPermission('chini:view') ? api('/api/chini-expenses') : Promise.resolve([]),
    hasPermission('land:view') ? api('/api/lands') : Promise.resolve([]),
    hasPermission('attendance:report')
      ? api(`/api/attendance-report?month=${attendanceMonthInput.value || month}`)
      : Promise.resolve({ rows: [] })
  ];

  const [dashboard, employees, salary, salaryLedgers, trucks, expenses, chiniExpenses, landRecords, attendanceReport] =
    await Promise.all(requests);

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
  chiniExpensesCache = chiniExpenses || [];
  landRecordsCache = landRecords || [];
  salaryRowsCache = (salary && salary.rows) || [];
  salaryLedgersCache = salaryLedgers || [];
  renderEmployeeOptions(employeesCache);
  renderEmployeeRows(filterEmployees(employeesCache));
  renderSalaryRows(salaryRowsCache);
  renderSalarySummaries(salaryRowsCache);
  renderSalaryLedgers(salaryLedgersCache);
  renderTruckRows(filterTrucks(trucksCache).sort((a, b) => (a.date < b.date ? 1 : -1)));
  renderExpenseRows(expensesCache);
  renderChiniRows(chiniExpensesCache);
  renderLandRows(landRecordsCache);
  renderAttendanceReportRows((attendanceReport && attendanceReport.rows) || []);
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
  chiniExpensesCache = [];
  landRecordsCache = [];
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
    await api('/api/expenses', 'POST', {
      date: fd.get('date'),
      description: fd.get('description') || undefined,
      amount: fd.get('amount')
    });
    expenseForm.reset();
    setDefaultDates();
    await refresh();
    showToast('Expense added');
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

landForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(landForm);
  try {
    await api('/api/lands', 'POST', {
      area: fd.get('area'),
      ownerName: fd.get('ownerName'),
      amountPaid: fd.get('amountPaid'),
      amountToBeGiven: fd.get('amountToBeGiven')
    });
    landForm.reset();
    await refresh();
    showToast('Land record added');
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
  try {
    await api(`/api/salary-ledgers/${fd.get('employeeId')}`, 'PUT', {
      totalSalary: fd.get('totalSalary'),
      amountGiven: fd.get('amountGiven')
    });
    salaryLedgerForm.reset();
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
    await api('/api/trucks', 'POST', {
      date: fd.get('date'),
      party: fd.get('party') || undefined,
      truckNumber: fd.get('truckNumber'),
      driverName: fd.get('driverName'),
      rawMaterial: fd.get('rawMaterial'),
      quantity: fd.get('quantity'),
      pricePerQuintal: fd.get('pricePerQuintal') || undefined,
      origin: fd.get('origin'),
      destination: fd.get('destination'),
      notes: fd.get('notes')
    });
    truckForm.reset();
    setDefaultDates();
    updateTruckTotal();
    await refresh();
    showToast('Truck entry added');
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

salaryEmployeeSelect?.addEventListener('change', () => {
  renderSalarySummaries(salaryRowsCache);
});

salaryLedgerEmployeeSelect?.addEventListener('change', () => {
  prefillSalaryLedgerForm();
});

sectionNav.addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-btn');
  if (!btn) return;
  activateSection(btn.getAttribute('data-target'));
});

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

downloadSalaryCsvBtn.addEventListener('click', () => {
  downloadWithAuth(`/api/export/salary.csv?month=${monthISO()}`);
});

downloadTruckCsvBtn.addEventListener('click', () => {
  downloadWithAuth('/api/export/trucks.csv');
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
