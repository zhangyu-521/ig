import inquirer from 'inquirer';
import { Command } from 'commander';
import { CLIOptions, UserChoice, IgnoreTemplate } from './types';
import { allTemplates, templateCategories, getTemplateByName } from './templates';
import { FileUtils } from './utils/file';
import { Logger } from './utils/logger';
import { ConfigManager, AnyIGConfig } from './config';

export class CLI {
  private program: Command;
  private config: AnyIGConfig;

  constructor() {
    this.program = new Command();
    this.config = ConfigManager.loadConfig();
    this.setupCommands();
  }

  private setupCommands(): void {
    this.program
      .name('anyig')
      .description('A powerful tool for generating ignore files')
      .version('2.0.0');

    this.program
      .option('-m, --multiple', 'Select multiple templates')
      .option('-o, --output <dir>', 'Output directory')
      .option('-t, --template <name>', 'Generate specific template directly')
      .option('-l, --list', 'List all available templates')
      .option('--categories', 'List templates by categories')
      .option('--init-config', 'Create example configuration file')
      .option('--config <path>', 'Use specific configuration file')
      .option('--no-backup', 'Disable automatic backup of existing files')
      .option('--force', 'Force overwrite without confirmation')
      .action(async (options: CLIOptions) => {
        await this.handleCommand(options);
      });
  }

  async run(): Promise<void> {
    await this.program.parseAsync();
  }

  private async handleCommand(options: CLIOptions): Promise<void> {
    try {
      // 处理配置相关命令
      if ((options as any).initConfig) {
        ConfigManager.createExampleConfig();
        Logger.success('Created example configuration file .anyigrc.json');
        return;
      }

      // 加载指定的配置文件
      if ((options as any).config) {
        try {
          const customConfig = JSON.parse(FileUtils.readFile((options as any).config));
          this.config = { ...this.config, ...customConfig };
        } catch (error) {
          Logger.error(`Failed to load config file: ${(error as Error).message}`);
          return;
        }
      }

      if (options.list) {
        this.listTemplates();
        return;
      }

      if ((options as any).categories) {
        this.listTemplatesByCategories();
        return;
      }

      if (options.template) {
        await this.generateSpecificTemplate(options.template, options.output, options);
        return;
      }

      const userChoice = await this.promptUser(options);
      await this.generateFiles(userChoice);
    } catch (error) {
      Logger.error(`Failed to generate ignore files: ${(error as Error).message}`);
      throw error;
    }
  }

  private listTemplates(): void {
    Logger.info('Available ignore file templates:');
    console.log();

    // 合并配置中的自定义模板
    const customTemplates = this.config.customTemplates || [];
    const allAvailableTemplates = [...allTemplates, ...customTemplates];

    allAvailableTemplates.forEach(template => {
      Logger.log(`• ${template.name} - ${template.description || template.filename}`);
    });

    if (customTemplates.length > 0) {
      console.log();
      Logger.info(`Found ${customTemplates.length} custom template(s) from configuration.`);
    }
  }

  private listTemplatesByCategories(): void {
    Logger.info('Available ignore file templates by category:');
    console.log();

    templateCategories.forEach(category => {
      Logger.log(`📁 ${category.description} (${category.name})`);
      category.templates.forEach(template => {
        Logger.log(`  • ${template.name} - ${template.description || template.filename}`);
      });
      console.log();
    });

    // 显示自定义模板
    const customTemplates = this.config.customTemplates || [];
    if (customTemplates.length > 0) {
      Logger.log('📁 Custom Templates');
      customTemplates.forEach(template => {
        Logger.log(`  • ${template.name} - ${template.description || template.filename}`);
      });
    }
  }

