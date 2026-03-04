import re

with open('public/styles.css', 'r') as f:
    css = f.read()

# 1. Update :root tokens
root_replacement = """:root {
  /* Core palette — Linear/Vercel Aesthetic */
  --bg: #FFFFFF;
  --bg-soft: #FAFAFA;
  --panel: #FFFFFF;
  --panel-solid: #FFFFFF;
  --panel-border: #EAEAEA;
  --text: #171717;
  --text-light: #666666;
  --text-muted: #888888;
  --primary: #000000;
  --primary-hover: #333333;
  --primary-2: #0070F3;
  --accent: #E11D48;
  --success: #059669;
  --danger: #E00;
  --warning: #F5A623;
  --border: #EAEAEA;

  /* Depth system — Sharp, minimal, corporate */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  --shadow-sm: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  --shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 8px 30px 0 rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 20px 40px 0 rgba(0, 0, 0, 0.1);
  --shadow-primary: 0 2px 10px 0 rgba(0, 0, 0, 0.15);

  /* Radius — Structured, stable, precise */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 9999px;

  /* Typography - Modern corporate */
  --font-body: 'Inter', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-heading: 'Space Grotesk', 'Inter', -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* 8px Spacing Grid */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 80px;
  --space-10: 120px;

  /* Micro-interactions & Transitions */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --duration-fast: 150ms;
  --duration: 250ms;
  --duration-slow: 400ms;
}"""
css = re.sub(r':root\s*\{.*?(?=\})\}', root_replacement, css, flags=re.DOTALL)

# 2. Update Dark Mode tokens
dark_replacement = """body.dark-mode {
  --bg: #000000;
  --bg-soft: #0A0A0A;
  --panel: #0A0A0A;
  --panel-solid: #0A0A0A;
  --panel-border: #333333;
  --text: #EDEDED;
  --text-light: #A1A1AA;
  --text-muted: #71717A;
  --primary: #FFFFFF;
  --primary-hover: #EBEBEB;
  --primary-2: #0070F3;
  --accent: #F43F5E;
  --border: #333333;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
  --shadow-primary: 0 4px 12px rgba(255, 255, 255, 0.15);
  background: var(--bg);
}"""
css = re.sub(r'body\.dark-mode\s*\{([^{}]*?background: var\(--bg\);|.*?(?=\}))\}', dark_replacement, css, flags=re.DOTALL)

# 3. Update Panels
panels_pattern = r'\.panel\s*\{.*?\}'
panels_replacement = """.panel {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-6);
  border: 1px solid var(--panel-border);
  background: var(--panel);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--duration) var(--ease-out), box-shadow var(--duration) var(--ease-out), transform var(--duration) var(--ease-out);
}
.panel:hover {
  border-color: var(--text-muted);
  box-shadow: var(--shadow-md);
}"""
css = re.sub(panels_pattern, panels_replacement, css, count=1, flags=re.DOTALL)

# 4. Buttons
buttons_pattern = r'button\s*\{[^\}]*\}[ \t\n\r]*button:hover\s*\{[^\}]*\}[ \t\n\r]*button:active\s*\{[^\}]*\}'
buttons_replacement = """button {
  border: 1px solid transparent;
  border-radius: var(--radius);
  padding: 10px var(--space-5);
  font: 500 0.9rem var(--font-body);
  letter-spacing: -0.01em;
  color: var(--bg);
  background: var(--primary);
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow);
  background: var(--primary-hover);
}
button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
  background: var(--text-light);
}"""
css = re.sub(buttons_pattern, buttons_replacement, css, flags=re.DOTALL)

# Button variants
css = css.replace("font: 600 0.95rem var(--font-heading);", "font: 500 0.9rem var(--font-body);")

# Update inputs
inputs_replacement = """input,
select,
textarea {
  padding: 10px var(--space-3);
  background: var(--bg);
  font-size: 0.95rem;
  transition: all var(--duration-fast) var(--ease-in-out);
}"""
css = re.sub(r'input,\s*select,\s*textarea\s*\{[^\}]*\}', inputs_replacement, css, count=1, flags=re.DOTALL)

# Add Glassmorphism to Sidebar and Header
sidebar_replacement = """.sidebar {
  width: 260px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--panel-border);
  padding: var(--space-5) 0;
  z-index: 50;
  box-shadow: none;
}
body.dark-mode .sidebar {
  background: rgba(10, 10, 10, 0.6);
}"""
css = re.sub(r'\.sidebar\s*\{[^\}]*\}', sidebar_replacement, css, count=1, flags=re.DOTALL)

header_replacement = """.content-header {
  padding: var(--space-5) var(--space-7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--panel-border);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  z-index: 10;
  position: sticky;
  top: 0;
}
body.dark-mode .content-header {
  background: rgba(10, 10, 10, 0.6);
}"""
css = re.sub(r'\.content-header\s*\{[^\}]*\}', header_replacement, css, count=1, flags=re.DOTALL)

# Make Nav Buttons cooler
navbtn_replacement = """.nav-btn {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  text-align: left;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-light);
  font-weight: 500;
  font-family: var(--font-body);
  font-size: 0.88rem;
  border-radius: var(--radius);
  padding: 8px var(--space-3);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}
.nav-btn:hover {
  background: var(--bg-soft);
  color: var(--text);
  transform: translateX(4px);
}
.nav-btn.active {
  background: var(--bg-soft);
  color: var(--primary);
  font-weight: 600;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-xs);
}"""
css = re.sub(r'\.nav-btn\s*\{[^\}]*\}\s*\.nav-icon\s*\{[^\}]*\}\s*\.nav-btn:hover\s*\{[^\}]*\}\s*\.nav-btn:hover \.nav-icon\s*\{[^\}]*\}\s*\.nav-btn\.active\s*\{[^\}]*\}[ \t\n\r]*\.nav-btn\.active \.nav-icon\s*\{[^\}]*\}', navbtn_replacement + "\n.nav-icon {\n  width: 18px;\n  height: 18px;\n  opacity: 0.7;\n}\n.nav-btn:hover .nav-icon, .nav-btn.active .nav-icon {\n  opacity: 1;\n}\n", css, count=1, flags=re.DOTALL)

# Add custom scrollbars globally for a sleek look
scrollbar_css = """
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: var(--radius-pill);
  border: 3px solid var(--bg);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
"""

with open('public/styles.css', 'w') as f:
    f.write(css + scrollbar_css)

