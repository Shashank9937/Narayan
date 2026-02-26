const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// 1. Update /api/advances to allow employeeId to be optional
code = code.replace(
  /app\.get\('\/api\/advances', auth, requirePermission\('advances:create'\), async \(req, res\) => \{\s*const employeeId = String\(req\.query\.employeeId \|\| ''\)\.trim\(\);\s*if \(\!employeeId\) \{\s*return res\.status\(400\)\.json\(\{ error: 'employeeId query param is required' \}\);\s*\}/,
  `app.get('/api/advances', auth, requirePermission('advances:create'), async (req, res) => {
  const employeeId = String(req.query.employeeId || '').trim();`
);

// 2. Add an inner join in postgresStore listEmployeeAdvances to get employee name and role
code = code.replace(
  /async listEmployeeAdvances\(employeeId\) \{\s*const res = await pool\.query\(\s*`SELECT \* FROM salary_advances\s*WHERE employee_id = \$1\s*ORDER BY date ASC`,\s*\[employeeId\]\s*\);\s*return res\.rows\.map\(\(r\) => \(\{/,
  `async listEmployeeAdvances(employeeId) {
      let res;
      if (employeeId) {
        res = await pool.query(
          \`SELECT a.*, e.name, e.role FROM salary_advances a
           LEFT JOIN employees e ON a.employee_id = e.id
           WHERE a.employee_id = $1
           ORDER BY a.date DESC, a.id DESC\`,
          [employeeId]
        );
      } else {
        res = await pool.query(
          \`SELECT a.*, e.name, e.role FROM salary_advances a
           LEFT JOIN employees e ON a.employee_id = e.id
           ORDER BY a.date DESC, a.id DESC\`
        );
      }
      return res.rows.map((r) => ({
        employeeName: r.name,
        employeeRole: r.role,`
);

// 3. Update jsonStore listEmployeeAdvances to return name and role
code = code.replace(
  /async listEmployeeAdvances\(employeeId\) \{\s*const db = readJsonDb\(\);\s*return db\.salaryAdvances\s*\.filter\(\(a\) => String\(a\.employeeId\) === String\(employeeId\)\)\s*\.sort\(\(a, b\) => String\(a\.date \|\| ''\)\.localeCompare\(String\(b\.date \|\| ''\)\)\);\s*\}/,
  `async listEmployeeAdvances(employeeId) {
      const db = readJsonDb();
      let arr = db.salaryAdvances;
      if (employeeId) {
        arr = arr.filter((a) => String(a.employeeId) === String(employeeId));
      }
      return arr
        .map(a => {
           const e = db.employees.find(x => x.id === a.employeeId);
           return { ...a, employeeName: e?.name || '', employeeRole: e?.role || '' };
        })
        .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
    }`
);

fs.writeFileSync('server.js', code);
console.log('Fixed server advances endpoint');
