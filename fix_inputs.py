import re

with open('public/styles.css', 'r') as f:
    css = f.read()

# Fix dark mode inputs
dark_inputs_pattern = r'body\.dark-mode input,[\s\S]*?body\.dark-mode textarea\s*\{[\s\S]*?\}'
dark_inputs_replacement = """body.dark-mode input,
body.dark-mode select,
body.dark-mode textarea {
  background: #000000;
  color: #EDEDED;
  border: 1px solid #333333;
}
body.dark-mode input:focus,
body.dark-mode select:focus,
body.dark-mode textarea:focus {
  background: #0A0A0A;
  border-color: #666666;
  box-shadow: 0 0 0 1px #666666;
  outline: none;
}"""
css = re.sub(dark_inputs_pattern, dark_inputs_replacement, css)

# Make sure tables look sharp in dark mode
dark_table_pattern = r'body\.dark-mode th\s*\{[\s\S]*?\}[\s\S]*?body\.dark-mode tr:hover td\s*\{[\s\S]*?\}'
dark_table_replacement = """body.dark-mode th {
  background: #0A0A0A;
  color: #888888;
  border-bottom: 1px solid #333333;
}
body.dark-mode th,
body.dark-mode td {
  border-bottom-color: #222222;
}
body.dark-mode tr:hover td {
  background: #111111 !important;
}"""
css = re.sub(dark_table_pattern, dark_table_replacement, css)

# Fix summary boxes / party totals to match panel colors
dark_summary_pattern = r'body\.dark-mode \.section-nav,[\s\S]*?\}\s*body\.dark-mode \.card \s*\{[\s\S]*?\}'
dark_summary_replacement = """body.dark-mode .section-nav,
body.dark-mode .summary-box,
body.dark-mode .summary-stat,
body.dark-mode .employee-card,
body.dark-mode .party-total,
body.dark-mode .table-wrap {
  background: #0A0A0A;
  border-color: #333333;
}
body.dark-mode .card {
  background: #0A0A0A;
}"""
css = re.sub(dark_summary_pattern, dark_summary_replacement, css)

# Make table cells in dark mode normal
css = re.sub(r'body\.dark-mode tbody tr:nth-child\(2n\) td \{[^\}]*\}', 'body.dark-mode tbody tr:nth-child(2n) td { background: #000000; }', css)

with open('public/styles.css', 'w') as f:
    f.write(css)

