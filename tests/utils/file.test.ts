import * as fs from 'fs';
import * as path from 'path';
import { FileUtils } from '../../src/utils/file';
import { TEST_DIR } from '../setup';

describe('FileUtils', () => {
  describe('exists', () => {
    it('should return true for existing file', () => {
      const testFile = path.join(TEST_DIR, 'test.txt');
      FileUtils.writeFile(testFile, 'test content');

      expect(FileUtils.exists(testFile)).toBe(true);
    });

    it('should return false for non-existing file', () => {
      const testFile = path.join(TEST_DIR, 'nonexistent.txt');
      
      expect(FileUtils.exists(testFile)).toBe(false);
    });
  });

  describe('ensureDir', () => {
    it('should create directory if it does not exist', () => {
      const testDir = path.join(TEST_DIR, 'new-dir');
      
      expect(fs.existsSync(testDir)).toBe(false);
      FileUtils.ensureDir(testDir);
      expect(fs.existsSync(testDir)).toBe(true);
    });

    it('should not throw if directory already exists', () => {
      const testDir = path.join(TEST_DIR, 'existing-dir');
      fs.mkdirSync(testDir);
      
      expect(() => FileUtils.ensureDir(testDir)).not.toThrow();
    });
  });

  describe('writeFile', () => {
    it('should write file with content', () => {
      const testFile = path.join(TEST_DIR, 'write-test.txt');
      const content = 'Hello, World!';
      
      FileUtils.writeFile(testFile, content);
      
      expect(fs.existsSync(testFile)).toBe(true);
      expect(fs.readFileSync(testFile, 'utf-8')).toBe(content);
    });

    it('should create directories if they do not exist', () => {
      const testFile = path.join(TEST_DIR, 'nested', 'dir', 'test.txt');
      const content = 'Nested file content';
      
      FileUtils.writeFile(testFile, content);
      
      expect(fs.existsSync(testFile)).toBe(true);
      expect(fs.readFileSync(testFile, 'utf-8')).toBe(content);
    });
  });

  describe('readFile', () => {
    it('should read file content', () => {
      const testFile = path.join(TEST_DIR, 'read-test.txt');
      const content = 'File content to read';
      FileUtils.writeFile(testFile, content);

      const result = FileUtils.readFile(testFile);

      expect(result).toBe(content);
    });
  });

  describe('getFullPath', () => {
    it('should return full path with output directory', () => {
      const filename = 'test.txt';
      const outputDir = '/custom/output';
      
      const result = FileUtils.getFullPath(filename, outputDir);
      
      expect(result).toBe(path.resolve(outputDir, filename));
    });

    it('should use current working directory if no output directory provided', () => {
      const filename = 'test.txt';
      
      const result = FileUtils.getFullPath(filename);
      
      expect(result).toBe(path.resolve(process.cwd(), filename));
    });
  });

  describe('willOverwrite', () => {
    it('should return true if file exists', () => {
      const testFile = path.join(TEST_DIR, 'existing.txt');
      FileUtils.writeFile(testFile, 'content');

      expect(FileUtils.willOverwrite(testFile)).toBe(true);
    });

    it('should return false if file does not exist', () => {
      const testFile = path.join(TEST_DIR, 'nonexistent.txt');
      
      expect(FileUtils.willOverwrite(testFile)).toBe(false);
    });
  });

  describe('backup', () => {
    it('should create backup of existing file', () => {
      const testFile = path.join(TEST_DIR, 'backup-test.txt');
      const content = 'Original content';
      FileUtils.writeFile(testFile, content);

      const backupPath = FileUtils.backup(testFile);

      expect(fs.existsSync(backupPath)).toBe(true);
      expect(fs.readFileSync(backupPath, 'utf-8')).toBe(content);
      expect(backupPath).toMatch(/backup-test\.txt\.backup\.\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}/);
    });

    it('should throw error if file does not exist', () => {
      const testFile = path.join(TEST_DIR, 'nonexistent.txt');
      
      expect(() => FileUtils.backup(testFile)).toThrow('File');
    });
  });
});
