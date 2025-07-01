# AnyIG - 忽略文件生成器

[![npm version](https://badge.fury.io/js/anyig.svg)](https://badge.fury.io/js/anyig)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![CI](https://github.com/zhangyu-521/ig/workflows/CI/badge.svg)](https://github.com/zhangyu-521/ig/actions)

🚀 一个功能强大且可扩展的CLI工具，用于为各种开发工具和环境生成忽略文件。

[English](README.md) | **简体中文**

## ✨ 功能特性

- 🎯 **多种模板**: 支持 Git、NPM、ESLint、Prettier、Docker 等多种忽略文件
- 🔧 **框架支持**: 为 React、Vue、Next.js、Python、Java 等提供专门的模板
- 📝 **自定义模板**: 支持定义你自己的忽略文件模板
- ⚙️ **配置文件**: 通过 `.anyigrc.json` 进行灵活配置
- 🔄 **自动备份**: 自动备份现有文件，防止意外覆盖
- 📦 **批量生成**: 一次生成多个忽略文件
- 🎨 **交互式界面**: 美观直观的命令行交互界面
- 🧪 **完整测试**: 全面的测试覆盖，确保代码质量

## 📦 安装

### 全局安装（推荐）

```bash
npm install -g anyig
```

### 本地安装

```bash
npm install anyig
# 或者
yarn add anyig
# 或者
pnpm add anyig
```

## 🚀 快速开始

### 交互式模式

```bash
anyig
```

这将启动一个交互式提示，你可以从可用的模板中进行选择：

```
? 请选择要生成的忽略文件: (使用方向键选择)
❯ gitignore - Git版本控制忽略文件
  npmignore - NPM发布忽略文件
  eslintignore - ESLint忽略文件
  prettierignore - Prettier忽略文件
  dockerignore - Docker构建忽略文件
```

### 直接生成模板

```bash
# 生成特定模板
anyig -t gitignore

# 生成到指定目录
anyig -t gitignore -o ./my-project

# 生成多个模板
anyig -m
```

### 查看可用模板

```bash
# 列出所有模板
anyig --list

# 按分类列出模板
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

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。对于重大更改，请先开启一个 issue 来讨论你想要更改的内容。

1. Fork 这个仓库
2. 创建你的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交你的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 受到更好的忽略文件管理需求的启发
- 使用 TypeScript 和现代 Node.js 实践构建
- 感谢所有贡献者和用户

## 📞 支持

- 🐛 [报告问题](https://github.com/zhangyu-521/ig/issues)

---

用 ❤️ 制作，作者 [zhangyu620](https://github.com/zhangyu-521)