  private async generateSpecificTemplate(templateName: string, outputDir?: string, options?: CLIOptions): Promise<void> {
    // 首先在标准模板中查找
    let template = getTemplateByName(templateName);

    // 如果没找到，在自定义模板中查找
    if (!template && this.config.customTemplates) {
      template = this.config.customTemplates.find(t => t.name === templateName || t.filename === templateName);
    }

    if (!template) {
      throw new Error(`Template '${templateName}' not found. Use --list to see available templates.`);
    }

    const targetDir = outputDir || this.config.outputDir || process.cwd();
    const filePath = FileUtils.getFullPath(template.filename, targetDir);

    if (FileUtils.willOverwrite(filePath)) {
      const force = (options as any)?.force;
      const shouldConfirm = this.config.confirmOverwrite && !force;

      if (shouldConfirm) {
        const { confirm } = await inquirer.prompt([{
          type: 'confirm',
          name: 'confirm',
          message: `File ${template.filename} already exists. Overwrite?`,
          default: false
        }]);

        if (!confirm) {
          Logger.info('Operation cancelled.');
          return;
        }
      }

      // 自动备份（如果启用）
      if (this.config.autoBackup && !(options as any)?.noBackup) {
        try {
          const backupPath = FileUtils.backup(filePath);
          Logger.info(`Backed up existing file to ${backupPath}`);
        } catch (error) {
          Logger.warning(`Failed to backup file: ${(error as Error).message}`);
        }
      }
    }

    FileUtils.writeFile(filePath, template.content);
    Logger.success(`Generated ${template.filename} successfully!`);
  }

  private async promptUser(options: CLIOptions): Promise<UserChoice> {
    const questions = [];

    if (options.multiple) {
      questions.push({
        type: 'checkbox',
        name: 'templates',
        message: 'Select ignore files to generate:',
        choices: allTemplates.map(template => ({
          name: `${template.name} - ${template.description || template.filename}`,
          value: template.name,
          checked: false
        })),
        validate: (input: string[]) => {
          if (input.length === 0) {
            return 'Please select at least one template.';
          }
          return true;
        }
      });
    } else {
      questions.push({
        type: 'list',
        name: 'templates',
        message: 'Select an ignore file to generate:',
        choices: [
          ...templateCategories.map(category => ({
            name: `── ${category.description} ──`,
            disabled: true
          })),
          ...templateCategories.flatMap(category =>
            category.templates.map(template => ({
              name: `${template.name} - ${template.description || template.filename}`,
              value: [template.name]
            }))
          )
        ]
      });
    }

    if (options.output) {
      return {
        templates: options.multiple ? [] : [''],
        outputDir: options.output
      };
    }

    const answers = await inquirer.prompt(questions);
    return {
      templates: Array.isArray(answers.templates) ? answers.templates : [answers.templates],
      outputDir: options.output
    };
  }

  private async generateFiles(userChoice: UserChoice): Promise<void> {
    const { templates, outputDir } = userChoice;
    const filesToGenerate: IgnoreTemplate[] = [];
    const existingFiles: string[] = [];

    // 收集要生成的模板
    for (const templateName of templates) {
      const template = getTemplateByName(templateName);
      if (template) {
        filesToGenerate.push(template);
        const filePath = FileUtils.getFullPath(template.filename, outputDir);
        if (FileUtils.willOverwrite(filePath)) {
          existingFiles.push(template.filename);
        }
      }
    }

    // 检查是否有文件会被覆盖
    if (existingFiles.length > 0) {
      const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: `The following files already exist: ${existingFiles.join(', ')}. What would you like to do?`,
        choices: [
          { name: 'Overwrite all', value: 'overwrite' },
          { name: 'Skip existing files', value: 'skip' },
          { name: 'Backup and overwrite', value: 'backup' },
          { name: 'Cancel', value: 'cancel' }
        ]
      }]);

      if (action === 'cancel') {
        Logger.info('Operation cancelled.');
        return;
      }

      // 处理现有文件
      if (action === 'backup') {
        for (const filename of existingFiles) {
          const filePath = FileUtils.getFullPath(filename, outputDir);
          const backupPath = FileUtils.backup(filePath);
          Logger.info(`Backed up ${filename} to ${backupPath}`);
        }
      } else if (action === 'skip') {
        // 过滤掉已存在的文件
        const existingFilenames = new Set(existingFiles);
        filesToGenerate.splice(0, filesToGenerate.length, 
          ...filesToGenerate.filter(template => !existingFilenames.has(template.filename))
        );
      }
    }

    // 生成文件
    let generatedCount = 0;
    for (const template of filesToGenerate) {
      try {
        const filePath = FileUtils.getFullPath(template.filename, outputDir);
        FileUtils.writeFile(filePath, template.content);
        Logger.success(`Generated ${template.filename}`);
        generatedCount++;
      } catch (error) {
        Logger.error(`Failed to generate ${template.filename}: ${(error as Error).message}`);
      }
    }

    if (generatedCount > 0) {
      Logger.success(`Successfully generated ${generatedCount} ignore file(s)!`);
    } else {
      Logger.warning('No files were generated.');
    }
  }
}
