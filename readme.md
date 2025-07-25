# AnyIG

[![npm version](https://badge.fury.io/js/anyig.svg)](https://badge.fury.io/js/anyig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![CI](https://github.com/zhangyu-521/ig/workflows/CI/badge.svg)](https://github.com/zhangyu-521/ig/actions)

🚀 A powerful and extensible CLI tool for generating ignore files for various development tools and environments.

**English** | [简体中文](README.zh-CN.md)

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

## 📋 可用模板

### 版本控制
- **gitignore** - 包含全面模式的 Git 忽略文件

### 包管理器
- **npmignore** - NPM 发布忽略文件

### 代码质量工具
- **eslintignore** - ESLint 忽略模式
- **prettierignore** - Prettier 忽略模式

### 构建工具
- **dockerignore** - Docker 构建忽略文件
- **babelignore** - Babel 转译忽略文件

### 框架专用
- **nextjs-gitignore** - Next.js 优化的 Git 忽略文件
- **react-gitignore** - React 项目 Git 忽略文件
- **vue-gitignore** - Vue.js 项目 Git 忽略文件

### 语言专用
- **python-gitignore** - Python 项目 Git 忽略文件
- **java-gitignore** - Java 项目 Git 忽略文件

### 编辑器配置
- **vscode-settings** - VS Code 工作区设置
- **editorconfig** - EditorConfig 配置文件

## ⚙️ 配置

在项目根目录或用户主目录创建 `.anyigrc.json` 配置文件：

```bash
anyig --init-config
```

配置示例：

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
      "description": "我的自定义忽略文件",
      "category": "custom",
      "content": "# 自定义忽略模式\n*.tmp\n*.cache\n"
    }
  ]
}
```

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `defaultTemplates` | `string[]` | `[]` | 默认生成的模板 |
| `outputDir` | `string` | `process.cwd()` | 默认输出目录 |
| `autoBackup` | `boolean` | `false` | 自动备份现有文件 |
| `confirmOverwrite` | `boolean` | `true` | 覆盖文件前询问确认 |
| `customTemplates` | `IgnoreTemplate[]` | `[]` | 自定义模板定义 |

## 🔧 命令行选项

```bash
anyig [选项]

选项:
  -t, --template <name>    直接生成指定模板
  -m, --multiple          选择多个模板
  -o, --output <dir>      输出目录
  -l, --list              列出所有可用模板
  --categories            按分类列出模板
  --init-config           创建示例配置文件
  --config <path>         使用指定的配置文件
  --no-backup             禁用自动备份
  --force                 强制覆盖，不询问确认
  -h, --help              显示帮助信息
  -V, --version           显示版本号
```

## 📚 编程式使用

你也可以在 Node.js 应用程序中以编程方式使用 AnyIG：

```typescript
import { AnyIG, getTemplateByName } from 'anyig';

// 生成单个文件
AnyIG.generateFile('gitignore', './my-project');

// 生成多个文件
AnyIG.generateFiles(['gitignore', 'npmignore'], './my-project');

// 获取可用模板
const templates = AnyIG.getAvailableTemplates();

// 检查模板是否存在
const hasTemplate = AnyIG.hasTemplate('gitignore');

// 获取特定模板
const template = AnyIG.getTemplate('gitignore');
```

## 🧪 开发

### 前置要求

- Node.js >= 16.0.0
- npm、yarn 或 pnpm

### 设置

```bash
# 克隆仓库
git clone https://github.com/zhangyu-521/ig.git
cd ig

# 安装依赖
npm install

# 构建项目
npm run build

# 运行测试
npm test

# 开发模式运行
npm run dev
```

### 测试

```bash
# 运行所有测试
npm test

# 监视模式运行测试
npm run test:watch

# 运行测试并生成覆盖率报告
npm run test:coverage
```

### 代码质量

```bash
# 代码检查
npm run lint

# 修复代码检查问题
npm run lint:fix

# 格式化代码
npm run format

# 检查代码格式
npm run format:check

# 类型检查
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

---

Made with ❤️ by [zhangyu620](https://github.com/zhangyu-521)
