export function _fn(f?: () => any) {
  return f?.();
}

export function _upperFirst(s: string): string {
  if (s.length < 1) return s;
  if (s.length === 1) {
    return s.toUpperCase();
  }
  return s.charAt(0).toUpperCase() + s.substring(1, s.length);
}

export function _undefined(val: any): boolean {
  return typeof val == 'undefined';
}

export function _removeLeadingSlash(s: string): string {
  return s.replace(/^\/+/, '');
}

export function _isValidTable(table: string): boolean {
  if (!table) return false;

  const regexes = {
    letterUnderscore: /[a-zA-Z_]/i,
    letterUnderscoreNumber: /[a-zA-Z0-9_]/i
  };

  // First char must be a letter or underscore
  if (!regexes.letterUnderscore.test(table.charAt(0))) {
    return false;
  }

  // Check other characters
  for (let i = 0; i < table.length; i++) {
    if (!regexes.letterUnderscoreNumber.test(table.charAt(i))) {
      return false;
    }
  }

  return true;
}
