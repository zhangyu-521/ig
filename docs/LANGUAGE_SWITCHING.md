# Language Switching Guide | 语言切换指南

This document explains how to use the bilingual documentation system for AnyIG.

本文档说明如何使用 AnyIG 的双语文档系统。

## 🌐 Available Languages | 可用语言

- **English**: Complete documentation in English
- **简体中文**: 完整的中文文档

## 📖 How to Switch Languages | 如何切换语言

### Method 1: Direct Links | 方法1：直接链接

Click the language links at the top of any README file:

点击任何 README 文件顶部的语言链接：

- [English](../README.md)
- [简体中文](../README.zh-CN.md)

### Method 2: Using Scripts | 方法2：使用脚本

#### Interactive Mode | 交互模式
```bash
npm run docs
# or
node scripts/docs-switch.js
```

#### Direct Language Selection | 直接选择语言
```bash
# English
npm run docs:en

# Chinese
npm run docs:zh
```

### Method 3: Documentation Portal | 方法3：文档门户

Open the HTML documentation portal:

打开 HTML 文档门户：

```bash
npm run docs:serve
```

This will start a local server at `http://localhost:8080` with a beautiful interface for language selection.

这将在 `http://localhost:8080` 启动一个本地服务器，提供美观的语言选择界面。

## 📁 File Structure | 文件结构

```
├── README.md              # English documentation
├── README.zh-CN.md        # Chinese documentation
├── docs/
│   ├── README.md          # Documentation index
│   ├── index.html         # HTML portal
│   └── LANGUAGE_SWITCHING.md  # This file
└── scripts/
    └── docs-switch.js     # Language switching script
```

## 🔧 Features | 功能特性

### Automatic Language Detection | 自动语言检测

The HTML portal automatically detects your system language and suggests the appropriate documentation version.

HTML 门户会自动检测你的系统语言并建议相应的文档版本。

### Synchronized Content | 内容同步

Both language versions contain the same comprehensive information:

两个语言版本包含相同的全面信息：

- ✅ Installation guides | 安装指南
- ✅ Feature descriptions | 功能描述
- ✅ Configuration options | 配置选项
- ✅ CLI reference | 命令行参考
- ✅ Development guides | 开发指南
- ✅ Examples and tutorials | 示例和教程

### Cross-References | 交叉引用

Each section includes cross-references to the corresponding section in the other language.

每个部分都包含对另一种语言中相应部分的交叉引用。

## 🚀 Quick Access | 快速访问

### For Developers | 开发者

```bash
# View English docs
npm run docs:en

# View Chinese docs  
npm run docs:zh

# Interactive selection
npm run docs
```

### For Users | 用户

Simply click the language toggle at the top of any README file, or visit the documentation portal.

只需点击任何 README 文件顶部的语言切换按钮，或访问文档门户。

## 🎯 Best Practices | 最佳实践

1. **Bookmark Both Versions** | **收藏两个版本**
   - Keep links to both language versions for quick reference
   - 保存两个语言版本的链接以便快速参考

2. **Use the Portal** | **使用门户**
   - The HTML portal provides the best browsing experience
   - HTML 门户提供最佳的浏览体验

3. **Script Integration** | **脚本集成**
   - Integrate the switching scripts into your workflow
   - 将切换脚本集成到你的工作流程中

## 🔄 Updating Documentation | 更新文档

When updating documentation, remember to:

更新文档时，请记住：

1. Update both language versions
2. Keep content synchronized
3. Test all language switching methods
4. Verify cross-references

1. 更新两个语言版本
2. 保持内容同步
3. 测试所有语言切换方法
4. 验证交叉引用

## 📞 Support | 支持

If you encounter any issues with language switching:

如果你在语言切换时遇到任何问题：

- 🐛 [Report Issues](https://github.com/zhangyu-521/ig/issues)
- 💬 [Discussions](https://github.com/zhangyu-521/ig/discussions)

---

Made with ❤️ for the global developer community

为全球开发者社区用 ❤️ 制作
