export const appLocalStorage = {
    get<T>(key: string, fallback?: T): T | null {
        if (typeof window === "undefined") return fallback ?? null;

        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : (fallback ?? null);
        } catch {
            return fallback ?? null;
        }
    },

    set<T>(key: string, value: T) {
        if (typeof window === "undefined") return;

        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: string) {
        if (typeof window === "undefined") return;

        localStorage.removeItem(key);
    },
};
