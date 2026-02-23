#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const dataDir = process.env.JSON_DATA_DIR
  ? path.resolve(process.env.JSON_DATA_DIR)
  : path.join(rootDir, 'data');
const backupDir = process.env.JSON_BACKUP_DIR
  ? path.resolve(process.env.JSON_BACKUP_DIR)
  : path.join(dataDir, 'backups');

function safeStamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function bytes(filePath) {
  return fs.statSync(filePath).size;
}

function copyWithTimestamp(srcPath, stamp) {
  const ext = path.extname(srcPath) || '.json';
  const base = path.basename(srcPath, ext);
  const destPath = path.join(backupDir, `${base}.${stamp}${ext}`);
  fs.copyFileSync(srcPath, destPath);
  return destPath;
}

function main() {
  const stamp = safeStamp();
  const sourceFiles = [
    path.join(dataDir, 'db.json'),
    path.join(dataDir, 'db.backup.json')
  ];

  ensureDir(backupDir);

  const existingSources = sourceFiles.filter((filePath) => fs.existsSync(filePath));
  if (!existingSources.length) {
    console.error(`[backup-json-db] No source DB files found in: ${dataDir}`);
    process.exit(1);
  }

  const copied = existingSources.map((srcPath) => {
    const destPath = copyWithTimestamp(srcPath, stamp);
    return {
      source: srcPath,
      destination: destPath,
      bytes: bytes(destPath)
    };
  });

  const manifestPath = path.join(backupDir, `manifest.${stamp}.json`);
  const manifest = {
    createdAt: new Date().toISOString(),
    dataDir,
    files: copied
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('[backup-json-db] Backup complete.');
  copied.forEach((entry) => {
    console.log(`- ${entry.destination} (${entry.bytes} bytes)`);
  });
  console.log(`- ${manifestPath}`);
}

try {
  main();
} catch (err) {
  console.error('[backup-json-db] Backup failed:', err.message);
  process.exit(1);
}
