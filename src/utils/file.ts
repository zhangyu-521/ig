import * as fs from 'fs';
import * as path from 'path';

export class FileUtils {
  /**
   * 检查文件是否存在
   */
  static exists(filePath: string): boolean {
    try {
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  }

  /**
   * 创建目录（如果不存在）
   */
  static ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * 写入文件
   */
  static writeFile(filePath: string, content: string): void {
    const dir = path.dirname(filePath);
    this.ensureDir(dir);
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  /**
   * 读取文件
   */
  static readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  /**
   * 获取文件的完整路径
   */
  static getFullPath(filename: string, outputDir?: string): string {
    const baseDir = outputDir || process.cwd();
    return path.resolve(baseDir, filename);
  }

  /**
   * 检查文件是否会被覆盖
   */
  static willOverwrite(filePath: string): boolean {
    return this.exists(filePath);
  }

  /**
   * 备份现有文件
   */
  static backup(filePath: string): string {
    if (!this.exists(filePath)) {
      throw new Error(`File ${filePath} does not exist`);
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = `${filePath}.backup.${timestamp}`;
    
    fs.copyFileSync(filePath, backupPath);
    return backupPath;
  }
}
