#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const inquirer_1 = require("inquirer");
const ignoreTemplates = new Map([
    [".gitignore", `# Dependency directories
node_modules/
dist/
build/

# Environment files
.env
.env.local
.env.development
.env.test
.env.production

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`],
    [".npmignore", `# Logs
logs
*.log
npm-debug.log*

# Dependency directories
node_modules/

# Environment files
.env
.env.local

# Build output
dist/
build/
out/

# Coverage
coverage/
.nyc_output

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?`],
    [".eslintignore", `node_modules/
dist/
build/
coverage/
.env
.env.local`],
    [".prettierignore", `node_modules/
dist/
build/
coverage/
.env
.env.local`],
    [".babelignore", `node_modules/
dist/
build/
coverage/
.env
.env.local`]
]);
const questions = [
    {
        type: "list",
        name: "option",
        message: "请选择要生成的忽略文件",
        choices: [
            { name: "gitignore", value: ".gitignore" },
            { name: "npmignore", value: ".npmignore" },
            { name: "eslintignore", value: ".eslintignore" },
            { name: "prettierignore", value: ".prettierignore" },
            { name: "babelignore", value: ".babelignore" },
        ]
    }
];
inquirer_1.default.prompt(questions).then((ans) => {
    fs.writeFileSync(`${process.cwd()}/${ans.option}`, ignoreTemplates.get(ans.option) || '', 'utf-8');
});
