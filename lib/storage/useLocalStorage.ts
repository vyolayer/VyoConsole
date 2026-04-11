"use client";

import { useEffect, useState } from "react";
import { appLocalStorage } from "./appLocalStorage";
import { TStorageKeys } from "./keys";

export function useLocalStorage<T>(key: TStorageKeys, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    // Load from storage
    useEffect(() => {
        const stored = appLocalStorage.get<T>(key, initialValue);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (stored !== null) setValue(stored);
    }, [key, initialValue]);

    // Sync across tabs
    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if (e.key === key && e.newValue) {
                setValue(JSON.parse(e.newValue));
            }
        };

        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, [key]);

    const update = (newValue: T | ((prev: T) => T)) => {
        setValue((prev) => {
            const valueToStore = newValue instanceof Function ? newValue(prev) : newValue;

            appLocalStorage.set(key, valueToStore);
            return valueToStore;
        });
    };

    const remove = () => {
        appLocalStorage.remove(key);
        setValue(initialValue);
    };

    return [value, update, remove] as const;
}
