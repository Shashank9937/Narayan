const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// Replace normalizeISODateText
code = code.replace(
  /function normalizeISODateText\(value\) \{\s*const text = String\(value \|\| ''\)\.slice\(0, 10\);\s*return \/\^\\d\{4\}-\\d\{2\}-\\d\{2\}\$\/\.test\(text\) \? text : '';\s*\}/,
  `function normalizeISODateText(value) {
  if (!value) return '';
  if (value instanceof Date) return isNaN(value) ? '' : value.toISOString().slice(0, 10);
  const text = String(value).slice(0, 10);
  if (/^\\d{4}-\\d{2}-\\d{2}$/.test(text)) return text;
  const d = new Date(value);
  if (!isNaN(d)) return d.toISOString().slice(0, 10);
  return '';
}`
);

// We need to fix all occurrences of `String(r.something).slice(0, 10)` in server.js
code = code.replace(/String\((r\.[a-z_]+)\)\.slice\(0, 10\)/g, 'normalizeISODateText($1)');

// Also fix `String(e.createdAt || new Date().toISOString()).slice(0, 10)` 
code = code.replace(/String\(e\.createdAt \|\| new Date\(\)\.toISOString\(\)\)\.slice\(0,\s*10\)/g, 'normalizeISODateText(e.createdAt || new Date())');

// Also fix `employee.joiningDate || String(employee.createdAt).slice(0, 10)`
code = code.replace(/String\(employee\.createdAt\)\.slice\(0, 10\)/g, 'normalizeISODateText(employee.createdAt)');

// Also fix `String(employee.joiningDate || employee.createdAt || new Date().toISOString()).slice(0, 7)` in salaryRows
code = code.replace(/String\(employee\.joiningDate \|\| employee\.createdAt \|\| new Date\(\)\.toISOString\(\)\)\.slice\(0, 7\)/g, 'normalizeISODateText(employee.joiningDate || employee.createdAt || new Date()).slice(0, 7)');

// Also fix `r.joining_date \? String(r.joining_date)\.slice\(0, 10\) : String\(r\.created_at\)\.slice\(0, 10\)`
// handled by the regex already to `normalizeISODateText(r.joining_date)`

fs.writeFileSync('server.js', code);
console.log('Fixed dates in server.js');
