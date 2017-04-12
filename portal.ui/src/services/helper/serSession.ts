
/**
 * Session 存储
 */
export  default class {
    set(k: string, v: any) {
        if (v == null) {
            // throw new Error('_Storage Data cannot NUll');
            console.error("_Session Data cannot NUll");
        }
        return window.sessionStorage.setItem(k, JSON.stringify(v));
    }
    get(k) {
        return JSON.parse(window.sessionStorage.getItem(k));
    }
    remove(k) {
        if (k)
            return window.sessionStorage.removeItem(k);
        else
            return window.sessionStorage.clear();
    }
}