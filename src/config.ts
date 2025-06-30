import * as fs from 'fs';
import * as path from 'path';
import { IgnoreTemplate } from './types';

export interface AnyIGConfig {
  defaultTemplates?: string[];
  outputDir?: string;
  customTemplates?: IgnoreTemplate[];
  autoBackup?: boolean;
  confirmOverwrite?: boolean;
}

export class ConfigManager {
  private static readonly CONFIG_FILENAME = '.anyigrc.json';
  private static readonly CONFIG_PATHS = [
    process.cwd(),
    path.join(process.env['HOME'] || process.env['USERPROFILE'] || '', '.config'),
    path.join(process.env['HOME'] || process.env['USERPROFILE'] || '')
  ];

  /**
   * 查找配置文件
   */
  static findConfigFile(): string | null {
    for (const configPath of this.CONFIG_PATHS) {
      const fullPath = path.join(configPath, this.CONFIG_FILENAME);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
    return null;
  }

  /**
   * 加载配置
   */
  static loadConfig(): AnyIGConfig {
    const configFile = this.findConfigFile();
    if (!configFile) {
      return this.getDefaultConfig();
    }

    try {
      const content = fs.readFileSync(configFile, 'utf-8');
      const config = JSON.parse(content) as AnyIGConfig;
      return { ...this.getDefaultConfig(), ...config };
    } catch (error) {
      console.warn(`Warning: Failed to load config file ${configFile}:`, (error as Error).message);
      return this.getDefaultConfig();
    }
  }

  /**
   * 保存配置
   */
  static saveConfig(config: AnyIGConfig, configPath?: string): void {
    const targetPath = configPath || path.join(process.cwd(), this.CONFIG_FILENAME);
    const dir = path.dirname(targetPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(targetPath, JSON.stringify(config, null, 2), 'utf-8');
  }

  /**
   * 获取默认配置
   */
  static getDefaultConfig(): AnyIGConfig {
    return {
      defaultTemplates: [],
      outputDir: process.cwd(),
      customTemplates: [],
      autoBackup: false,
      confirmOverwrite: true
    };
  }

  /**
   * 创建示例配置文件
   */
  static createExampleConfig(outputPath?: string): void {
    const exampleConfig: AnyIGConfig = {
      defaultTemplates: ['gitignore', 'npmignore'],
      outputDir: './generated',
      autoBackup: true,
      confirmOverwrite: false,
      customTemplates: [
        {
          name: 'custom-ignore',
          filename: '.customignore',
          description: 'Custom ignore file template',
          category: 'custom',
          content: '# Add your custom ignore patterns here\n*.tmp\n*.cache\n'
        }
      ]
    };

    const targetPath = outputPath || path.join(process.cwd(), this.CONFIG_FILENAME);
    this.saveConfig(exampleConfig, targetPath);
  }

  /**
   * 验证配置
   */
  static validateConfig(config: AnyIGConfig): string[] {
    const errors: string[] = [];

    if (config.outputDir && !path.isAbsolute(config.outputDir) && !config.outputDir.startsWith('./')) {
      errors.push('outputDir should be an absolute path or start with "./"');
    }

    if (config.customTemplates) {
      config.customTemplates.forEach((template, index) => {
        if (!template.name || !template.filename || !template.content) {
          errors.push(`customTemplates[${index}] is missing required fields (name, filename, content)`);
        }
      });
    }

    return errors;
  }
}
