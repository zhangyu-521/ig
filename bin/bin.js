#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const inquirer_1 = require("inquirer");
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
    fs.writeFileSync(`${process.cwd()}/${ans.option}`, '');
});
