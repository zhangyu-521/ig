export class Logger {
  private static colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m'
  };

  private static colorize(text: string, color: keyof typeof Logger.colors): string {
    if (process.env['NO_COLOR'] || process.platform === 'win32') {
      return text;
    }
    return `${Logger.colors[color]}${text}${Logger.colors.reset}`;
  }

  static info(message: string): void {
    console.log(Logger.colorize('ℹ', 'blue'), message);
  }

  static success(message: string): void {
    console.log(Logger.colorize('✓', 'green'), message);
  }

  static warning(message: string): void {
    console.log(Logger.colorize('⚠', 'yellow'), message);
  }

  static error(message: string): void {
    console.log(Logger.colorize('✗', 'red'), message);
  }

  static debug(message: string): void {
    if (process.env['DEBUG']) {
      console.log(Logger.colorize('🐛', 'gray'), message);
    }
  }

  static log(message: string): void {
    console.log(message);
  }

  static title(message: string): void {
    console.log(Logger.colorize(message, 'bright'));
  }

  static subtitle(message: string): void {
    console.log(Logger.colorize(message, 'cyan'));
  }

  static dim(message: string): void {
    console.log(Logger.colorize(message, 'dim'));
  }

  static newLine(): void {
    console.log();
  }

  static separator(): void {
    console.log(Logger.colorize('─'.repeat(50), 'gray'));
  }

  static progress(current: number, total: number, message?: string): void {
    const percentage = Math.round((current / total) * 100);
    const progressBar = '█'.repeat(Math.round(percentage / 5)) + '░'.repeat(20 - Math.round(percentage / 5));
    const progressText = `[${progressBar}] ${percentage}% (${current}/${total})`;

    if (message) {
      console.log(Logger.colorize(progressText, 'cyan'), message);
    } else {
      console.log(Logger.colorize(progressText, 'cyan'));
    }
  }
}
