export interface IgnoreTemplate {
  name: string;
  filename: string;
  content: string;
  description?: string;
  category?: string;
}

export interface CLIOptions {
  multiple?: boolean;
  output?: string;
  template?: string;
  list?: boolean;
  help?: boolean;
  version?: boolean;
}

export interface TemplateCategory {
  name: string;
  description: string;
  templates: IgnoreTemplate[];
}

export interface UserChoice {
  templates: string[];
  outputDir?: string | undefined;
}
