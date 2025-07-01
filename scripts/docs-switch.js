#!/usr/bin/env node

/**
 * Documentation Language Switcher
 * 文档语言切换器
 * 
 * This script helps users switch between different language versions of the documentation.
 * 此脚本帮助用户在不同语言版本的文档之间切换。
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const LANGUAGES = {
  'en': {
    name: 'English',
    file: 'README.md',
    flag: '🇺🇸'
  },
  'zh-CN': {
    name: '简体中文',
    file: 'README.zh-CN.md',
    flag: '🇨🇳'
  }
};

function showHelp() {
  console.log(`
📚 AnyIG Documentation Language Switcher

Usage: node scripts/docs-switch.js [language]

Available languages:
${Object.entries(LANGUAGES).map(([code, info]) => 
  `  ${info.flag} ${code.padEnd(8)} - ${info.name}`
).join('\n')}

Examples:
  node scripts/docs-switch.js en      # Switch to English
  node scripts/docs-switch.js zh-CN   # Switch to Chinese

Without arguments, this will show an interactive menu.
  `);
}

function detectSystemLanguage() {
  try {
    const locale = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || 'en';
    if (locale.includes('zh')) return 'zh-CN';
    return 'en';
  } catch {
    return 'en';
  }
}

function openDocumentation(langCode) {
  const lang = LANGUAGES[langCode];
  if (!lang) {
    console.error(`❌ Unsupported language: ${langCode}`);
    process.exit(1);
  }

  const filePath = path.join(process.cwd(), lang.file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Documentation file not found: ${lang.file}`);
    process.exit(1);
  }

  console.log(`${lang.flag} Opening ${lang.name} documentation...`);
  console.log(`📖 File: ${lang.file}`);
  
  // Try to open with different methods based on platform
  try {
    if (process.platform === 'darwin') {
      execSync(`open "${filePath}"`);
    } else if (process.platform === 'win32') {
      execSync(`start "" "${filePath}"`);
    } else {
      execSync(`xdg-open "${filePath}"`);
    }
    console.log('✅ Documentation opened successfully!');
  } catch (error) {
    console.log(`📄 Please open the file manually: ${filePath}`);
  }
}

function showInteractiveMenu() {
  console.log('\n📚 AnyIG Documentation Language Switcher\n');
  console.log('Please select your preferred language:');
  
  Object.entries(LANGUAGES).forEach(([code, info], index) => {
    console.log(`  ${index + 1}. ${info.flag} ${info.name} (${code})`);
  });
  
  console.log('\nDetected system language:', detectSystemLanguage());
  console.log('\nPress Ctrl+C to exit, or choose a number...');
  
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on('data', (key) => {
    const keyPressed = key.toString();
    
    if (keyPressed === '\u0003') { // Ctrl+C
      console.log('\n👋 Goodbye!');
      process.exit(0);
    }
    
    const choice = parseInt(keyPressed);
    const langCodes = Object.keys(LANGUAGES);
    
    if (choice >= 1 && choice <= langCodes.length) {
      const selectedLang = langCodes[choice - 1];
      console.log(`\n${LANGUAGES[selectedLang].flag} Selected: ${LANGUAGES[selectedLang].name}`);
      process.stdin.setRawMode(false);
      process.stdin.pause();
      openDocumentation(selectedLang);
    } else {
      console.log(`\n❌ Invalid choice. Please select 1-${langCodes.length}`);
      showInteractiveMenu();
    }
  });
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  if (args.length === 0) {
    showInteractiveMenu();
    return;
  }
  
  const langCode = args[0];
  openDocumentation(langCode);
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  console.log('\n👋 Goodbye!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Goodbye!');
  process.exit(0);
});

if (require.main === module) {
  main();
}

module.exports = {
  LANGUAGES,
  openDocumentation,
  detectSystemLanguage
};
