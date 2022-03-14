export class StorageUtil {
  static get(key: string) {
    const value = window.localStorage.getItem(key);
    return value && JSON.parse(value);
  }
  static getOrigin(key: string) {
    return window.localStorage.getItem(key);
  }
  static set(key: string, value: any): boolean {
    if (value === undefined) {
      return false;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  }
}
