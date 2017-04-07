
/**
 * 本地存储
 */

export default class{
    set(k: string, v: any) {
        if (v == null) {
            // throw new Error('_Storage Data cannot NUll');
            console.error("_Storage Data cannot NUll");
        }
        return window.localStorage.setItem(k, JSON.stringify(v));
    }
    get(k) {
        return window.localStorage.getItem(k) ? JSON.parse(window.localStorage.getItem(k)) : null;
    }
    remove(k) {
        if (k)
            return window.localStorage.removeItem(k);
        else
            return window.localStorage.clear();
    }
}
