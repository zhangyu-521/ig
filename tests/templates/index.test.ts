import { allTemplates, templateCategories, getTemplateByName, getTemplatesByCategory } from '../../src/templates';

describe('Templates', () => {
  describe('allTemplates', () => {
    it('should contain templates', () => {
      expect(allTemplates.length).toBeGreaterThan(0);
    });

    it('should have valid template structure', () => {
      allTemplates.forEach(template => {
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('filename');
        expect(template).toHaveProperty('content');
        expect(typeof template.name).toBe('string');
        expect(typeof template.filename).toBe('string');
        expect(typeof template.content).toBe('string');
        expect(template.name.length).toBeGreaterThan(0);
        expect(template.filename.length).toBeGreaterThan(0);
        expect(template.content.length).toBeGreaterThan(0);
      });
    });
  });

  describe('templateCategories', () => {
    it('should contain categories', () => {
      expect(templateCategories.length).toBeGreaterThan(0);
    });

    it('should have valid category structure', () => {
      templateCategories.forEach(category => {
        expect(category).toHaveProperty('name');
        expect(category).toHaveProperty('description');
        expect(category).toHaveProperty('templates');
        expect(typeof category.name).toBe('string');
        expect(typeof category.description).toBe('string');
        expect(Array.isArray(category.templates)).toBe(true);
      });
    });

    it('should contain expected categories', () => {
      const categoryNames = templateCategories.map(cat => cat.name);
      expect(categoryNames).toContain('version-control');
      expect(categoryNames).toContain('package-manager');
      expect(categoryNames).toContain('linting');
      expect(categoryNames).toContain('build-tools');
    });
  });

  describe('getTemplateByName', () => {
    it('should return template by name', () => {
      const template = getTemplateByName('gitignore');
      expect(template).toBeDefined();
      expect(template?.name).toBe('gitignore');
    });

    it('should return template by filename', () => {
      const template = getTemplateByName('.gitignore');
      expect(template).toBeDefined();
      expect(template?.filename).toBe('.gitignore');
    });

    it('should return undefined for non-existent template', () => {
      const template = getTemplateByName('nonexistent');
      expect(template).toBeUndefined();
    });
  });

  describe('getTemplatesByCategory', () => {
    it('should return templates for valid category', () => {
      const templates = getTemplatesByCategory('version-control');
      expect(templates.length).toBeGreaterThan(0);
      templates.forEach(template => {
        expect(template.category).toBe('version-control');
      });
    });

    it('should return empty array for non-existent category', () => {
      const templates = getTemplatesByCategory('nonexistent');
      expect(templates).toEqual([]);
    });
  });

  describe('specific templates', () => {
    it('should have gitignore template', () => {
      const template = getTemplateByName('gitignore');
      expect(template).toBeDefined();
      expect(template?.filename).toBe('.gitignore');
      expect(template?.content).toContain('node_modules/');
    });

    it('should have npmignore template', () => {
      const template = getTemplateByName('npmignore');
      expect(template).toBeDefined();
      expect(template?.filename).toBe('.npmignore');
      expect(template?.content).toContain('src/');
    });

    it('should have eslintignore template', () => {
      const template = getTemplateByName('eslintignore');
      expect(template).toBeDefined();
      expect(template?.filename).toBe('.eslintignore');
      expect(template?.content).toContain('node_modules/');
    });
  });
});
