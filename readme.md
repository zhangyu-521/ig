# AnyIG

[![npm version](https://badge.fury.io/js/anyig.svg)](https://badge.fury.io/js/anyig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

🚀 A powerful and extensible CLI tool for generating ignore files for various development tools and environments.

## ✨ Features

- 🎯 **Multiple Templates**: Support for Git, NPM, ESLint, Prettier, Docker, and more
- 🔧 **Framework Support**: Specialized templates for React, Vue, Next.js, Python, Java
- 📝 **Custom Templates**: Define your own ignore file templates
- ⚙️ **Configuration**: Flexible configuration with `.anyigrc.json`
- 🔄 **Backup**: Automatic backup of existing files
- 📦 **Batch Generation**: Generate multiple ignore files at once
- 🎨 **Interactive CLI**: Beautiful and intuitive command-line interface
- 🧪 **Well Tested**: Comprehensive test coverage

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g anyig
```

### Local Installation

```bash
npm install anyig
# or
yarn add anyig
# or
pnpm add anyig
```

## 🚀 Quick Start

### Interactive Mode

```bash
anyig
```

This will launch an interactive prompt where you can select from available templates:

```
? Select an ignore file to generate: (Use arrow keys)
❯ gitignore - Git版本控制忽略文件
  npmignore - NPM发布忽略文件
  eslintignore - ESLint忽略文件
  prettierignore - Prettier忽略文件
  dockerignore - Docker构建忽略文件
```

### Direct Template Generation

```bash
# Generate a specific template
anyig -t gitignore

# Generate to a specific directory
anyig -t gitignore -o ./my-project

# Generate multiple templates
anyig -m
```

### List Available Templates

```bash
# List all templates
anyig --list

# List templates by category
anyig --categories
```

## 📋 Available Templates

### Version Control
- **gitignore** - Git ignore file with comprehensive patterns

### Package Managers
- **npmignore** - NPM publish ignore file

### Code Quality Tools
- **eslintignore** - ESLint ignore patterns
- **prettierignore** - Prettier ignore patterns

### Build Tools
- **dockerignore** - Docker build ignore file
- **babelignore** - Babel transpilation ignore file

### Framework Specific
- **nextjs-gitignore** - Next.js optimized Git ignore
- **react-gitignore** - React project Git ignore
- **vue-gitignore** - Vue.js project Git ignore

### Language Specific
- **python-gitignore** - Python project Git ignore
- **java-gitignore** - Java project Git ignore

### Editor Configuration
- **vscode-settings** - VS Code workspace settings
- **editorconfig** - EditorConfig file

## ⚙️ Configuration

Create a `.anyigrc.json` file in your project root or home directory:

```bash
anyig --init-config
```

Example configuration:

```json
{
  "defaultTemplates": ["gitignore", "npmignore"],
  "outputDir": "./generated",
  "autoBackup": true,
  "confirmOverwrite": false,
  "customTemplates": [
    {
      "name": "custom-ignore",
      "filename": ".customignore",
      "description": "My custom ignore file",
      "category": "custom",
      "content": "# Custom ignore patterns\n*.tmp\n*.cache\n"
    }
  ]
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultTemplates` | `string[]` | `[]` | Templates to generate by default |
| `outputDir` | `string` | `process.cwd()` | Default output directory |
| `autoBackup` | `boolean` | `false` | Automatically backup existing files |
| `confirmOverwrite` | `boolean` | `true` | Ask before overwriting files |
| `customTemplates` | `IgnoreTemplate[]` | `[]` | Custom template definitions |

## 🔧 CLI Options

```bash
anyig [options]

Options:
  -t, --template <name>    Generate specific template directly
  -m, --multiple          Select multiple templates
  -o, --output <dir>      Output directory
  -l, --list              List all available templates
  --categories            List templates by categories
  --init-config           Create example configuration file
  --config <path>         Use specific configuration file
  --no-backup             Disable automatic backup
  --force                 Force overwrite without confirmation
  -h, --help              Display help for command
  -V, --version           Display version number
```

## 📚 Programmatic Usage

You can also use AnyIG programmatically in your Node.js applications:

```typescript
import { AnyIG, getTemplateByName } from 'anyig';

// Generate a single file
AnyIG.generateFile('gitignore', './my-project');

// Generate multiple files
AnyIG.generateFiles(['gitignore', 'npmignore'], './my-project');

// Get available templates
const templates = AnyIG.getAvailableTemplates();

// Check if template exists
const hasTemplate = AnyIG.hasTemplate('gitignore');

// Get specific template
const template = AnyIG.getTemplate('gitignore');
```

## 🧪 Development

### Prerequisites

- Node.js >= 16.0.0
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/zhangyu-521/ig.git
cd ig

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run in development mode
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run typecheck
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need for better ignore file management
- Built with TypeScript and modern Node.js practices
- Thanks to all contributors and users

## 📞 Support

- 🐛 [Report Issues](https://github.com/zhangyu-521/ig/issues)
- 💬 [Discussions](https://github.com/zhangyu-521/ig/discussions)
- 📧 Email: zhangyu620@example.com

---

Made with ❤️ by [zhangyu620](https://github.com/zhangyu-521)
