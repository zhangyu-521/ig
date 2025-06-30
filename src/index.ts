// Export main classes
export { CLI } from './cli';

// Export types
export * from './types';

// Export templates
export * from './templates';

// Export utilities
export { FileUtils } from './utils/file';
export { Logger } from './utils/logger';

// Main API for programmatic usage
import { allTemplates, getTemplateByName } from './templates';
import { FileUtils } from './utils/file';
import { IgnoreTemplate } from './types';

export class AnyIG {
  /**
   * Generate a single ignore file
   */
  static generateFile(templateName: string, outputDir?: string): void {
    const template = getTemplateByName(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    const filePath = FileUtils.getFullPath(template.filename, outputDir);
    FileUtils.writeFile(filePath, template.content);
  }

  /**
   * Generate multiple ignore files
   */
  static generateFiles(templateNames: string[], outputDir?: string): void {
    for (const templateName of templateNames) {
      this.generateFile(templateName, outputDir);
    }
  }

  /**
   * Get all available templates
   */
  static getAvailableTemplates(): IgnoreTemplate[] {
    return allTemplates;
  }

  /**
   * Get template by name
   */
  static getTemplate(name: string): IgnoreTemplate | undefined {
    return getTemplateByName(name);
  }

  /**
   * Check if template exists
   */
  static hasTemplate(name: string): boolean {
    return getTemplateByName(name) !== undefined;
  }
}
