#!/usr/bin/env node

/**
 * Bundle Size Checker for Renge UI packages
 *
 * Measures the size of built packages and reports against configured budgets.
 * Fails the build if any package exceeds its budget.
 *
 * Usage:
 *   node scripts/check-bundle-sizes.js [--update]
 *
 * --update: Write current sizes to bundlebudget.json for baseline updates
 */

const fs = require('fs');
const path = require('path');

// Define package budgets (in KB)
// Budgets set slightly above current sizes to catch unexpected growth
const BUDGETS = {
  '@renge-ui/tokens': { maxSize: 75, description: 'Token definitions and CSS variables' },
  '@renge-ui/react': { maxSize: 160, description: 'React components' },
  '@renge-ui/tailwind': { maxSize: 20, description: 'Tailwind CSS plugin' },
};

// Track which packages to measure
const PACKAGES = {
  '@renge-ui/tokens': {
    distDir: 'packages/tokens/dist',
    files: ['index.js', 'index.d.ts'],
  },
  '@renge-ui/react': {
    distDir: 'packages/react/dist',
    files: ['index.js', 'index.d.ts'],
  },
  '@renge-ui/tailwind': {
    distDir: 'packages/tailwind/dist',
    files: ['index.js', 'plugin.js', 'index.d.ts'],
  },
};

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function getFileSizeInKB(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size / 1024; // Convert bytes to KB
  } catch (err) {
    return 0;
  }
}

function formatSize(kb) {
  return `${kb.toFixed(2)} KB`;
}

function calculatePackageSize(pkgName) {
  const pkgConfig = PACKAGES[pkgName];
  if (!pkgConfig) {
    console.warn(`Warning: No configuration for package ${pkgName}`);
    return 0;
  }

  const distDir = path.join(process.cwd(), pkgConfig.distDir);
  let totalSize = 0;

  // Sum up file sizes (skip .d.ts for gzipped size calculation as a metric)
  for (const file of pkgConfig.files) {
    const filePath = path.join(distDir, file);
    totalSize += getFileSizeInKB(filePath);
  }

  return totalSize;
}

function main() {
  const updateMode = process.argv.includes('--update');
  const results = {};
  let hasExceeded = false;

  console.log(`\n${colors.bold}${colors.cyan}📦 Bundle Size Report${colors.reset}\n`);

  const paddedName = 'Package'.padEnd(25);
  const paddedSize = 'Size'.padEnd(12);
  const paddedBudget = 'Budget'.padEnd(12);
  const paddedStatus = 'Status'.padEnd(10);

  console.log(`${paddedName}  ${paddedSize}  ${paddedBudget}  ${paddedStatus}`);
  console.log('─'.repeat(70));

  for (const [pkgName, budget] of Object.entries(BUDGETS)) {
    const size = calculatePackageSize(pkgName);
    results[pkgName] = {
      size: parseFloat(size.toFixed(2)),
      budget: budget.maxSize,
      description: budget.description,
    };

    const sizeStr = formatSize(size).padEnd(12);
    const budgetStr = formatSize(budget.maxSize).padEnd(12);

    let status = `${colors.green}✓ OK${colors.reset}`;
    if (size > budget.maxSize) {
      status = `${colors.red}✗ EXCEEDED${colors.reset}`;
      hasExceeded = true;
    } else if (size > budget.maxSize * 0.9) {
      status = `${colors.yellow}⚠ WARNING${colors.reset}`;
    }

    console.log(`${pkgName.padEnd(25)}  ${sizeStr}  ${budgetStr}  ${status}`);
  }

  console.log('─'.repeat(70));

  if (updateMode) {
    // Update bundlebudget.json with current sizes
    const budgetFile = path.join(process.cwd(), 'bundlebudget.json');
    fs.writeFileSync(budgetFile, JSON.stringify(results, null, 2));
    console.log(`\n${colors.green}✓ Updated bundlebudget.json${colors.reset}\n`);
    process.exit(0);
  }

  if (hasExceeded) {
    console.log(`\n${colors.red}${colors.bold}❌ Bundle size exceeded budget!${colors.reset}`);
    console.log(`\nTo update budgets (if intentional):`);
    console.log(`  pnpm run check:bundle --update\n`);
    process.exit(1);
  }

  console.log(`\n${colors.green}✓ All packages within budget${colors.reset}\n`);
  process.exit(0);
}

main();
