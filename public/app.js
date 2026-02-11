const cardsEl = document.getElementById('cards');
const salaryTbody = document.querySelector('#salaryTable tbody');
const truckTbody = document.querySelector('#truckTable tbody');
const employeeTbody = document.querySelector('#employeeTable tbody');
const attendanceReportTbody = document.querySelector('#attendanceReportTable tbody');

const attendanceEmployeeEl = document.getElementById('attendanceEmployee');
const advanceEmployeeEl = document.getElementById('advanceEmployee');

const loginPanel = document.getElementById('loginPanel');
const appContent = document.getElementById('appContent');
const sessionBar = document.getElementById('sessionBar');
const userMeta = document.getElementById('userMeta');

const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const employeeForm = document.getElementById('employeeForm');
const attendanceForm = document.getElementById('attendanceForm');
const advanceForm = document.getElementById('advanceForm');
const truckForm = document.getElementById('truckForm');
const changePasswordForm = document.getElementById('changePasswordForm');

const downloadSalaryCsvBtn = document.getElementById('downloadSalaryCsv');
const downloadTruckCsvBtn = document.getElementById('downloadTruckCsv');
const downloadAttendanceCsvBtn = document.getElementById('downloadAttendanceCsv');
const refreshAttendanceReportBtn = document.getElementById('refreshAttendanceReport');
const attendanceMonthInput = document.getElementById('attendanceMonthInput');

let me = null;
let employeesCache = [];

function token() {
  return localStorage.getItem('ops_token');
}

function setToken(value) {
  if (!value) localStorage.removeItem('ops_token');
  else localStorage.setItem('ops_token', value);
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function monthISO() {
  return new Date().toISOString().slice(0, 7);
}

function money(n) {
  return `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

function setDefaultDates() {
  [attendanceForm, advanceForm, truckForm].forEach((form) => {
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.value = todayISO();
  });

  attendanceMonthInput.value = monthISO();
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
  setFormEnabled('truckPanel', hasPermission('trucks:create'));

  setPanelVisible('salaryPanel', hasPermission('salary:view'));
  setPanelVisible('truckReportPanel', hasPermission('trucks:view'));
  setPanelVisible('employeeListPanel', hasPermission('employees:view'));
  setPanelVisible('attendanceReportPanel', hasPermission('attendance:report'));
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

        try {
          await api(`/api/employees/${id}`, 'PUT', {
            name,
            role,
            monthlySalary: Number(salaryRaw)
          });
          await refresh();
        } catch (err) {
          alert(err.message);
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
        } catch (err) {
          alert(err.message);
        }
      });
    });
  }
}

function renderSalaryRows(rows) {
  const canSeeSlip = hasPermission('salaryslip:view');
  salaryTbody.innerHTML = rows
    .map(
      (r) =>
        `<tr>
          <td>${r.name}</td>
          <td>${r.role}</td>
          <td class="money">${money(r.monthlySalary)}</td>
          <td>${money(r.advances)}</td>
          <td class="money">${money(r.remaining)}</td>
          <td>${
            canSeeSlip
              ? `<button class="small slip-btn" data-emp-id="${r.employeeId}">PDF Slip</button>`
              : '-'
          }</td>
        </tr>`
    )
    .join('');

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

function renderTruckRows(rows) {
  truckTbody.innerHTML = rows
    .map(
      (t) =>
        `<tr>
          <td>${t.date}</td>
          <td>${t.truckNumber}</td>
          <td>${t.driverName || '-'}</td>
          <td>${t.rawMaterial}</td>
          <td>${t.quantity}</td>
          <td>${t.origin || '-'}</td>
          <td>${t.destination || '-'}</td>
        </tr>`
    )
    .join('');
}

function urlWithAuth(url) {
  const t = token();
  if (!t) return url;
  const delim = url.includes('?') ? '&' : '?';
  return `${url}${delim}token=${encodeURIComponent(t)}`;
}

async function refresh() {
  const month = monthISO();

  const requests = [
    hasPermission('dashboard:view') ? api(`/api/dashboard?month=${month}&today=${todayISO()}`) : Promise.resolve(null),
    hasPermission('employees:view') ? api('/api/employees') : Promise.resolve([]),
    hasPermission('salary:view') ? api(`/api/salary-summary?month=${month}`) : Promise.resolve({ rows: [] }),
    hasPermission('trucks:view') ? api('/api/trucks') : Promise.resolve([]),
    hasPermission('attendance:report')
      ? api(`/api/attendance-report?month=${attendanceMonthInput.value || month}`)
      : Promise.resolve({ rows: [] })
  ];

  const [dashboard, employees, salary, trucks, attendanceReport] = await Promise.all(requests);

  if (dashboard) renderCards(dashboard);
  else cardsEl.innerHTML = '';

  employeesCache = employees || [];
  renderEmployeeOptions(employeesCache);
  renderEmployeeRows(employeesCache);
  renderSalaryRows((salary && salary.rows) || []);
  renderTruckRows((trucks || []).sort((a, b) => (a.date < b.date ? 1 : -1)));
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
  } catch (err) {
    alert(err.message);
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
    loginForm.reset();
  } catch (err) {
    alert(err.message);
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
  setVisibility(false);
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
    alert('Password updated successfully.');
  } catch (err) {
    alert(err.message);
  }
});

employeeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(employeeForm);

  try {
    await api('/api/employees', 'POST', {
      name: fd.get('name'),
      role: fd.get('role'),
      monthlySalary: fd.get('monthlySalary')
    });
    employeeForm.reset();
    await refresh();
  } catch (err) {
    alert(err.message);
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
  } catch (err) {
    alert(err.message);
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
  } catch (err) {
    alert(err.message);
  }
});

truckForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(truckForm);

  try {
    await api('/api/trucks', 'POST', {
      date: fd.get('date'),
      truckNumber: fd.get('truckNumber'),
      driverName: fd.get('driverName'),
      rawMaterial: fd.get('rawMaterial'),
      quantity: fd.get('quantity'),
      origin: fd.get('origin'),
      destination: fd.get('destination'),
      notes: fd.get('notes')
    });
    truckForm.reset();
    setDefaultDates();
    await refresh();
  } catch (err) {
    alert(err.message);
  }
});

refreshAttendanceReportBtn.addEventListener('click', async () => {
  try {
    const month = attendanceMonthInput.value || monthISO();
    const report = await api(`/api/attendance-report?month=${month}`);
    renderAttendanceReportRows(report.rows || []);
  } catch (err) {
    alert(err.message);
  }
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
    .catch((err) => alert(err.message));
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

setDefaultDates();
bootstrapSession().catch((err) => alert(err.message));
