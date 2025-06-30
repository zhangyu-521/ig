import { IgnoreTemplate, TemplateCategory } from '../types';

// Git相关模板
const gitTemplates: IgnoreTemplate[] = [
  {
    name: 'gitignore',
    filename: '.gitignore',
    description: 'Git版本控制忽略文件',
    category: 'version-control',
    content: `# Dependencies
node_modules/
bower_components/
jspm_packages/

# Build outputs
dist/
build/
out/
.next/
.nuxt/
.vuepress/dist/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary folders
tmp/
temp/`
  }
];

// NPM相关模板
const npmTemplates: IgnoreTemplate[] = [
  {
    name: 'npmignore',
    filename: '.npmignore',
    description: 'NPM发布忽略文件',
    category: 'package-manager',
    content: `# Source files
src/
*.ts
*.tsx
!*.d.ts

# Tests
test/
tests/
__tests__/
*.test.*
*.spec.*

# Build tools
webpack.config.*
rollup.config.*
vite.config.*
tsconfig.json
babel.config.*
.babelrc*

# Linting
.eslintrc*
.prettierrc*
.stylelintrc*

# Documentation
docs/
*.md
!README.md

# Development dependencies
node_modules/
.npm
.yarn

# Logs
logs
*.log

# Coverage
coverage/
.nyc_output

# Environment files
.env*

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`
  }
];

// 代码质量工具模板
const lintingTemplates: IgnoreTemplate[] = [
  {
    name: 'eslintignore',
    filename: '.eslintignore',
    description: 'ESLint忽略文件',
    category: 'linting',
    content: `node_modules/
dist/
build/
coverage/
.next/
.nuxt/
.vuepress/dist/
*.min.js
*.bundle.js`
  },
  {
    name: 'prettierignore',
    filename: '.prettierignore',
    description: 'Prettier忽略文件',
    category: 'linting',
    content: `node_modules/
dist/
build/
coverage/
.next/
.nuxt/
.vuepress/dist/
*.min.js
*.bundle.js
package-lock.json
yarn.lock
pnpm-lock.yaml`
  }
];

// 构建工具模板
const buildToolTemplates: IgnoreTemplate[] = [
  {
    name: 'dockerignore',
    filename: '.dockerignore',
    description: 'Docker构建忽略文件',
    category: 'build-tools',
    content: `node_modules/
npm-debug.log
Dockerfile*
docker-compose*
.dockerignore
.git
.gitignore
README.md
.env
.nyc_output
coverage
.nyc_output
.vscode
.idea`
  },
  {
    name: 'babelignore',
    filename: '.babelignore',
    description: 'Babel转译忽略文件',
    category: 'build-tools',
    content: `node_modules/
dist/
build/
coverage/
*.min.js
*.bundle.js`
  }
];

// 编辑器和IDE模板
const editorTemplates: IgnoreTemplate[] = [
  {
    name: 'vscode-settings',
    filename: '.vscode/settings.json',
    description: 'VS Code工作区设置',
    category: 'editor',
    content: `{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/build": true,
    "**/.git": true
  }
}`
  },
  {
    name: 'editorconfig',
    filename: '.editorconfig',
    description: 'EditorConfig配置文件',
    category: 'editor',
    content: `root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2

[*.{js,ts,jsx,tsx}]
indent_size = 2

[*.json]
indent_size = 2`
  }
];

// 框架特定模板
const frameworkTemplates: IgnoreTemplate[] = [
  {
    name: 'nextjs-gitignore',
    filename: '.gitignore',
    description: 'Next.js项目Git忽略文件',
    category: 'framework',
    content: `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env*.local

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts`
  },
  {
    name: 'react-gitignore',
    filename: '.gitignore',
    description: 'React项目Git忽略文件',
    category: 'framework',
    content: `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/

# OS
Thumbs.db`
  },
  {
    name: 'vue-gitignore',
    filename: '.gitignore',
    description: 'Vue.js项目Git忽略文件',
    category: 'framework',
    content: `.DS_Store
node_modules
/dist

# Local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`
  }
];

// 语言特定模板
const languageTemplates: IgnoreTemplate[] = [
  {
    name: 'python-gitignore',
    filename: '.gitignore',
    description: 'Python项目Git忽略文件',
    category: 'language',
    content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Virtual environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db`
  },
  {
    name: 'java-gitignore',
    filename: '.gitignore',
    description: 'Java项目Git忽略文件',
    category: 'language',
    content: `# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# Virtual machine crash logs
hs_err_pid*

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
.mvn/wrapper/maven-wrapper.jar

# Gradle
.gradle
build/
!gradle/wrapper/gradle-wrapper.jar
!**/src/main/**/build/
!**/src/test/**/build/

# IntelliJ IDEA
.idea/
*.iws
*.iml
*.ipr
out/
!**/src/main/**/out/
!**/src/test/**/out/

# Eclipse
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache
bin/
!**/src/main/**/bin/
!**/src/test/**/bin/

# VS Code
.vscode/`
  }
];

// 所有模板分类
export const templateCategories: TemplateCategory[] = [
  {
    name: 'version-control',
    description: '版本控制',
    templates: gitTemplates
  },
  {
    name: 'package-manager',
    description: '包管理器',
    templates: npmTemplates
  },
  {
    name: 'linting',
    description: '代码质量工具',
    templates: lintingTemplates
  },
  {
    name: 'build-tools',
    description: '构建工具',
    templates: buildToolTemplates
  },
  {
    name: 'editor',
    description: '编辑器配置',
    templates: editorTemplates
  },
  {
    name: 'framework',
    description: '前端框架',
    templates: frameworkTemplates
  },
  {
    name: 'language',
    description: '编程语言',
    templates: languageTemplates
  }
];

// 扁平化所有模板
export const allTemplates: IgnoreTemplate[] = templateCategories.reduce(
  (acc, category) => [...acc, ...category.templates],
  [] as IgnoreTemplate[]
);

// 根据名称获取模板
export function getTemplateByName(name: string): IgnoreTemplate | undefined {
  return allTemplates.find(template => 
    template.name === name || template.filename === name
  );
}

// 根据分类获取模板
export function getTemplatesByCategory(category: string): IgnoreTemplate[] {
  const categoryObj = templateCategories.find(cat => cat.name === category);
  return categoryObj ? categoryObj.templates : [];
}
