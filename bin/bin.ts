#!/usr/bin/env node

import * as fs from "fs"
import * as path from "path"
import inquirer, {type Question } from "inquirer"

const questions: Question[] = [
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
]

inquirer.prompt(questions as any).then((ans) => {
    fs.writeFileSync(`${process.cwd()}/${ans.option}`, '')
})