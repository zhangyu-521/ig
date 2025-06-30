export class AnyIGError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AnyIGError';
  }
}

export class TemplateNotFoundError extends AnyIGError {
  constructor(templateName: string) {
    super(`Template '${templateName}' not found. Use --list to see available templates.`, 'TEMPLATE_NOT_FOUND');
    this.name = 'TemplateNotFoundError';
  }
}

export class FileOperationError extends AnyIGError {
  constructor(operation: string, filePath: string, originalError?: Error) {
    super(`Failed to ${operation} file '${filePath}': ${originalError?.message || 'Unknown error'}`, 'FILE_OPERATION_ERROR');
    this.name = 'FileOperationError';
  }
}

export class ConfigurationError extends AnyIGError {
  constructor(message: string) {
    super(`Configuration error: ${message}`, 'CONFIGURATION_ERROR');
    this.name = 'ConfigurationError';
  }
}

export class ValidationError extends AnyIGError {
  constructor(field: string, value: any, expectedType: string) {
    super(`Validation error: ${field} expected ${expectedType}, got ${typeof value}`, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export function handleError(error: Error): void {
  if (error instanceof AnyIGError) {
    console.error(`Error [${error.code}]: ${error.message}`);
  } else {
    console.error(`Unexpected error: ${error.message}`);
  }
  
  if (process.env['DEBUG']) {
    console.error(error.stack);
  }
}
